import { Button, Dropdown, Kbd, Label } from "@heroui/react";
import axios from "axios";
import { baseUrl } from "../../../const/env";
import { useContext } from "react";
import { authContext } from "../../../context/authcontext";
import { toast } from "react-toastify";
import { MdDeleteSweep } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdMoreVert } from 'react-icons/md';
import { LuFileEdit } from 'react-icons/lu';

const DropDownList = (postId) => {
  const {token} =useContext(authContext)

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

  return (
    <>
      <Dropdown>
         <Button aria-label="Menu" variant="secondary"><MdMoreVert/></Button>
         <Dropdown.Popover>
          <Dropdown.Menu onAction={(key)=>console.log(`Selected: ${key}`)}>
            <Dropdown.Item id="delete" onClick={()=>{mutate()}} textValue="Delete">
              <Label>Delete</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Content><MdDeleteSweep /></Kbd.Content>
              </Kbd>
            </Dropdown.Item>

            <Dropdown.Item id="edite" textValue="Edite">
              <Label>Edite</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Content><LuFileEdit/></Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Menu>
         </Dropdown.Popover>
      </Dropdown>
    </>
  );
}

export default DropDownList;
