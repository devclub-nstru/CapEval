# CapEval

CapEval is a digital platform designed to streamline the assignment lifecycle in academic institutions. It simplifies assignment creation, submission, evaluation, and query resolution, enhancing efficiency for both students and faculty.

## Table of Contents
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Future Development](#future-development)

## Features
- **Assignment Management**: 
  - Easy creation and distribution of assignments.
  - Structured submission with deadlines.
- **Evaluation & Feedback**: 
  - Faculty can review, grade, and provide feedback.
  - Automated grading where applicable.
- **Query Resolution**: 
  - Students can submit queries related to assignments.
  - Faculty can respond asynchronously, reducing real-time dependencies.
- **Tracking & Transparency**: 
  - Real-time updates on assignment status.
  - Faculty insights into pending evaluations and student progress.

## Installation Guide

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [Git](https://git-scm.com/)

### Install npm, Yarn, and pnpm
After installing Node.js, install npm (Node Package Manager) by default:
```sh
node -v   # Check Node.js version
npm -v    # Check npm version
```
Then, install Yarn and pnpm:
```sh
npm install -g yarn pnpm
```
Verify installation:
```sh
yarn -v   # Check Yarn version
pnpm -v   # Check pnpm version
```

### Clone the Repository
```sh
git clone https://github.com/devclub-nstru/CapEval.git
cd CapEval
```

## Usage
### Setting up the Admin Panel
```sh
cd admin-panel
yarn install
npm run dev
```

### Setting up the Frontend
```sh
cd frontend
yarn install
npm start
```

### Setting up the Backend
```sh
cd backend
pnpm install
npm start
```

## Environment Setup
To run the backend, you need to set up a MongoDB database.
1. Create a MongoDB Atlas account and set up a cluster by following this guide: [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
2. Obtain your MongoDB connection URL.
3. Create a `.env` file in the `backend/` directory and store your MongoDB connection string:
   ```sh
   MONGODB_URI=your_mongodb_connection_url
   ```

## Project Structure
```
CapEval/
│── admin-panel/    # Admin dashboard
│── frontend/       # Student & faculty UI
│── backend/        # API and database
└── README.md       # Documentation
```

## Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

## Future Development
For more details on future improvements and upcoming features, refer to the [Product Requirements Document](./PRD.md).

