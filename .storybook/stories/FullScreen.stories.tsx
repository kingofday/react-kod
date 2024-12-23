import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FullScreen, {
  FullScreenRefrence,
} from "../../src/components/FullScreen";
import Button from "../../src/components/Button";
const meta: Meta<typeof FullScreen> = {
  title: "/FullScreen",
  component: FullScreen,
};
export default meta;
type Story = StoryObj<typeof FullScreen>;
export const DeafultFullScreen: Story = {
  render: () => {
    const fullScreenRef = useRef<FullScreenRefrence>(null);
    console.log(fullScreenRef);
    const handleToggleFullScreen = () => {
      if (fullScreenRef.current) fullScreenRef.current.handleToggle();
    };

    return (
      <>
        <Button onClick={handleToggleFullScreen}>Show</Button>
        <FullScreen ref={fullScreenRef}>Some content</FullScreen>
      </>
    );
  },
};
