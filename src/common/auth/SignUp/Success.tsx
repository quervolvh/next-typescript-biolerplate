import React, { FunctionComponent } from 'react';
import { Button } from 'components';
import { loginBodyType } from 'types/authTypes';
import { processLoginResponse } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export const SignInSuccess: FunctionComponent<Props> = ({ toggle, text, loginBody }) => {

    const router = useRouter();

    const dispatch = useDispatch();

    const proceed = () => {

        if (loginBody) {

            processLoginResponse(loginBody, dispatch);

            router.push("/dashboard");

            return;

        }

        toggle();

    }

    return (
        <>

            <div className="successful-payment">

                {/* <div dangerouslySetInnerHTML={{ __html: SuccessIcon }} /> */}

                <h1 className="mt-5 mb-3"> Congratulations </h1>

                <p className="mt-1 mb-5">
                    {text || "A download link has been sent to your Mobile Number. Download the app and continue your registration"}
                </p>

                <Button
                    label="Okay, Thanks"
                    className="mt-5 color-white"
                    color='color-white'
                    onClick={() => proceed()}
                />

            </div>

        </>
    );
}

interface Props {
    toggle(): void,
    text?: string,
    loginBody?: loginBodyType
}