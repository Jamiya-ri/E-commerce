import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/products/my-products",
          {
            withCredentials: true,
          }
        );

        setProducts(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchProducts();

  }, []);

  return (

    <div>

      <h2>My Products</h2>

      {products.map((product) => (

        <div key={product._id}>

          <h3>{product.name}</h3>

          <p>{product.category}</p>

          <p>₹{product.price}</p>

        </div>

      ))}

    </div>

  );

};

export default MyProducts;