# Nordstrom_Rack_Clone

## Frontend Installation

### CRA - Create React App

`npx create-react-app frontend`

### Tailwind CSS

`npm install -D tailwindcss`
`npx tailwindcss init`

`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`

### React Router DOM

`npm install react-router-dom`

### React Icons

`npm install react-icons --save`

### Install Toast

`npm i react-toastify`

### Install React Redux Toolkit

`npm install @reduxjs/toolkit`

### Install React Redux

`npm i react-redux`

### Install MomentJS

`npm install moment --save`

### Install React Stripe JS

`npm install --save @stripe/react-stripe-js @stripe/stripe-js`

<!-- Backend Installation -->

## Backend Installation

### Install Backend

`npm init`

replace package.json with below text
`{
"name": "backend",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node index.js",
"dev": "nodemon index.js"
},
"author": "",
"license": "ISC"
}`

### Install nodemon, express, cors, dotenv, mongoose

`npm i nodemon express cors dotenv mongoose`

### Install MongoDB

`npm install mongodb`

### Run Server
`npm run dev`

### Install bcrypt

`npm i bcryptjs`

### Install JSON Web Token

`npm i jsonwebtoken`

### Install Cookie-Parser

`npm i cookie-parser`

### Install Stripe

`npm install --save stripe`

### Browser Image Compression

`npm install browser-image-compression`
