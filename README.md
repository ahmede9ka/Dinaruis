# Dinaruis - Crowdfunding Platform

![Dinaruis Logo](https://via.placeholder.com/150)
<div align="center">
    <img src="Frontend/public/logo.png" alt="Logo" width="100%" height="100%">
</div>

Dinaruis is a modern crowdfunding platform that empowers creators, entrepreneurs, and individuals to bring their ideas to life through community support.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Campaign Creation**: Users can create and manage fundraising campaigns
- **Secure Payments**: Integrated payment processing
- **Social Sharing**: Easy sharing options to promote campaigns
- **Real-time Analytics**: Track campaign performance
- **User Profiles**: Personalized dashboards for backers and creators
- **Responsive Design**: Works across all devices

## Technologies

### Frontend
- Angular
- Tailwind CSS (Styling)
- Axios (HTTP client)
- Formik & Yup (Form handling)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Bcrypt (Password hashing)

### Deployment
- Render (Backend)
- Vercel/Netlify (Frontend)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account or local MongoDB instance

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dinaruis.git
cd dinaruis
```
2.Install dependencies for both frontend and backend:

# Frontend dependencies
```bash
cd Frontend
npm install
```

# Backend dependencies
```bash
cd ../Backend
npm install
```
3.Create a .env file in the Backend directory with the following variables:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYMENT_API_KEY=your_payment_api_key
```
Development Setup
Running the Backend
```bash
cd Backend
npm run start:dev
```
The backend server will run on http://localhost:5000
Deployment
Backend Deployment
The backend is deployed on Render. To deploy your own instance:

Create a new Web Service on Render

Connect your GitHub repository

Set environment variables

Deploy!

Frontend Deployment
The frontend can be deployed on Vercel or Netlify:

Connect your GitHub repository

Set the build command to npm run build

Set the publish directory to build/

Deploy!
License
Dinaruis is MIT licensed.

Contact: 
<br>
TO RUN THE BACKEND : <br>
cd Backend <br>
npm run start:dev <br>
<br> 
Backend server deployed on Render : 
to test : https://dinaruis-backend.onrender.com/api/v1/campaigns
URL format :  https://dinaruis-backend.onrender.com/ + API
