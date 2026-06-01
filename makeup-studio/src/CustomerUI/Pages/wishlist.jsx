import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./wishlist.css";

const Wishlist = () => {

  const [wishlist, setWishlist] =
    useState([]);

  // =========================
  // FETCH WISHLIST
  // =========================
  useEffect(() => {

    const fetchWishlist =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/wishlist",
              {
                headers: {
                  authorization:
                    window.token,
                },
              }
            );

          setWishlist(res.data);

        } catch (err) {

          console.log(err);

        }

      };

    fetchWishlist();

  }, []);

  // =========================
  // REMOVE WISHLIST
  // =========================
  const removeWishlist =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/wishlist/${id}`,
          {
            headers: {
              authorization:
                window.token,
            },
          }
        );

        setWishlist(
          wishlist.filter(
            (item) =>
              item._id !== id
          )
        );

      } catch (err) {

        console.log(err);

      }

    };

  // =========================
  // ADD TO CART
  // =========================
  const addToCart =
    async (productId) => {

      try {

        await axios.post(
          "http://localhost:5000/api/cart/add",

          {
            productId,
          },

          {
            headers: {
              authorization:
                window.token,
            },
          }
        );

        alert(
          "Added to cart 🛒"
        );

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
            "Cart failed"
        );

      }

    };

  return (
    <div className="wishlist-page">

      <div className="container">

        <h2 className="mb-5">
          My Wishlist ❤️
        </h2>

        <div className="row g-4">

          {wishlist.length === 0 ? (

            <div className="empty-wishlist">
              <h4>
                Wishlist is empty 💔
              </h4>
            </div>

          ) : (

            wishlist.map((item) => (

              <div
                className="col-lg-3 col-md-6"
                key={item._id}
              >

                <div className="wishlist-card">

                  {/* IMAGE */}
                  <img
                    src={
                      item.productId.image
                    }
                    alt={
                      item.productId.name
                    }
                  />

                  {/* CONTENT */}
                  <div className="wishlist-content">

                    <h4>
                      {
                        item.productId.name
                      }
                    </h4>

                    <h5>
                      {
                        item.productId.brand
                      }
                    </h5>

                    <p>
                      ₹
                      {
                        item.productId
                          .price
                      }
                    </p>

                    {/* BUTTONS */}
                    <div className=" row wishlist-buttons">
<div className="col-md-6">
    <button
                        className="wishlist-cart-btn"
                        onClick={() =>
                          addToCart(
                            item.productId._id
                          )
                        }
                      >
                        Add To Cart
                      </button>
</div>
<div className="col-md-6">
    <button
                        className="wishlist-remove-btn"
                        onClick={() =>
                          removeWishlist(
                            item._id
                          )
                        }
                      >
                        Remove
                      </button>
</div>

                      

                      

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default Wishlist;