# React Components Showcase

A comprehensive showcase of modern, reusable React components built with TypeScript and Tailwind CSS. This project demonstrates best practices in component development with a focus on accessibility, performance, and user experience.

## 🚀 Features

### Enhanced UI/UX
- **Modern Design**: Clean, professional interface with attention to detail
- **Dark Mode Support**: Seamless light/dark theme switching with smooth transitions
- **Responsive Layout**: Optimized for all screen sizes and devices
- **Accessibility**: ARIA labels, keyboard navigation, and focus management
- **Smooth Animations**: Subtle transitions and hover effects for better user feedback

### InputField Component
- **Multiple Variants**: Outlined, filled, and ghost input styles
- **Size Options**: Small, medium, and large input sizes
- **Validation States**: Error handling with visual feedback
- **Password Toggle**: Show/hide password functionality
- **Clear Button**: Easy input clearing for better UX
- **Helper Text**: Contextual guidance and error messages
- **Focus Management**: Enhanced focus states with ring effects

### DataTable Component
- **Sortable Columns**: Click to sort data in ascending/descending order
- **Row Selection**: Single and bulk row selection with checkboxes
- **Loading States**: Beautiful loading animations with skeleton screens
- **Empty States**: Helpful messages when no data is available
- **Status Badges**: Color-coded status indicators for different data types
- **Responsive Design**: Horizontal scrolling for mobile devices
- **Summary Footer**: Row count and selection information

### Data Management
- **Multiple Data Types**: Users, Products, and Orders with realistic sample data
- **Enhanced Columns**: Rich rendering with custom components
- **Real-time Updates**: Dynamic data loading and state management
- **Selection Tracking**: Visual feedback for selected items

## 🛠️ Technology Stack

- **React 18**: Latest React features and hooks
- **TypeScript**: Type-safe development with interfaces and generics
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Webpack**: Module bundling and development server
- **Storybook**: Component documentation and testing

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:8080`

## 🎨 Component Usage

### InputField Component

```tsx
import { InputField } from './components/InputField';

// Basic usage
<InputField
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="We'll never share your email"
/>

// With validation
<InputField
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  errorMessage={passwordError}
  invalid={!!passwordError}
/>

// Different variants
<InputField
  label="Ghost Input"
  variant="ghost"
  size="sm"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### DataTable Component

```tsx
import { DataTable } from './components/DataTable';

// Define your data type
interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

// Define columns with custom rendering
const columns: Column<User>[] = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: 'Name', sortable: true },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    render: (user) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        user.status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {user.status}
      </span>
    ),
  },
];

// Use the component
<DataTable
  data={users}
  columns={columns}
  loading={isLoading}
  selectable
  onRowSelect={setSelectedUsers}
/>
```

## 🎯 Key Features

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference
- Smooth transitions between modes
- Optimized color schemes for both themes

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive table scrolling
- Touch-friendly interactions

### Performance
- Memoized components for optimal rendering
- Efficient sorting algorithms
- Lazy loading of data
- Optimized re-renders

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast mode support

## 📱 Screenshots

### Light Mode
- Clean, modern interface with subtle shadows
- Professional color scheme
- Clear typography hierarchy

### Dark Mode
- Easy on the eyes for low-light environments
- Consistent contrast ratios
- Maintained readability

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Launch Storybook
- `npm run build-storybook` - Build Storybook

### Project Structure

```
src/
├── components/
│   ├── InputField.tsx
│   └── DataTable.tsx
├── types/
│   └── index.ts
├── App.tsx
├── index.tsx
└── index.css
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for custom animations and styles
- Use CSS custom properties for dynamic theming

### Components
- Extend component interfaces for additional props
- Add new variants and sizes
- Implement custom render functions for table columns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide React
- Design inspiration from modern web applications
