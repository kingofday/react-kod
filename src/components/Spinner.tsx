export type SpinnerType = "circle" | "dot";
interface ISpinner {
    className?: string;
    type?: SpinnerType,
    size?: "small" | "medium" | "large"| "extra-larg";
    [key: string]: any;
}
const Spinner = ({
    type = "circle",
    className,
    size = "medium",
    ...rest
}: ISpinner) => {
    return (
        <span className={`spinner ${type}-spinner ${size}`} {...rest}></span>
    );
};
export default Spinner;
