# React Native Boilerplate

A production-ready React Native boilerplate with modern architecture patterns, comprehensive tooling, and multi-environment support.

## 🏗️ Architecture Overview

This boilerplate follows a **feature-based architecture** with clear separation of concerns, implementing modern React Native patterns and best practices.

### Core Architecture Principles

- **Atomic Design System** - Components organized by complexity (atoms → molecules → organisms)
- **Redux Toolkit** - Centralized state management with RTK Query for API calls
- **Clean Architecture** - Clear separation between presentation, business logic, and data layers
- **Type Safety** - Full TypeScript implementation throughout the codebase
- **Multi-Environment Support** - Development, QA, and Production configurations

## 📁 Project Structure

```
src/
├── App.tsx                    # Root application component
├── assets/                    # Static assets (fonts, icons, images)
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/                # Reusable UI components (Atomic Design)
│   ├── atoms/                 # Basic building blocks (Button, Input, etc.)
│   ├── molecules/             # Simple component combinations
│   └── organisms/             # Complex UI sections
├── config/                    # App configuration and environment variables
├── constants/                 # App-wide constants (colors, dimensions, etc.)
├── hooks/                     # Custom React hooks
│   ├── useAppDispatch.ts      # Typed Redux dispatch hook
│   ├── useAppSelector.ts      # Typed Redux selector hook
│   ├── useAsyncStorage.ts     # AsyncStorage utility hook
│   └── useKeyboard.ts         # Keyboard state management
├── i18n/                      # Internationalization setup
│   ├── i18n.ts               # i18n configuration
│   └── locales/              # Translation files (en.json, hi.json)
├── navigation/                # Navigation structure
│   ├── AppNavigator.tsx      # Main navigation container
│   ├── BottomTabNavigator.tsx # Bottom tab navigation
│   ├── DrawerNavigator.tsx   # Drawer navigation
│   └── FloatingBottomNavigation.tsx # Custom floating navigation
├── screens/                   # Screen components
│   ├── Home/
│   ├── Profile/
│   ├── Settings/
│   ├── Notification/
│   └── CRUDDemo/
├── services/                  # External service integrations
│   ├── apiService.ts         # API service layer
│   ├── axiosInstance.ts      # Configured Axios instance
│   └── notificationService.ts # Push notification handling
├── store/                     # Redux store configuration
│   ├── api/                  # RTK Query API definitions
│   │   ├── baseApi.ts        # Base API configuration
│   │   └── exampleApi.ts     # Example API endpoints
│   ├── middleware/           # Custom Redux middleware
│   ├── slices/               # Redux slices
│   │   ├── appSlice.ts       # Global app state
│   │   └── authSlice.ts      # Authentication state
│   ├── hooks.ts              # Typed Redux hooks
│   └── index.ts              # Store configuration
├── types/                     # TypeScript type definitions
│   ├── index.ts              # Global types
│   └── react-native-config.d.ts # Environment variables types
└── utilities/                 # Utility components and helpers
    ├── ApiErrorBoundary.tsx  # API error handling
    ├── ErrorBoundary.tsx     # General error boundary
    └── index.ts
```

## 🎯 Key Features

### State Management

- **Redux Toolkit** with RTK Query for efficient data fetching
- **Typed hooks** for type-safe Redux usage
- **Normalized state structure** for optimal performance

### Navigation

- **React Navigation v6** with multiple navigation patterns:
  - Stack Navigation (main flow)
  - Bottom Tab Navigation
  - Drawer Navigation
  - Custom Floating Navigation

### Internationalization

- **i18next** integration with React Native Localize
- **Multi-language support** (English, Hindi included)
- **Dynamic language switching**

### Development Tools

- **Plop.js generators** for consistent code generation:
  ```bash
  npm run g:screen     # Generate new screen
  npm run g:component  # Generate new component
  npm run g:hook       # Generate custom hook
  npm run g:slice      # Generate Redux slice
  npm run g:api        # Generate API endpoint
  ```

### Environment Management

- **Multi-environment support** (Development, QA, Production)
- **Environment-specific configurations** using react-native-config
- **Dedicated build scripts** for each environment

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS)

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd RNBoilerplate
   npm install
   ```

2. **iOS setup:**

   ```bash
   bundle install
   bundle exec pod install
   ```

3. **Start the application:**

   ```bash
   # Development environment
   npm run start:dev
   npm run android:dev  # or ios:dev

   # Production environment
   npm run start:prod
   npm run android:prod  # or ios:prod
   ```

## 🛠️ Development Workflow

### Code Generation

Use Plop generators for consistent code structure:

```bash
npm run generate        # Interactive generator
npm run g:screen MyScreen    # Generate a new screen
npm run g:component MyButton # Generate a new component
```

### Environment-Specific Development

#### Development Environment

- Uses `.env.development` configuration
- Debug builds with development settings
- Hot reloading enabled

```bash
npm run start:dev
npm run android:dev
npm run build:android:dev
```

#### QA Environment

- Uses `.env.qa` configuration
- Release builds with QA-specific settings
- Performance optimizations enabled

```bash
npm run start:qa
npm run android:qa
npm run build:android:qa
```

#### Production Environment

- Uses `.env.production` configuration
- Optimized release builds
- Production APIs and configurations

```bash
npm run start:prod
npm run android:prod
npm run build:android:prod
```

## 🏛️ Architecture Patterns

### Component Architecture (Atomic Design)

```
Atoms (Basic UI elements)
├── Button
├── Input
├── Text
└── Icon

Molecules (Simple combinations)
├── SearchBar (Input + Icon)
├── FormField (Label + Input + Error)
└── Card (Container + Content)

Organisms (Complex sections)
├── Header
├── ProductList
├── UserProfile
└── NavigationDrawer
```

### State Management Flow

```
UI Component → Action → Reducer → Store → UI Update
    ↓
RTK Query → API Call → Cache → Component Re-render
```

### Data Flow Architecture

```
Services Layer (API, Storage, External)
    ↓
Store Layer (Redux + RTK Query)
    ↓
Hook Layer (Custom hooks + selectors)
    ↓
Component Layer (UI Components)
```

## 🔧 Configuration

### Environment Variables

Configure environment-specific settings in:

- `.env.development`
- `.env.qa`
- `.env.production`

### Redux Store Structure

```typescript
{
  app: {
    isLoading: boolean;
    theme: 'light' | 'dark';
    language: string;
  }
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
  }
  api: {
    // RTK Query cache and metadata
  }
}
```

This architecture provides a scalable, maintainable foundation for React Native applications with enterprise-level requirements.
