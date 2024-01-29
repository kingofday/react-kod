import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from "../../src/components/Tooltip"
const meta: Meta = {
    title: "/Tooltip"
};
export default meta;
export const Normal: StoryObj = {
    render: () => {
        return <Tooltip title="title">
            Show Tooltip
        </Tooltip>
    },
};
export const WithoutTitle: StoryObj = {
    render: () => {
        return <Tooltip title="">
            Without Title
        </Tooltip>
    },
};