import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './index';

export default {
  title: 'Atoms/Button',
  argTypes: {
    children: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const SampleButton = Template.bind({});
SampleButton.args = {
  children: 'sample text',
};
