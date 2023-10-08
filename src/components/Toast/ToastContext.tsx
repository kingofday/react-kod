import { createContext } from 'react';
import { IToastProps } from './Toast';
export interface ToastContextProps {
    success: (props: IToastProps) => void;
    error: (props: IToastProps) => void;
    warning: (props: IToastProps) => void;
    info: (props: IToastProps) => void;
}
export const ToastContext = createContext<ToastContextProps>({
    success: (props) => console.log(props),
    error: (props) =>  console.log(props),
    warning: (props) =>  console.log(props),
    info: (props) =>  console.log(props)
});