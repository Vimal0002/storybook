import React, { useState, useEffect } from 'react';
import { InputField } from './components/InputField';
import { DataTable } from './components/DataTable';
import { Column } from './types';

// Enhanced data types with more realistic data
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
  department: string;
  joinDate: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
  sales: number;
}

interface Order {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tableLoading, setTableLoading] = useState(true);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

  // Enhanced column definitions with better rendering
  const userColumns: Column<User>[] = [
    { key: 'id', title: 'ID', sortable: true },
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'age', title: 'Age', sortable: true },
    { key: 'department', title: 'Department', sortable: true },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (user) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.status === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {user.status}
        </span>
      ),
    },
    { key: 'joinDate', title: 'Join Date', sortable: true },
  ];

  const productColumns: Column<Product>[] = [
    { key: 'id', title: 'Product ID', sortable: true },
    { key: 'name', title: 'Product Name', sortable: true },
    {
      key: 'price',
      title: 'Price',
      sortable: true,
      render: (product) => (
        <span className="font-medium text-green-600 dark:text-green-400">
          ${product.price.toFixed(2)}
        </span>
      )
    },
    { key: 'category', title: 'Category', sortable: true },
    {
      key: 'rating',
      title: 'Rating',
      sortable: true,
      render: (product) => (
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{product.rating.toFixed(1)}</span>
        </div>
      )
    },
    {
      key: 'inStock',
      title: 'Stock',
      sortable: true,
      render: (product) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          product.inStock
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      ),
    },
    {
      key: 'sales',
      title: 'Sales',
      sortable: true,
      render: (product) => (
        <span className="font-medium text-blue-600 dark:text-blue-400">
          {product.sales.toLocaleString()}
        </span>
      )
    },
  ];

  const orderColumns: Column<Order>[] = [
    { key: 'id', title: 'Order ID', sortable: true },
    { key: 'customerName', title: 'Customer', sortable: true },
    { key: 'product', title: 'Product', sortable: true },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      render: (order) => (
        <span className="font-medium text-green-600 dark:text-green-400">
          ${order.amount.toFixed(2)}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (order) => {
        const statusColors = {
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
          processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
          delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
            {order.status}
          </span>
        );
      },
    },
    { key: 'date', title: 'Order Date', sortable: true },
  ];

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Simulate data fetching with more realistic data
  useEffect(() => {
    setTableLoading(true);
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, status: 'active', department: 'Engineering', joinDate: '2023-01-15' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, status: 'active', department: 'Marketing', joinDate: '2022-08-22' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 45, status: 'inactive', department: 'Sales', joinDate: '2021-03-10' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 23, status: 'active', department: 'Design', joinDate: '2023-06-05' },
        { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', age: 52, status: 'inactive', department: 'Engineering', joinDate: '2020-11-18' },
        { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', age: 29, status: 'active', department: 'Product', joinDate: '2023-02-28' },
        { id: 7, name: 'George Wilson', email: 'george@example.com', age: 38, status: 'active', department: 'Sales', joinDate: '2022-05-12' },
      ]);

      setProducts([
        { id: 'P001', name: 'MacBook Pro 16"', price: 2499.99, category: 'Electronics', inStock: true, rating: 4.8, sales: 1250 },
        { id: 'P002', name: 'Wireless Mouse', price: 29.99, category: 'Electronics', inStock: true, rating: 4.2, sales: 3200 },
        { id: 'P003', name: 'Mechanical Keyboard', price: 89.99, category: 'Electronics', inStock: false, rating: 4.5, sales: 1800 },
        { id: 'P004', name: '4K Monitor', price: 299.99, category: 'Electronics', inStock: true, rating: 4.6, sales: 950 },
        { id: 'P005', name: 'Noise Cancelling Headphones', price: 149.99, category: 'Audio', inStock: true, rating: 4.7, sales: 2100 },
        { id: 'P006', name: 'Smart Watch', price: 199.99, category: 'Wearables', inStock: true, rating: 4.3, sales: 2800 },
        { id: 'P007', name: 'Bluetooth Speaker', price: 79.99, category: 'Audio', inStock: false, rating: 4.1, sales: 1500 },
      ]);

      setOrders([
        { id: 'ORD001', customerName: 'John Doe', product: 'MacBook Pro 16"', amount: 2499.99, status: 'delivered', date: '2024-01-15' },
        { id: 'ORD002', customerName: 'Jane Smith', product: 'Wireless Mouse', amount: 29.99, status: 'shipped', date: '2024-01-16' },
        { id: 'ORD003', customerName: 'Mike Johnson', product: '4K Monitor', amount: 299.99, status: 'processing', date: '2024-01-17' },
        { id: 'ORD004', customerName: 'Sarah Wilson', product: 'Smart Watch', amount: 199.99, status: 'pending', date: '2024-01-18' },
        { id: 'ORD005', customerName: 'David Brown', product: 'Noise Cancelling Headphones', amount: 149.99, status: 'delivered', date: '2024-01-19' },
        { id: 'ORD006', customerName: 'Lisa Davis', product: 'Mechanical Keyboard', amount: 89.99, status: 'shipped', date: '2024-01-20' },
      ]);

      setTableLoading(false);
    }, 2000);
  }, []);

  // Enhanced validation for input fields
  const handleInputBlur = () => {
    if (inputValue.length > 0 && inputValue.length < 3) {
      setErrorMessage('Input must be at least 3 characters long.');
    } else {
      setErrorMessage('');
    }
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                React Components Showcase
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.584 6.746a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM16.416 6.746l1.59-1.59a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06ZM20.25 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H19.5a.75.75 0 0 1 .75.75ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM16.416 17.254a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0-1.06-1.06ZM7.584 17.254l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 0 0-1.06-1.06ZM12 15.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9.52 2.822a.75.75 0 0 1 .494.695v.737c0 .546.402.993.948 1.054a7.5 7.5 0 0 0 5.992 7.643.75.75 0 0 1 .374 1.408l-.946.545a.75.75 0 0 1-1.06-.341 5.972 5.972 0 0 0-4.733-6.096.75.75 0 0 1-.618-.894 8.274 8.274 0 0 1-.227-1.559.75.75 0 0 1 .531-.844ZM21.782 17.58a.75.75 0 0 1-.002 1.321l-1.554.717a.75.75 0 0 1-.618-.342 6.74 6.74 0 0 1-2.924-4.225.75.75 0 0 1 .715-.99l.8-.103c.356-.046.721.21.844.54ZM3 11.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Modern React Components
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive showcase of reusable InputField and DataTable components built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* InputField Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              InputField Component
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Default Input"
                placeholder="Enter at least 3 characters"
                helperText="This is a helper text for guidance."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleInputBlur}
                errorMessage={errorMessage}
                invalid={!!errorMessage}
              />
              <InputField
                label="Email Input"
                placeholder="Enter your email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                helperText="We'll never share your email."
              />
              <InputField
                label="Password Input"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="Minimum 8 characters required."
              />
              <InputField
                label="Filled Variant"
                placeholder="Filled input style"
                variant="filled"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputField
                label="Ghost Variant (Small)"
                placeholder="Ghost input style"
                variant="ghost"
                size="sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputField
                label="Disabled Input"
                placeholder="You can't type here"
                disabled
                value="Disabled value"
                onChange={() => {}}
              />
            </div>
          </div>
        </section>

        {/* DataTable Section */}
        <section className="space-y-8">
          {/* Users Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Users Management
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedUsers.length} of {users.length} selected
              </div>
            </div>
            <DataTable
              data={users}
              columns={userColumns}
              loading={tableLoading}
              selectable
              onRowSelect={setSelectedUsers}
            />
            {selectedUsers.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Selected Users:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <span key={user.id} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                      {user.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Product Catalog
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProducts.length} of {products.length} selected
              </div>
            </div>
            <DataTable
              data={products}
              columns={productColumns}
              loading={tableLoading}
              selectable
              onRowSelect={setSelectedProducts}
            />
            {selectedProducts.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Selected Products:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProducts.map((product) => (
                    <span key={product.id} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                      {product.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Orders Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Management
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedOrders.length} of {orders.length} selected
              </div>
            </div>
            <DataTable
              data={orders}
              columns={orderColumns}
              loading={tableLoading}
              selectable
              onRowSelect={setSelectedOrders}
            />
            {selectedOrders.length > 0 && (
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">Selected Orders:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedOrders.map((order) => (
                    <span key={order.id} className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                      {order.id} - {order.customerName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
