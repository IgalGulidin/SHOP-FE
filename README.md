# Shopping Website – Frontend (React)

## Overview

This project is the frontend application for a full-stack shopping website.

The application allows users to:

* browse items
* search products
* manage favorites
* create and manage orders
* complete purchases

The frontend communicates with the backend REST API built with **Spring Boot**.

---

# Technology Stack

Frontend framework

* React

Build tool

* Vite

UI library

* Material UI (MUI)

Routing

* React Router

HTTP client

* Axios

State management

* React Context

---

# Features

### Home Page

The main page displays all available items.

Users can:

* search items
* add items to favorites
* add items to cart

Each item displays:

* title
* image
* price
* stock availability

---

### Authentication

Users can:

* sign up
* log in
* log out

Authentication uses a token stored in localStorage.

Protected pages:

* favorites
* orders
* pending order

---

### Favorites

Logged-in users can:

* add items to favorites
* remove items from favorites
* view all favorite items

Favorites persist between sessions.

---

### Orders

Users can:

* create a pending order
* add items
* remove items
* adjust quantities
* complete payment

Order pages include:

* Orders list page
* Pending order page
* Order details page

---

# Project Structure

```
src/
  api/
  components/
  context/
  pages/
  theme.js
  App.jsx
  main.jsx
```

Main folders:

components
Reusable UI components

pages
Application screens

api
Backend API communication

context
Authentication state

---

# Running the Frontend

Clone the repository:

```
git clone https://github.com/IgalGulidin/SHOP-FE.git
```

Navigate to the project:

```
cd shop-fe
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Application URL:

```
http://localhost:5173
```

---

# Backend Requirement

The backend must be running on:

```
http://localhost:8080
```

---

# Example User Flow

1. Sign up or login
2. Browse items on the homepage
3. Add items to favorites or cart
4. Open pending order
5. Adjust quantities
6. Pay for the order
7. View order history

---

# UI Features

* Dark theme
* Snackbar notifications
* Loading indicators
* Disabled buttons during API calls

---

# Author

Created as part of a **Full-Stack Web Development course project**.
