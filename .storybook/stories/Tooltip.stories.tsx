import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from "../../src/components/Tooltip"
const meta: Meta = {
    title: "/Tooltip"
};
export default meta;
export const Normal: StoryObj = {
    render: () => {
        return <div style={{direction:"rtl",margin:"10px",marginRight:"1580px"}}>
            <Tooltip title="titletitle title title title title title ">
            Show Tooltip
        </Tooltip>
        </div>
    },
};
export const WithoutTitle: StoryObj = {
    render: () => {
        return <Tooltip title="">
            Without Title
        </Tooltip>
    },
};