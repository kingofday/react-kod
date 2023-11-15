import React from "react";
import { Accordion, Panel } from "../../../src/components/Accordion";
import type { Meta, StoryObj } from "@storybook/react";
const meta: Meta<typeof Accordion> = {
  title: "/Accordion",
  component: Accordion,
};
export default meta;
type Story = StoryObj<typeof Accordion>;
export const Simple: Story = {
  render: ({...args}) => {
    return (
      <Accordion defaultOpen={0} {...args}>
        <Panel key={0} panelKey={0} header={<div>label</div>}>
          <div>content</div>
        </Panel>
        <Panel key={1} panelKey={1} header={<div>label</div>}>
          <div>content</div>
        </Panel>
        <Panel key={2} panelKey={2} header={<div>label</div>}>
          <div>content</div>
        </Panel>
      </Accordion>
    );
  },
};
