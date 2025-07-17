# 🛠️ Sequelize Product API

This project is a backend API built using **Node.js**, **Express**, and **Sequelize (MySQL)**. 

It demonstrates how to manage product data in a store-like system using proper **REST principles** and **Sequelize ORM** for database operations.

---

## 🔗 Postman API Collection  
You can test all the APIs from this Postman workspace:  
👉 [Click to Open Postman Collection](https://techreal-8196.postman.co/workspace/techreal-Workspace~087fc4a3-aac8-4804-8624-fed6f82f709e/collection/40800552-99e05fe1-a2a7-44b8-92df-b4f0692e02a0?action=share&creator=40800552)

---

## 📚 What I Learned

### ✅ Sequelize ORM
- Models represent tables in the database.
- Models interact with **controllers** to send and retrieve data from the DB.
- Sequelize provides MongoDB-like query syntax for easy data manipulation.

### ✅ Migrations
- Migrations help **create and drop tables** using Sequelize CLI.
- Defined table structure using migration files.

### ✅ REST API Principles
- Followed proper RESTful design by limiting to just **4 main routes**.
- Practiced **query filtering** (e.g., `?limit=2`, `?stock=low`, etc.)

### ✅ Sequelize Commands & Syntax
- CRUD operations: `findAll`, `findOne`, `create`, `update`, `destroy`
- Condition-based filtering (`quantity < 5`)
- Update logic using query params (e.g., increase/decrease stock)
- Model relationships with `belongsTo`

---

## 📦 Features Implemented

- 🔹 Add, Update, and Delete Products
- 🔹 Increase or Decrease Stock Quantity
- 🔹 Fetch Low-Stock Products
- 🔹 Filter Products using Query Parameters

---

## 🧱 Tech Stack

| Tech        | Usage             |
|-------------|-------------------|
| Node.js     | Runtime Environment |
| Express     | Server Framework    |
| Sequelize   | ORM for PostgreSQL  |
| PostgreSQL  | Relational Database |
| Postman     | API Testing Tool    |


