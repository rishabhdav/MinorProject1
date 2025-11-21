# 🤝 Contributing to Krishi Mitre

Thank you for your interest in contributing to Krishi Mitre! This guide will help you get started.

---

## 📋 Code of Conduct

We are committed to providing a welcoming and inclusive environment.

**Expected Behavior:**
- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Report inappropriate behavior

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/krishi-mitre.git
cd krishi-mitre
```

### 3. Add Upstream

```bash
git remote add upstream https://github.com/original/krishi-mitre.git
git fetch upstream
```

### 4. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming:
- `feature/description` - New feature
- `fix/description` - Bug fix
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `test/description` - Test coverage

### 5. Set Up Development Environment

```bash
npm install
npm run dev
```

---

## 💻 Development Workflow

### Before You Start

1. Check [Issues](https://github.com/krishi-mitre/issues) for existing work
2. Create an issue if it doesn't exist
3. Comment to claim the issue
4. Wait for maintainer approval

### Making Changes

1. **Write clean code**
   ```typescript
   // ✅ Good
   const getUserProfile = async (userId: string): Promise<User> => {
     // implementation
   };

   // ❌ Avoid
   const getUser = async (u: any) => {
     // implementation
   };
   ```

2. **Follow the style guide**
   - Use TypeScript for type safety
   - Use functional components
   - Follow existing patterns
   - Use descriptive names

3. **Add tests**
   ```typescript
   describe('UserAPI', () => {
     test('should fetch user profile', async () => {
       // test implementation
     });
   });
   ```

4. **Update documentation**
   - Update README if needed
   - Add inline comments
   - Update API docs if applicable

---

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # UI components (shadcn/ui)
│   ├── figma/       # Figma imported components
│   └── *.tsx        # Feature components
├── context/         # Context providers
├── hooks/           # Custom hooks
├── styles/          # Global styles
├── types/           # TypeScript types (create if needed)
└── utils/           # Utility functions (create if needed)
```

### Adding a New Feature

1. **Create component file**
   ```
   src/components/YourFeature.tsx
   ```

2. **Follow template**
   ```typescript
   import React from 'react';
   import { useAuth } from '@/context/AuthContext';
   import { motion } from 'motion/react';

   interface Props {
     // Your props
   }

   const YourFeature: React.FC<Props> = ({ /* props */ }) => {
     const { user } = useAuth();

     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="container mx-auto p-4"
       >
         {/* Component content */}
       </motion.div>
     );
   };

   export default YourFeature;
   ```

3. **Export from App.tsx**
   ```typescript
   import YourFeature from '@/components/YourFeature';
   ```

4. **Add to navigation** (if needed)
   Update `Header.tsx` menu items

---

## 🎨 Styling Guidelines

### Tailwind CSS

```typescript
// ✅ Good
<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
  Submit
</button>

// ❌ Avoid inline styles
<button style={{ padding: '8px 16px', backgroundColor: 'green' }}>
  Submit
</button>
```

### Dark Mode Support

Always include dark mode:
```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

---

## 🌐 Bilingual Support

### Adding Hindi Translations

```typescript
const content = {
  en: {
    title: 'Welcome to Krishi Mitre',
    description: 'Smart farming for smart farmers'
  },
  hi: {
    title: 'कृषि मित्र में आपका स्वागत है',
    description: 'स्मार्ट किसानों के लिए स्मार्ट खेती'
  }
};

export default content;
```

Use in component:
```typescript
const { language } = useAuth();

<h1>{content[language].title}</h1>
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Test Example

```typescript
import { render, screen } from '@testing-library/react';
import YourComponent from './YourComponent';

describe('YourComponent', () => {
  test('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build process, dependencies

### Examples

```
feat(weather): add 7-day forecast display

- Integrate Open-Meteo API for 7-day data
- Display forecast cards with weather icons
- Add farming recommendations based on weather

Closes #123
```

```
fix(auth): prevent duplicate login requests

User could submit login form multiple times before redirect.
Added button disabled state during login.

Fixes #456
```

---

## 🔄 Pull Request Process

### Before Submitting PR

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test everything**
   ```bash
   npm install
   npm run dev
   npm run build
   ```

3. **Check for errors**
   ```bash
   npm run lint
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Breaking change

## Testing Done
- Tested on mobile
- Tested on desktop
- Tested dark mode
- Tested bilingual

## Screenshots (if applicable)
[Add images]

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Works in dark mode
- [ ] Responsive on mobile
```

---

## 📚 Documentation

### Component Documentation

```typescript
/**
 * Weather prediction component showing real-time weather data
 * and 7-day forecasts with farming recommendations
 * 
 * @component
 * @example
 * return (
 *   <WeatherPrediction 
 *     latitude={31.5} 
 *     longitude={74.3}
 *   />
 * )
 */
const WeatherPrediction: React.FC<Props> = ({ latitude, longitude }) => {
  // implementation
};
```

---

## 🐛 Bug Reports

### How to Report

1. Go to [Issues](https://github.com/krishi-mitre/issues)
2. Click "New Issue"
3. Fill the bug report template:

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happened

## Screenshots
[Add images if applicable]

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Version: 1.0.0

## Additional Context
Any additional information
```

---

## 🆕 Feature Requests

### How to Request

1. Go to [Issues](https://github.com/krishi-mitre/issues)
2. Click "New Issue"
3. Select "Feature request"
4. Fill the template:

```markdown
## Feature Description
What feature would you like?

## Use Case
Why is this needed?

## Proposed Solution
How should it work?

## Alternative Solutions
Other approaches?

## Additional Context
Screenshots, examples, etc.
```

---

## 🎓 Learning Resources

### Documentation
- [README.md](./README.md) - Project overview
- [FEATURES.md](./FEATURES.md) - Feature documentation
- [API.md](./API.md) - API documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

### Technologies
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [motion/react](https://www.framer.com/motion)

### Community
- [GitHub Discussions](https://github.com/krishi-mitre/discussions)
- [Discord Community](https://discord.gg/krishi-mitre)
- [Slack Channel](https://slack.krishi-mitre.com)

---

## 📊 Development Tips

### Debugging

```typescript
// Use browser DevTools
console.log('Debug:', variable);

// React DevTools
// Extension: React Developer Tools

// Network tab
// Check API calls in Network tab
```

### Performance

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

---

## ✅ Checklist Before Submission

- [ ] Code follows project style guide
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console warnings or errors
- [ ] Works in light and dark mode
- [ ] Works on mobile and desktop
- [ ] Changes documented
- [ ] Commit messages clear
- [ ] No breaking changes (or documented)
- [ ] Related issue(s) mentioned

---

## 🎯 Contributing Areas

### We Need Help With

- 🐛 **Bug Fixes** - Report and fix issues
- ✨ **Features** - Implement new features
- 📚 **Documentation** - Improve guides
- 🧪 **Tests** - Increase coverage
- 🌐 **Translations** - Add new languages
- 🎨 **Design** - Improve UI/UX
- 📱 **Mobile** - Optimize for mobile
- ⚡ **Performance** - Speed improvements

---

## 💬 Questions?

- Create a [Discussion](https://github.com/krishi-mitre/discussions)
- Join our [Discord](https://discord.gg/krishi-mitre)
- Email: contribute@krishi-mitre.com

---

## 🙏 Thank You!

Your contributions make Krishi Mitre better for farmers worldwide!

---

<div align="center">

**Happy Contributing! 🌾**

</div>
