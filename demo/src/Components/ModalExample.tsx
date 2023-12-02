import { useState } from "react";
import { Select, Modal } from "react-kod";
const Option = Select.Option;
const ModalExample = () => {
    const [open, toggle] = useState(false);
    const [value, setValue] = useState("");
    const handleOpen = (e: any) => {
        e.stopPropagation();
        toggle(true);
    }
    return <div>
        <button onClick={handleOpen}>open</button>
        <Modal
            open={open}
            onClose={() => toggle(false)}>
            <span>Some Modal</span>
            <Select
                value={value}
                placeholder={"please select"}
                onChange={setValue}
                disabled={false}>
                <Option key="opt1" value={"1"}>
                    Opt 1
                </Option>
                <Option key="opt2" value={"2"}>
                    Opt 2
                </Option>
            </Select>
        </Modal>
    </div>
}
export default ModalExample;