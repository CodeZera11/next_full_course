"use client";

import { sendEmail } from '@/helpers/mailer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


const ProfilePage = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)
    const [verificationStatus, setVerificationStatus] = useState(false);

    const logout = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/users/logout")
            console.log(response)

            router.push("/login")

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/users/userProfile');
            return response

        } catch (error) {
            toast.error("error in here baby")
            console.log(error)
        }
    }

    const userProfile = async () => {
        try {

            const response: any = await fetchUser();

            // console.log(response.data)
            if (response.data.success) {
                toast.success("Redirecting....")
            }
            const userId = response.data.user._id;

            router.push(`/profile/${userId}`)

        } catch (error) {
            toast.error("error in here baby")
            console.log(error)
        }
    }

    const getUser = async () => {
        try {
            const response: any = await fetchUser();
            const userId = response.data.user._id;

            setData(userId)

        } catch (error) {
            toast.error("error in here baby")
            console.log(error)
        }
    }

    const handleVerify = async () => {
        try {
            const response: any = await fetchUser();
            setVerificationStatus(response.data.user.isVerfied);

            const { email, _id } = await response.data.user;

            const emailType = "VERIFY"
            const userId = _id

            toast.loading("verifying email...")
            const emailsender = await axios.post("/api/users/sendEmail", { email, emailType, userId })
            console.log(emailsender)
            toast.dismiss()
            toast.success("Email Verified Successfully")
            setVerificationStatus(true)

        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gray-700'>
            <h1 className='text-4xl text-white'>Profile Page</h1>
            <p className='text-sm ml-[5.55rem] mt-2'>{
                verificationStatus ? (
                    <p className='text-green-500'>Verified</p>
                ) : (
                    <button onClick={handleVerify}>Click here to Verify</button>
                )
            }</p>
            <div className='mt-10 flex flex-col text-white justify-center items-center'>
                <p className='text'>User Details: {data ? `${data}` : "null"}</p>
                <button disabled={data ? true : false} className=' disabled:opacity-50 text-sm w-[150px] mt-3 bg-orange-500 text-black rounded-full px-4 py-2' onClick={getUser}>Get User Details</button>
            </div>
            <div className='mt-5'>
                <button onClick={userProfile} className='text-sm mt-3 bg-orange-500 text-black rounded-full px-2 py-2'>Go to my profile</button>
            </div>
            <button className='text-xl mt-3 bg-orange-500 text-black rounded-full px-4 py-2' onClick={logout}>{loading ? "loading..." : "Logout"}</button>
        </div >
    )
}

export default ProfilePage