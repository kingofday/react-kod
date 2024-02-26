import { useRef, useEffect, useState, ChangeEvent } from "react";
import InputProps from "./Models";
interface SldierRangeProps extends InputProps {
    min?: number;
    max?: number;
    value?: [number, number];
    onChange?: (value: [number, number]) => void;
    debounceTime?: number,
    disabled?: boolean;
    rtl?: boolean;
    id?: string;
}
const SliderRange = ({
    min = 1,
    max = 100,
    value = [1, 100],
    onChange,
    debounceTime = 500,
    className,
    disabled,
    rtl,
    id
}: SldierRangeProps) => {
    const [value1, setValue1] = useState(value[0]);
    const [value2, setValue2] = useState(value[1]);
    const debounce = useRef<NodeJS.Timeout | null>(null)
    const handleChange = (e: ChangeEvent<HTMLInputElement>, firstInput: boolean) => {
        const newValue = e.target.value;
        if (firstInput)
            setValue1(parseFloat(newValue))
        else setValue2(parseFloat(newValue));

    }
    useEffect(() => {
        if (value1 === value[0] && value2 === value[1]) return;
        if (debounce.current)
            clearTimeout(debounce.current);
        debounce.current = setTimeout(() => {
            if (value1 < value2) onChange?.([value1, value2]);
            else onChange?.([value2, value1]);
        }, debounceTime);
    }, [value1, value2]);
    useEffect(() => {
        if (value1 !== value?.[0] || value2 !== value?.[1]) {
            setValue1(value?.[0])
            setValue2(value?.[1]);
        }
    }, [value])
    const width = Math.abs(value1 - value2) * 100 / Math.abs(max - min);
    const minMargin = Math.abs((value1 < value2 ? value1 : value2)-min) * 100 / Math.abs(max - min);
    //const maxMargin = Math.abs((value1 < value2 ? value2 : value1)-min) * 100 / Math.abs(max - min);
    return <div id={id} className={`range-group${disabled ? " disabled" : ""}${className ? ` ${className}` : ""}`}>
        <div className="multi-range">
            <span style={{width:`calc(100% - ${width}%)`}} className="track before-track"></span>
            <input disabled={disabled} className="range-input" onChange={(e) => handleChange(e, true)} value={value1} min={min} max={max} step="1" type="range" />
            <span style={{ [rtl ? "marginRight" : "marginLeft"]: `calc(${width>=100?0:minMargin}%)`, width: `calc(${width>100?100:width}%)` }} className="range-color"></span>
            <input disabled={disabled} className="range-input" onChange={(e) => handleChange(e, false)} value={value2} min={min} max={max} step="1" type="range" />
            <span style={{width:`calc(100% - ${width}%)`}} className="track after-track"></span>
        </div>
    </div>
}
export default SliderRange;