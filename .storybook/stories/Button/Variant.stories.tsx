import React from "react";
import Button from "../../../src/components/Button";
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: "/Form/Button/Variant",
  component: Button,
  args: {
    //👇 Now all Button stories will be primary.
    children: "Button"
  },
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Solid: Story = {
  render: () => <Button variant="solid" >Button</Button>,
};
export const Secondary: Story = {
  render: () => <Button variant="secondary" >Button</Button>,
};
export const SecondarySquare: Story = {
  render: () => <Button variant="secondary-square" >B</Button>,
};
export const SecondaryCricle: Story = {
  render: () => <Button variant="secondary-circle" >B</Button>,
};
export const Gray: Story = {
  render: () => <Button variant="gray" >Button</Button>,
};
export const Link: Story = {
  render: () => <Button variant="link" >Button</Button>,
};
export const Ghost: Story = {
  render: () => <Button variant="ghost" >Button</Button>,
};
export const Tab: Story = {
  render: () => <Button variant="tab" >Button</Button>,
};