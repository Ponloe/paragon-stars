"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Search,
  MapPin,
  Zap,
  Music,
  Palette,
  Code,
  Calculator,
  Beaker,
  Building,
  Briefcase,
  LogOut,
} from "lucide-react"

// Sample students data with fun elements
const studentsData = [
  {
    student_id: "123",
    Name: "Polo",
    Faculty: "Faculty of Engineering",
    Department: "Department of Architecture",
    "Enrollment Status": "Active",
    year: "3rd Year",
    location: "Architecture Studio",
    bio: "Building dreams, one blueprint at a time! 🏗️",
    interests: ["Sustainable Design", "3D Modeling", "Urban Planning"],
    favoriteSpot: "Design Lab",
    mood: "Creative",
    color: "from-blue-400 to-cyan-400",
    icon: Building,
  },
  {
    student_id: "124",
    Name: "Sarah Johnson",
    Faculty: "Faculty of Science",
    Department: "Department of Computer Science",
    "Enrollment Status": "Active",
    year: "2nd Year",
    location: "Computer Lab",
    bio: "Coding the future, one line at a time! 💻✨",
    interests: ["AI/ML", "Web Development", "Game Design"],
    favoriteSpot: "Innovation Hub",
    mood: "Focused",
    color: "from-purple-400 to-pink-400",
    icon: Code,
  },
  {
    student_id: "125",
    Name: "Michael Chen",
    Faculty: "Faculty of Engineering",
    Department: "Department of Mechanical Engineering",
    "Enrollment Status": "Active",
    year: "4th Year",
    location: "Engineering Workshop",
    bio: "Turning ideas into reality through engineering! ⚙️",
    interests: ["Robotics", "3D Printing", "Automation"],
    favoriteSpot: "Maker Space",
    mood: "Innovative",
    color: "from-green-400 to-blue-400",
    icon: Zap,
  },
  {
    student_id: "126",
    Name: "Emily Rodriguez",
    Faculty: "Faculty of Arts",
    Department: "Department of Fine Arts",
    "Enrollment Status": "Active",
    year: "1st Year",
    location: "Art Studio",
    bio: "Painting the world with colors and imagination! 🎨",
    interests: ["Digital Art", "Photography", "Sculpture"],
    favoriteSpot: "Creative Studio",
    mood: "Inspired",
    color: "from-pink-400 to-orange-400",
    icon: Palette,
  },
  {
    student_id: "127",
    Name: "David Kim",
    Faculty: "Faculty of Business",
    Department: "Department of Marketing",
    "Enrollment Status": "Active",
    year: "3rd Year",
    location: "Business Center",
    bio: "Connecting brands with hearts and minds! 📈",
    interests: ["Digital Marketing", "Brand Strategy", "Analytics"],
    favoriteSpot: "Collaboration Zone",
    mood: "Ambitious",
    color: "from-yellow-400 to-red-400",
    icon: Briefcase,
  },
  {
    student_id: "128",
    Name: "Lisa Thompson",
    Faculty: "Faculty of Science",
    Department: "Department of Biology",
    "Enrollment Status": "Active",
    year: "2nd Year",
    location: "Biology Lab",
    bio: "Exploring life's mysteries through science! 🔬",
    interests: ["Genetics", "Marine Biology", "Research"],
    favoriteSpot: "Research Lab",
    mood: "Curious",
    color: "from-emerald-400 to-teal-400",
    icon: Beaker,
  },
  {
    student_id: "129",
    Name: "Alex Rivera",
    Faculty: "Faculty of Science",
    Department: "Department of Mathematics",
    "Enrollment Status": "Active",
    year: "4th Year",
    location: "Math Building",
    bio: "Finding beauty in numbers and equations! ∞",
    interests: ["Pure Mathematics", "Statistics", "Cryptography"],
    favoriteSpot: "Quiet Study Room",
    mood: "Analytical",
    color: "from-indigo-400 to-purple-400",
    icon: Calculator,
  },
  {
    student_id: "130",
    Name: "Maya Patel",
    Faculty: "Faculty of Arts",
    Department: "Department of Music",
    "Enrollment Status": "Active",
    year: "2nd Year",
    location: "Music Hall",
    bio: "Creating melodies that touch the soul! 🎵",
    interests: ["Composition", "Piano", "Music Theory"],
    favoriteSpot: "Practice Rooms",
    mood: "Harmonious",
    color: "from-rose-400 to-pink-400",
    icon: Music,
  },
]

const moodEmojis = {
  Creative: "🎨",
  Focused: "🎯",
  Innovative: "💡",
  Inspired: "✨",
  Ambitious: "🚀",
  Curious: "🔍",
  Analytical: "🧮",
  Harmonious: "🎵",
}

export default function FunStudentDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterFaculty, setFilterFaculty] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (authStatus === "true" && email) {
      setIsAuthenticated(true)
      setUserEmail(email)
    } else {
      router.push("/auth")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/auth")
  }

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFaculty = filterFaculty === "all" || student.Faculty === filterFaculty
    const matchesYear = filterYear === "all" || student.year === filterYear
    return matchesSearch && matchesFaculty && matchesYear
  })

  const faculties = [...new Set(studentsData.map((student) => student.Faculty))]
  const years = [...new Set(studentsData.map((student) => student.year))]

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Fun Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                🎓 Paragon Stars ✨
              </h1>
              <p className="text-gray-600 text-lg">Meet the amazing students making our campus shine!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back!</p>
                <p className="text-sm font-medium text-gray-800">{userEmail}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search students, interests, vibes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-white/70 backdrop-blur-sm border-white/30"
              />
            </div>

            <Select value={filterFaculty} onValueChange={setFilterFaculty}>
              <SelectTrigger className="w-48 bg-white/70 backdrop-blur-sm border-white/30">
                <SelectValue placeholder="All Faculties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Faculties ✨</SelectItem>
                {faculties.map((faculty) => (
                  <SelectItem key={faculty} value={faculty}>
                    {faculty.replace("Faculty of ", "")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="w-32 bg-white/70 backdrop-blur-sm border-white/30">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years 🎯</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">Showing {filteredStudents.length} amazing students 🌟</span>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student, index) => {
            const IconComponent = student.icon
            return (
              <Link key={student.student_id} href={`/student/${student.student_id}`}>
                <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden bg-white/80 backdrop-blur-sm border-white/30">
                  {/* Gradient Header */}
                  <div className={`h-24 bg-gradient-to-r ${student.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10"></div>
                    <div className="absolute top-2 right-2">
                      <IconComponent className="h-6 w-6 text-white/80" />
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/10 rounded-full"></div>
                  </div>

                  <CardContent className="p-6 relative">
                    {/* Avatar */}
                    <div className="flex justify-center -mt-12 mb-4">
                      <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt={student.Name} />
                        <AvatarFallback className={`text-2xl bg-gradient-to-r ${student.color} text-white`}>
                          {student.Name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Student Info */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{student.Name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {student.year} • {student.Department.replace("Department of ", "")}
                      </p>
                      {/* <p className="text-sm text-gray-700 italic leading-relaxed">{student.bio}</p> */}
                    </div>

                    {/* Mood & Location */}
                    {/* <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-lg">{moodEmojis[student.mood as keyof typeof moodEmojis]}</span>
                        <span className="text-sm font-medium text-gray-700">{student.mood}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">{student.favoriteSpot}</span>
                      </div>
                    </div> */}

                    {/* Interests */}
                    {/* <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {student.interests.slice(0, 2).map((interest, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            {interest}
                          </Badge>
                        ))}
                        {student.interests.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            +{student.interests.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div> */}

                    {/* Fun Elements */}
                    {/* <div className="flex justify-center mt-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                    </div> */}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Fun Stats */}
        {/* <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-2xl font-bold text-gray-900">{studentsData.length}</div>
            <div className="text-sm text-gray-600">Amazing Students</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="text-3xl mb-2">🏫</div>
            <div className="text-2xl font-bold text-gray-900">{faculties.length}</div>
            <div className="text-sm text-gray-600">Faculties</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="text-3xl mb-2">💡</div>
            <div className="text-2xl font-bold text-gray-900">
              {studentsData.reduce((acc, student) => acc + student.interests.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Interests</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="text-3xl mb-2">✨</div>
            <div className="text-2xl font-bold text-gray-900">∞</div>
            <div className="text-sm text-gray-600">Possibilities</div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
