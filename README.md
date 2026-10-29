# AI Interview Agent 🚀

An AI-powered interview preparation platform built with the MERN stack to help candidates practice interviews, improve their answers, and prepare for job opportunities with greater confidence.

AI Interview Agent provides an interactive experience for interview preparation, user authentication, interview-related AI features, and credit-based access.

## 🌐 Live Demo

🔗 **Live Application:**  https://ai-agent-interview-seven.vercel.app/

## ✨ Features

- **AI-Powered Interview Preparation** — Practice interview questions with AI-assisted interview workflows.
- **Multiple Interview Modes** — Prepare for different interview scenarios using the available interview modes.
- **User Authentication** — Register and sign in using email and password.
- **Google Authentication** — Sign in using your Google account.
- **Credit-Based System** — Manage available interview credits.
- **Pricing Plans** — Explore free and paid credit packages.
- **Responsive User Interface** — Access the application across desktop, tablet, and mobile devices.
- **RESTful API** — Communicate between the React frontend and Express backend.
- **Database Integration** — Store application data using MongoDB and Mongoose.
- **Payment Integration** — Payment-related backend modules are included for Razorpay integration; configure and verify the payment workflow before using it.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS / CSS
- React Router DOM
- Redux Toolkit
- Axios
- Framer Motion
- Firebase Authentication
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt / bcryptjs
- Cookie Parser
- CORS
- Helmet
- dotenv

### Integrations
- Firebase Authentication for Google sign-in
- AI service API for interview-related functionality
- Razorpay for payment integration

## 📁 Project Structure

```text
AI-Interview-Agent/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following before starting:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/atlas) or a local MongoDB instance
- Git
- Firebase project credentials for Google authentication, if enabled
- API credentials for the AI service used by your application

### 1. Clone the Repository

```bash
git clone https://github.com/Mansi-prasad/AI-Interview-Agent.git
```

Navigate to the project directory:

```bash
cd AI-Interview-Agent
```

### 2. Set Up the Backend

Open a terminal and run:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory.

Example configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173

GEMINI_API_KEY=your_ai_api_key

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

**Important:** These are example variable names. Use the exact names referenced by your backend code. Configure only the integrations your application uses.

Replace the placeholder values with your own credentials. Never commit your `.env` file or expose private API keys in frontend code.

Start the backend using the script defined in `server/package.json`. For example, if the project has a `dev` script:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open another terminal from the project root:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory.

Example configuration:

```env

VITE_SERVER_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Use the exact environment variable names required by your Firebase configuration and frontend code.

Start the development server:

```bash
npm run dev
```

### 4. Open the Application

Open the local URL displayed in your frontend terminal, commonly:

```text
http://localhost:5173
```

Make sure the backend server and MongoDB connection are running correctly.

## 🔐 Authentication and Security

The application includes authentication-related functionality designed to protect user accounts and backend resources.

- Email and password authentication.
- Google sign-in through Firebase.
- JWT-based authentication.
- Password hashing with bcrypt or bcryptjs.
- Cookie-based session token handling.
- Protected backend routes.
- Environment variables for sensitive configuration.
- CORS and security middleware where configured.

For production deployment, configure secure cookies, HTTPS, appropriate CORS origins, request validation, and rate limiting.

## 💳 Credit and Payment System

The application includes a credit-based pricing concept with free and paid packages.

Example plans:

| Plan | Price | Credits |
|---|---:|---:|
| Free | ₹0 | 100 |
| Starter Pack | ₹100 | 150 |
| Pro Pack | ₹500 | 650 |

For payment testing, use Razorpay test mode and its test credentials. Verify payment signatures on the backend before granting credits. Never trust payment status or credit amounts sent directly by the frontend.

## 🌐 Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `CLIENT_URL` | Allowed frontend origin |
| `GEMINI_API_KEY` | AI API credential, if Gemini is used |
| `RAZORPAY_KEY_ID` | Razorpay key ID, if payments are enabled |
| `RAZORPAY_KEY_SECRET` | Private Razorpay secret, backend only |
| `VITE_SERVER_URL` | Backend URL used by the frontend |
| `VITE_FIREBASE_API_KEY` | Firebase client configuration, if used |

Environment variable names must match the names used in your source code. Never put private backend secrets in variables prefixed with `VITE_`, because Vite exposes those variables to frontend code.

## 🚀 Deployment

You can deploy the frontend and backend separately.

- **Frontend:** Vercel or another static hosting provider.
- **Backend:** Render, Railway, or another Node.js hosting provider.
- **Database:** MongoDB Atlas.

Before deployment:

1. Configure production environment variables.
2. Set the frontend API URL to your deployed backend URL.
3. Configure the backend's allowed frontend origin.
4. Enable HTTPS and secure cookie settings.
5. Configure authentication providers and AI/payment credentials.
6. Test registration, login, protected routes, interview workflows, and payment verification.
7. Configure SPA fallback routing if required by your hosting provider.

## 🔮 Future Improvements

- More personalized interview experiences.
- Detailed performance reports and answer evaluation.
- Interview history and progress tracking.
- Additional interview categories.
- Improved analytics and career preparation tools.

 ---