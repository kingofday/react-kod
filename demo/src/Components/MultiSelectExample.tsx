import { useState } from "react";
import { MultiSelect } from "react-kod";
const Option = MultiSelect.Option;
const MultiSelectExample = () => {
    const [value, setValue] = useState<string[]>([]);
    const [value2, setValue2] = useState<string[]>([]);
    const [value3, setValue3] = useState<string[]>([]);
    return <>
        <div className='row' dir='rtl'>
            <MultiSelect
                values={value}
                placeholder={"please select"}
                onChange={setValue}
                disabled={false}>
                <Option key="opt1" value={"1"}>
                    Opt 1
                </Option>
                <Option key="opt2" value={"2"}>
                    Opt 2
                </Option>
            </MultiSelect>

        </div>
        <div style={{ marginTop: 300, height: 500, overflow: "auto", position: "relative" }} id="test">
            <div style={{ marginTop: 150, marginBottom: 800 }}>
                <MultiSelect
                    values={value2}
                    placeholder={"please select2"}
                    onChange={setValue2}
                    popupTargetId='test'
                    disabled={false}>
                    <Option key="opt1" value={"10"}>
                        Opt 1
                    </Option>
                    <Option key="opt2" value={"20"}>
                        Opt 2
                    </Option>
                </MultiSelect>

            </div>
        </div>
        <MultiSelect
            values={value3}
            placeholder={"please select2"}
            onChange={setValue3}
            disabled={false}>
            <Option key="opt1" value={"10"}>
                Opt 1
            </Option>
            <Option key="opt2" value={"20"}>
                Opt 2
            </Option>
        </MultiSelect>
    </>
}
export default MultiSelectExample;