import { CSSProperties } from "react";

interface ProgressProps {
    style?: CSSProperties;
    value?: number;
    max?: number;
}
const Progress = ({
    value,
    max,
    style
}: ProgressProps) => {
    return <progress
        style={style}
        value={value}
        max={max}
    />;
}
export default Progress;