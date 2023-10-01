import { useContext } from 'react';
import { ToastContext, ToastContextProps } from './ToastContext';

export const useToast: () => ToastContextProps = () => useContext(ToastContext);