module.exports = function (plop) {
  // Screen generator
  plop.setGenerator('screen', {
    description: 'Create a new screen with Redux hooks and navigation',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Screen name (e.g., Products, UserProfile):',
        validate: (value) => {
          if (!value) return 'Screen name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Screen name must be PascalCase (e.g., Products, UserProfile)';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withRedux',
        message: 'Include Redux hooks?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withNavigation',
        message: 'Include navigation props?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withApiErrorBoundary',
        message: 'Include API error boundary?',
        default: false,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/screen/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/styles.ts',
        templateFile: 'plop-templates/screen/styles.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/screens/index.ts',
        pattern: /(\/\/ Export screens)/gi,
        template: '$1\nexport { default as {{pascalCase name}}Screen } from \'./{{pascalCase name}}\';',
      },
    ],
  });

  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new component (atom/molecule/organism)',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['atom', 'molecule', 'organism'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g., SearchBar, UserCard):',
        validate: (value) => {
          if (!value) return 'Component name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Component name must be PascalCase (e.g., SearchBar, UserCard)';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withProps',
        message: 'Include props interface?',
        default: true,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{type}}s/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/component/index.tsx.hbs',
      },
      {
        type: 'modify',
        path: 'src/components/{{type}}s/index.ts',
        pattern: /(\/\/ Export {{type}}s)/gi,
        template: '$1\nexport { {{pascalCase name}} } from \'./{{pascalCase name}}\';',
      },
    ],
  });

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new custom hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix, e.g., Theme, Location):',
        validate: (value) => {
          if (!value) return 'Hook name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Hook name must be PascalCase (e.g., Theme, Location)';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withState',
        message: 'Include useState?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withEffect',
        message: 'Include useEffect?',
        default: false,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}.ts',
        templateFile: 'plop-templates/hook/hook.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/hooks/index.ts',
        pattern: /(\/\/ TODO: Add more hooks as needed)/gi,
        template: 'export { use{{pascalCase name}} } from \'./use{{pascalCase name}}\';\n$1',
      },
    ],
  });

  // Redux slice generator
  plop.setGenerator('slice', {
    description: 'Create a new Redux slice',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Slice name (e.g., products, notifications):',
        validate: (value) => {
          if (!value) return 'Slice name is required';
          if (!/^[a-z][a-zA-Z]*$/.test(value)) {
            return 'Slice name must be camelCase (e.g., products, notifications)';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/store/slices/{{camelCase name}}Slice.ts',
        templateFile: 'plop-templates/slice/slice.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/store/slices/index.ts',
        pattern: /(\/\/ TODO: Add more slices as needed)/gi,
        template: 'export { default as {{camelCase name}}Slice } from \'./{{camelCase name}}Slice\';\nexport * from \'./{{camelCase name}}Slice\';\n$1',
      },
      {
        type: 'modify',
        path: 'src/store/index.ts',
        pattern: /(import { authSlice, appSlice } from '\.\/slices';)/gi,
        template: '$1\nimport { {{camelCase name}}Slice } from \'./slices\';',
      },
      {
        type: 'modify',
        path: 'src/store/index.ts',
        pattern: /(app: appSlice,)/gi,
        template: '$1\n    {{camelCase name}}: {{camelCase name}}Slice,',
      },
    ],
  });

  // API service generator
  plop.setGenerator('api', {
    description: 'Create a new API service with RTK Query',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'API service name (e.g., products, users):',
        validate: (value) => {
          if (!value) return 'API service name is required';
          if (!/^[a-z][a-zA-Z]*$/.test(value)) {
            return 'API service name must be camelCase (e.g., products, users)';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/store/api/{{camelCase name}}Api.ts',
        templateFile: 'plop-templates/api/api.ts.hbs',
      },
      {
        type: 'modify',
        path: 'src/store/api/baseApi.ts',
        pattern: /(tagTypes: \[)(.*?)(\])/,
        template: '$1$2, \'{{pascalCase name}}\'$3',
      },
    ],
  });
};