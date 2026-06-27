import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error loading orders:", error));
  }, []);

  function deleteOrder(id) {
    fetch(`http://localhost:3001/api/orders/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedOrders = orders.filter((order) => order.id !== id);
        setOrders(updatedOrders);
      })
      .catch((error) => console.error("Error deleting order:", error));
  }

  return (
    <div className="page">
      <h1>Current Apparel Orders</h1>
      <p>These orders are being loaded from the Express backend API.</p>

      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h2>{order.customerName}</h2>
            <p><strong>Email:</strong> {order.customerEmail}</p>
            <p><strong>Apparel Type:</strong> {order.apparelType}</p>
            <p><strong>Design:</strong> {order.designDescription}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <p><strong>Due Date:</strong> {order.dueDate}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice}</p>

            <button onClick={() => deleteOrder(order.id)}>
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;