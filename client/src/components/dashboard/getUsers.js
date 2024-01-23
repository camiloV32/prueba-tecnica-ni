import { useState, useEffect } from 'react'
import globalVariables from "../../../config";
export function getData(){
    const [data, setData] = useState(null);
    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch(`${globalVariables.server.url}/crud/read`, {
                    "headers": {
                      "authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const jsonData = await response.json();
                setData(jsonData);
            }catch(err){
                throw err;
            }
        }
        fetchData();
    },[])
    return data;
}
