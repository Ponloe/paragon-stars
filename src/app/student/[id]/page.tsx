"use client"

import React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  User,
  GraduationCap,
  Building,
  Users,
  BadgeIcon as IdCard,
  UserCheck,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Globe,
  ArrowLeft,
} from "lucide-react"

const studentsData = [
  {
    student_id: "123",
    Name: "Polo",
    "ID Number": "123",
    Faculty: "Faculty of Engineering",
    Department: "Department of Architecture",
    "Enrollment Status": "Withdraw",
    profile_picture_path: "images/2123.jpg",
    email: "polo@university.edu",
    year: "3rd Year",
    bio: "Building dreams, one blueprint at a time! 🏗️",
    interests: ["Sustainable Design", "3D Modeling", "Urban Planning"],
    favoriteSpot: "Design Lab",
    mood: "Creative",
    social_media: {
      linkedin: "https://linkedin.com/in/polo-arch",
      twitter: "@polo_architect",
      instagram: "@polo.designs",
      github: "polo-dev",
      portfolio: "https://polo-portfolio.com",
    },
  },
  {
    student_id: "124",
    Name: "Sarah Johnson",
    "ID Number": "124",
    Faculty: "Faculty of Science",
    Department: "Department of Computer Science",
    "Enrollment Status": "Active",
    profile_picture_path: "images/2124.jpg",
    email: "sarah.johnson@university.edu",
    year: "2nd Year",
    bio: "Coding the future, one line at a time! 💻✨",
    interests: ["AI/ML", "Web Development", "Game Design"],
    favoriteSpot: "Innovation Hub",
    mood: "Focused",
    social_media: {
      linkedin: "https://linkedin.com/in/sarah-johnson",
      twitter: "@sarah_codes",
      instagram: "@sarah.dev",
      github: "sarah-johnson",
      portfolio: "https://sarah-dev.com",
    },
  },
  {
    student_id: "125",
    Name: "Michael Chen",
    "ID Number": "125",
    Faculty: "Faculty of Engineering",
    Department: "Department of Mechanical Engineering",
    "Enrollment Status": "Active",
    profile_picture_path: "images/2125.jpg",
    email: "michael.chen@university.edu",
    year: "4th Year",
    bio: "Turning ideas into reality through engineering! ⚙️",
    interests: ["Robotics", "3D Printing", "Automation"],
    favoriteSpot: "Maker Space",
    mood: "Innovative",
    social_media: {
      linkedin: "https://linkedin.com/in/michael-chen",
      twitter: "@mike_engineer",
      instagram: "@mike.builds",
      github: "michael-chen",
      portfolio: "https://michael-engineering.com",
    },
  },
  {
    student_id: "126",
    Name: "Emily Rodriguez",
    "ID Number": "126",
    Faculty: "Faculty of Arts",
    Department: "Department of Fine Arts",
    "Enrollment Status": "Active",
    profile_picture_path: "images/2126.jpg",
    email: "emily.rodriguez@university.edu",
    year: "1st Year",
    bio: "Painting the world with colors and imagination! 🎨",
    interests: ["Digital Art", "Photography", "Sculpture"],
    favoriteSpot: "Creative Studio",
    mood: "Inspired",
    social_media: {
      linkedin: "https://linkedin.com/in/emily-rodriguez",
      twitter: "@emily_creates",
      instagram: "@emily.art",
      github: "emily-creates",
      portfolio: "https://emily-art.com",
    },
  },
  {
    student_id: "127",
    Name: "David Kim",
    "ID Number": "127",
    Faculty: "Faculty of Business",
    Department: "Department of Marketing",
    "Enrollment Status": "Active",
    profile_picture_path: "images/2127.jpg",
    email: "david.kim@university.edu",
    year: "3rd Year",
    bio: "Connecting brands with hearts and minds! 📈",
    interests: ["Digital Marketing", "Brand Strategy", "Analytics"],
    favoriteSpot: "Collaboration Zone",
    mood: "Ambitious",
    social_media: {
      linkedin: "https://linkedin.com/in/david-kim",
      twitter: "@david_biz",
      instagram: "@david.marketing",
      github: "david-kim",
      portfolio: "https://david-marketing.com",
    },
  },
  {
    student_id: "128",
    Name: "Lisa Thompson",
    "ID Number": "128",
    Faculty: "Faculty of Science",
    Department: "Department of Biology",
    "Enrollment Status": "Active",
    profile_picture_path: "images/2128.jpg",
    email: "lisa.thompson@university.edu",
    year: "2nd Year",
    bio: "Exploring life's mysteries through science! 🔬",
    interests: ["Genetics", "Marine Biology", "Research"],
    favoriteSpot: "Research Lab",
    mood: "Curious",
    social_media: {
      linkedin: "https://linkedin.com/in/lisa-thompson",
      twitter: "@lisa_science",
      instagram: "@lisa.research",
      github: "lisa-thompson",
      portfolio: "https://lisa-biology.com",
    },
  },
  {
    student_id: "129",
    Name: "Alex Rivera",
    "ID Number": "129",
    Faculty: "Faculty of Science",
    Department: "Department of Mathematics",
    "Enrollment Status": "Active",
    profile_picture_path: "images/2129.jpg",
    email: "alex.rivera@university.edu",
    year: "4th Year",
    bio: "Finding beauty in numbers and equations! ∞",
    interests: ["Pure Mathematics", "Statistics", "Cryptography"],
    favoriteSpot: "Quiet Study Room",
    mood: "Analytical",
    social_media: {
      linkedin: "https://linkedin.com/in/alex-rivera",
      twitter: "@alex_math",
      instagram: "@alex.equations",
      github: "alex-rivera",
      portfolio: "https://alex-math.com",
    },
  },
  {
    student_id: "130",
    Name: "Maya Patel",
    "ID Number": "130",
    Faculty: "Faculty of Arts",
    Department: "Department of Music",
    "Enrollment Status": "Active",
    profile_picture_path: "images/2130.jpg",
    email: "maya.patel@university.edu",
    year: "2nd Year",
    bio: "Creating melodies that touch the soul! 🎵",
    interests: ["Composition", "Piano", "Music Theory"],
    favoriteSpot: "Practice Rooms",
    mood: "Harmonious",
    social_media: {
      linkedin: "https://linkedin.com/in/maya-patel",
      twitter: "@maya_music",
      instagram: "@maya.melodies",
      github: "maya-patel",
      portfolio: "https://maya-music.com",
    },
  },
]

interface StudentDetailPageProps {
    params: Promise<{
      id: string
    }>
  }

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()
    

  const unwrappedParams = React.use(params)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (authStatus === "true" && email) {
      setIsAuthenticated(true)
    } else {
      router.push("/auth")
    }
  }, [router])

  const student = studentsData.find((s) => s.student_id === unwrappedParams.id)

  if (!isAuthenticated) {
    return null // Will redirect to auth page
  }

  if (!student) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "withdraw":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "suspended":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Students List
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Profile</h1>
          <p className="text-gray-600">Detailed information for {student.Name}</p>
        </div>

        {/* Main Student Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={`${student.Name}'s profile picture`} />
                <AvatarFallback className="text-2xl bg-blue-500 text-white">{student.Name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{student.Name}</h2>
                <p className="text-blue-100">Student ID: {student.student_id}</p>
                <p className="text-blue-100">{student.email}</p>
                <Badge className={`mt-2 ${getStatusColor(student["Enrollment Status"])}`}>
                  {student["Enrollment Status"]}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="mr-2 h-5 w-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <IdCard className="mr-2 h-4 w-4" />
                      ID Number
                    </span>
                    <span className="font-medium">{student["ID Number"]}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Status
                    </span>
                    <Badge className={getStatusColor(student["Enrollment Status"])}>
                      {student["Enrollment Status"]}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Academic Year
                    </span>
                    <span className="font-medium">{student.year}</span>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                  Academic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      Faculty
                    </span>
                    <span className="font-medium text-right">{student.Faculty}</span>
                  </div>
                  <Separator />
                  <div className="flex items-start justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Department
                    </span>
                    <span className="font-medium text-right">{student.Department}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="col-span-2 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <User className="mr-2 h-5 w-5 text-blue-600" />
              About {student.Name}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 italic mb-3">{student.bio}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Current Mood:</span>
                  <span className="font-medium text-gray-800">{student.mood}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Favorite Spot:</span>
                  <span className="font-medium text-gray-800">{student.favoriteSpot}</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-sm text-gray-600">Interests:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {student.interests.map((interest, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Globe className="mr-2 h-5 w-5 text-blue-600" />
              Social Media & Online Presence
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* LinkedIn */}
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <div className="p-2 bg-blue-600 rounded-full mb-2">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                <span className="text-xs text-gray-500 text-center">Professional</span>
              </div>

              {/* Twitter */}
              <div className="flex flex-col items-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors cursor-pointer">
                <div className="p-2 bg-sky-500 rounded-full mb-2">
                  <Twitter className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Twitter</span>
                <span className="text-xs text-gray-500 text-center">{student.social_media.twitter}</span>
              </div>

              {/* Instagram */}
              <div className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-2">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Instagram</span>
                <span className="text-xs text-gray-500 text-center">{student.social_media.instagram}</span>
              </div>

              {/* GitHub */}
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="p-2 bg-gray-800 rounded-full mb-2">
                  <Github className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">GitHub</span>
                <span className="text-xs text-gray-500 text-center">{student.social_media.github}</span>
              </div>

              {/* Portfolio */}
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <div className="p-2 bg-green-600 rounded-full mb-2">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Portfolio</span>
                <span className="text-xs text-gray-500 text-center">Website</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  <Linkedin className="mr-1 h-3 w-3" />
                  LinkedIn Profile
                </Badge>
                <Badge variant="outline" className="text-gray-600 border-gray-200">
                  <Github className="mr-1 h-3 w-3" />
                  Code Repository
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <Globe className="mr-1 h-3 w-3" />
                  Portfolio Site
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-blue-100 rounded-full">
                <IdCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Student ID</h3>
              <p className="text-2xl font-bold text-blue-600">{student.student_id}</p>
            </div>
          </Card>

          <Card className="text-center p-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Faculty</h3>
              <p className="text-sm font-medium text-green-600">{student.Faculty.replace("Faculty of ", "")}</p>
            </div>
          </Card>

          <Card className="text-center p-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Department</h3>
              <p className="text-sm font-medium text-purple-600">{student.Department.replace("Department of ", "")}</p>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Student Information System - Detailed student profile view</p>
        </div>
      </div>
    </div>
  )
}
