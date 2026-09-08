import * as z from "zod"


export const registerSchema = z.object({
  name:z.string().nonempty('name is required').min(3,'minLenght is 3 character').max(10,'maxLenght is 10 character'),
  username:z.string().nonempty('username is required').min(3,'minLenght is 3 character').max(10,'maxLenght is 10 character'),
  email:z.string().nonempty('email is rquired').email('enter avalid email'),
  password:z.string().nonempty('password is required').regex(/^.{8,}/,'password is required'),
  rePassword:z.string().nonempty('rePassword is required'),
  dateOfBirth:z.string().nonempty('date of birth is required').refine((dateVal)=>{
    let currentYear = new Date().getFullYear()
    let selectedYear = new Date(dateVal).getFullYear()
    let age = currentYear - selectedYear

    return age >=20
  },'age not allowed less than 20'),
  gender:z.enum(['female','male'],'choose male or female')

}).refine((data)=>data.password===data.rePassword,{
  message:'password and rePassword not matched',
  path:['rePassword']
})