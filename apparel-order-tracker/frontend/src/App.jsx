import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import AddOrder from "./pages/AddOrder";
import About from "./pages/About";

function App() {
  return (
    <div>
      <nav className="navbar">
        <h2>Apparel Order Tracker</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/add-order">Add Order</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-order" element={<AddOrder />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;