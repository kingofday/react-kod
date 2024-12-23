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
export const DefaultModal: Story = {
  render: () => {
    const [isFullScreen, toggleFullScreen] = useState(false);
    const fullScreenRef = useRef<FullScreenRefrence>(null);
    const handleToggleFullScreen = () => {
      if (fullScreenRef.current) fullScreenRef.current.handleToggle();
    };
    const handleFullScreen = (e: any) => {
      e.stopPropagation();
      toggleFullScreen(true);
    };
    return (
      <>
        <Button onClick={handleFullScreen}>Show</Button>
        <FullScreen ref={fullScreenRef}>Some content</FullScreen>
      </>
    );
  },
};
