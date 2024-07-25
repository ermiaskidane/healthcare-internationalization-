"use client";

import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
const router = useRouter()
  const LogOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const accessKey = localStorage.getItem("accessKey");
    // console.log("asdfgdd", accessKey)

    // localStorage.clear();

    localStorage.removeItem("accessKey");
    router.push("/")
  }
  return(
    <Button onClick={(e) => LogOut(e)} variant="ghost" >Logout</Button>
  )
}