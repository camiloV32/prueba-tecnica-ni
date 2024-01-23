import React, {useState, useEffect, useContext} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Table, Spinner, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { BoxArrowDownLeft, Plus } from "react-bootstrap-icons";
import { getData } from "./getUsers";
import "./dashboard.css";
import User from "./user";
import { crudOperations } from "./crudOperations";

function Dashboard(){
    //hooks
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userObj, setUserObj] = useState({});
    const navigate = useNavigate();
    
    //Session
    let logout = (message = undefined) => {
        localStorage.removeItem("token");
          if(typeof message === "string")alert(message);
          navigate("/");
    };
    useEffect(()=>{
        setTimeout(()=>{
          logout("Session expired");
        },300000)
      },[])
    //Load content
    const data = getData();
    if(!!data && data.message)return <Navigate to="/"/>
    const loadContent = () =>{
        if(data){
            return data.map(user=>{return <User data={user} key={user.id} setUser={setUserObj} showModal={handleShow} deleteUser={handleDeleteUser}/>})
        }else{
            return <tr><td colSpan={6} className="text-center"><Spinner animation="border" variant="black"/></td></tr>;
        }
    }
    //Handle functions
    const crud = new crudOperations();
    const handleAddUser = async () => {
        await crud.create(userObj);
        setUserObj({});
        handleClose();
        window.location.reload();
    };
    const handleUpdateUser = async () =>{
        await crud.update(userObj);
        setUserObj({});
        handleClose();
        window.location.reload();
    };
    const handleDeleteUser = async (id) => {
        await crud.remove({id});
        window.location.reload();
    };
    return(
        <>
            <Row className="header">
                <Col lg={8} sm={4}><h2>Users Dashboard</h2></Col>
                <Col lg={2} sm={4}>
                    <Button variant="success" onClick={handleShow}><Plus/></Button>
                </Col>
                <Col lg={2} sm={4}>
                    <Button variant="danger" onClick={logout}><BoxArrowDownLeft/></Button>
                </Col>
            </Row>
            <Table className="custom-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Birthdate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {loadContent()}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{!!userObj.id?"Update user":"Create user"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={!!userObj.name?userObj.name:""} placeholder="John" autoFocus required onChange={(e)=>{setUserObj({...userObj,name:e.target.value})}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" value={!!userObj.lastName?userObj.lastName:""} placeholder="Doe" required onChange={(e)=>{setUserObj({...userObj,lastName:e.target.value})}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={!!userObj.email?userObj.email:""} placeholder="name@example.com" required onChange={(e)=>{setUserObj({...userObj,email:e.target.value})}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="birthdate">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control type="date" value={!!userObj.birthDate?userObj.birthDate.split("T").shift():""} placeholder="2000-01-01" required onChange={(e)=>{setUserObj({...userObj,birthDate:e.target.value})}}/>
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
                <Button variant="primary" onClick={()=>{
                    console.log(userObj);
                    return !!userObj.id ? handleUpdateUser():handleAddUser();
                }}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Dashboard;