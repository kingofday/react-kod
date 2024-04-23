import { useState } from "react";
import { Tab, Tabs } from "react-kod";
const TabsExample = () => {
  const [activeKey, setActiveKey] = useState("1");
  console.log("user", activeKey);
  return (
    <div id="">
      <Tabs variant="normal" activeTab={activeKey} onChange={setActiveKey}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Tab key={x.toString()} title={`tab ${x} with long title`}>
            <>Tab {x} content</>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
export default TabsExample;
