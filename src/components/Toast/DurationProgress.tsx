import { useEffect, useRef, useState } from 'react';

export const DurationProgress = ({
    id,
    onClose,
    fixed,
    duration
}: {
    id: string;
    onClose?: (id: string) => void;
    fixed?: boolean;
    duration: number
}) => {
    const [hideProgress, setHideProgress] = useState(duration);
    const t = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (fixed) return;
        if (hideProgress <= 0) {
            onClose?.(id)
            return;
        }
        t.current = setTimeout(() => {
            setHideProgress(x => x - 50);
        }, 50)
    }, [hideProgress])
    return <progress value={100 * hideProgress / duration} max="100" />
};