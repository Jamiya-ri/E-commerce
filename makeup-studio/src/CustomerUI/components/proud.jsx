import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { NavLink } from "react-router-dom";

const CustomerSidebar = () => {

  const [categories, setCategories] =
    useState([]);

  useEffect(() => {

    const fetchCategories =
      async () => {

        try {

          const res = await axios.get(
            "http://localhost:5000/api/categories"
          );

          setCategories(res.data);

        } catch (err) {

          console.log(err);

        }

      };

    fetchCategories();

  }, []);

  return (

    <div>

      <h3>Products</h3>

      <ul>

        {categories.map((cat) => (

          <li key={cat._id}>

            <NavLink
              to={`/products/${cat.name}`}
            >
              {cat.name}
            </NavLink>

          </li>

        ))}

      </ul>

    </div>

  );

};

export default CustomerSidebar;