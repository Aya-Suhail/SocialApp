

const PostComment = ({content,commentCreator:{name,photo}}) => {
  return (
      <>
  
      <div className="mt-4">
            {/* Comment 1 */}
            <div className="flex items-center space-x-2">
              <img
                src={photo}
                alt="User Avatar"
                className="w-6 h-6 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">{name}</p>
                <p className="text-gray-500 text-sm">{content}</p>
              </div>
            </div>
            
          </div>
    </>
  );
}

export default PostComment;
