import { Menu, SingleMenu } from "react-kod";
const SingleMenuExample = () => {
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
      <SingleMenu
        items={[
          {
            key: "item1",
            label: "item 1",
            color: "green",
            as:"a",
            href:"https://research.agah.com"

          },
          {
            key: "item2",
            label: "item 2",
            color: "green",
          },
        ]}
        anchor="Show"
        trigger="click"
        variant="vertical"
        openOnClick
      />
    </div>
  );
};
export default SingleMenuExample;
