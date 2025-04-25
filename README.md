# Hygiene App

A React-based application for managing personal hygiene and health tracking.

## Features

- User authentication
- Profile management
- Health tracking
- Shopping list management
- Barcode scanner for product information
- Material UI based interface

## Tech Stack

- React 18
- TypeScript
- Material UI
- React Router
- Vite
- Firebase (for authentication and data storage)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hygiene.git
cd hygiene
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── context/       # React context providers
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  ├── main.tsx       # Application entry point
  └── index.css      # Global styles
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 