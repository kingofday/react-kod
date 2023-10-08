import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "@/src/components/Button";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: "/Form/Button/General",
  component: Button,
  args: {
    //👇 Now all Button stories will be primary.
    children: "Button"
  },
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Loading: Story = {
  render: () => <Button variant="solid" loading >Button</Button>,
};
export const Disabled: Story = {
  render: () => <Button variant="solid" disabled >Button</Button>,
};