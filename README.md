# Dropdown Menu

Implementing a nested dropdown menu. This app was set up using Vite (React + TypeScript). See the live deployed site [here](https://tammy-zhang.com/dropdown-menu/). In the process, I primarily consulted the [React documentation](https://react.dev/learn); I also used Microsoft Copilot to assist with several functions such as restructuring the data into a hierarchical (nested) format.

## Prerequisites
Make sure you have the following installed:
- Node.js (version 16 or higher recommended)
- npm or pnpm or Yarn

## Installation
1. Clone this repository:
```
git clone https://github.com/tammyzhang-1/dropdown-menu.git
cd dropdown-menu
```
2. Install dependencies:
```
npm install
```

## Running the Application (Development Mode)
Start the development server:
```
npm run dev
```
Then open your browser and navigate to:
```
http://localhost:5173/
```

## Building the Application (Production)
To build the app for production:
```
npm run build
```
The output will be placed in the dist/ directory.

## Previewing the Production Build
After building, preview the production version locally:
```
npm run preview
```

## Project Structure
```
dropdown-menu/
├── public/
│   └── index.html         
└── src/
    ├── components/dropdown/
    │   ├── Dropdown.css
    │   ├── Dropdown.tsx
    │   ├── DropdownInput.tsx
    │   ├── DropdownList.tsx
    │   ├── DropdownOption.tsx
    │   └── types.tsx
    │
    ├── data/
    │   └── census_classification.json
    │
    ├── App.tsx
    └── main.tsx             
```
