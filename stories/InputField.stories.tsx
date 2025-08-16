import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputField } from '../src/components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# InputField Component

A flexible input component with validation states, multiple variants, and sizes.

## Features
- **Text input** with label, placeholder, helper text, error message
- **States**: disabled, invalid, loading
- **Variants**: filled, outlined, ghost
- **Sizes**: small, medium, large
- **Optional**: clear button, password toggle
- **Support for light & dark theme**

## Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual variant of the input field',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password'],
      description: 'Type of input field',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Whether the input has validation errors',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message displayed below the input',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for controlled inputs
const InputFieldWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone else.',
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    errorMessage: 'Please enter a valid email address.',
    invalid: true,
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You can\'t type here',
    value: 'Disabled value',
    disabled: true,
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Must be at least 8 characters long.',
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const Filled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'Filled variant',
    variant: 'filled',
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const Ghost: Story = {
  args: {
    label: 'Ghost Input',
    placeholder: 'Ghost variant',
    variant: 'ghost',
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
  render: (args) => <InputFieldWrapper {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <InputField
        label="Outlined (Default)"
        placeholder="Outlined variant"
        variant="outlined"
        value=""
        onChange={() => {}}
      />
      <InputField
        label="Filled"
        placeholder="Filled variant"
        variant="filled"
        value=""
        onChange={() => {}}
      />
      <InputField
        label="Ghost"
        placeholder="Ghost variant"
        variant="ghost"
        value=""
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three variants: outlined (default), filled, and ghost.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <InputField
        label="Small"
        placeholder="Small size"
        size="sm"
        value=""
        onChange={() => {}}
      />
      <InputField
        label="Medium (Default)"
        placeholder="Medium size"
        size="md"
        value=""
        onChange={() => {}}
      />
      <InputField
        label="Large"
        placeholder="Large size"
        size="lg"
        value=""
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three sizes: small, medium (default), and large.',
      },
    },
  },
};
