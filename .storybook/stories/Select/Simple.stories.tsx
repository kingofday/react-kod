import React, { useState } from "react";
import { Select } from "../../../src/components/Inputs";
import type { Meta, StoryObj } from '@storybook/react';
const Option = Select.Option;
const meta: Meta<typeof Select> = {
    title: "/select",
    component: Select
};
export default meta;
type Story = StoryObj<typeof Select>;
export const Simple: Story = {
    render: () => {
        const [value, setValue] = useState("");
        return <Select
            value={value}
            placeholder={"please select"}
            onChange={setValue}
            disabled={false}
        >
            <Option key="opt1" value={"1"}>
                Opt 1
            </Option>
            <Option key="opt2" value={"2"}>
                Opt 2
            </Option>
        </Select>
    },
};      