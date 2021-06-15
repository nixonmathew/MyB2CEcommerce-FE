import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGauravForm } from "./apis";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const InitialState = {
  productCode: "",
  name: "",
  quantity: "",
  price: "",
};

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(InitialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof e.target);

    setLoading(true);
    let fd = new FormData();
    for (let i in formValues) {
      fd.set(i, formValues[i]);
    }
    console.log(fd);
    console.log(fd.entries());
    console.log(fd.values());
    await createGauravForm(fd)
      .then((res) => {
        setLoading(false);
        toast.success("Product created successfully");
      })
      .catch((err) => {
        if (err && err.response) {
          toast.error(err.response.data.err);
        } else {
          toast.error("Product creation failed");
        }
        setLoading(false);
      });
  };

  return (
    <div className="container p-3">
      {!loading ? (
        <h4>Create a new product</h4>
      ) : (
        <LoadingOutlined className="text-danger h1" />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group p-3">
          <label>Product Code</label>
          <input
            type="text"
            name="productCode"
            className="form-control"
            value={formValues.productCode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            className="form-control"
            value={formValues.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label>Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            value={formValues.price}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-outline-info">Save</button>
      </form>
    </div>
  );
};

export default Form;
