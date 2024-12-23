import React from "react";
import { TabButtons } from "../../src/components/Tab";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TabButtons> = {
  title: "/TabButtons",
  component: TabButtons,
};
export default meta;
type Story = StoryObj<typeof TabButtons>;
export const DefaultTab: Story = {
  render: () => {
    return (
      <TabButtons
        // onChange={(tab) => handleChangeTab(tab as PageObjects, "category")}
        // activeKey={tabState.objectTab ?? "symbol"}
        variant="ink-bar"
        key="category_tab_buttons"
        tabs={[
          {
            key: "symbol",
            text: "stocks",
          },
          {
            key: "fund",
            text: "fund",
          },
          {
            key: "fund2",
            text: "fund",
          },
          {
            key: "fund3",
            text: "fund2",
          },
          {
            key: "fund4",
            text: "fund4",
          },
          {
            key: "fund5",
            text: "fund5",
          },
          {
            key: "fund6",
            text: "fund6",
          },
          {
            key: "fund7",
            text: "fund7",
          },
        ]}
      />
    );
  },
};
export const BorderedTab: Story = {
  render: () => {
    return (
      <TabButtons
        // onChange={(tab) => handleChangeTab(tab as PageObjects, "category")}
        // activeKey={tabState.objectTab ?? "symbol"}
        variant="bordered"
        key="category_tab_buttons"
        tabs={[
          {
            key: "symbol",
            text: "stocks",
          },
          {
            key: "fund",
            text: "fund",
          },
          {
            key: "fund2",
            text: "fund",
          },
          {
            key: "fund3",
            text: "fund2",
          },
          {
            key: "fund4",
            text: "fund4",
          },
          {
            key: "fund5",
            text: "fund5",
          },
          {
            key: "fund6",
            text: "fund6",
          },
          {
            key: "fund7",
            text: "fund7",
          },
        ]}
      />
    );
  },
};