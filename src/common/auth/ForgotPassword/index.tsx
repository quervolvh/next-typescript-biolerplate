import React, { useState } from 'react';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useEffect } from 'react';
import { ComponentHolder } from 'components';

export const ForgotPassword: React.FC<Props> = ({ trigger, triggerExit }) => {

    const initialState: { class: string, title?: string, subtitle?: string } =
    {
        class: "auth-modal",
        title: "FORGOT PASSWORD",
        subtitle: "Please enter your registered mobile number to reset your password."
    };

    const [showModal, setShowModal] = useState<boolean>(false);

    const [modalDetails, setModalDetails] = useState(initialState);

    const toggle = (force?: boolean) => {
        setShowModal(prevState => force ? false : !prevState);
        setModalDetails(initialState);
    }

    const updateModalOnSuccess = () => {

        setModalDetails({
            class: "auth-modal"
        });

    }

    useEffect(() => {
        if (trigger && trigger > 0) {
            toggle();
        }
        //eslint-disable-next-line
    }, [trigger]);

    useEffect(() => {

        if (triggerExit) toggle(true);

        // eslint-disable-next-line
    }, [triggerExit]);

    return (
        <ComponentHolder
            title={modalDetails.title}
            subtitle={modalDetails.subtitle}
            visibility={showModal}
            className="auth-sign-in"
        >

            <ForgotPasswordForm
                onSuccess={() => updateModalOnSuccess()}
                toggle={() => toggle()}
            />

        </ComponentHolder>
    );
}

interface Props {
    trigger: number,
    triggerExit: boolean
}
