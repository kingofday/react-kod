import { createContext } from 'react';
import { ToastProps } from './Toast';
interface ToastContextProps {
    success: (props: ToastProps) => void;
    error: (props: ToastProps) => void;
    warning: (props: ToastProps) => void;
    info: (props: ToastProps) => void;
}
export const ToastContext = createContext<ToastContextProps>({
    success: (props) => { },
    error: (props) => { },
    warning: (props) => { },
    info: (props) => { },
});