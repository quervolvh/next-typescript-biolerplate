import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { manualDismissal } from 'redux/actions/toastActions';
import { storeInterface, toastType } from 'types';
import { classnames } from 'utils/index';
import { Toast } from './Toast';

export const ToastHolder = () => {
    const dispatch = useDispatch();
    const storeToasts: toastType = useSelector((state: storeInterface) => state, shallowEqual).toast;
    const { toasts, toDismiss } = storeToasts;
    const onDismiss = (id: string) => dispatch(manualDismissal(id));

    return (
        <div className="toast-holder">
            {toasts.map((toast, index) => (
                <div
                    key={`toast-${index}`}
                    onClick={() => onDismiss(toast.id)}
                    className={
                        classnames(
                            'toast-item',
                            toast.new ? 'fadeIn' : toDismiss === toast.id ? 'dismiss' : ''
                        )
                    }
                >

                    <Toast toast={toast} onClick={() => manualDismissal(toast.id)} />

                </div>
            ))}
        </div>
    );

};
