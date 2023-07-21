"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onLogin = async () => {

    }


    return (
        <div className="min-h-screen flex items-center justify-center  flex-col">
            <h1 className="text-3xl">Login Page</h1>
            <div className="mt-6 flex items-center justify-center flex-col">
                <label htmlFor="email" className="mx-2">Email:</label>
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="enter your email" className="rounded-full p-2" />

                <label htmlFor="password" className="mx-2">Password:</label>
                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="enter your password" className="rounded-full p-2" />

                <button onClick={onLogin} className="rounded-full bg-black text-white p-3 mt-7 w-[100px]">SignUp</button>

                <Link className="mt-2" href={"/signup"}>Visit Signup Page</Link>
            </div>
        </div>
    )
}
