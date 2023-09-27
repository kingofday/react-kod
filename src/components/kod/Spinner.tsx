enum sizes {
    small = 8,
    medium = 12,
    large = 24
}
interface Props {
    className?: string;
    type?: "co" | "circle" | "dot";
    size?: number | "small" | "medium" | "large";
    [key: string]: any;
}
const Spinner = ({
    type = "circle",
    className,
    size = "medium",
    ...rest
}: Props) => {
    if (type == "co") return <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        enableBackground="new 0 0 30 30"
        xmlSpace="preserve"
        style={{ width: typeof size === "string" ? sizes[size]: size, height: size }}
        {...rest}
    >
        <g>
            <path
                d="m14.92 15.01 3.29 8.35a8.77 8.77 0 0 0 5.73-8.35h-9.02z"
                style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    fill: "#005687",
                }}
            />
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 15 15"
                to="360 15 15"
                dur="1.4s"
                repeatCount="indefinite"
            />
        </g>
        <g>
            <path
                d="M14.93 0C6.67.01-.01 6.74 0 15.02S6.71 30.01 14.97 30c1.91 0 3.81-.37 5.58-1.09-.74-1.68-1.53-3.53-2.34-5.54-4.61 1.78-9.79-.53-11.56-5.16s.53-9.82 5.14-11.6 9.79.53 11.56 5.16c.39 1.03.6 2.13.6 3.23H30C29.97 6.69 23.23-.03 14.95 0h-.02z"
                style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    fill: "#000",
                }}
            />
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 15 15"
                to="-360 15 15"
                dur="1.4s"
                repeatCount="indefinite"
            />
        </g>
    </svg>
    return (
        <span className={`spinner ${type}-spinner ${size}`}></span>

    );
};
export default Spinner;
