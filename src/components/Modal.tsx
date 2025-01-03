import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import CloseIcon from "./Shared/ClosedIcon";
import BreakPoints from "../helpers/BreakPoints";
import useOnClickOutside from "../helpers/useOnClickOutside";
import MaximizeIcon from "./Shared/maximizeIcon";
import MinimizeIcon from "./Shared/minimizeIcon";
import Container from "./Container";

export interface IModalProps {
  open: boolean;
  title?: ReactNode;
  titleIcon?: ReactNode;
  children: ReactNode;
  onClose?: () => void;
  onOk?: () => void;
  okText?: string;
  onOkLoading?: boolean;
  cancelText?: string;
  footer?: ReactNode;
  onCancel?: () => void;
  hideCloseButton?: boolean;
  fullscreen?: boolean;
  fullScreenIcon?: boolean;
  bodyClass?: string;
  className?: string;
  strings?: {
    close: "بستن";
    cancel: "انصراف";
    submit: "تایید";
  };
  [key: string]: unknown;
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
  fullScreenIcon = false,
  ...props
}: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(open);
  const [isFullScreen, toggleFullScreen] = useState(false);
  const handleClose = () => {
    toggle(false);
    toggleFullScreen(false);
    onClose?.();
  };
  useEffect(() => {
    if (isOpen !== open) toggle(open);
  }, [open]);
  useOnClickOutside(modalRef, handleClose);
  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-scroll-effect");
    else document.body.classList.remove("modal-scroll-effect");
  }, [isOpen]);
  useEffect(() => {
    return () => document.body.classList.remove("modal-scroll-effect");
  }, []);
  return isOpen ? (
    createPortal(
      <div
        className={`modal${
          fullscreen || (fullScreenIcon && isFullScreen) ? " fullscreen" : ""
        } ${className ?? ""}`}
        {...props}
      >
        <div
          className={`modal-body  ${
            typeof window !== "undefined" && window.innerWidth < BreakPoints.sm
              ? "enter-animation-mobile"
              : ""
          } card-sm ${title ? "with-title" : ""} ${bodyClass ?? ""}`}
          ref={modalRef}
          {...(props.id ? { id: props.id + "-body" } : {})}
        >
          {!hideCloseButton && !title ? (
            <div className="modal-operation">
              <Button
                className="btn-close"
                variant="square"
                onClick={handleClose}
                ariaLabel={strings?.close}
              >
                {<CloseIcon size={20} />}
              </Button>
              {fullScreenIcon ? (
                <Button
                  className="btn-fullScreen-title"
                  variant="square"
                  onClick={() => toggleFullScreen(!isFullScreen)}
                >
                  {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
                </Button>
              ) : null}
            </div>
          ) : null}
          {title ? (
            <div className="modal-title">
              <Container>
                <div className="title">
                  {titleIcon ? <span className="icon">{titleIcon}</span> : null}
                  {title}
                </div>
                {!hideCloseButton ? (
                  <div className="modal-operation-title">
                    {fullScreenIcon ? (
                      <Button
                        className="btn-fullScreen-title"
                        variant="square"
                        onClick={() => toggleFullScreen(!isFullScreen)}
                      >
                        {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
                      </Button>
                    ) : null}
                    <Button
                      className="btn-close-title"
                      variant="square"
                      onClick={handleClose}
                      ariaLabel={strings?.close}
                    >
                      {<CloseIcon size={20} />}
                    </Button>
                  </div>
                ) : null}
              </Container>
            </div>
          ) : null}
          <div
            className="modal-content"
            {...(props.id ? { id: props.id + "-content" } : {})}
          >
            {children}
          </div>
          {footer || onOk || onCancel ? (
            <div className="footer">
              <Container>
                {footer ? (
                  footer
                ) : (
                  <>
                    {onCancel ? (
                      <Button
                        onClick={onCancel}
                        variant="secondary"
                        ariaLabel={strings?.cancel}
                        danger
                      >
                        {cancelText}
                      </Button>
                    ) : null}
                    {onOk ? (
                      <Button
                        onClick={onOk}
                        variant="solid"
                        ariaLabel={strings?.submit}
                        loading={onOkLoading}
                      >
                        {okText}
                      </Button>
                    ) : null}
                  </>
                )}
              </Container>
            </div>
          ) : null}
        </div>
      </div>,
      document.body
    )
  ) : (
    <></>
  );
};
export default Modal;
