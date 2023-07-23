"use client";

import { sendEmail } from '@/helpers/mailer';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function UserProfile({ params: { id } }: any) {

    const router = useRouter();
    const [verificationStatus, setVerificationStatus] = useState(false);

    

    const fetchUser = async () => {
        try {
            const user = await axios.get("/api/users/userProfile");
            console.log(user)
            const verifiedStatus = user.data.user.isVerified;

            // console.log()

            setVerificationStatus(verifiedStatus);
            // router.push('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-700 flex flex-col items-center justify-center'>
            <h1>My Profile</h1>
            <p>User id is {id}</p>
            {!verificationStatus && (
                <button onClick={fetchUser}>Verify your email</button>
            )}
        </div>
    )
}
