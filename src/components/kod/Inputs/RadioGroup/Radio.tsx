import { ChangeEvent, ReactNode } from "react";

export interface RadioItemProps {
    value: any;
    children?: ReactNode;
    title?: string;
}
export interface RadioProps extends RadioItemProps {
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any
}
const Radio = ({ name, checked, value, disabled, children, onChange, title }: RadioProps) => {
    return <label className={disabled?"disabled":""} title={title}>
        <input type="radio" disabled={disabled} checked={checked} value={value} name={name} onChange={onChange} />
        {children}
    </label>;
}
export default Radio