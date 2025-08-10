"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Sparkles, Target, Users, Zap } from "lucide-react";

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-800">LearnerMap</span>
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <span className="text-gray-600">Welcome, {user?.firstName}!</span>
              <UserButton />
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Create Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}Learning Roadmap
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            AI-powered course generation that adapts to your learning style. 
            Build comprehensive courses with interactive content, videos, and progress tracking.
          </p>
          
          {isSignedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/workspace">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Go to Workspace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/workspace/explore-courses">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Explore Courses
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Why Choose LearnerMap?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Content</h3>
            <p className="text-gray-600">
              Generate comprehensive courses with AI that understands your learning goals and creates tailored content.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your learning journey with detailed progress tracking and chapter completion insights.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Learning</h3>
            <p className="text-gray-600">
              Engage with multimedia content, videos, and interactive elements for an immersive learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Courses Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already building their perfect learning roadmaps with AI.
          </p>
          {isSignedIn ? (
            <Link href="/workspace">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Go to Your Workspace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">LearnerMap</span>
              </div>
              <p className="text-gray-400">
                AI-powered learning platform for creating personalized educational experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LearnerMap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
