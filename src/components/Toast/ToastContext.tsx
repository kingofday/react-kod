import { createContext } from 'react';
import { ToastProps } from './Toast';
export interface ToastContextProps {
    success: (props: ToastProps) => void;
    error: (props: ToastProps) => void;
    warning: (props: ToastProps) => void;
    info: (props: ToastProps) => void;
}
export const ToastContext = createContext<ToastContextProps>({
    success: (props) => console.log(props),
    error: (props) =>  console.log(props),
    warning: (props) =>  console.log(props),
    info: (props) =>  console.log(props)
});