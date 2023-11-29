import { ReactElement, useEffect, useState, useRef, ChangeEvent, ReactNode, CSSProperties } from "react";
import Opt, { SelectOptionItemProps } from "../Shared/Option";
import ChevronDown from "../Shared/ChevronDown";
import ChevronUp from "../Shared/ChevronUp";
import Badge from "../Badge";
import Tag from "../Tag";
import useOnClickOutside from "../../helpers/useOnClickOutside";
import { createPortal } from "react-dom";
type Pos = "auto" | number;
interface SelectProps {
    name?: string;
    id?: string;
    values?: string[];
    disabled?: boolean;
    hasError?: boolean;
    errorMessage?: string;
    label?: string;
    defaultValues?: string[];
    className?: string;
    placeholder?: string;
    searchable?: boolean;
    allowClear?: boolean;
    searchText?: string;
    suffix?: ReactNode;
    popupTargetId?: string;
    children?: ReactElement<SelectOptionItemProps> | ReactElement<SelectOptionItemProps>[];
    onChange?: (values: string[]) => void;
    showOptionOrder?: boolean;
}
const MultiSelect = ({
    id,
    name,
    label,
    values,
    defaultValues,
    className,
    children,
    placeholder,
    searchable = false,
    searchText,
    suffix,
    onChange,
    showOptionOrder = true,
    popupTargetId,
    disabled = false
}: SelectProps) => {
    const [isOpen, toggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLUListElement | null>(null);
    const popupTarget = useRef<HTMLElement | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const options = useRef<SelectOptionItemProps[]>(children ? (Array.isArray(children) ? children?.map(x => x.props) : [children.props]) : []);
    const [popupStyle, setPopupStyle] = useState<CSSProperties | undefined>(undefined);
    const [searchedOptions, setSearchedOptions] = useState<SelectOptionItemProps[]>([]);
    const adjustPosition = () => {
        const inputRect = ref.current?.getBoundingClientRect();
        const popupRect = popupRef.current?.getBoundingClientRect();
        const parentRect = popupTarget.current?.getBoundingClientRect();
        if (!popupRect || !inputRect) return;
        const h = window.innerHeight;
        let left: Pos = "auto";
        let top: Pos = "auto";
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const inputOffsetTop = ref.current?.offsetTop ?? 0;
        const inputOffsetLeft = ref.current?.offsetLeft ?? 0;
        if (inputRect.top + popupRect.height > h) {
            top = ((popupTargetId && parentRect) ? inputOffsetTop : (inputRect.top + scrollTop)) - popupRect.height;
        }
        else {
            top = (popupTargetId && parentRect ? inputOffsetTop : (inputRect.top + scrollTop)) + inputRect.height;
        }
        console.log("left", inputRect.left, scrollLeft)
        left = (popupTargetId && parentRect ? inputOffsetLeft : (inputRect.left + scrollLeft));
        setPopupStyle(({ top, left,right:"auto", width: inputRect.width }));
    }
    const handleClose = () => {
        toggle(false);
    }
    const onSelect = (v: string) => {
        if (values?.includes(v)) {
            onChange?.(values?.filter(x => x !== v));
        }
        else {
            onChange?.([...values ?? [], v]);
        }
        if (searchable && searchRef.current?.value) {
            searchRef.current.value = "";
            setSearchedOptions(options.current);
        }
        toggle(false);
    }
    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length)
            setSearchedOptions(options.current.filter(x => x.value !== "" && ~(x.text ?? x.children as string).indexOf(value)));
        else setSearchedOptions(options.current);
    }
    const removeOption = (v: string) => {
        onChange?.(values?.filter(x => x !== v) ?? []);
    }
    const selectedOptions = searchedOptions.filter(x => typeof values !== 'undefined' ? values.includes(x.value.toString()) : defaultValues?.includes(x.value));
    useOnClickOutside([ref, popupRef], handleClose, isOpen);
    useEffect(() => {
        popupTarget.current = popupTargetId ? document.getElementById(popupTargetId) : document.body;
      }, [popupTargetId])
      useEffect(() => { setSearchedOptions(options.current) }, [children])
    useEffect(() => {
        if (isOpen) {
            adjustPosition();
        }
    }, [isOpen])
    return (
        <div className={`multiselect-control ${className ? ` ${className}` : ""}${isOpen ? " is-open" : ""}${disabled ? " disabled" : ""}`}>
            <div className="input-control">
                {label ? <label htmlFor={name}>{label}</label> : null}
                <div ref={ref} className={`input-wrapper`} onClick={disabled ? undefined : () => toggle(s => !s)}>
                    {placeholder}
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                    {isOpen && createPortal(<ul ref={popupRef} className="multiselect-options" style={popupStyle}>
                        {searchable ? <li className="search-wrapper">
                            <input ref={searchRef} type="text" onChange={onSearch} placeholder={searchText} />
                        </li> : null}
                        {searchedOptions?.map((x, idx) => (
                            <li key={x.value} className={`${values?.includes(x.value) ? "selected" : ""}`} onClick={() => onSelect(x.value)}>
                                <Opt
                                    key={idx}
                                    text={x.text}
                                    value={x.value}
                                >{x.children}</Opt>
                            </li>
                        ))}
                    </ul>, popupTarget.current ?? document.body)}
                </div>
                {suffix}
            </div>
            <div className="tags">
                {selectedOptions.map((opt, idx) => <Tag key={opt.value !== null ? opt.value : idx} closable onClose={() => removeOption(opt.value)}>
                    {showOptionOrder && <><Badge size="small" variant="primary">{idx + 1}</Badge>{" "}</>}{opt.text ?? opt.children}
                </Tag>)}
            </div>
            <input type="hidden" value={values?.join(',')} name={name} id={id} />
        </div >
    );
};

MultiSelect.Option = Opt;
export default MultiSelect;