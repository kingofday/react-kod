import { useEffect, useState } from "react";
import { Modal, MultiSelect } from "react-kod";
import Example from "./Example";
const Option = MultiSelect.Option;
const MultiSelectExample = () => {
    const columns = ["multi-select"];
    const [t, setT] = useState("");
    const [value, setValue] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const handleChange = (v: string[]) => {
        console.log("values", v);
        setValue(v);
        setFilters(v);
    }
    useEffect(() => {
        setTimeout(() => { setT("t") }, 9000)
    }, [])
    return <div>
        <Example columns={columns} filters={filters} setFilters={(v) => setFilters(v)} />
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
            <Option key="opt3" value={"3"}>
                Opt 3
            </Option>
            <Option key="opt4" value={"4"}>
                Opt 4
            </Option>
        </MultiSelect>
    </div>
}
export default MultiSelectExample;