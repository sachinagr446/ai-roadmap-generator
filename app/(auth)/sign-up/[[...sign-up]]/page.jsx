"use client"
import { SignUp, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/workspace')
    }
  }, [isSignedIn, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp />
    </div>
  )
}