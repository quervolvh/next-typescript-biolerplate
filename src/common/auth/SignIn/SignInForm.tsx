import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormField, Button, FormError } from 'components';
import { FunctionComponent } from 'react';
import { change, errorItem, getPredefinedErrors, isNumber, quickValidation } from 'utils';
import { loginUser } from 'redux/actions';
import router from 'next/router';

export const SignInForm: FunctionComponent<Props> = ({
    showResetForm = () => null
}) => {

    const dispatch = useDispatch();

    const [state, setState] = useState<_state>({
        attempt: 0,
        error: getPredefinedErrors(["email_mobile", "password"])
    });

    const onChanged = (e: any, field: string) => {

        e = field !== "email_mobile" ? e : String(e).trim();

        const validation = quickValidation(field, e, state);
        setState((prevState) => ({ ...prevState, [field]: e, error: validation }));
    }

    const formError = Object.values(state.error || {}).map(item => item).filter((item) => Array.isArray(item)).length > 0;

    const disabled = () => {

        if (state.attempt === 0) return false;

        return formError;

    }

    const toggleLoader = (_loadState: boolean) => change(_loadState, "loading", setState);

    const login: () => void = async () => {

        change(state.attempt + 1, "attempt", setState);

        if (state.attempt === 0) {
            if (Object.entries(state.error || {}).map(([, value]) => value).includes(true)) return;
        }

        toggleLoader(true);

        const response: any = await dispatch(
            loginUser(
                {
                    [isNumber(state.email_mobile || "") ? "phone" : "email"]: state.email_mobile,
                    password: state.password

                }));

        change(response, "success", setState);

        if (response === true) {

            router.push("/");

            return;

        }

        toggleLoader(false);

    };

    const preProcess = () => {
        setState((prevState) => ({ ...prevState, success: undefined, attempt: prevState.attempt + 1 }))
        if (!state?.email_mobile || !state.password || state.loading) return;
        if (formError) return;
        login();
    }

    const keyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            // preProcess();
        }
    }

    const responseCondition = state.attempt > 0 &&
        !state.loading && (typeof state.success === "string");

    return (
        <div className="auth-form">

            <FormField
                type="plain"
                placeHolder={"Enter Email address"}
                label={"Email Address"}
                onChange={(e: any) => !state.loading && onChanged(e, "email_mobile")}
                value={state?.email_mobile || ""}
                error={state.attempt > 0 && errorItem(state?.error || {}, "email_mobile")}
                disabled={state.loading}
                onKeyDown={(e) => keyDown(e)}
            />

            <FormField
                type="password"
                placeHolder={"Enter Password"}
                disabled={state.loading}
                label={"Password"}
                onChange={(e: any) => onChanged(e, "password")}
                value={state?.password || ""}
                error={state.attempt > 0 && errorItem(state?.error || {}, "password")}
                onKeyDown={(e) => keyDown(e)}
            />

            <FormError
                condition={responseCondition}
                text={state.success ? String(state.success) : ""}
            />

            <div className="auth-remember-me">

                <FormField type={"checkbox"} label={"Remember me"} />

                <Button
                    onClick={() => null}
                    label={state.loading ? "Please wait..." : "Sign In"}
                    disabled={disabled()} />

            </div>

            <div className="auth-extra-links">
                <a role={"button"} onClick={() => showResetForm()}> Forgot Password? </a>
            </div>

        </div>
    );
}

interface _state {
    email_mobile?: string,
    password?: string,
    error?: { [key: string]: any },
    attempt: number,
    loading?: boolean,
    success?: boolean | string
}

interface Props {
    showResetForm: () => void
}
