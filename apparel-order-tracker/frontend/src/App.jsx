import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/orders";

const emptyForm = {
  customerName: "",
  itemName: "",
  size: "",
  quantity: 1,
  status: "Pending",
};

function App() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load orders.");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const isEditing = editingId !== null;
      const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessage(
        isEditing
          ? "Order updated successfully."
          : "Order added successfully."
      );

      setFormData(emptyForm);
      setEditingId(null);
      fetchOrders();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleEdit(order) {
    setEditingId(order.id);

    setFormData({
      customerName: order.customerName,
      itemName: order.itemName,
      size: order.size,
      quantity: order.quantity,
      status: order.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not delete the order.");
      }

      setMessage("Order deleted successfully.");

      if (editingId === id) {
        cancelEdit();
      }

      fetchOrders();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Full-Stack Order Management</p>
          <h1>Apparel Order Tracker</h1>
          <p className="hero-text">
            Add, manage, update, and remove customer apparel orders.
          </p>
        </div>
      </header>

      <main className="main-content">
        <section className="card form-section">
          <div className="section-heading">
            <div>
              <p className="section-label">
                {editingId ? "Update order" : "New order"}
              </p>

              <h2>
                {editingId ? "Edit Apparel Order" : "Create Apparel Order"}
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-form">
            <label>
              Customer Name
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </label>

            <label>
              Item Name
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Example: PIKE T-Shirt"
                required
              />
            </label>

            <label>
              Size
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              >
                <option value="">Select size</option>
                <option value="XS">XS</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
              </select>
            </label>

            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Ordered">Ordered</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <div className="form-buttons">
              <button type="submit" className="primary-button">
                {editingId ? "Save Changes" : "Add Order"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {message && <p className="message">{message}</p>}
        </section>

        <section className="card orders-section">
          <div className="section-heading">
            <div>
              <p className="section-label">Current orders</p>
              <h2>Order List</h2>
            </div>

            <span className="order-count">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </span>
          </div>

          {loading ? (
            <p className="empty-state">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="empty-state">
              There are no orders yet. Add your first order above.
            </p>
          ) : (
            <div className="order-grid">
              {orders.map((order) => (
                <article className="order-card" key={order.id}>
                  <div className="order-card-top">
                    <div>
                      <p className="order-number">Order #{order.id}</p>
                      <h3>{order.customerName}</h3>
                    </div>

                    <span
                      className={`status status-${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="order-details">
                    <p>
                      <strong>Item:</strong> {order.itemName}
                    </p>

                    <p>
                      <strong>Size:</strong> {order.size}
                    </p>

                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                  </div>

                  <div className="card-buttons">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => handleEdit(order)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;