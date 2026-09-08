import axios from "axios";
import { baseUrl } from "../../const/env";



export async function sendData(data){
  let response = await axios.post(`${baseUrl}/users/signin`,data)
  return response
}