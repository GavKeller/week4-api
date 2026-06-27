const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let orders = [
  {
    id: 1,
    customerName: "John Smith",
    customerEmail: "john@example.com",
    apparelType: "T-Shirt",
    designDescription: "Logo on front",
    quantity: 24,
    orderStatus: "In Progress",
    dueDate: "2026-07-10",
    totalPrice: 240
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    apparelType: "Hoodie",
    designDescription: "Back print with small chest logo",
    quantity: 12,
    orderStatus: "Pending",
    dueDate: "2026-07-15",
    totalPrice: 420
  },
  {
    id: 3,
    customerName: "Mike Brown",
    customerEmail: "mike@example.com",
    apparelType: "Hat",
    designDescription: "Embroidered logo",
    quantity: 30,
    orderStatus: "Completed",
    dueDate: "2026-07-01",
    totalPrice: 300
  }
];

app.get("/", (req, res) => {
  res.send("Apparel Order Tracker API is running");
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    apparelType: req.body.apparelType,
    designDescription: req.body.designDescription,
    quantity: Number(req.body.quantity),
    orderStatus: "Pending",
    dueDate: req.body.dueDate,
    totalPrice: Number(req.body.totalPrice)
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.delete("/api/orders/:id", (req, res) => {
  const orderId = Number(req.params.id);
  orders = orders.filter((order) => order.id !== orderId);

  res.json({ message: "Order deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});