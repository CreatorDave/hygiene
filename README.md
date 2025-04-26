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

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CreatorDave/hygiene.git
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

### Development

The project uses Vite for development. Key scripts:

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally

### Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── context/       # React context providers
  ├── services/      # API and service functions
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  ├── main.tsx       # Application entry point
  └── index.css      # Global styles
```

### Testing

Run tests with:
```bash
npm test
```

### Building for Production

To create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## CI/CD

The project uses GitHub Actions for continuous integration and deployment. The workflow:
1. Runs on push to main branch
2. Installs dependencies
3. Builds the project
4. Runs tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@example.com or open an issue in the GitHub repository. 