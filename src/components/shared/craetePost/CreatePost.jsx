import { Button, Input } from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { userContext } from "../../../context/userContext";
import { IoIosImages } from "react-icons/io";
import axios from "axios";
import { baseUrl } from "../../../const/env";
import { authContext } from "../../../context/authcontext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CreatePost = () => {
  let { userData } = useContext(userContext);
  let auth = useContext(authContext);

  if (!auth) {
    throw new Error("there is error");
  }

  let { token } = auth;
  let inputFile = useRef(null);
  let [imageFile, setFile] = useState(null);
  let [imageSrc , setSrc] = useState('')
  let { register, handleSubmit , reset:resetForm } = useForm({
    defaultValue: {
      body: "",
    },
  });

  function sendData(data) {
    const fd = new FormData();

    if (!data.body && !imageFile) return;

    if (data.body) {
      fd.append("body", data.body);
    }

    if (imageFile) {
      fd.append("image", imageFile);
    }
    mutate(fd);
  }

  async function createUserPost(fd) {
    let { data } = await axios.post(`${baseUrl}/posts`, fd, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data.data;
  }

  const query = useQueryClient()

  let { mutate } = useMutation({
    mutationFn: createUserPost,
    onSuccess: () => {
      setSrc('')
      resetForm()
      setFile(null)
      toast.success('post created successfully');
      query.invalidateQueries({ queryKey: ["allposts"] }),
      query.invalidateQueries({ queryKey: ["profilePost"] })

         }
        
        });
    


  function getFileImage(e) {
    setFile(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <>
      <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl">
        <div className="flex items-start px-4 py-6 w-full">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src={userData?.photo}
            alt=""
          />
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                {userData?.name}
              </h2>
            </div>
            <p className="text-gray-700"> cteate post</p>
            <form className="my-5" onSubmit={handleSubmit(sendData)}>
              <Input
                {...register("body")}
                type="text"
                placeholder="what is in mind...!"
                size={80}
                className="bg-gray-200"
              />
              <div className="flex justify-end items-center">
                <Input
                  onChange={getFileImage}
                  type="file"
                  hidden
                  ref={inputFile}
                />
                {imageSrc !== '' ? 
                <img src={imageSrc} className="w-25 m-3" />
                :null

              }
                <IoIosImages
                  onClick={() => inputFile.current?.click()}
                  size={30}
                  className="text-sky-800 cursor-pointer"
                />
                <Button className="bg-transparent" type="submit">
                  <LuSend className="text-sky-700" />
                </Button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
