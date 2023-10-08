import { ReactNode, forwardRef, ForwardRefExoticComponent, useState, FocusEvent,FocusEventHandler } from "react";
type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    type?: "color" | "date" | "text" | "email" | "number" | "month" | "search" | "tel" | "url" | "password";
    preFix?: ReactNode;
    suffix?: ReactNode;
    label?: string;
    hasError?: boolean;
    required?: boolean;
    errorMessage?: string;
    layout?: "inline" | "block";
    onFocus?:FocusEventHandler<HTMLInputElement>;
    onBlur?:FocusEventHandler<HTMLInputElement>;
    [key: string]: any
}
const Input: ForwardRefExoticComponent<TextInputProps> = forwardRef<HTMLInputElement, TextInputProps>(({
    id,
    name,
    label,
    value,
    defaultValue,
    disabled,
    suffix,
    placeholder,
    preFix,
    errorMessage,
    required,
    hasError,
    onClick,
    onChange,
    className,
    onFocus,
    onBlur,
    layout = "block",
    type = "text",
    ...rest
}, ref) => {
    const [focused, toggleFocus] = useState(false);
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        toggleFocus(true);
        onFocus?.(e);
    }
    const handleBlure = (e: FocusEvent<HTMLInputElement>) => {
        toggleFocus(false);
        onBlur?.(e);
    }
    return <div className={`form-control ${className ? className : ''}${hasError ? " error" : ""}${disabled ? " disabled" : ""}`} onClick={onClick}>
        {label ? <label htmlFor={name}>{label} {required ? <span className="red">*</span> : null}</label> : null}
        <div className={`input-wrapper${focused ? " focused" : ""}${preFix ? " with-prefix" : ""} ${suffix ? " with-suffix" : ""}`}>
            {preFix ? <div className="prefix">{preFix}</div> : null}
            <input
                ref={ref}
                required={required}
                onFocus={handleFocus}
                onBlur={handleBlure}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                type={type}
                defaultValue={defaultValue}
                value={value}
                id={id}
                disabled={disabled}
                {...rest}
                 />
            {suffix ? <div className="suffix">{suffix}</div> : null}
        </div>
        {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </div>
});
export default Input;