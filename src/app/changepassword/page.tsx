"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ChangePassword() {

    const router = useRouter();
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false)


    const changeUserPassword = async (e: any) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true)
            const response = await axios.post("/api/users/changePassword", { token, password })
            if (response.data.message) {
                toast.success(response.data.message)
                router.push("/login")
            } else if (response.data.error) {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken)
    }, [])


    return (
        <div className='w-full min-h-screen bg-gray-300 flex items-center justify-center'>
            <div className='w-[50%] bg-white flex flex-col gap-5 rounded-xl p-5 items-center'>
                <h1 className='text-4xl text-center mt-3 font-bold'>Reset Your Password</h1>
                <p className='text-gray-500 text-sm'>Please enter new password in the box below.</p>

                <form onSubmit={changeUserPassword} className='flex items-center flex-col'>
                    <label htmlFor="password" className="leading-7 text-xl mt-7 text-gray-600">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className=" rounded-lg w-[200px] bg-gray-100 bg-opacity-50 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <label htmlFor="password" className="leading-7 text-xl mt-7 text-gray-600">Confirm Password</label>
                    <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} type="password" id="password" name="password" className=" rounded-lg w-[200px] bg-gray-100 bg-opacity-50 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <button className='mt-5 mb-5 rounded-full w-full mx-auto bg-slate-600 text-white disabled:bg-slate-400 p-3'>
                        {loading ? "loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div >
    )
}
