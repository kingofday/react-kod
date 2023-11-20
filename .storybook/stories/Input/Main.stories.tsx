import React from "react";
import Input from "../../../src/components/Inputs/Input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input& HTMLInputElement> = {
  title: "/Form/Input",
  component: Input,
  argTypes: {
    type:{
      name:"type",
      control: 'select', options: ["number" , "color" , "date" , "email" , "month" , "password" , "search" , "tel" , "text" , "url"] 
    }
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Simple: Story = (args) => <Input {...args} />;
Simple.args = {
  label:"input",
  defaultValue:"",
  placeholder:"type",
  type:"text",
  hasError:false,
  errorMessage:"",
  disabled:false,
  suffix:<div>&</div>,
  preFix:<div>$</div>,
};
