import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Title from "../../components/Title/Title";
import { Store } from "../../Context/Store";
import axios from "axios";
import { USER_SIGNIN } from "../../Reducers/Actions";
import { toast } from "react-toastify";

const SighUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const errSettings = {
    theme: "colored",
    hideProgressBar: true,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  }

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      toast.error("Passwords do not match", errSettings);
      return;
    }
    try {
      const { data } = await axios.post("users/signup", { email, password, name });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      navigate(redirect || "/");
    } catch (err) {
      toast.error(err.message, errSettings);
    }
  };

  return (
    <Container className="small-container">
      <Title>Sign up</Title>
      <h1 className="my-3">Sign up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" variant="primary">
            Sing up
          </Button>
        </div>
        <div className="mb-3">
          All ready have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SighUpPage;
