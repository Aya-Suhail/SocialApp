import PostHeader from "../postHeader/PostHeader";
import PostComment from "../postComment/PostComment";
import { Link } from "react-router-dom";
import CreateComment from "../createComment/CreateComment";

const PostCard = (details) => {
  return (
    <>
      <div className=" max-h-screen py-5 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-xl">
          <PostHeader {...details} />
          {!details.singleDetails ? (
            <Link to={"/postDetails" + details._id}>
              <p className="text-sky-600 pt-3">Show Details</p>
            </Link>
          ) : null}
          <hr className="mt-2 mb-2" />
          <p className="text-gray-800 font-semibold">Comment</p>
          {/* creat comment */}
          <CreateComment postId={details._id}/>
          <hr className="mt-2 mb-2" />
          {details?.comments?.length > 0 ?
          
          details?.comments.map((comment)=>{
          return  <PostComment {...comment} />


          })
          
          :
          <>
          {details.topComment ? 
            <PostComment {...details.topComment} />:<p className="text-center text-slate-500">There is no comments</p>

            }
          </>
        }
          
        </div>
      </div>
    </>
  );
};

export default PostCard;
