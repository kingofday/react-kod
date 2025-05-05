import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Menu, { MenuItem } from "../../src/components/Menu";

const meta: Meta<typeof Menu> = {
  title: "Menu",
  component: Menu,
  tags: ["menu"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    trigger: {
      control: "radio",
      options: ["hover", "click"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const sampleItems: MenuItem[] = [
  {
    key: "stock",
    label: "Stock",
    // href: "/stock",
    children: [
      { key: "screener", label: "screener" },
      { key: "market-overview", label: "Market Overview" },
    ],
  },
  {
    key: "fund",
    label: "Fund",
    // href: "/fund",
  },
  {
    key: "tools",
    label: "Tools",
    // href: "/tools",
  },
  {
    key: "news",
    label: "News",
    // href: "/news",
    disabled: true,
  },
];

export const HorizontalMenu: Story = {
  args: {
    sampleItems,
    variant: "horizontal",
    defaultSelectedKeys: ["stock"],
    trigger: "click",
    //   link: Link,
  },
};

export const Default: Story = {
  args: {
    items: sampleItems,
    variant: "horizontal",
    trigger: "hover",
  },
};

export const VerticalClickTrigger: Story = {
  args: {
    items: sampleItems,
    variant: "vertical",
    trigger: "click",
  },
};
