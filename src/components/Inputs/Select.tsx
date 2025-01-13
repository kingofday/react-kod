import {
  InputHTMLAttributes,
  ReactElement,
  useEffect,
  useState,
  useRef,
  ReactNode,
  ChangeEvent,
  CSSProperties,
} from "react";
import Opt, { SelectOptionItemProps } from "../Shared/Option";
import ChevronDown from "../Shared/ChevronDown";
import CloseIcon from "../Shared/ClosedIcon";
import useOnClickOutside from "../../helpers/useOnClickOutside";
import { createPortal } from "react-dom";
import Empty from "../Shared/Empty";
type Pos = "auto" | number;
interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: ReactNode;
  defaultValue?: any;
  className?: string;
  listClassName?: string;
  placeholder?: string;
  emptyLabel?: string;
  emptyComponent?: ReactNode;
  searchable?: boolean;
  allowClear?: boolean;
  searchText?: string;
  popupTargetId?: string;
  children?:
    | ReactElement<SelectOptionItemProps>
    | ReactElement<SelectOptionItemProps>[];
  onChange?: (value: string) => void;
  optionsWrapperProps?: {
    [key: string]: any;
  };
  [key: string]: any;
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
  popupTargetId,
  emptyLabel,
  emptyComponent,
  disabled = false,
  optionsWrapperProps,
  ...rest
}: SelectProps) => {
  const [isOpen, toggle] = useState(false);
  const popupRef = useRef<HTMLUListElement | null>(null);
  const popupTarget = useRef<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [popupStyle, setPopupStyle] = useState<CSSProperties | undefined>(
    undefined
  );
  const options = children
    ? Array.isArray(children)
      ? children?.map((x) => x.props)
      : [children.props]
    : [];
  const selectedOption = options.find((x) =>
    typeof value !== "undefined" ? x.value === value : x.value === defaultValue
  );
  const [searchedOptions, setSearchedOptions] =
    useState<SelectOptionItemProps[]>(options);
  const clear = (e: any) => {
    e.stopPropagation();
    toggle(false);
    onChange?.("");
    setSearchedOptions([]);
  };
  const adjustPosition = () => {
    const inputRect = ref.current?.getBoundingClientRect();
    const popupRect = popupRef.current?.getBoundingClientRect();
    const parentRect = popupTarget.current?.getBoundingClientRect();
    if (!popupRect || !inputRect) return;
    const h = window.innerHeight;
    let left: Pos = "auto";
    let top: Pos = "auto";
    //TODO:Add rtl provider
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const inputOffsetTop = ref.current?.offsetTop ?? 0;
    const inputOffsetLeft = ref.current?.offsetLeft ?? 0;
    const offsetHeight =
      popupTargetId && popupTarget.current
        ? popupTarget.current.offsetHeight - popupTarget.current.clientHeight
        : 0;
    const offsetWidth =
      popupTargetId && popupTarget.current
        ? popupTarget.current.offsetWidth - popupTarget.current.clientWidth
        : 0;

    if (inputRect.top + popupRect.height > h) {
      top =
        (popupTargetId && parentRect
          ? inputOffsetTop
          : inputRect.top + scrollTop) -
        popupRect.height -
        offsetHeight;
    } else {
      top =
        (popupTargetId && parentRect
          ? inputOffsetTop
          : inputRect.top + scrollTop) +
        inputRect.height -
        offsetHeight;
    }
    left =
      (popupTargetId && parentRect
        ? inputOffsetLeft
        : inputRect.left + scrollLeft) - offsetWidth;
    setPopupStyle({ top, left, right: "auto", width: inputRect.width });
  };
  const handleClose = () => {
    toggle(false);
  };
  const onSelect = (v: string) => {
    onChange?.(v);
    toggle(false);
  };
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length)
      setSearchedOptions(
        options.filter(
          (x) =>
            x.value !== "" && ~(x.text ?? (x.children as string)).indexOf(value)
        )
      );
    else setSearchedOptions(options);
  };

  useOnClickOutside([ref, popupRef], handleClose);

  useEffect(() => {
    popupTarget.current = popupTargetId
      ? document.getElementById(popupTargetId)
      : document.body;
  }, [popupTargetId]);
  useEffect(() => {
    setSearchedOptions(
      children
        ? Array.isArray(children)
          ? children?.map((x) => x.props)
          : [children.props]
        : []
    );
  }, [children]);
  useEffect(() => {
    if (isOpen) {
      adjustPosition();
      searchRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);
  return (
    <div
      ref={ref}
      className={`select-control${
        allowClear && selectedOption ? " clearable" : ""
      }${className ? ` ${className}` : ""}${isOpen ? " is-open" : ""}${
        disabled ? " disabled" : ""
      }`}
      {...rest}
    >
      {label ? <label htmlFor={name}>{label}</label> : null}
      <div
        className={`input-wrapper `}
        onClick={disabled ? undefined : () => toggle((s) => !s)}
      >
        {selectedOption?.text ??
          selectedOption?.children ??
          (placeholder ? (
            <span className="placeholder">{placeholder}</span>
          ) : null) ?? <span>&nbsp;</span>}
        <ChevronDown className="indicator" />
        {allowClear && selectedOption && (
          <CloseIcon
            className="clear-icon"
            onClick={disabled ? undefined : (e: any) => clear(e)}
          />
        )}
      </div>
      {isOpen &&
        createPortal(
          <ul
            ref={popupRef}
            className={`select-options${
              listClassName ? ` ${listClassName}` : ""
            }`}
            style={popupStyle}
            {...optionsWrapperProps}
          >
            {searchable ? (
              <li className="search-wrapper">
                <input
                  ref={searchRef}
                  type="text"
                  onChange={onSearch}
                  placeholder={searchText}
                />
              </li>
            ) : null}
            {searchedOptions.length > 0 ? (
              searchedOptions?.map(
                ({ value:optValue, disabled, text, children, ...optRest }, idx) => (
                  <li
                    key={optValue}
                    className={`${disabled ? "disabled" : ""}${
                      optValue === value ? " selected" : ""
                    }`}
                    onClick={() => (disabled ? undefined : onSelect(optValue))}
                    {...optRest}
                  >
                    <Opt
                      key={idx}
                      text={text}
                      value={optValue}
                      disabled={disabled}
                    >
                      {children}
                    </Opt>
                  </li>
                )
              )
            ) : emptyComponent ? (
              emptyComponent
            ) : (
              <Empty label={emptyLabel} />
            )}
          </ul>,
          popupTarget.current ?? document.body
        )}
      <input type="hidden" value={value} name={name} id={id} />
    </div>
  );
};
Select.Option = Opt;
export default Select;
