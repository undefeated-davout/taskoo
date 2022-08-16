import { ComponentMeta, ComponentStory } from '@storybook/react';

import BaseButton from './index';

export default {
  title: 'Atoms/BaseButton',
  argTypes: {
    children: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => (
  <BaseButton {...args} />
);

export const SampleButton = Template.bind({});
SampleButton.args = {
  children: 'sample text',
};
