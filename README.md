# VitaLab - Vital Signs Data Platform

VitaLab is a comprehensive platform for managing, analyzing, and visualizing vital signs data. The platform consists of a React/Next.js frontend and a FastAPI backend.

## Project Structure

The project is organized into two main directories:

- `front/`: Next.js frontend application
- `backend-data/`: FastAPI backend server

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Python (v3.10 or later)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend-data
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   cd src
   uvicorn main:app --reload
   ```

   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd front
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at http://localhost:3000

## Features

- View and analyze vital sign data
- Open dataset accessibility
- Forum for discussions
- Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request