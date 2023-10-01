import { InputHTMLAttributes, ReactElement, useEffect, useState, useRef, ReactNode, ChangeEvent } from "react";
import Opt, { SelectOptionItemProps } from "@/src/components/Shared/Option";
import ChevronDown from "@/src/components/Shared/ChevronDown";
import CloseIcon from "@/src/components/Shared/ClosedIcon";
import { createPortal } from "react-dom";
import useIntersectionObserver from "@/src/helpers/useIntersectionObserver";

interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: ReactNode;
    defaultValue?: any;
    className?: string;
    listClassName?: string;
    placeholder?: string;
    searchable?: boolean;
    allowClear?: boolean;
    searchText?: string;
    children?: ReactElement<SelectOptionItemProps> | ReactElement<SelectOptionItemProps>[];
    onChange?: (value: string) => void;
}
const Select = ({
    id,
    name,
    label,
    value,
    defaultValue,
    className,
    listClassName,
    children,
    placeholder,
    onChange,
    allowClear = false,
    searchable = false,
    searchText,
    disabled = false
}: SelectProps) => {
    const [isOpen, toggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPorition] = useState({
        left: 0,
        top: 0,
        width: 0
    })
    const searchRef = useRef<HTMLInputElement>(null);
    const options = children ? (Array.isArray(children) ? children?.map(x => x.props) : [children.props]) : [];
    const selectedOption = options.find(x => typeof value !== 'undefined' ? (x.value === value) : (x.value === defaultValue));
    const [searchedOptions, setSearchedOptions] = useState<SelectOptionItemProps[]>(options);
    const clear = (e: any) => {
        e.stopPropagation()
        toggle(false);
        onChange?.("");
        setSearchedOptions([]);
    }
    const onSelect = (v: string) => {
        onChange?.(v);
        toggle(false);
    }
    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length)
            setSearchedOptions(options.filter(x => x.value !== "" && ~(x.text ?? x.children as string).indexOf(value)));
        else setSearchedOptions(options);
    }
    const setOptionsPosition = () => {
        let rect = ref.current?.getBoundingClientRect();
        if (rect)
            setPorition({ left: rect.left, top: rect.top + rect.height, width: rect.width })
    }
    useEffect(() => {
        if (isOpen) {
            if (searchable)
                searchRef.current?.focus();
            setOptionsPosition();
        }
    }, [isOpen]);
    useEffect(() => {
        setSearchedOptions(children ? (Array.isArray(children) ? children?.map(x => x.props) : [children.props]) : []);
    }, [children])
    useEffect(() => {
        const onOutsideClick = function (e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                toggle(false);
            }
        };
        document.addEventListener("scroll", setOptionsPosition);
        document.addEventListener("click", onOutsideClick);
        return () => {
            document.removeEventListener("scroll", setOptionsPosition);
            document.removeEventListener("click", onOutsideClick);
        }
    }, []);

    const { ref: wrapperRef } = useIntersectionObserver({
        options: {
            root: null,
            rootMargin: "-200px 0px 0px 0px",
            threshold: 0.1,
        },
        callback: (entry) => {
            if (!entry.isIntersecting) {
                toggle(false)
            }
        },
    });
    return (
        <div ref={ref} className={`select-control${allowClear && selectedOption ? " clearable" : ""} ${className ?? ""}${isOpen ? " is-open" : ""}${disabled ? " disabled" : ""}`}>
            {label ? <label htmlFor={name}>{label}</label> : null}
            <div ref={wrapperRef} className={`input-wrapper `} onClick={disabled ? undefined : () => toggle(s => !s)}>
                {selectedOption?.text ?? selectedOption?.children ?? (placeholder ? <span className="placeholder">{placeholder}</span> : null) ?? <span>&nbsp;</span>}
                <ChevronDown className="indicator" />
                {allowClear && selectedOption && <CloseIcon className="clear-icon" onClick={disabled ? undefined : (e: any) => clear(e)} />}
            </div>
            {isOpen && createPortal(<ul className={`select-options ${listClassName ?? ""}`} style={position}>
                {searchable ? <li className="search-wrapper">
                    <input ref={searchRef} type="text" onChange={onSearch} placeholder={searchText} />
                </li> : null}
                {searchedOptions?.map((x, idx) => (
                    <li key={x.value} className={`${x.disabled ? "disabled" : ""}${x.value === value ? " selected" : ""}`} onClick={() => x.disabled ? undefined : onSelect(x.value)}>
                        <Opt
                            key={idx}
                            text={x.text}
                            value={x.value}
                            disabled={x.disabled}
                        >{x.children}</Opt>
                    </li>
                ))}
            </ul>, document.body)}
            <input type="hidden" value={value} name={name} id={id} />
        </div >
    );
};

export default Select;
export const Option = Opt;
