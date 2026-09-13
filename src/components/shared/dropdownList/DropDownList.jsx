import { Button, Dropdown, Kbd, Modal,Label , Input } from "@heroui/react";
import axios from "axios";
import { baseUrl } from "../../../const/env";
import { useContext, useRef, useState } from "react";
import { authContext } from "../../../context/authcontext";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosImages } from "react-icons/io";
import { useForm } from "react-hook-form";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";



const DropDownList = (postId) => {
  const {token} =useContext(authContext)
  let [imageFile,setFile]= useState(null)
  let [imageSrc,setSrc]= useState('')
  let inputFile = useRef(null)
  const [isEditModalOpen,setIsEdit] = useState(false)

  function deletePost(){
    axios.delete(`${baseUrl}/posts/${postId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
const queryClient = useQueryClient();
let {mutate}= useMutation({
    mutationFn:deletePost,
    onSuccess:(res)=>{
      console.log(res);
      toast.success(res.data.message)
      queryClient.invalidateQueries({queryKey:['allposts']}),
      queryClient.invalidateQueries({queryKey:['profilePost']})
    },
    onError:(err)=>{
      console.log(err);
    }

  })

  // edit

 let {register,handleSubmit}= useForm({
    defaultValues:{
        body:''
    }
   })

       function getFileImage(e){
      setFile(e.target.files[0])
      setSrc(URL.createObjectURL(e.target.files[0]))
   }
   
   

    function sendData(data){
   
        let fd = new FormData()
   
        if(!data.body && !imageFile) return 
   
        if(data.body){
        fd.append('body',data.body)
        }
        if(imageFile){
        fd.append('image',imageFile)
        }
   
        setIsEdit(false)
        EditPostMutate(fd)
       }
   
   
   
      async function EditPost(fd){
          let {data}=await axios.put(`${baseUrl}/posts/${postId}`,fd,{
               headers:{
                   Authorization:`Bearer ${token}`
               }
           })
   
         return data.data
       }

        let {mutate:EditPostMutate} = useMutation({
        mutationFn:EditPost,
        onSuccess:(res)=>{
              console.log('response' ,res)
              toast.success('post edit successfully !')
        queryClient.invalidateQueries({queryKey:['allposts']}),
        queryClient.invalidateQueries({queryKey:['profileposts']})
        }
       })

  return (
    <>
      <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        <HiDotsVertical />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="delete" onClick={()=>{mutate()}} textValue="Delete">
            <Label>Delete</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Content><RiDeleteBin3Line  className="text-red-800"/></Kbd.Content>
            </Kbd>
          </Dropdown.Item>

          <Dropdown.Item   onClick={()=>setIsEdit(true)} id="edit" textValue="Edit">
             <Label>Edit</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Content><FaEdit  className="text-sky-800"/></Kbd.Content>
            </Kbd>
        </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown.Popover>

       {/* Edit */}
      <Modal isOpen={isEditModalOpen}>
      {/* <Button variant="secondary">Edit</Button> */}
      <Modal.Backdrop>
        <Modal.Container>
      <form onSubmit={handleSubmit(sendData)} className="my-5">
          <Modal.Dialog className="sm:max-w-90">
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
              </Modal.Icon>
              <Modal.Heading>update Post</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
                     <Input {...register('body')} type="text" placeholder="what is in your mind...!"  className='bg-gray-200 w-full'/>
             
                     <div className="flex justify-end items-center">
                         <Input onChange={getFileImage} type="file" hidden  ref={inputFile}/>
                         {imageSrc !== '' ? 
                         <img src={imageSrc} className="w-25 m-3" alt='....'/>
                           :null  
                          }
                         <IoIosImages onClick={() => inputFile.current?.click()}  size={25} className="text-sky-700" />
                       
             
                     </div>
                 
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" className="w-full" slot="close">
                Edit Post
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
            </form>
        </Modal.Container>
      </Modal.Backdrop>

    </Modal>

    </Dropdown>
    </>
  );
}

export default DropDownList;
