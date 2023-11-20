import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from "../../src/components/Toast"
import Button from "../../src/components/Button"
const meta: Meta = {
    title: "/Toast"
};
export default meta;
export const Error: StoryObj = {
    render: () => {
        const { error } = useToast();
        return <ToastProvider>
            <Button onClick={() => error({
                title: "error",
                showIcon: true,
                message: "error message"
            })}>Show</Button>
        </ToastProvider>
    },
};