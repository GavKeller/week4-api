# Apparel Order Tracker

## About the Project

For my final project, I made an Apparel Order Tracker.

The purpose of the app is to make it easier to keep track of clothing orders in one place. Instead of writing orders down or trying to keep track of them through messages, the user can enter the customer name, item, size, quantity, and status of the order.

This app could be useful for a small business, school club, fraternity, team, or anyone else who has to manage a lot of apparel orders.

## Features

The app allows users to:

- Add a new order
- View all saved orders
- Edit an existing order
- Delete an order
- Change the status of an order
- Save orders in a SQLite database
- Keep the information saved even after restarting the server

## Technologies Used

### Frontend

- React
- JavaScript
- CSS
- Vite

### Backend

- Node.js
- Express
- SQLite
- CORS

## How the App Works

The frontend was made with React, and the backend was made with Express.

The frontend sends requests to the backend whenever the user adds, edits, deletes, or views an order.

The backend then communicates with the SQLite database to save or retrieve the information.

The app includes all four CRUD operations:

- Create: Add a new order
- Read: View the saved orders
- Update: Change an existing order
- Delete: Remove an order

## Database

The app uses a SQLite database called `orders.db`.

The database has one table called `orders`.

The table includes:

- `id`
- `customerName`
- `itemName`
- `size`
- `quantity`
- `status`

The `id` is the primary key, which means every order has its own unique number.

## API Routes

### Get all orders

`GET /api/orders`

This gets all of the orders saved in the database.

### Get one order

`GET /api/orders/:id`

This gets one specific order based on its order number.

### Create an order

`POST /api/orders`

This adds a new order to the database.

### Update an order

`PUT /api/orders/:id`

This changes an order that is already saved.

### Delete an order

`DELETE /api/orders/:id`

This removes an order from the database.

## How to Run the Project

### Start the Backend

Open a terminal and run:

```bash
cd apparel-order-tracker
cd backend
npm install
node server.js