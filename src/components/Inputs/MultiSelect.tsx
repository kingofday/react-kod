import { ReactElement, useEffect, useState, useRef, ChangeEvent, ReactNode } from "react";
import Opt, { SelectOptionItemProps } from "../Shared/Option";
import ChevronDown from "../Shared/ChevronDown";
import ChevronUp from "../Shared/ChevronUp";
import Badge from "../Badge";
import Tag from "../Tag";
import useIntersectionObserver from "@/src/helpers/useIntersectionObserver";
import useOnClickOutside from "@/src/helpers/useOnClickOutside";
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
    children?: ReactElement<SelectOptionItemProps> | ReactElement<SelectOptionItemProps>[];
    onChange?: (values: string[]) => void;
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
    disabled = false
}: SelectProps) => {
    const [isOpen, toggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const options = useRef<SelectOptionItemProps[]>(children ? (Array.isArray(children) ? children?.map(x => x.props) : [children.props]) : []);
    const [searchedOptions, setSearchedOptions] = useState<SelectOptionItemProps[]>([]);
    const [positionOptions, setPositionOptions] = useState(true)

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
   
   
   
    useOnClickOutside(ref, handleClose, isOpen);
    const { ref: wrapperOptionsRef } = useIntersectionObserver({
      options: {
        root: null,
        rootMargin: "0px",
        threshold: .1,
      },
      callback(entry) {
          if(!isOpen) return; 
          if(entry.intersectionRatio === 0) {
            toggle(false)
          }
        if (!entry.isIntersecting) {
          setPositionOptions((prev) => !prev);
        }
      },
    });
   
    useEffect(() => {
        options.current = children ? (Array.isArray(children) ? children?.map(x => x.props) : [children.props]) : [];
        setSearchedOptions(options.current);
    }, [children])
    return (
        <div className={`multiselect-control ${className ? ` ${className}` : ""}${isOpen ? " is-open" : ""}${disabled ? " disabled" : ""}`}>
            <div className="input-control">
                {label ? <label htmlFor={name}>{label}</label> : null}
                <div ref={ref} className={`input-wrapper`} onClick={disabled ? undefined : () => toggle(s => !s)}>
                    {placeholder}
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                    <ul ref={wrapperOptionsRef} className={`options  ${positionOptions? "openDown": "openUp"}`}>
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
                    </ul>
                </div>
                {suffix}
            </div>
            <div className="tags">
                {selectedOptions.map((opt, idx) => <Tag key={opt.value !== null ? opt.value : idx} closable onClose={() => removeOption(opt.value)}>
                    <Badge size="small" variant="primary">{idx + 1}</Badge>{opt.text ?? opt.children}
                </Tag>)}
            </div>
            <input type="hidden" value={values?.join(',')} name={name} id={id} />
        </div >
    );
};

export default MultiSelect;
export const Option = Opt;