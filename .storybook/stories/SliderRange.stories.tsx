import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import SliderRange from "../../src/components/inputs/SliderRange"
const meta: Meta = {
    title: "/SliderRange"
};
export default meta;
export const Normal: StoryObj = {
    render: () => {
        return <SliderRange/>
    },
};
