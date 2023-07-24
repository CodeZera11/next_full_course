"use client";

import { sendEmail } from '@/helpers/mailer';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function UserProfile({ params: { id } }: any) {

    return (
        <div className='w-full min-h-screen bg-gray-700 flex flex-col items-center justify-center'>
            <h1>My Profile</h1>
            <p>User id is {id}</p>
        </div>
    )
}
