import Button from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
};

export default meta;

export const Primary = () => <Button label="Click Me" />;
export const Secondary = () => <Button label="Cancel" variant="secondary" />;
