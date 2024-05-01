import React, { useState } from "react";
import Checkbox from "../../../src/components/Inputs/Checkbox";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Checkbox& HTMLInputElement> = {
  title: "/Form/Checkbox",
  component: Checkbox,
  argTypes: {
    type:{
      name:"type",
      control: 'select', options: ["number" , "color" , "date" , "email" , "month" , "password" , "search" , "tel" , "text" , "url"] 
    }
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Simple: Story =  {
  render: (args) => {
      return <Checkbox {...args} />
  }}
Simple.args = {
  children:"input",
  disabled:true,
  defaultChecked:true
};
// export const Simple: Story = {
//   render: () => {
//       const [value, setValue] = useState("");
//       return <Select
//           value={value}
//           placeholder={"please select"}
//           onChange={setValue}
//           disabled={false}
//       >
//           <Option key="opt1" value={"1"}>
//               Opt 1
//           </Option>
//           <Option key="opt2" value={"2"}>
//               Opt 2
//           </Option>
//       </Select>
//   },
// };      