"use client"

import { Button } from "@/components/ui/button"
import { Shield, MapPin, Users, Star } from "lucide-react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, Stars, Environment } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"

function Globe() {
  const meshRef = useRef<any>()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.3}
        metalness={0.1}
        emissive="#1e40af"
        emissiveIntensity={0.1}
      />
    </Sphere>
  )
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade speed={1} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Hero Section with 3D Globe */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div
          className={`text-center mb-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">VOYAGE</h1>
          <p
            className={`text-xl md:text-2xl text-blue-200 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          >
            Your secure travel companion
          </p>
        </div>

        <div className="w-80 h-80 md:w-96 md:h-96 mb-8">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
            <Globe />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Features Section */}
        <div className="relative z-10 bg-slate-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Everything You Need for Safe Travel</h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                From secure authentication to personalized recommendations, we've got your journey covered.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure Login</h3>
                <p className="text-blue-200 text-sm">
                  Multi-step OTP verification ensures your account stays protected throughout your travels.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Profile Management</h3>
                <p className="text-blue-200 text-sm">
                  Store your travel documents, emergency contacts, and preferences in one secure place.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Itineraries</h3>
                <p className="text-blue-200 text-sm">
                  Plan your trips with intelligent recommendations based on your preferences and travel dates.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Local Insights</h3>
                <p className="text-blue-200 text-sm">
                  Discover top attractions and accommodations with ratings and reviews from fellow travelers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 bg-blue-900/30 backdrop-blur-sm py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Travel Safely?</h2>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust VOYAGE for their adventures around the world.
            </p>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
