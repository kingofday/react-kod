import React, { useState, memo } from "react";
import { Modal, MultiSelect } from "react-kod";
const Option = MultiSelect.Option;
const Example = ({ columns, filters, setFilters }: { columns: string[], filters: string[], setFilters: (v: string[]) => void }) => {
    const [value, setValue] = useState<string[]>([]);
    const [open, toggle] = useState(false);
    const openModal = (e: any) => {
        e.stopPropagation();
        toggle(true);
    }
    const handleChange = (v: string[]) => {
        setValue(v);
        setFilters(v);
    }
    return <div>
        <span onClick={openModal}>open</span>
        <Modal open={open} id="multi">
            <div style={{ height: 600 }}>
                {columns.map((c, idx) => {
                    switch (c) {
                        case "multi-select":
                            return <React.Fragment key={idx}>
                                <MultiSelect
                                    values={value}
                                    placeholder={"please select"}
                                    onChange={handleChange}
                                    searchable
                                    disabled={false}
                                    showOptionOrder={false}
                                    popupTargetId="multi-content">
                                    <Option key="opt1" value={"1"}>
                                        Opt 1
                                    </Option>
                                    <Option key="opt2" value={"2"}>
                                        Opt 2
                                    </Option>
                                </MultiSelect>
                            </React.Fragment>
                        default:
                            return <></>
                    }

                })}

            </div>
        </Modal>
    </div>
}
export default memo(Example);