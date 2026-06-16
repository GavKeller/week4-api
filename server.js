// Import Express
const express = require("express");

// Create Express application
const app = express();

// Set the port
const PORT = 3000;

// Custom dataset for apparel orders
const orders = [
  {
    id: 1,
    customerName: "John Smith",
    itemName: "Black Hoodie",
    size: "Large",
    status: "Pending"
  },
  {
    id: 2,
    customerName: "Sarah Jones",
    itemName: "White T-Shirt",
    size: "Medium",
    status: "Completed"
  },
  {
    id: 3,
    customerName: "Mike Brown",
    itemName: "Blue Jeans",
    size: "32x32",
    status: "Pending"
  },
  {
    id: 4,
    customerName: "Emily Davis",
    itemName: "Red Jacket",
    size: "Small",
    status: "Shipped"
  },
  {
    id: 5,
    customerName: "Chris Wilson",
    itemName: "Gray Sweatpants",
    size: "Large",
    status: "Canceled"
  }
];

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to my Apparel Order API");
});

app.get("/about", (req, res) => {
  res.send("This API is used to track apparel orders for customers.");
});

app.get("/status", (req, res) => {
  res.send("API is running");
});

app.get("/users", (req, res) => {
  const users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com"
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com"
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com"
    }
  ];

  res.json(users);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/info", (req, res) => {
  res.json({
    name: "Apparel Order API",
    version: "1.0",
    author: "Gavin Keller"
  });
});

app.get("/contact", (req, res) => {
  res.json({
    email: "gavinkeller236@gmail.com",
    message: "Contact Gavin for questions about this API."
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});