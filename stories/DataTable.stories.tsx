import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable } from '../src/components/DataTable';
import { Column } from '../src/types';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DataTable Component

A flexible data table component with sorting, selection, and loading states.

## Features
- **Display tabular data** with customizable columns
- **Column sorting** (ascending/descending)
- **Row selection** (single/multiple)
- **Loading state** with spinner
- **Empty state** handling
- **Responsive design** with horizontal scroll
- **Dark mode support**

## Accessibility
- Proper table semantics
- Keyboard navigation
- Screen reader support
- ARIA labels and roles
        `,
      },
    },
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the table is in loading state',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Whether rows can be selected',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 45, status: 'inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 23, status: 'active' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', age: 52, status: 'inactive' },
];

const sampleProducts: Product[] = [
  { id: 'P001', name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
  { id: 'P002', name: 'Mouse', price: 29.99, category: 'Electronics', inStock: true },
  { id: 'P003', name: 'Keyboard', price: 89.99, category: 'Electronics', inStock: false },
  { id: 'P004', name: 'Monitor', price: 299.99, category: 'Electronics', inStock: true },
  { id: 'P005', name: 'Headphones', price: 149.99, category: 'Audio', inStock: true },
];

// Column definitions
const userColumns: Column<User>[] = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    sortable: true,
    render: (user) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        user.status === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {user.status}
      </span>
    )
  },
];

const productColumns: Column<Product>[] = [
  { key: 'id', title: 'Product ID', sortable: true },
  { key: 'name', title: 'Product Name', sortable: true },
  { 
    key: 'price', 
    title: 'Price', 
    sortable: true,
    render: (product) => `$${product.price.toFixed(2)}`
  },
  { key: 'category', title: 'Category', sortable: true },
  { 
    key: 'inStock', 
    title: 'In Stock', 
    sortable: true,
    render: (product) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        product.inStock 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {product.inStock ? 'Yes' : 'No'}
      </span>
    )
  },
];

// Interactive wrapper for controlled selection
const DataTableWrapper = <T extends { id: string | number }>(props: {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
}) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  
  return (
    <div className="space-y-4">
      <DataTable<T>
        data={props.data}
        columns={props.columns}
        loading={props.loading}
        selectable={props.selectable}
        onRowSelect={setSelectedRows}
      />
      {props.selectable && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-sm font-semibold mb-2">Selected Rows:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {selectedRows.length > 0 ? (
              selectedRows.map((row: T) => (
                <span key={row.id} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                  {(row as any).name || row.id}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No rows selected</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
  render: (args) => <DataTableWrapper<User> data={args.data} columns={args.columns} />,
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
  render: (args) => <DataTableWrapper<User> data={args.data} columns={args.columns} selectable={args.selectable} />,
};

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
  render: (args) => <DataTableWrapper<User> data={args.data} columns={args.columns} loading={args.loading} />,
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: false,
  },
  render: (args) => <DataTableWrapper<User> data={args.data} columns={args.columns} loading={args.loading} />,
};

export const Products: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    selectable: true,
  },
  render: (args) => <DataTableWrapper<Product> data={args.data} columns={args.columns} selectable={args.selectable} />,
};

export const WithoutSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: false,
  },
  render: (args) => <DataTableWrapper<User> data={args.data} columns={args.columns} selectable={args.selectable} />,
};

export const CustomRenderers: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Users Table with Status Badges</h3>
        <DataTable<User>
          data={sampleUsers}
          columns={userColumns}
          selectable={true}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Products Table with Price Formatting</h3>
        <DataTable<Product>
          data={sampleProducts}
          columns={productColumns}
          selectable={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of tables with custom cell renderers for status badges and price formatting.',
      },
    },
  },
};
