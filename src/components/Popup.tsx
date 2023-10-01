import { MouseEvent, ReactNode, RefObject } from "react";
import Button from "./Button";
import Card from "./Card";
type Item = {
    onClick: (e: MouseEvent<HTMLLIElement>) => void;
    icon: ReactNode;
    title: string;
}
interface Props {
    items: Item[];
    style?: React.CSSProperties;
    popupRef?: RefObject<HTMLDivElement>;
    open: boolean;
}
const Popup = ({ items, style, popupRef, open, ...rest }: Props) => {
    return (
        <>
            {
                open ? (
                    <div id="pop-up" style={style} {...rest} ref={popupRef} >
                        <Card withShadow>
                            <ul>
                                {items.map((item, idx) => (
                                    <li onClick={item.onClick} key={idx}>
                                        {item.icon}
                                        <Button variant="link">{item.title}</Button>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div >
                ) : null}
        </>
    );
}

export default Popup;