import React from 'react'

export default function userProfile({ params: { id } }: any) {
    return (
        <div className='w-full min-h-screen bg-gray-700 flex flex-col items-center justify-center'>
            <h1>My Profile</h1>
            <p>user id is {id}</p>
        </div>
    )
}
