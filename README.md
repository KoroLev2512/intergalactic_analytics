# 🚀Interface Development for the Intergalactic Analytics Service

This is a web application for the "Intergalactic Analytics Service". The project was developed as part of the Yandex Interface Development School 2025.

## Technology Stack

- **Main stack**: `React`, `TypeScript`, `Vite`
- **State management**: `Zustand`
- **Routing**: `React Router`
- **Styling**: `CSS Modules`
- **Code quality**: `ESLint`, `Prettier`, `typescript-eslint`
- **Utilities**: `classnames`

## Functionality

### Main Page (`/`)
- Upload a CSV file via drag-and-drop or file selection dialog.
- Analyze the file with progress display.
- Save analysis results (including errors) to history, stored in `localStorage`.
- Clear current data and upload a new file.

### Generation Page (`/generate`)
- Generate new data.
- Automatically download the generated file.
- Handle errors.

### History Page (`/history`)
- View upload history as a list.
- Delete individual records from history.
- View key metrics (highlights) in a modal window.
- Clear the entire history.
- Button for quick navigation to the generation page.

## Installation and Launch

1. Install dependencies:
   ```bash
   npm install
   ```

2. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - start in development mode
- `npm run build` - build the project
- `npm run lint` - run the linter
- `npm run preview` - preview the built projec

src/
├── App.tsx                   # Root component of the application
├── main.tsx                  # Vite entry point
├── index.css                 # Global styles
├── components/               # Reusable UI components
│   ├── Buttons/              # Button variants
│   │   ├── ButtonComplete.tsx
│   │   ├── ButtonDownload.tsx
│   │   ├── ButtonError.tsx
│   │   ├── ButtonFile.tsx
│   │   ├── ButtonSend.tsx
│   │   ├── Buttons.module.css
│   │   └── index.ts
│   ├── Header/               # Application header
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   └── index.ts
│   ├── Modal/                # Modal window component
│   │   ├── Modal.tsx
│   │   ├── Modal.module.css
│   │   └── index.ts
│   └── Uploader/             # File uploader component
│       ├── Uploader.tsx
│       ├── Uploader.module.css
│       └── index.ts
├── contexts/                 # React contexts
│   └── Files/
│       ├── context.ts
│       ├── Provider.tsx
│       └── types.ts
├── pages/                    # Route‑level pages
│   ├── Generator/
│   │   ├── GeneratorPage.tsx
│   │   ├── Generator.module.css
│   │   └── index.ts
│   ├── History/
│   │   ├── HistoryPage.tsx
│   │   ├── History.module.css
│   │   └── index.ts
│   └── Main/
│       ├── MainPage.tsx
│       ├── MainPage.module.css
│       └── index.ts
├── services/                 # External API / helper services
│   └── file.ts
├── store/                    # Zustand state stores
│   └── files/
│       └── index.ts
├── vite-env.d.ts             # Vite TS environment declarations
└── assets/                   # Static assets (images, fonts, etc.)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
