import type { Meta, StoryObj } from "@storybook/react";
import MultiSelect from "../../../src/components/Inputs/MultiSelect";
import { useState } from "react";
import React from "react";

const meta: Meta<typeof MultiSelect> = {
  title: "MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    searchable: { control: "boolean" },
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

const options = [
  { value: "a", text: "اطلاعات و ارتباطات" },
  { value: "b", text: "فلزات اساسی" },
  { value: "c", text: "کاشی و سرامیک" },
  { value: "d", text: "هتل و رستوران" },
  { value: "e", text: "مخابرات" },
];

const Template = (args: any) => {
  const [selected, setSelected] = useState<string[]>(args.values ?? []);

  return (
    <MultiSelect {...args} values={selected} onChange={setSelected}>
      {options.map((opt) => (
        <MultiSelect.Option key={opt.value} value={opt.value} text={opt.text}>
          {opt.text}
        </MultiSelect.Option>
      ))}
    </MultiSelect>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: "industry",
    placeholder: "صنعت",
    values: [],
  },
};

export const WithDefaultValues: Story = {
  render: Template,
  args: {
    label: "industry",
    placeholder: "صنعت",
    values: ["اطلاعات و ارتباطات", "فلزات اساسی"],
  },
};

export const Searchable: Story = {
  render: Template,
  args: {
    label: "Search industry",
    placeholder: "Type to search...",
    searchable: true,
    searchText: "Search...",
    values: [],
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: "Disabled Select",
    placeholder: "You can't select this",
    disabled: true,
    values: [],
  },
};

export const EmptyState: Story = {
  render: (args) => (
    <MultiSelect {...args} values={[]} onChange={() => {}}>
      {/* No children passed to simulate empty */}
    </MultiSelect>
  ),
  args: {
    label: "Empty Example",
    placeholder: "No options available",
    emptyLabel: "Nothing here",
    searchable: true,
  },
};
