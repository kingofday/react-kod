import { CSSProperties } from "react";

export interface IProgressProps {
    style?: CSSProperties;
    value?: number;
    max?: number;
}
const Progress = ({
    value,
    max,
    style
}: IProgressProps) => {
    return <progress
        style={style}
        value={value}
        max={max}
    />;
}
export default Progress;