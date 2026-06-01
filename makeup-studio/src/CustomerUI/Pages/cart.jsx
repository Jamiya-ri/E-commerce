import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./cart.css";

const Cart = () => {

  const [cartItems, setCartItems] =
    useState([]);

  // =========================
  // ORDER MODAL
  // =========================
  const [showForm, setShowForm] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [isCheckout, setIsCheckout] =
    useState(false);

  const [orderForm, setOrderForm] =
    useState({

      customerName: "",

      phone: "",

      address: "",

      city: "",

      pincode: "",

      paymentMethod:
        "Cash On Delivery",

      notes: "",

    });

  // =========================
  // FETCH CART
  // =========================
  useEffect(() => {

    const fetchCart =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/cart",
              {
                withCredentials: true,
              }
            );

          setCartItems(
            res.data
          );

        } catch (err) {

          console.log(err);

        }

      };

    fetchCart();

  }, []);

  // =========================
  // REMOVE ITEM
  // =========================
  const handleRemove =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/cart/${id}`,
          {
            withCredentials: true,
          }
        );

        setCartItems(

          cartItems.filter(
            (item) =>
              item._id !== id
          )

        );

      } catch (err) {

        console.log(err);

      }

    };

  // =========================
  // INCREASE QTY
  // =========================
  const increaseQty =
    async (id) => {

      try {

        await axios.put(
          `http://localhost:5000/api/cart/increase/${id}`,
          {},
          {
            withCredentials: true,
          }
        );

        setCartItems(

          cartItems.map((item) =>

            item._id === id

              ? {

                  ...item,

                  quantity:
                    item.quantity + 1,

                }

              : item

          )

        );

      } catch (err) {

        console.log(err);

      }

    };

  // =========================
  // DECREASE QTY
  // =========================
  const decreaseQty =
    async (id) => {

      try {

        await axios.put(
          `http://localhost:5000/api/cart/decrease/${id}`,
          {},
          {
            withCredentials: true,
          }
        );

        setCartItems(

          cartItems.map((item) =>

            item._id === id &&
            item.quantity > 1

              ? {

                  ...item,

                  quantity:
                    item.quantity - 1,

                }

              : item

          )

        );

      } catch (err) {

        console.log(err);

      }

    };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange =
    (e) => {

      setOrderForm({

        ...orderForm,

        [e.target.name]:
          e.target.value,

      });

    };

  // =========================
  // PLACE ORDER / CHECKOUT
  // =========================
  const handleOrder =
    async () => {

      try {

        // =====================
        // CHECKOUT ALL
        // =====================
        if (isCheckout) {

          await axios.post(

            "http://localhost:5000/api/orders/checkout",

            orderForm,

            {
              withCredentials: true,
            }

          );

          alert(
            "Orders placed successfully 🎉"
          );

          setCartItems([]);

        }

        // =====================
        // SINGLE ORDER
        // =====================
        else {

          await axios.post(

            `http://localhost:5000/api/orders/single-order/${selectedItem._id}`,

            orderForm,

            {
              withCredentials: true,
            }

          );

          alert(
            "Order placed successfully 🎉"
          );

          setCartItems(

            cartItems.filter(
              (cartItem) =>

                cartItem._id !==
                selectedItem._id
            )

          );

        }

        // =====================
        // RESET
        // =====================
        setShowForm(false);

        setSelectedItem(null);

        setIsCheckout(false);

        setOrderForm({

          customerName: "",

          phone: "",

          address: "",

          city: "",

          pincode: "",

          paymentMethod:
            "Cash On Delivery",

          notes: "",

        });

      } catch (err) {

        console.log(err);

        alert("Order failed");

      }

    };

  // =========================
  // TOTAL
  // =========================
  const total =
    cartItems.reduce(

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

          <h2>
            Shopping Cart
          </h2>

          <p>
            Review your selected products
          </p>

        </div>

        {/* EMPTY */}
        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <h3>
              Your cart is empty 🛒
            </h3>

          </div>

        ) : (

          <div className="cart-wrapper">

            {/* ITEMS */}
            <div className="cart-items">

              {cartItems.map(
                (item) => (

                  <div
                    className="cart-card"
                    key={item._id}
                  >

                    {/* IMAGE */}
                    <img
                      src={
                        item.productId.image
                      }
                      alt={
                        item.productId.name
                      }
                      className="cart-img"
                    />

                    {/* CONTENT */}
                    <div className="cart-content">

                      <h4>
                        {
                          item.productId.brand
                        }
                      </h4>

                      <p>
                        {
                          item.productId.name
                        }
                      </p>

                      <h5>
                        ₹
                        {
                          item.productId.price
                        }
                      </h5>

                      {/* QUANTITY */}
                      <div className="qty-box">

                        <button
                          onClick={() =>
                            decreaseQty(
                              item._id
                            )
                          }
                        >
                          -
                        </button>

                        <span>
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(
                              item._id
                            )
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
                        onClick={() => {

                          setSelectedItem(
                            item
                          );

                          setIsCheckout(
                            false
                          );

                          setShowForm(
                            true
                          );

                        }}
                      >

                        Order Now

                      </button>

                      {/* REMOVE */}
                      <button
                        className="remove-btn"
                        onClick={() =>
                          handleRemove(
                            item._id
                          )
                        }
                      >

                        Remove

                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* SUMMARY */}
            <div className="cart-summary">

              <h3>
                Order Summary
              </h3>

              <div className="summary-row">

                <span>
                  Total
                </span>

                <span>
                  ₹{total}
                </span>

              </div>

              <button
                className="checkout-btn"
                onClick={() => {

                  setIsCheckout(true);

                  setShowForm(true);

                }}
              >

                Proceed To Checkout

              </button>

            </div>

          </div>

        )}

      </div>

      {/* =========================
          ORDER MODAL
      ========================= */}
      {showForm && (

        <div className="order-modal">

          <div className="order-form-box">

            <h2>
              {isCheckout
                ? "Checkout Details"
                : "Order Details"}
            </h2>

            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={
                orderForm.customerName
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={
                orderForm.phone
              }
              onChange={
                handleChange
              }
            />

            <textarea
              name="address"
              placeholder="Address"
              value={
                orderForm.address
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={
                orderForm.city
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={
                orderForm.pincode
              }
              onChange={
                handleChange
              }
            />

            <select
              name="paymentMethod"
              value={
                orderForm.paymentMethod
              }
              onChange={
                handleChange
              }
            >

              <option>
                Cash On Delivery
              </option>

              <option>
                UPI
              </option>

            </select>

            <textarea
              name="notes"
              placeholder="Notes"
              value={
                orderForm.notes
              }
              onChange={
                handleChange
              }
            />

            <div className="order-modal-buttons">

              <button
                className="place-order-btn"
                onClick={
                  handleOrder
                }
              >

                {isCheckout
                  ? "Checkout Now"
                  : "Place Order"}

              </button>

              <button
                className="cancel-order-btn"
                onClick={() => {

                  setShowForm(false);

                  setIsCheckout(false);

                  setSelectedItem(null);

                }}
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Cart;