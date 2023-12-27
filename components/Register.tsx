import React from 'react'
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";


export default function Register() {
  return (
    <div>
      <h1>Login or Register to continue</h1> 
      <div>
       <RegisterLink>Sign Up</RegisterLink>
       <LoginLink>Sign In</LoginLink>
      </div>
    </div>
  )
}