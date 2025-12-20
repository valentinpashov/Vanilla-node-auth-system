# Vanilla Node.js & PostgreSQL Authentication System

A raw Node.js authentication system built from scratch without frameworks. Uses PostgreSQL for data storage and bcrypt for security.
This project demonstrates a deep understanding of HTTP protocols, backend architecture, and low-level database interactions.

## 🚀 Features

* **User Registration:** Data validation and secure storage in PostgreSQL.
* **Login System:** Credential verification and redirects.
* **Protected Dashboard:** Accessible only after successful login.
* **Security:**
    * Password hashing using `bcrypt`.
    * Protection against SQL Injection via parameterized queries.
* **Architecture:** Follows the MVC (Model-View-Controller) pattern.
* **Styling:** Modern, responsive design using external CSS.

## 🛠️ Tech Stack

* **Backend:** Node.js (Native `http`, `fs`, `path`, `url` modules)
* **Database:** PostgreSQL
* **Libraries:** `pg` (database client), `bcrypt` (security), `dotenv` (configuration)
* **Frontend:** HTML5, CSS3

## 📂 Project Structure

```text
├── controllers/      # Business logic (Register/Login handling)
├── routes/           # Route definitions
├── style/            # CSS stylesheets
├── utils/            # Helper functions (e.g., password hashing)
├── db.js             # PostgreSQL connection pool configuration
├── server.js         # Entry point - HTTP server & manual routing
├── .env              # Environment variables (hidden file)
└── *.html            # Frontend views (index, login, dashboard)
```

## ⚙️ Installation & Setup
1. Clone the repository
  ```
  git clone [https://github.com/YOUR-USERNAME/vanilla-node-auth-system.git](https://github.com/YOUR-USERNAME/vanilla-node-auth-system.git)
  cd vanilla-node-auth-system  
  ```
2. Install dependencies
  ```
  npm install
  ```
3. Database Setup (PostgreSQL)
   Open your SQL terminal (psql) and run the following commands:
  ```
  1. Create the database
  CREATE DATABASE registration_db;

  2. Connect to the database
  \c registration_db

  3. Create the users table
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) DEFAULT 'user',
    address VARCHAR(255)
  );
```
4. Environment Configuration
   Create a .env file in the root directory and add your PostgreSQL credentials:
```
  DB_USER=postgres
  DB_HOST=localhost
  DB_NAME=registration_db
  DB_PASSWORD=your_postgres_password
  DB_PORT=5432
```
5. Start the Server
```
node server.js
```

## 🧠 Why "Vanilla" Node.js?

This project **demonstrates** and **practices** core backend concepts to provide a deep understanding of how web servers work "under the hood." Instead of relying on the abstraction of Express.js, this project manually handles:
* Parsing POST request data (Buffers/Streams).
* URL Routing.
* Serving static files (CSS/HTML).
* Managing HTTP headers and status codes.
