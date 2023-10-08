import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import CloseIcon from "./Shared/ClosedIcon";
import BreakPoints from "../helpers/BreakPoints";

export interface IModalProps {
  open: boolean,
  title?: ReactNode,
  titleIcon?: ReactNode,
  children: ReactNode,
  onClose?: () => void,
  onOk?: () => void,
  okText?: string,
  onOkLoading?: boolean;
  cancelText?: string,
  footer?: ReactNode,
  onCancel?: () => void,
  hideCloseButton?: boolean,
  fullscreen?: boolean,
  bodyClass?: string,
  className?: string,
  strings?: {
    close: "بستن",
    cancel: "انصراف",
    submit: "تایید"
  },
  [key: string]: unknown
}

const Modal = ({
  open,
  title,
  titleIcon,
  children,
  onClose,
  bodyClass,
  hideCloseButton,
  className,
  onOk,
  okText,
  onOkLoading,
  cancelText,
  onCancel,
  footer,
  strings,
  fullscreen = false,
  ...props
}: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(open);
  const handleClose = () => {
    toggle(false);
    onClose?.();
  }
  useEffect(() => {
    if (isOpen !== open)
      toggle(open);
  }, [open])
  useEffect(() => {
    if (fullscreen) return;
    const onClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggle(false);
        onClose?.();
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [modalRef]);
  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-scroll-effect");
    else document.body.classList.remove("modal-scroll-effect");
  }, [isOpen])
  useEffect(() => {
    return () => document.body.classList.remove("modal-scroll-effect");
  }, [])
  return isOpen ? createPortal(<div className={`modal${fullscreen ? " fullscreen" : ""} ${className ?? ""}`} {...props}>
    <div
      className={`modal-body ${typeof window !== 'undefined' && window.innerWidth < BreakPoints.sm ? 'animate-slide-up' : ''} card-sm ${title ? "with-title" : ""} ${bodyClass ?? ""
        }`}
      ref={modalRef}
      {...(props.id ? { id: props.id + "-body" } : {})}
    >
      {!hideCloseButton && !title ? <Button className="btn-close" variant="square" onClick={handleClose} ariaLabel={strings?.close}>
        {<CloseIcon size={20} />}
      </Button> : null}
      {title ? <div className="modal-title">
        <div className="title">
          {titleIcon ? <span className="icon">{titleIcon}</span> : null}
          {title}
        </div>
        {!hideCloseButton ? <Button className="btn-close-title" variant="square" onClick={handleClose} ariaLabel={strings?.close}>
          {<CloseIcon size={20} />}
        </Button> : null}
      </div> : null}
      <div
        className="modal-content"
        {...(props.id ? { id: props.id + "-content" } : {})}
      >
        {children}
      </div>
      {footer || onOk || onCancel ? <div className="footer">
        {footer ? footer : <>
          {onCancel ? <Button onClick={onCancel} variant="secondary" ariaLabel={strings?.cancel} danger>{cancelText}</Button> : null}
          {onOk ? <Button onClick={onOk} variant="solid" ariaLabel={strings?.submit} loading={onOkLoading}>{okText}</Button> : null}
        </>}
      </div> : null}
    </div>
  </div >, document.body) : null;
};
export default Modal;
