import axios from "axios";
import PostCard from "../../shared/postCard/PostCard";
import { useContext } from "react";
import { authContext } from "../../../context/authcontext";
import { baseUrl } from "../../../const/env";
import { useQuery } from "@tanstack/react-query";


const PostComments = (postDetails) => {


  let auth = useContext(authContext);
  
    if (!auth) {
      throw new Error("there is error");
    }
  
    let { token } = auth;


  function getPostComment(){
    return  axios.get(`${baseUrl}/posts/${postDetails._id}/comments?page=1&limit=10`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  }


  let {data}= useQuery({
  queryFn:getPostComment,
  queryKey:['allComments'],
  select:(data)=>data.data.data.comments

})

console.log(data);

  return (
    <div>
      <PostCard {...data} {...postDetails} singleDetails={true}/>
    </div>
  );
}

export default PostComments;
