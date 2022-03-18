import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormField, Button, FormError } from 'components';
import { FunctionComponent } from 'react';
import { change, errorItem, quickValidation } from 'utils';
import { forgotPassword } from 'redux/actions';
import { RequestResetSuccess } from './SuccessfulRequest';

export const ForgotPasswordForm: FunctionComponent<Props> = ({ onSuccess, toggle }) => {

    const dispatch = useDispatch();
    const [state, setState] = useState<_state>({ attempt: 0 });

    const onChanged = (e: any, field: string) => {
        const validation = quickValidation(field, e, state);
        setState((prevState) => ({ ...prevState, [field]: e, error: validation }));
    }

    const formError = Object.values(state.error || {}).map(item => item).filter((item) => Array.isArray(item)).length > 0;

    const disabled = () => {
        if (!state?.error || !state?.mobile) return true;

        if (state.attempt > 0) return formError;
    }

    const toggleLoader = (_loadState: boolean) => change(_loadState, "loading", setState);

    const requestResetPassword: () => void = async () => {

        setState((prevState: _state) => ({ ...prevState, attempt: state.attempt + 1, immutableMobile: state.mobile }));

        if (state.attempt === 0) {
            if (Object.entries(state.error || {}).map(([, value]) => value).includes(true)) return;
        }

        toggleLoader(true);

        const response: any = await dispatch(
            forgotPassword(
                {
                    mobile: state.mobile,

                }));

        toggleLoader(false);

        change(response, "success", setState);

        if (response === true) {

            onSuccess();

            setState((prevState) => ({ ...prevState, success: response }));

            return;

        }

        setState((prevState) => ({ ...prevState, loading: false, success: response }));

    };

    if (state.success === true) {
        return (
            <RequestResetSuccess
                toggle={() => toggle()}
                userDetails={{ mobile: state?.immutableMobile }}
                contextTitles={{
                    title: "Check your phone",
                    subtitle: "We have sent a reset password link to your phone number.",
                    buttonButtonText: "Resend link",
                    resendText: "Didn't get reset link? Resend in "
                }}
            />)
    }

    const preProcess = () => {
        setState((prevState) => ({ ...prevState, success: undefined, attempt: prevState.attempt + 1 }))
        if (!state?.mobile || state.loading) return;
        if (formError) return;
        requestResetPassword();
    }

    const keyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            // preProcess();
        }
    }

    const responseCondition = state.attempt > 0 &&
        !state.loading && (typeof state.success === "string")

    return (
        <div className="auth-form">

            <FormField
                type="plain"
                placeHolder={"Enter Mobile Number"}
                label={"Mobile Number"}
                onChange={(e: any) => onChanged(e, "mobile")}
                value={state?.mobile || ""}
                error={state.attempt > 0 && errorItem(state?.error || {}, "mobile")}
                onKeyDown={(e) => keyDown(e)}
            />


            <FormError text={state.success || ""}
                condition={responseCondition}
            />

            <Button
                onClick={() => null}
                label={state.loading ? "Please wait..." : "Recover Password"}
                disabled={disabled()}
                className="mt-3" />

        </div>
    );
}

interface _state {
    mobile?: string,
    immutableMobile?: string,
    error?: { [key: string]: any },
    attempt: number,
    loading?: boolean,
    success?: boolean | string,
}

interface Props {
    onSuccess(): void,
    toggle(): void
}
