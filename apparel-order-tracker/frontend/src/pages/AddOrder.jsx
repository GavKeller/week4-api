import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    apparelType: "",
    designDescription: "",
    quantity: "",
    dueDate: "",
    totalPrice: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/orders");
      })
      .catch((error) => console.error("Error adding order:", error));
  }

  return (
    <div className="page">
      <h1>Add New Apparel Order</h1>

      <form className="order-form" onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <label>Customer Email</label>
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          required
        />

        <label>Apparel Type</label>
        <input
          type="text"
          name="apparelType"
          placeholder="T-Shirt, Hoodie, Hat, etc."
          value={formData.apparelType}
          onChange={handleChange}
          required
        />

        <label>Design Description</label>
        <textarea
          name="designDescription"
          value={formData.designDescription}
          onChange={handleChange}
          required
        ></textarea>

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <label>Total Price</label>
        <input
          type="number"
          name="totalPrice"
          value={formData.totalPrice}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Order</button>
      </form>
    </div>
  );
}

export default AddOrder;