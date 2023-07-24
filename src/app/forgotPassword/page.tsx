"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post("/api/users/forgotPassword", { email });
            if (response.data.message) {
                toast.success(response.data.message)
            } else if (response.data.error) {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-300 flex items-center justify-center'>
            <div className='w-[700px] h-[350px] bg-white flex flex-col gap-5 rounded-xl p-3 items-center'>
                <h1 className='text-4xl text-center mt-3 font-bold'>Forgot Your Password</h1>
                <p className='text-gray-500 text-sm'>Please enter the email address you would like your password reset information sent to</p>

                <form onSubmit={handleSubmit} className='flex items-center flex-col'>
                    <label htmlFor="email" className="leading-7 text-xl mt-10 text-gray-600">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className=" rounded-lg w-[200px] bg-gray-100 bg-opacity-50 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <button disabled={loading ? true : false} className='mt-5 rounded-full w-full mx-auto bg-slate-600 text-white disabled:bg-slate-400 p-3'>
                        {loading ? (
                            "loading..."
                        ) : (
                            "submit"
                        )}
                    </button>
                </form>
            </div>
        </div >
    )
}
