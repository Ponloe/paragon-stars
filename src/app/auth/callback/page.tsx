"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function AuthCallbackPage() {
    const searchParams = useSearchParams()

    useEffect(() => {
        const token = searchParams.get('token')
        const user = searchParams.get('user')
        const errorParam = searchParams.get('error')

        if (errorParam) {
            window.location.href = `/auth?error=${Error}`
            return
        }

        if (token && user) {
            try {
                const userData = JSON.parse(decodeURIComponent(user))

                localStorage.setItem("isAuthenticated", "true")
                localStorage.setItem("authToken", token)
                localStorage.setItem("userEmail", userData.email)
                localStorage.setItem("userData", JSON.stringify(userData))

                window.location.href = "/"
            } catch (err) {
                window.location.href = `/auth?error=${encodeURIComponent("Failed to process authentication data")}`
            }
        } else {
            window.location.href = `/auth?error=Missing authentication data`
        }
    }, [searchParams])

    return (
        <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing authentication...</p>
        </div>
      </div>
    )
}