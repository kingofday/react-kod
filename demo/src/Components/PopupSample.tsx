
import { useState } from "react";
import { Popup, Spinner } from "react-kod";
const PopupExample = () => {
    const [open, toggle] = useState(false)
    return <div className='' id=''>
        <span onClick={() => toggle(true)}>Pop up</span>
        <Popup open={open} items={[
            { icon: "$", title: "menu1", onClick: () => { console.log("menu1") } },
            { icon: "#", title: "menu2", onClick: () => { console.log("menu2") } },
        ]} />
    </div>;
}
export default PopupExample;