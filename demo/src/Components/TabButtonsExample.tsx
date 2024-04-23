import { useState } from "react";
import { TabButtons } from "react-kod";
const TabButtonsExample = () => {
  const [activeKey, setActiveKey] = useState("1");
  return (
    <div className="tab" id="">
      <TabButtons
        activeKey={activeKey}
        onChange={setActiveKey}
        tabs={[
          {
            key: "1",
            text: "tab 1",
            disabled: false,
          },
          {
            key: "2",
            text: "tab 2",
            disabled: false,
          },
          {
            key: "3",
            text: "tab 3",
            disabled: true,
          },
        ]}
      />
    </div>
  );
};
export default TabButtonsExample;
