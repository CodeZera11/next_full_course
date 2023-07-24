"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const verifyUserEmail = async () => {
        try {
            setLoading(true)
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])



    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl">Verify Email</h1>

            {loading && (
                <p className="mt-5 text-2xl">Loading...</p>
            )}

            {verified && !loading && (
                <>
                    <h1 className="text-2xl mt-5 text-green-500">Email Verified Successfully</h1>
                    <Link href={"/login"} className="mt-5 bg-orange-500 text-black p-2 rounded-lg text-lg ">Login</Link>
                </>
            )}

        </div>
    )
}
