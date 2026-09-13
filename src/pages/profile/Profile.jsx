import { useContext } from "react";
import { userContext } from "../../context/userContext";
import axios from "axios";
import { baseUrl } from "../../const/env";
import imgCover from '../../assets/cover.webp';
import { useQuery } from "@tanstack/react-query";
import { authContext } from "../../context/authcontext";
import Loading from "../../components/shared/loading/Loading";
import CreatePost from "../../components/shared/craetePost/CreatePost";
import PostCard from "../../components/shared/postCard/PostCard";


const Profile = () => {

  let { userData } = useContext(userContext);

  let auth = useContext(authContext)
  if(!auth){
    throw new Error('there is an error')
  }
  let {token} = auth

  function getUserPasts(){
  return  axios.get(`${baseUrl}/users/${userData?.id}/posts`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }

let {data,isError,isLoading} =  useQuery({
    queryFn:getUserPasts,
    queryKey:['profilePost'],
    select:(data)=>data?.data.data.post

  })

  if(isLoading){
    return <Loading/>
  }
  if(isError){
    return <p className="text-center text-red-800">There is an error</p>
  }

  return (
    <>
    <Helmet>
         <title>Profile</title>
      </Helmet>
    <div className="bg-gray-200 ">
    {/* headers */}
      <div className="h-full p-8">
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="w-full h-70">
            {userData?.cover =='' ? 
             <img src={imgCover} className="w-full h-full rounded-tl-lg rounded-tr-lg"/> 
            :
            <img
              src={userData?.cover}
              alt=""
              className="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
            }
            
          </div>
          <div className="flex flex-col items-center -mt-20">
            <img src={userData?.photo} alt="" className="w-40 border-4 border-white rounded-full" />
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{userData?.name}</p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="MS 1314 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <p className="text-gray-700">{userData?.email} </p>
          </div>
        </div>
      </div>
      {/* user posts */}
<CreatePost/>
{data?.map((post)=>{
  return <PostCard {...post} singleDetails={false}/>
 
})}
</div>
    </>
    
  );
};

export default Profile;

// creative tim talwind
