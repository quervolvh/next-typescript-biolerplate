import React, { useState } from 'react';
import { Modal } from 'components';
import { useEffect } from 'react';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useRouter } from 'next/router';
import { loginBodyType } from 'types/authTypes';

export const ResetPassword: React.FC<Props> = ({
    trigger,
    oldPassword,
    // email,
    loginBody,
    resetToken,
    triggerExit
}) => {

    const router = useRouter();

    const initialState: { class: string, title?: string, subtitle?: string } =
    {
        class: "auth-modal",
        title: "SET NEW PASSWORD",
        subtitle: "Enter your new password in the field below."
    };

    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalDetails, setModalDetails] = useState(initialState);

    const [canExit, setCanExit] = useState(true);

    const toggle = (force?: boolean) => {
        if (showModal) router.replace("/");
        setShowModal(prevState => force ? false : !prevState);
        setModalDetails(initialState);
    }

    const updateModalOnSuccess = () => {
        setModalDetails({
            class: "auth-modal"
        })
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
        <>

            <Modal
                visibility={showModal}
                toggleVisibility={() => toggle()}
                toggleOut={() => toggle(true)}
                class={modalDetails.class}
                title={modalDetails.title}
                subtitle={modalDetails.subtitle}
                legendClass={"auth-sign-in-modal-legend"}
                outsideEscape={false}
                normalEscape={canExit}
            >

                <ResetPasswordForm
                    onSuccess={() => updateModalOnSuccess()}
                    toggle={() => toggle()}
                    resetToken={resetToken}
                    setCanExit={(e: boolean) => setCanExit(e)}
                    loginBody={loginBody}
                    oldPassword={oldPassword}
                />

            </Modal>

        </>
    );
}

interface Props {
    trigger: number,
    loginBody?: loginBodyType,
    email?: string,
    oldPassword?: string,
    resetToken: string,
    triggerExit: boolean
}
