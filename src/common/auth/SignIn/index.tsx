import { ComponentHolder } from 'components';
import React, { useState, FunctionComponent, useEffect } from 'react';
import { isNumber } from 'utils';
import { SignInForm } from './SignInForm';

export const SignIn: FunctionComponent<Props> = ({ trigger, triggerReset, triggerExit }) => {

    const [showModal, setShowModal] = useState(true);

    const toggle = (force = false) => {
        setShowModal(prevState => force ? false : !prevState)
    };

    const showResetForm: () => void = () => {

        if (triggerReset) {

            triggerReset((prevState: number) => prevState + 1);

            toggle(true);

        }

    }

    useEffect(() => {

        if (triggerExit) toggle(true);

        setShowModal(true);

    }, [triggerExit]);

    useEffect(() => {

        if (isNumber(String(trigger)) && Number(trigger) > 0) {

            setShowModal(true);

        }

    }, [trigger]);

    return (
        <>

            <ComponentHolder
                visibility={showModal}
                title="Login"
                subtitle={"Take control of the medstation from the back office, approve appointment, create user roles etc"}
                className="auth-sign-in"
            >

                <SignInForm

                    showResetForm={() => showResetForm()}

                />

            </ComponentHolder>

        </>
    );
}

interface Props {
    triggerReset: (prevState: number | any) => void,
    triggerExit: boolean,
    trigger: number
}
