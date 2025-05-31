"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Chrome, GraduationCap, Users, Shield, Sparkles } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setError(decodeURIComponent(errorParam))
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
        setError("Failed to process authentication data")
      }
    }
  }, [searchParams])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError("")

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
      window.location.href = `${backendUrl}/auth/google`
    } catch (err) {
      setError("Failed to initiate Google sign-in")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Auth Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Paragon Stars
            </CardTitle>
            <p className="text-gray-600 mt-2">Connect with your university community</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Features Preview */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Discover amazing students in your university</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>Explore interests, projects, and achievements</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure access with your university email</span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* Google Sign In Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  <span>Redirecting to Google...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Chrome className="h-5 w-5" />
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>

            {/* University Email Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">University Access Only</h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Please sign in with your university email address (@paragoniu.edu.kh) to access Paragon Stars.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy. Only university students and staff
              can access this platform.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}