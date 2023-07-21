"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log("User logged in successfully", response.data);
            router.push("/profile")

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center  flex-col">
            <h1 className="text-3xl">Login Page</h1>
            <div className="mt-6 flex items-center justify-center flex-col">
                <label htmlFor="email" className="mx-2">Email:</label>
                <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="enter your email" className="rounded-full p-2" />

                <label htmlFor="password" className="mx-2">Password:</label>
                <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="enter your password" className="rounded-full p-2" />

                <button onClick={onLogin} className="rounded-full bg-black text-white p-3 mt-7 w-[100px]">{loading ? "Loading..." : "Login"}</button>

                <Link className="mt-2" href={"/signup"}>Visit Signup Page</Link>
            </div>
        </div>
    )
}
