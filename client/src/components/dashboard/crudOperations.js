import globalVariables from "../../../config";
import axios from "axios";
const header =  {
    "headers":{
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
}
export class crudOperations{
    async create(user){
        try {
            axios.post(`${globalVariables.server.url}/crud/create`,user).then((response)=>{
                return response;
            })

        } catch (error) {
            return error;
        }
    }
    update(user){
        try {
            axios.post(`${globalVariables.server.url}/crud/update`,user,header).then((response)=>{
                return response;
            })
        } catch (error) {
            return error;
        }
    }
    remove(id){
        try{
            axios.post(`${globalVariables.server.url}/crud/delete`,id,header).then((response)=>{
                return response;
            })
        }catch (error) {
            return error;
        }
    }
};