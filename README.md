# EmployeeHub – Employee Management System

EmployeeHub is a full-stack Employee Management System developed using **Java, Spring Boot, React, and PostgreSQL**. It provides secure user authentication and allows users to manage employee records through a simple and user-friendly interface.

## Features

- User Registration and Login
- Secure authentication using JWT
- Password encryption using BCrypt
- Add new employees
- View employee records
- Update employee details
- Delete employee records
- Logout functionality
- PostgreSQL database integration

## Technologies Used

**Backend**
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- Maven
- JWT Authentication

**Frontend**
- React
- JavaScript
- HTML
- CSS
- Vite

**Database**
- PostgreSQL

**Tools**
- IntelliJ IDEA
- Visual Studio Code
- Git and GitHub

## Project Structure

```text
EmployeeHub/
│
├── employeehub/             # Spring Boot Backend
│
├── employeehub-frontend/    # React Frontend
│
└── README.md
```

## Application Modules

### Backend
Provides REST APIs, authentication, employee management operations, and database connectivity.

### Frontend
Provides the user interface for registration, login, and employee management.

## Database

PostgreSQL is used to store user and employee information.

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/routjagan423-svg/EmployeeHub.git
```

### 2. Run the Backend

- Open the `employeehub` folder in IntelliJ IDEA.
- Configure the required environment variables:
    - `DB_USERNAME`
    - `DB_PASSWORD`
    - `JWT_SECRET`
- Configure the PostgreSQL database.
- Run `EmployeehubApplication.java`.

Backend runs at:

`http://localhost:8080`

### 3. Run the Frontend

Open a terminal inside `employeehub-frontend` and execute:

```bash
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## Future Improvements

- Deploy the application online.
- Add employee search and filtering.
- Improve the user interface.
- Add pagination.

## Author

**Jagan Rout**

GitHub: https://github.com/routjagan423-svg

LinkedIn: https://linkedin.com/in/jagan-rout-790417350
