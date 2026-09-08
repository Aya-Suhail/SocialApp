import axios from "axios";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { authContext } from "../../../context/authcontext";
import { baseUrl } from "../../../const/env";
import Loading from "../../shared/loading/Loading";
import PostComments from "../postComments/PostComments";


const PostDetails = () => {

let {Id} =  useParams()
  let auth = useContext(authContext);

  if (!auth) {
    throw new Error("there is error");
  }

  let { token } = auth;

function getPostDetails(){
return  axios.get(`${baseUrl}/posts/${Id}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
}


   


let {data,isLoading,isError}= useQuery({
  queryFn:getPostDetails,
  queryKey:['postDetails', Id],
  select:(data)=>data?.data.data.post
})

  if(isLoading){
    return <Loading/>

  }


  if(isError){
    return <p className="text-red-500 text-center text-xl py-10">There is an error in  posts</p> 

  }
  return (
    <>
    <PostComments {...data} singleDetails={true}/>
    
       
    </>
  );
}

export default PostDetails;
