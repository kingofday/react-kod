import { ChangeEvent, ReactNode } from "react";
import InputProps from "../Shared/Models/Input";
interface CheckboxProps extends InputProps {
    checked?: boolean;
    defaultChecked?: boolean;
    children?: ReactNode;
    className?: string;
    value?: string | number | readonly string[] | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any
}
const Checkbox = ({ id, name, className, value, onChange, defaultChecked, children, disabled = false, checked = false, ...props }: CheckboxProps) => {
    return <label className={`checkbox-control${disabled ? " disabled" : ""}${className ? " " + className : ""}`}>
        {children}
        <input value={value} name={name} defaultChecked={defaultChecked} onChange={disabled ? undefined : onChange} disabled={disabled} type="checkbox" id={id} checked={checked} {...props} />
        <span className="indicator"></span>
    </label>;
}
export default Checkbox;