import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'components';
import { useDispatch } from 'react-redux';
import { renewAuthToken, resetApp } from 'redux/actions';
import router from 'next/router';
import { quickToast } from 'redux/store';

export const TimeOutBox: React.FC<Props> = ({ trigger }) => {

    const [visibility, setVisibility] = useState(false);

    const [extending, setExtending] = useState(false);

    const dispatch = useDispatch();

    const dev = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

    const logout = async (exit: boolean, extend = false) => {

        if (extend) {

            setExtending(true);

            const success = await renewAuthToken();

            setExtending(false);

            if (success === true) {

                setVisibility(false);

            } else if (typeof success === "string") {

                quickToast({ text: success });

            }

            return;

        }

        dispatch(resetApp());

        if (exit) {

            router.push("/");

        } else {

            router.push("/?action=login")

        }

    }

    useEffect(() => {

        if (trigger) setVisibility(true);
        if (!trigger) setVisibility(false);

    }, [trigger]);

    return (
        <>

            <Modal
                visibility={visibility}
                noObviousExit={true}
                toggleVisibility={() => null}
                outsideEscape={false}
                normalEscape={false}
                class={"modal-small"}
            >

                <div className="successful-payment account-statement-form-type-selector">


                    <h1 className="mt-5 mb-2"> Timeout </h1>

                    <p className="mb-4 mt-3">

                        Session has expired, please login to continue using Stellas.

                    </p>


                    <Button
                        label={extending ? "Please wait..." : (dev ? "Extend" : "Login")}
                        className="mt-1 color-white"
                        color='color-white'
                        onClick={() => logout(false, dev)}
                    />

                    <Button
                        label={"Exit"}
                        className="mt-2 button no-bg no-border"
                        onClick={() => logout(true)}
                    />

                </div>

            </Modal>

        </>


    );
}

interface Props {
    trigger: number
}
