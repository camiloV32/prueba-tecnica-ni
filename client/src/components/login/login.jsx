import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, FloatingLabel, Modal } from "react-bootstrap";
import "./login.css";
import globalVariables from "../../../config";
import { crudOperations } from "../dashboard/crudOperations";
import Logo from "../../assets/images/logo.png";

function login(){
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow1(false);
  const handleShow = () => setShow1(true);

  const [userObj, setUserObj] = useState({});

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let dataSend = {email:inputEmail,password:btoa(inputPassword)};
    axios.post(globalVariables.server.url+"/login",dataSend)
      .then(function(res){
          localStorage.setItem("token",res.data.token);
          navigate("/dashboard");
      })
    setLoading(false);
  };
  const crud = new crudOperations();
  const handleCreateUser = async() => {
    await crud.create(userObj);
    setUserObj({});
    handleClose();
    window.location.reload();
  };
  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect email or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <FloatingLabel controlId="floatingInput" label="Email">
            <Form.Control
              type="text"
              value={inputEmail}
              placeholder="Username"
              onChange={(e) => setinputEmail(e.target.value)}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <FloatingLabel controlId="floatingInput" label="Password">
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </FloatingLabel>
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handleShow}
          >
            Create user
          </Button>
        </div>
      </Form>
      <Modal show={show1} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{!!userObj.id?"Update user":"Create user"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="John" autoFocus required onChange={(e)=>{setUserObj({...userObj,name:e.target.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastname">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control type="text" placeholder="Doe" required onChange={(e)=>{setUserObj({...userObj,lastName:e.target.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" required onChange={(e)=>{setUserObj({...userObj,email:e.target.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="birthdate">
                  <Form.Label>Birthdate</Form.Label>
                  <Form.Control type="date" placeholder="2000-01-01" required onChange={(e)=>{setUserObj({...userObj,birthDate:e.target.value})}}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e)=>{setUserObj({...userObj,password:e.target.value})}}/>
                  </Form.Group>
              </Form>
            </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default login;