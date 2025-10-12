# 🌱 GrowMeOrganic Frontend Data Table

This project is a frontend task for GrowMeOrganic, showcasing a dynamic data table built with React, TypeScript, and PrimeReact. It consumes data and implements advanced features such as server-side pagination and a sophisticated row selection mechanism.

## Table of Contents

-   [✨ Features](#features)
-   [🛠️ Technologies Used](#technologies-used)
-   [⚙️ Installation](#installation)
-   [🚀 Running the Project](#running-the-project)
-   [📁Project Structure](#project-structure)
-   [🌐 API Used](#-api-used)  


## ✨ Features

-   **Dynamic Data Display:** Fetches and displays artwork data.
-   **Server-Side Pagination:** Efficiently navigates through large datasets by fetching data page by page.
-   **Multi-Row Selection:** Allows users to select multiple rows using checkboxes.
-   **"Select N Rows" Functionality:** A unique feature enabling users to specify a number `N` to automatically select the first `N` rows from the entire dataset. This handles non-sequential item IDs and fetches necessary data across pages to ensure accurate selection.
-   **Persistent Row Selection:** Selected rows remain highlighted even when navigating between different pages of the data table.
-   **Responsive UI:** Designed to provide a good user experience across various device sizes.
-   **Loading Indicators:** Provides visual feedback during data fetching operations.

## 🛠️ Technologies Used

-   **React.js:** Frontend JavaScript library for building user interfaces.
-   **TypeScript:** Superset of JavaScript that adds static typing.
-   **PrimeReact:** A rich set of open-source UI components for React, specifically the `DataTable` and `OverlayPanel`.
-   **Axios:** Promise-based HTTP client for making API requests.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development (inferred from class names).
-   **React Icons (`react-icons/md`):** For the down arrow icon.

## ⚙️ Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/GrowMeOrganic-Frontend-DataTable.git
    cd GrowMeOrganic-Frontend-DataTable/frontend-task # Adjust path if your project root is different
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## 🚀 Running the Project

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
# or
yarn dev
```

This will typically open the application in your browser at `http://localhost:5173` (or another port if 5173 is in use).


## 📁 Project Structure

```bash
.
├── public/                 # Static assets
├── src/
│   ├── App.tsx             # Main application component
│   ├── assets/             # Images or other assets
│   ├── components/
│   │   ├── Hero.tsx        # Contains the main DataTable logic and UI
│   │   └── Navbar.tsx      # (If applicable, based on project structure)
│   ├── index.css           # Global styles
│   ├── main.tsx            # Entry point of the React application
│   └── ...                 # Other source files
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite build configuration
└── tsconfig.json           # TypeScript configuration

```

## 🌐 API Used 

```bash
https://api.artic.edu/api/v1/artworks
```


## 👨‍💻 Author

**Priyanshu Verma**

- Portfolio: https://my-portfolio-beta-nine-27.vercel.app/
- LinkedIn: https://www.linkedin.com/in/priyanshu-verma-a12ba829a/
