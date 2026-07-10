// Imports everything the backend needs.
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Lets the frontend talk to the backend.
app.use(cors());
app.use(express.json());

const databasePath = path.join(__dirname, "orders.db");

// Connects to the SQLite database.
const db = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error("Database connection error:", error.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Creates the orders table if it doesn't exist.
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT NOT NULL,
    itemName TEXT NOT NULL,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'Pending'
  )
`);

// Home route just to test the server.
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Apparel Order Tracker API"
  });
});

// GET - Gets all orders.
app.get("/api/orders", (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY id DESC";

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({
        error: "Unable to retrieve orders."
      });
    }

    res.json(rows);
  });
});

// GET - Gets one order by its ID.
app.get("/api/orders/:id", (req, res) => {
  const sql = "SELECT * FROM orders WHERE id = ?";

  db.get(sql, [req.params.id], (error, row) => {
    if (error) {
      return res.status(500).json({
        error: "Unable to retrieve the order."
      });
    }

    // Makes sure the order exists.
    if (!row) {
      return res.status(404).json({
        error: "Order not found."
      });
    }

    res.json(row);
  });
});

// POST - Adds a new order.
app.post("/api/orders", (req, res) => {
  const {
    customerName,
    itemName,
    size,
    quantity = 1,
    status = "Pending"
  } = req.body;

  // Makes sure required fields aren't empty.
  if (!customerName || !itemName || !size) {
    return res.status(400).json({
      error: "Customer name, item name, and size are required."
    });
  }

  const numericQuantity = Number(quantity);

  // Makes sure the quantity is valid.
  if (!Number.isInteger(numericQuantity) || numericQuantity < 1) {
    return res.status(400).json({
      error: "Quantity must be a whole number greater than zero."
    });
  }

  const sql = `
    INSERT INTO orders
    (customerName, itemName, size, quantity, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Saves the new order to the database.
  db.run(
    sql,
    [customerName, itemName, size, numericQuantity, status],
    function (error) {
      if (error) {
        return res.status(500).json({
          error: "Unable to create the order."
        });
      }

      // Sends the new order back to the frontend.
      db.get(
        "SELECT * FROM orders WHERE id = ?",
        [this.lastID],
        (selectError, newOrder) => {
          if (selectError) {
            return res.status(500).json({
              error: "Order was created but could not be returned."
            });
          }

          res.status(201).json(newOrder);
        }
      );
    }
  );
});

// PUT - Updates an existing order.
app.put("/api/orders/:id", (req, res) => {
  const {
    customerName,
    itemName,
    size,
    quantity,
    status
  } = req.body;

  // Makes sure all fields are filled out.
  if (
    !customerName ||
    !itemName ||
    !size ||
    quantity === undefined ||
    !status
  ) {
    return res.status(400).json({
      error: "All order fields are required."
    });
  }

  const numericQuantity = Number(quantity);

  // Makes sure the quantity is valid.
  if (!Number.isInteger(numericQuantity) || numericQuantity < 1) {
    return res.status(400).json({
      error: "Quantity must be a whole number greater than zero."
    });
  }

  const sql = `
    UPDATE orders
    SET customerName = ?,
        itemName = ?,
        size = ?,
        quantity = ?,
        status = ?
    WHERE id = ?
  `;

  // Updates the order in the database.
  db.run(
    sql,
    [
      customerName,
      itemName,
      size,
      numericQuantity,
      status,
      req.params.id
    ],
    function (error) {
      if (error) {
        return res.status(500).json({
          error: "Unable to update the order."
        });
      }

      // Makes sure the order exists.
      if (this.changes === 0) {
        return res.status(404).json({
          error: "Order not found."
        });
      }

      // Sends the updated order back.
      db.get(
        "SELECT * FROM orders WHERE id = ?",
        [req.params.id],
        (selectError, updatedOrder) => {
          if (selectError) {
            return res.status(500).json({
              error: "Order was updated but could not be returned."
            });
          }

          res.json(updatedOrder);
        }
      );
    }
  );
});

// DELETE - Removes an order.
app.delete("/api/orders/:id", (req, res) => {
  const sql = "DELETE FROM orders WHERE id = ?";

  // Deletes the order from the database.
  db.run(sql, [req.params.id], function (error) {
    if (error) {
      return res.status(500).json({
        error: "Unable to delete the order."
      });
    }

    // Makes sure the order exists.
    if (this.changes === 0) {
      return res.status(404).json({
        error: "Order not found."
      });
    }

    res.json({
      message: "Order deleted successfully."
    });
  });
});

// Handles routes that don't exist.
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found."
  });
});

// Starts the backend server.
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});