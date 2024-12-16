import { Menu } from "react-kod";
const MenuExample = () => {
  const items = [
    {
      key: "1",
      label: "منو 1",
      children: [
        {
          key: "11",
          label: "منوی 11",
          href: "https://research.agah.com",
        },
        {
          key: "12",
          label: "منوی 12",
          href: "https://research.agah.com/fund/screener",
        },
      ],
    },
    {
      key: "2",
      label: "منو 2",
      href: "https://research.agah.com/tools/market/map",
    },
    {
      key: "3",
      label: "منو 3",
      children: [
        {
          key: "31",
          label: "منوی 31",
        },
        {
          key: "32",
          label: "منوی 32",
        },
      ],
    },
  ];
  return (
    <div>
      {/* <Menu2
        items={items}
      />
      <br/>
      <Menu2
        items={items}
        trigger="click"
      />
      <br/> */}
      <Menu
        items={items}
        trigger="click"
        variant="vertical"
      />
    </div>
  );
};
export default MenuExample;
