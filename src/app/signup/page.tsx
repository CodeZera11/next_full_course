"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onSignup = async () => {

    }


    return (
        <div className="min-h-screen flex items-center justify-center  flex-col">
            <h1 className="text-3xl">Signup Page</h1>
            <div className="mt-6 flex items-center justify-center flex-col">
                <label htmlFor="username" className="mx-2">Username:</label>
                <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="enter your username" className="rounded-full p-2" />

                <label htmlFor="email" className="mx-2">Email:</label>
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="enter your email" className="rounded-full p-2" />

                <label htmlFor="password" className="mx-2">Password:</label>
                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="enter your password" className="rounded-full p-2" />

                <button onClick={onSignup} className="rounded-full bg-black text-white p-3 mt-7 w-[100px]">SignUp</button>

                <Link className="mt-2" href={"/login"}>Visit Login Page</Link>
            </div>
        </div>
    )
}
