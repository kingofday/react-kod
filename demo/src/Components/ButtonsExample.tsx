import { Button, Spinner } from "react-kod";
const ButtonsExample = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <h1>Button Types</h1>
      <Button variant="solid">Solid</Button>
      <Button variant="link">link</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link-gray">link-gray</Button>
      <Button variant="gray">Gray</Button>
      <Button variant="circle">C</Button>
      <Button variant="square">S</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="secondary-circle">S C</Button>
      <Button variant="secondary-square">S S</Button>
    </div>
  );
};
export default ButtonsExample;
