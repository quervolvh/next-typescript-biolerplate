import React, { useEffect, useState } from 'react';
import { LandingLayout } from 'layout'
import { ForgotPassword, ResetPassword, SignIn } from 'common/auth';
import { useRouter } from 'next/router';
import { storeInterface } from 'types';
import { useSelector } from 'react-redux';
import Stellas from 'assets/svg/logo/stellas-long.svg';

const Home: React.FC<Props> = ({ isMobile, deviceWidth }) => {

    const router = useRouter();

    const { route: { visitationTrack } }: storeInterface = useSelector((store: storeInterface) => store);

    let { resetToken, action } = router.query;

    const [trigger, setTrigger] = useState<triggerType>({
        signIn: 0,
        requestReset: 0,
        resetPassword: 0,
        focusedEmail: "",
        oldPassword: "",
        phone: "",
        loginBody: undefined,
    });

    const triggerExit = (type: triggerTypes) => {

        setTrigger((prevState) => ({ ...prevState, exit: type }));

        setTimeout(() => {

            setTrigger((prevState) => ({ ...prevState, exit: '' }));

        }, 500);

    };

    const triggerProcess =
        (
            type: triggerTypes,
            focusedEmail?: string,
            oldPassword?: string,
            loginBody?: triggerTypes,
            phone?: string
        ) => {

            if (type === "requestReset") {

                router.push("?action=forgot-password")

            }

            if (type === "resetPassword") {

                router.push("?action=reset-password");

            }

            const requiredLoginBody = ["resetPassword"].includes(type);

            setTrigger(
                (prevState) => ({

                    ...prevState, [type]: prevState[type] + 1,

                    ...(requiredLoginBody ? { focusedEmail, oldPassword, loginBody, phone } : {}),

                })
            );

        }

    useEffect(() => {

        if (resetToken && action === "reset-password") {

            triggerProcess("resetPassword");

        }


        if (!visitationTrack?.length) {

            router.replace("/");

        } else {

            if (!action) {

                triggerExit("requestReset");

                triggerProcess("signIn");

            }

        }

        // eslint-disable-next-line
    }, [action]);

    return (

        <LandingLayout
            headTitle={"Stellas Digital Bank - Back Office"}
            isMobile={isMobile}
            deviceWidth={deviceWidth}
        >

            <div className="landing-page">

                <img src={Stellas} className="landing-page-img"/>

                <ForgotPassword
                    trigger={trigger["requestReset"]}
                    triggerExit={trigger.exit === "requestReset"}
                />

                <ResetPassword
                    trigger={trigger["resetPassword"]}
                    email={trigger?.focusedEmail}
                    oldPassword={trigger?.oldPassword}
                    loginBody={trigger?.loginBody}
                    resetToken={resetToken?.toString() || ""}
                    triggerExit={trigger.exit === "requestReset"}
                />

                <SignIn

                    trigger={trigger["signIn"]}

                    triggerExit={trigger.exit === "signIn"}

                    triggerReset={() => triggerProcess("requestReset")}

                />

            </div>

        </LandingLayout>

    )
}

export default Home;
interface Props {
    isMobile: boolean,
    deviceWidth: number
}

type triggerTypes = 'signIn' | 'requestReset' | 'resetPassword';

type triggerType = {
    signIn: number,
    requestReset: number,
    resetPassword: number,
    focusedEmail: string,
    oldPassword: string,
    phone: string,
    loginBody?: any,
    exit?: string
}
