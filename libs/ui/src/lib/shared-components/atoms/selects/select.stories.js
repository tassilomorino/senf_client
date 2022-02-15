import { Select } from "./select";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atoms/Forms/Select",
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
const Template = (args) => <Select {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  placeholder: "Gender",
  options: [{ value: "Male" }, { value: "Female" }, { value: "Diverse" }],
  argTypes: { onChange: { action: "clicked" } },
};
