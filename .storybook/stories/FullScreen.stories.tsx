import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FullScreen from "../../src/components/FullScreen";
import Button from "../../src/components/Button";
const meta: Meta<typeof FullScreen> = {
  title: "/FullScreen",
  component: FullScreen,
};
export default meta;
type Story = StoryObj<typeof FullScreen>;
export const DeafultFullScreen: Story = {
  render: () => {
    const [isFullScreen, setToggle] = useState(false);

    const handleToggleFullScreen = () => {
      setToggle((prev) => !prev);
    };

    return (
      <>
        <FullScreen isFullScreen={isFullScreen}>
          {isFullScreen ? (
            <Button
              size="small"
              id="min-full-screen"
              variant="gray"
              onClick={handleToggleFullScreen}
              ariaLabel="minimize"
            >
              min
              {/* <MinimizeIcon size={18} /> */}
            </Button>
          ) : (
            <Button
              size="small"
              id="max-full-screen"
              variant="gray"
              onClick={handleToggleFullScreen}
              ariaLabel="maximize"
            >
              max
              {/* <MaximizeIcon size={18} /> */}
            </Button>
          )}
          ome content
        </FullScreen>
      </>
    );
  },
};
