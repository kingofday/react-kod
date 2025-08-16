import { useState } from "react";
import { Tab, Tabs } from "react-kod";
const TabsExample = () => {
  const [activeKey, setActiveKey] = useState("1");
  return (
    <div id="">
      <h2>Normal Tabs</h2>
      <Tabs mobileVariant="bordered-pill" variant="normal" activeTab={activeKey} onChange={setActiveKey}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Tab tabKey={x.toString()} title={`tab ${x} with long title`}>
            <>Tab {x} content</>
          </Tab>
        ))}
      </Tabs>
        <h2>Pill Tabs</h2>
      <Tabs variant="pill" activeTab={activeKey} onChange={setActiveKey}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Tab tabKey={x.toString()} title={`tab ${x} with long title`}>
            <>Tab {x} content</>
          </Tab>
        ))}
      </Tabs>
      <h2>Bordered-Pill Tabs</h2>
      <Tabs variant="bordered-pill" activeTab={activeKey} onChange={setActiveKey}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Tab tabKey={x.toString()} title={`tab ${x} with long title`}>
            <>Tab {x} content</>
          </Tab>
        ))}
      </Tabs>
      <h2>Secondary Tabs</h2>
      <Tabs variant="secondary" activeTab={activeKey} onChange={setActiveKey}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Tab tabKey={x.toString()} title={`tab ${x} with long title`}>
            <>Tab {x} content</>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
export default TabsExample;
