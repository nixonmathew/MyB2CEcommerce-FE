import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGauravForm } from "./apis";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const InitialState = {
  employeeId: "",
  firstName: "",
  lastName: "",
  email: "",
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
    // let fd = new FormData();
    // for (let i in formValues) {
    //   fd.set(i, formValues[i]);
    // }
    console.log(formValues);
    // console.log(fd.entries());
    // console.log(fd.values());
    await createGauravForm(formValues)
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
          <label>Employee Id</label>
          <input
            type="text"
            name="employeeId"
            className="form-control"
            value={formValues.employeeId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-3">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-outline-info">Save</button>
      </form>
    </div>
  );
};

export default Form;
