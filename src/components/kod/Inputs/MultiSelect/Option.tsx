
import { ReactNode } from "react";
import Check from "../../Shared/Check";

export interface SelectOptionItemProps {
    text?: string;
    children?: ReactNode;
    disabled?: boolean;
    value: string,
    [key: string]: any
}
const Option = ({ disabled, value, children, text, ...rest }: SelectOptionItemProps): JSX.Element => {
    return <div className="option-content" {...rest}>
        {children ?? text}
        <Check />
    </div>;
}
export default Option