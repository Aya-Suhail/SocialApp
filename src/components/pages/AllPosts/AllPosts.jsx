import axios from "axios";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "../../../context/authcontext";
import PostCard from "../../shared/postCard/PostCard";
import { baseUrl } from "../../../const/env";
import Loading from "../../shared/loading/Loading";
const AllPosts = () => {
  


  let auth = useContext(authContext);

  if (!auth) {
    throw new Error("there is error");
  }

  let { token } = auth;
 
  function getAllPosts() {
  return  axios
      .get(`${baseUrl}/posts?limit=10&sort=-createdAt`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
  }

let {data,isLoading,isError} = useQuery({
  queryFn:getAllPosts,
  queryKey:['allposts'],
  select:(data)=>data?.data.data.posts,
  

})

// console.log(data?.data.data.posts);

  





  

  if(isLoading){
    return <Loading/>

  }


  if(isError){
    return <p className="text-red-500 text-center text-xl py-10">There is an error in  posts</p> 

  }

  return (
    <>
      {data.map((post) => {
        return <PostCard key={post._id} {...post} singleDetails={false} />;
      })}
    </>
  );
};

export default AllPosts;
