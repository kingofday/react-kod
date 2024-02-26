
import { useState } from "react";
import { SliderRange, Spinner } from "react-kod";
const SliderRangeExample = () => {
    const [value, setValue] = useState<[number, number]>([1, 100])
    return <div style={{ width: 250, marginLeft: "auto", marginRight: "auto" }}>
        <SliderRange rtl={true} value={value} onChange={setValue} />
        <br/>
        <span>{JSON.stringify(value)}</span>
    </div>;
}
export default SliderRangeExample;