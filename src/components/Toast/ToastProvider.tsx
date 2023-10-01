import { useState, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from './ToastContext';
import { ExtendedToastProps, Toast, ToastProps } from './Toast';

// Create a random ID
function generateUEID() {
    let first = ((Math.random() * 46656) | 0);
    let second = ((Math.random() * 46656) | 0);
    return ('000' + first.toString(36)).slice(-3).toString() + ('000' + second.toString(36)).slice(-3).toString();
}
export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ExtendedToastProps[]>([]);
    const success = (props: ToastProps) =>
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), type: "success", ...props },
        ]);
    const error = (props: ToastProps) =>
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), type: "error", ...props },
        ]);
    const warning = (props: ToastProps) =>
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), type: "waring", ...props },
        ]);
    const info = (props: ToastProps) =>
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), type: "info", ...props },
        ]);
    const close = (id: string) =>
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );
    const contextValue = useMemo(() => ({ success, error, warning, info }), []);
    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            {toasts.length ? createPortal(
                <div className={`toasts-wrapper ${toasts.length?"d-flex":""}`}>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            id={toast.id}
                            type={toast.type}
                            title={toast.title}
                            onClose={(id) => { close(id); toast.onClose?.(id) }}
                            message={toast.message}
                            duration={toast.duration}
                            fixed={toast.fixed}
                        />
                    ))}
                </div>,
                document.body
            ) : null}
        </ToastContext.Provider>
    );
};