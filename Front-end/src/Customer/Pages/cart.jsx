import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  // =========================
  // FETCH CART
  // =========================
  useEffect(() => {

    const fetchCart = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/cart",
          {
            headers: {
              authorization: window.token,
            },
          }
        );

        setCartItems(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchCart();

  }, []);

  // =========================
  // REMOVE ITEM
  // =========================
  const handleRemove = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/cart/${id}`,
        {
          headers: {
            authorization: window.token,
          },
        }
      );

      setCartItems(
        cartItems.filter(
          (item) => item._id !== id
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  // =========================
  // INCREASE QUANTITY
  // =========================
  const increaseQty = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/cart/increase/${id}`,
        {},
        {
          headers: {
            authorization: window.token,
          },
        }
      );

      setCartItems(
        cartItems.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  // =========================
  // DECREASE QUANTITY
  // =========================
  const decreaseQty = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/cart/decrease/${id}`,
        {},
        {
          headers: {
            authorization: window.token,
          },
        }
      );

      setCartItems(
        cartItems.map((item) =>
          item._id === id &&
          item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  // =========================
  // SINGLE PRODUCT ORDER
  // =========================
 const handleOrder = async (item) => {

  try {

    await axios.post(

      `http://localhost:5000/api/orders/single-order/${item._id}`,

      {},

      {
        headers: {
          authorization: window.token,
        },
      }
    );

    alert("Order placed successfully 🎉");

    // REMOVE FROM UI
    setCartItems(
      cartItems.filter(
        (cartItem) =>
          cartItem._id !== item._id
      )
    );

  } catch (err) {

    console.log(err);

    alert("Order failed");

  }

};

  // =========================
  // CHECKOUT ALL PRODUCTS
  // =========================
  const handleCheckout = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/orders/checkout",

        {},

        {
          headers: {
            authorization: window.token,
          },
        }
      );

      alert("Order placed successfully 🎉");

      // CLEAR UI
      setCartItems([]);

    } catch (err) {

      console.log(err);

      alert("Checkout failed");

    }

  };

  // =========================
  // TOTAL PRICE
  // =========================
  const total = cartItems.reduce(
    (acc, item) =>
      acc +
      item.productId.price *
        item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <div className="container">

        {/* HEADER */}
        <div className="cart-header">

          <h2>Shopping Cart</h2>

          <p>
            Review your selected products
          </p>

        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <h3>
              Your cart is empty 🛒
            </h3>

          </div>

        ) : (

          <div className="cart-wrapper">

            {/* CART ITEMS */}
            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-card"
                  key={item._id}
                >

                  {/* IMAGE */}
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="cart-img"
                  />

                  {/* CONTENT */}
                  <div className="cart-content">

                    <h4>
                      {item.productId.brand}
                    </h4>

                    <p>
                      {item.productId.name} 
                    </p>

                    <h5>
                      ₹{item.productId.price}
                    </h5>

                    {/* QUANTITY */}
                    <div className="qty-box">

                      <button
                        onClick={() =>
                          decreaseQty(item._id)
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item._id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="cart-actions">

                    {/* ORDER */}
                    <button
                      className="order-btn"
                      onClick={() =>
                        handleOrder(item)
                      }
                    >
                      Order Now
                    </button>

                    {/* REMOVE */}
                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemove(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* SUMMARY */}
            <div className="cart-summary">

              <h3>
                Order Summary
              </h3>

              <div className="summary-row">

                <span>Total</span>

                <span>
                  ₹{total}
                </span>

              </div>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Cart;