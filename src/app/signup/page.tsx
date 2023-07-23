"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("UserWithToken", response.data)
            console.log("User signed up successfully", response.data);
            router.push("/login")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center  flex-col">
            <h1 className="text-3xl">Signup Page</h1>
            <div className="mt-6 flex items-center justify-center flex-col">
                <label htmlFor="username" className="mx-2">Username:</label>
                <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="enter your username" className="rounded-full p-2" />

                <label htmlFor="email" className="mx-2">Email:</label>
                <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="enter your email" className="rounded-full p-2" />

                <label htmlFor="password" className="mx-2">Password:</label>
                <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="enter your password" className="rounded-full p-2" />

                <button onClick={onSignup} className="rounded-full bg-black text-white p-3 mt-7 w-[100px]">{loading ? "loading..." : "signup"}</button>

                <div className="mt-2">
                    Already have an account?
                    <Link className="mt-2 text-blue-800 ml-2" href={"/login"}>Login here</Link>
                </div>
            </div>
        </div>
    )
}
