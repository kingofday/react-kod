import { useState } from "react";
import { Select } from "react-kod";
const Option = Select.Option;
const SelectExample = ()=>{
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    return <>
          <div className='row' dir='rtl'>
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

      </div>
      <div style={{ marginTop: 300, height: 500, overflow: "auto", position: "relative" }} id="test">
        <div style={{ marginTop: 150, marginBottom: 800 }}>
          <Select
            value={value2}
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
          </Select>

        </div>
      </div>
      <Select
            value={value3}
            placeholder={"please select2"}
            onChange={setValue3}
            disabled={false}>
            <Option key="opt1" value={"10"}>
              Opt 1
            </Option>
            <Option key="opt2" value={"20"}>
              Opt 2
            </Option>
          </Select>
    </>
}
export default SelectExample;