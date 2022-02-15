import { Input } from "./input";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/Forms/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = { placeholder: "Email", type: "email" };
