interface Props {
    id?: string;
    label?: string;
    onChange: (checked: boolean) => void;
    checked: boolean;
    description?: string;
    disabled?: boolean;
}
const Switch = ({ id, label, onChange, checked, disabled, description }: Props) => {
    const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.checked);
    };
    const labelId = `label-${id}`;
    const descriptionId = `description-${id}`;
    const labelBy = labelId + ' ' + descriptionId;

    return (
        <label htmlFor={id} className={`switch ${disabled ? " disabled" : ""}`}>
            <input
                id={id}
                type="checkbox"
                role="switch"
                checked={checked}
                onChange={onSwitchChange}
                aria-checked={checked}
                aria-labelledby={labelBy}
                disabled={disabled}
            />
            <div className="switch-labels">
                <span id={id ? labelId : " "}>{label}</span>
                {description &&
                    <p id={descriptionId}>{description}</p>
                }
            </div>
        </label>
    );
}

export default Switch;