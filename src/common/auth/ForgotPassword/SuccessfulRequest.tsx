import React, { useEffect, useState } from 'react';
import { Button } from 'components';
import { useDispatch } from 'react-redux';
import MailBoxIcon from 'assets/svg/mail-box.svg';
import { forgotPassword } from 'redux/actions';

export const RequestResetSuccess: React.FC<Props> = ({ userDetails, contextTitles }) => {

    const dispatch = useDispatch();

    type state_ = { value: number, count: boolean, loading?: boolean };

    const [resendIn, setToResend] = useState<state_>({ value: 20, count: true, loading: false });

    const requestResetPassword: () => void = async () => {

        setToResend((prevState) => ({ ...prevState, loading: true }))

        await dispatch(forgotPassword({ ...userDetails }));

        setToResend({ value: 20, count: true });

    };

    useEffect(() => {

        if (resendIn.count) {
            setTimeout(() => {
                if (resendIn.value === 0) {
                    setToResend({ count: false, value: 20 });
                } else {
                    setToResend(prevState => ({ ...prevState, value: prevState.value - 1 }));
                }
            }, 1000);
        }

        // eslint-disable-next-line
    }, [resendIn.value, resendIn.count]);


    return (
        <>

            <div className="successful-payment">

                <img src={MailBoxIcon} alt={"Successful Password Reset"} />

                <h1 className="mt-5 mb-3"> {contextTitles?.title || "Check your mailbox"} </h1>

                <p className="mt-1 mb-5">
                    {contextTitles?.subtitle || "We have sent you a reset password link to this email address."}
                </p>

                {
                    (resendIn.count && !resendIn.loading ) ?

                        <span >
                            <span> {contextTitles?.resendText || "Didn't get verification email ? Resend in"} </span>
                            <span className="color-faux-blue"> {resendIn.value} </span>
                        </span>

                        :

                        <Button
                            label={resendIn.loading ? "Please wait" : (contextTitles?.buttonButtonText || "Resend email verification")}
                            className="transparent"
                            color="color-faux-blue"
                            onClick={() => requestResetPassword()}
                        />
                }

            </div>

        </>
    );
}

interface Props {
    toggle(): void,
    userDetails: { [key: string]: any },
    contextTitles?: {
        title?: string,
        subtitle?: string,
        resendText?: string,
        buttonButtonText?: string
    }
}
