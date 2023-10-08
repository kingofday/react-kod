import { InputHTMLAttributes, ChangeEvent, ReactElement, ReactNode } from "react";
import RadioOption, { RadioItemProps, RadioProps } from "./Radio";
interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    value?: any;
    disabled?: boolean;
    defaultValue?: any;
    className?: string;
    children?: ReactElement<RadioItemProps> | ReactElement<RadioItemProps>[];
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
const RadioGroup = ({
    value,
    name,
    defaultValue,
    className,
    children,
    onChange,
    disabled,
    ...rest
}: RadioGroupProps) => {
    let options: {
        label: ReactNode;
        value: string;
    }[] = [];
    if (children) {
        if (Array.isArray(children))
            options = (children as ReactElement<RadioItemProps>[]).map(c => ({
                label: c.props.children ?? c.props.title,
                value: c.props.value
            }));
        else {
            let opt = (children as ReactElement<RadioItemProps>);
            options.push({
                label: opt.props.children ?? opt.props.title,
                value: opt.props.value
            });
        }
    }
    return (
        <div className={`radio-control ${className ?? ""}`} {...rest}>
            {options.map((x) => (
                <RadioOption disabled={disabled} name={name} value={x.value} onChange={onChange} checked={x.value === value} key={x.value}>{x.label}</RadioOption>
            ))}
        </div>
    );
};

export default RadioGroup;
export const Radio: (props: RadioProps) => JSX.Element = RadioOption;