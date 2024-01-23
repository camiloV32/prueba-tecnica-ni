import React from "react";
import { Button } from "react-bootstrap";
import { TrashFill, ArrowBarUp } from "react-bootstrap-icons";
import { crudOperations } from "./crudOperations";

function User(props){
    let userData = props.data;
    userData.birthDate = userData.birthDate.split("T").shift();
    return(
        <tr id={`user-${userData.id}`}>
            <td>{userData.name}</td>
            <td>{userData.lastName}</td>
            <td>{userData.email}</td>
            <td>{userData.birthDate}</td>
            <td><Button variant="success" onClick={()=>{
                props.setUser(userData);
                props.showModal();
            }}><ArrowBarUp/></Button></td>
            <td><Button variant="danger" onClick={()=>{
                props.deleteUser(userData.id);
            }}><TrashFill/></Button></td>
        </tr>
    );
}

export default User;