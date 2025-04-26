"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  email: string
  name: string
  role: "admin" | "attorney" | "paralegal" | "client"
  createdAt: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real implementation, this would be an API call to verify the session
        const storedUser = localStorage.getItem("legalAI_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Mock login function - replace with actual API call in production
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // This is just for demo purposes - in a real app, this would be validated by the server
      if (email === "demo@example.com" && password === "password") {
        const mockUser: User = {
          id: "user_123",
          email: "demo@example.com",
          name: "Demo User",
          role: "attorney",
          createdAt: new Date().toISOString(),
        }

        setUser(mockUser)
        localStorage.setItem("legalAI_user", JSON.stringify(mockUser))

        toast({
          title: "Login successful",
          description: "Welcome back to Legal AI Assistant",
        })

        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mock register function - replace with actual API call in production
  const register = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: role as "admin" | "attorney" | "paralegal" | "client",
        createdAt: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("legalAI_user", JSON.stringify(mockUser))

      toast({
        title: "Registration successful",
        description: "Your account has been created",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser(null)
      localStorage.removeItem("legalAI_user")

      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })

      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred during logout",
      })
    }
  }

  // Permission check function
  const hasPermission = (permission: string) => {
    if (!user) return false

    // Define role-based permissions
    const permissions = {
      admin: ["manage_users", "view_all_cases", "edit_all_cases", "delete_cases", "manage_system"],
      attorney: ["view_assigned_cases", "edit_assigned_cases", "create_cases", "use_ai_tools"],
      paralegal: ["view_assigned_cases", "edit_case_notes", "upload_documents", "use_research_tools"],
      client: ["view_own_cases", "view_own_documents", "message_attorney"],
    }

    return permissions[user.role]?.includes(permission) || false
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
