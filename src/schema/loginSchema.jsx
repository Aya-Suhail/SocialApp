import * as z from "zod"


export const loginSchema = z.object({
  email:z.string().nonempty('email is rquired').email('enter avalid email'),
  password:z.string().nonempty('password is required').regex(/^.{8,}/,'password is required'),

})