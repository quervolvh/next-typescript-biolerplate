import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormField, Button, FormError } from 'components';
import { FunctionComponent } from 'react';
import { change, errorItem, getPredefinedErrors, quickValidation } from 'utils';
import { resetPassword } from 'redux/actions';
import { SignInSuccess } from '../SignUp/Success';
import { loginBodyType } from 'types/authTypes';
import { updateUserDetails } from 'redux/actions/AccountActions';

export const ResetPasswordForm: FunctionComponent<Props> = ({
    onSuccess,
    toggle,
    resetToken,
    setCanExit,
    loginBody,
    oldPassword
}) => {

    const dispatch = useDispatch();

    const [state, setState] = useState<_state>({
        attempt: 0,
        error: getPredefinedErrors(["password"])
    });

    const onChanged = (e: any, field: string) => {
        const validation = quickValidation(field, e, state);
        setState((prevState) => ({ ...prevState, [field]: e, error: validation, success: undefined }));
    }

    const formError = Object.values(state.error || {}).map(item => item).filter((item) => Array.isArray(item)).length > 0;

    const disabled = () => {

        if (state.attempt === 0) return false;

        return formError;

    }

    const phraseResponseMessage = (message: string) => {

        if (message.toLowerCase().includes("jwt")) return "Time out! Please try again later.";

        if (!message) return "Unexpected error! Please try again.";

        return message;

    }

    const toggleLoader = (_loadState: boolean) => change(_loadState, "loading", setState);

    const requestResetPassword: () => void = async () => {

        setState((prevState: _state) => ({ ...prevState, attempt: state.attempt + 1 }));

        if (state.attempt === 0) {
            if (Object.entries(state.error || {}).map(([, value]) => value).includes(true)) return;
        }

        toggleLoader(true);

        setCanExit(false);

        const withLoginBody = () => updateUserDetails(
            {
                "old_password": oldPassword,
                "new_password": state.password,
                "accesstoken": loginBody?.accesstoken,
            },
            "update-user-password",
            false
        );

        const plainReset = () => resetPassword({ password: state.password, otp: resetToken });

        const response: any = await dispatch(loginBody ? withLoginBody() : plainReset());

        if (response === true) {

            onSuccess();

            setState((prevState) => ({ ...prevState, success: response }));

            return;

        }

        setState((prevState) => (
            {
                ...prevState,
                loading: false,
                success: loginBody ? phraseResponseMessage(response?.message) : response
            })
        );

        setTimeout(() => setCanExit(true), 2000);

    };

    if (state.success === true) {
        return <SignInSuccess
            text={"Password has successfully been changed."}
            toggle={() => toggle()}
            loginBody={loginBody}
        />
    }

    const preProcess = () => {
        setState((prevState) => ({ ...prevState, success: undefined, attempt: prevState.attempt + 1 }))
        if (!state?.password || state.loading) return;
        if (formError) return;
        requestResetPassword();
    }

    const keyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            preProcess();
        }
    }

    const responseCondition = state.attempt > 0 &&
        !state.loading && (typeof state.success === "string")

    return (
        <div className="auth auth-sign-in pt-2">

            <FormField
                type="password"
                placeHolder={"New Password"}
                label={"Enter Password"}
                onChange={(e: any) => onChanged(e, "password")}
                value={state?.password || ""}
                error={state.attempt > 0 && errorItem(state?.error || {}, "password")}
                onKeyDown={(e) => keyDown(e)}
            />

            <FormError condition={responseCondition} text={state.success || ""} />

            <Button
                onClick={() => preProcess()}
                label={state.loading ? "Please wait..." : "Recover Password"}
                disabled={disabled()}
                className="mt-3" />

        </div>
    );
}

interface _state {
    password?: string,
    immutableEmail?: string,
    error?: { [key: string]: any },
    attempt: number,
    loading?: boolean,
    success?: boolean | string,
    resetToken?: string
}

interface Props {
    onSuccess(): void,
    toggle(): void,
    resetToken: string,
    setCanExit(e: boolean): void,
    oldPassword?: string,
    loginBody?: loginBodyType
}
