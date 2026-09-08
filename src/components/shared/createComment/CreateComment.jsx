import { Button, Input } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosImages } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { baseUrl } from "../../../const/env";
import { authContext } from "../../../context/authcontext";
import { toast } from "react-toastify";
import { userContext } from "../../../context/userContext";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const CreateComment = ({ postId }) => {
  const [imgFile, setFile] = useState(null);

    let auth = useContext(authContext);

  if (!auth) {
    throw new Error("there is error");
  }

  let { token } = auth;
  const {userData} = useContext(userContext)
  const { register, handleSubmit,reset:resetForm } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const inputFile = useRef(null);

  function getImageFile(e) {
    setFile(e.target.files?.[0] || null);
  }
  function createPostComment(commentData) {
    axios.post(`${baseUrl}/posts/${postId}/comments`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const query = useQueryClient()
  let { isPending, mutate } = useMutation({
    mutationFn: createPostComment,
    onSuccess: (res) => {
      resetForm()
      console.log("success", res.data?.message);
      toast.success(res.data?.message);
      query.invalidateQueries({queryKey:['allposts']}),
      query.invalidateQueries({queryKey:['profilePost',userData?._id]}),
      query.invalidateQueries({queryKey:['allComments']})

    }, 
    onError: (err) => {
      toast.error(err?.data?.message || "there is an error");
    },
  });

  function sendData(data) {
    // console.log(data);

    if (!data.content && !imgFile) return;
    const fd = new FormData();

    if (data.content) {
      fd.append("content", data.content);
    }

    if (imgFile) {
      fd.append("image", imgFile);
    }
    mutate(fd);
  }

  return (
    <form onSubmit={handleSubmit(sendData)}>
      <div className="flex items-center gap-x-1">
        <Input
          type="text"
          className="bg-slate-200"
          size={60}
          placeholder="Enter your comment ..."
          {...register("content")}
        />
        <IoIosImages
          onClick={() => inputFile.current?.click()}
          size={30}
          className="text-sky-800 cursor-pointer"
        />
        <Input onChange={getImageFile} ref={inputFile} type="file" hidden />
        <Button type="submit">
          {isPending ?
          <AiOutlineLoading3Quarters size={30} className="text-sky-700" animate-spin/>
            :     
           <LuSend size={30} className="text-sky-700" />     
        }
          
        </Button>
      </div>
    </form>
  );
};

export default CreateComment;

// npm i react-icons
