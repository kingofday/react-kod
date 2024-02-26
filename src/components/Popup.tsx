import { MouseEvent, ReactNode, RefObject } from "react";
import Button from "./Button";
import Card from "./Card";
import { BasicElementProps } from "../helpers/Models";
type Item = {
    onClick: (e: MouseEvent) => void;
    icon: ReactNode;
    title: string;
    id?: string;
    className?: string
}
interface IPopup extends BasicElementProps {
    items: Item[];
    style?: React.CSSProperties;
    popupRef?: RefObject<HTMLDivElement>;
    open: boolean;

}
const Popup = ({ id, className, ariaLabel, items, style, popupRef, open, ...rest }: IPopup) => {
    return (
        <>
            {
                open ? (
                    <div id={id} className={`pop-up ${className}`} style={style} {...rest} ref={popupRef} aria-label={ariaLabel}>
                        <Card withShadow>
                            {items.map((item, idx) => (
                                <Button
                                    onClick={item.onClick}
                                    key={idx}
                                    variant="link"
                                    icon={item.icon}
                                    id={item.id}
                                    className={item.className}
                                >{item.title}</Button>
                            ))}
                        </Card>
                    </div >
                ) : null}
        </>
    );
}

export default Popup;