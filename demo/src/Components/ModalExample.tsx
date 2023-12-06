import { useState } from "react";
import { MultiSelect, Modal, Checkbox } from "react-kod";
const Option = MultiSelect.Option;
const ModalExample = () => {
    const [open, toggle] = useState(false);
    const [value, setValue] = useState<string[]>([]);
    const [chb, setChb] = useState(false);
    const handleOpen = (e: any) => {
        e.stopPropagation();
        toggle(true);
    }
    return <div>
        <button onClick={handleOpen}>open</button>
        <Modal
            id="test"
            fullscreen
            open={open}
            onClose={() => toggle(false)}>
            <div style={{
                padding: 40,
                display: "flex",
                flexDirection: "column",
                gap: 40
            }}>
                <span>Some Modal</span>
                <Checkbox

                    name="chb"
                    onChange={(e) => setChb(e.target.checked)}
                    checked={chb}
                >Label of chb</Checkbox>
                <div>

                    <MultiSelect
                        values={value}
                        placeholder={"please select"}
                        onChange={setValue}
                        popupTargetId="test-content"
                        disabled={false}>
                        <Option key="opt1" value={"1"}>
                            Option 1 for test
                        </Option>
                        <Option key="opt2" value={"2"}>
                            Option 2  for test
                        </Option>
                        <Option key="opt3" value={"3"}>
                            Option 3  for test
                        </Option>
                    </MultiSelect>
                </div>
            </div>
        </Modal>
    </div>
}
export default ModalExample;