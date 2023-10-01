import { ReactNode, useEffect, useRef, useState } from 'react';
import CloseIcon from "../Shared/ClosedIcon";
export interface ToastProps {
    title?: ReactNode;
    message?: ReactNode;
    duration?: number;
    showIcon?: boolean;
    fixed?: boolean;
    onClose?: (id: string) => void;
};
export interface ExtendedToastProps extends ToastProps {
    id: string;
    type: "success" | "error" | "waring" | "info";
}
const toastIcon = (type: "success" | "error" | "waring" | "info") => {
    switch (type) {
        case "success":
            return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.58V12.5C21.9988 14.6564 21.3005 16.7547 20.0093 18.4818C18.7182 20.209 16.9033 21.4725 14.8354 22.0839C12.7674 22.6953 10.5573 22.6219 8.53447 21.8746C6.51168 21.1273 4.78465 19.7461 3.61096 17.9371C2.43727 16.128 1.87979 13.9881 2.02168 11.8363C2.16356 9.68457 2.99721 7.63633 4.39828 5.99707C5.79935 4.35782 7.69279 3.21538 9.79619 2.74015C11.8996 2.26491 14.1003 2.48234 16.07 3.36" stroke="#00A97F" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 4.5L12 14.51L9 11.51" stroke="#00A97F" strokeLinecap="round" strokeLinejoin="round" />
            </svg>;
        case "error":
            return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="#F7525F" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 9.5L9 15.5" stroke="#F7525F" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 9.5L15 15.5" stroke="#F7525F" strokeLinecap="round" strokeLinejoin="round" />
            </svg>;
        case "info":
            return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="#448AFF" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16.5V12.5" stroke="#448AFF" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8.5H12.01" stroke="#448AFF" strokeLinecap="round" strokeLinejoin="round" />
            </svg>;
        case "waring":
            return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2908 4.36001L1.82075 18.5C1.64612 18.8024 1.55372 19.1453 1.55274 19.4945C1.55176 19.8437 1.64224 20.1871 1.81518 20.4905C1.98812 20.7939 2.23748 21.0468 2.53846 21.2239C2.83944 21.401 3.18155 21.4962 3.53075 21.5H20.4708C20.82 21.4962 21.1621 21.401 21.463 21.2239C21.764 21.0468 22.0134 20.7939 22.1863 20.4905C22.3593 20.1871 22.4497 19.8437 22.4488 19.4945C22.4478 19.1453 22.3554 18.8024 22.1808 18.5L13.7108 4.36001C13.5325 4.06611 13.2815 3.82313 12.9819 3.65449C12.6824 3.48585 12.3445 3.39726 12.0008 3.39726C11.657 3.39726 11.3191 3.48585 11.0196 3.65449C10.72 3.82313 10.469 4.06611 10.2908 4.36001V4.36001Z" stroke="#FF9800" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 9.5V13.5" stroke="#FF9800" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17.5H12.01" stroke="#FF9800" strokeLinecap="round" strokeLinejoin="round" />
            </svg>;
        default:
            return null;
    }
}
export const Toast = ({ id, title, message, type, fixed = false, showIcon = true, duration = 30000, onClose }: ExtendedToastProps) => {
    const [hideProgress, setHideProgress] = useState(duration);
    const t = useRef<NodeJS.Timeout | null>(null);
    const handleClose = () => {
        onClose?.(id);
    }
    useEffect(() => {
        if (fixed) return;
        if (hideProgress <= 0) {
            onClose?.(id)
            return;
        }
        t.current = setTimeout(() => {
            setHideProgress(x => x - 250);
        }, 250)
    }, [hideProgress])
    return <div className={`toast ${type}`}>
        {showIcon && <span className='icon'>
            {toastIcon(type)}
        </span>}
        <div className='toast-content'>
            <div className="title">
                {title ?? <span></span>}
                <a className="btn-close" role="button" onClick={handleClose}><CloseIcon /></a>
            </div>
            <div className="message">{message ?? <span></span>}</div>
        </div>
        <progress value={100 * hideProgress / duration} max="100" />
    </div>
};