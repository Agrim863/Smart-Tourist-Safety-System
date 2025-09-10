"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, AlertTriangle, Shield, Heart, Building2 } from "lucide-react"

const emergencyContacts = [
  {
    id: 1,
    name: "Police Emergency",
    number: "911",
    description: "For immediate police assistance",
    category: "police",
    icon: Shield,
    available: "24/7",
  },
  {
    id: 2,
    name: "Medical Emergency",
    number: "911",
    description: "For medical emergencies and ambulance",
    category: "medical",
    icon: Heart,
    available: "24/7",
  },
  {
    id: 3,
    name: "Fire Department",
    number: "911",
    description: "For fire emergencies and rescue",
    category: "fire",
    icon: AlertTriangle,
    available: "24/7",
  },
  {
    id: 4,
    name: "Tourist Police",
    number: "+1-555-TOURIST",
    description: "Specialized police for tourist assistance",
    category: "tourist",
    icon: Shield,
    available: "8 AM - 10 PM",
  },
  {
    id: 5,
    name: "US Embassy",
    number: "+1-555-EMBASSY",
    description: "For passport issues and citizen services",
    category: "embassy",
    icon: Building2,
    available: "9 AM - 5 PM",
  },
  {
    id: 6,
    name: "Tourist Helpline",
    number: "+1-800-HELP-NOW",
    description: "General tourist assistance and information",
    category: "help",
    icon: Phone,
    available: "24/7",
  },
]

const categoryColors = {
  police: "bg-blue-500",
  medical: "bg-red-500",
  fire: "bg-orange-500",
  tourist: "bg-green-500",
  embassy: "bg-purple-500",
  help: "bg-cyan-500",
}

export default function EmergencyPage() {
  const [callingNumber, setCallingNumber] = useState<string | null>(null)

  const handleCall = (number: string, name: string) => {
    setCallingNumber(number)

    // Simulate calling
    setTimeout(() => {
      alert(`Calling ${name} at ${number}...\n\nThis would normally initiate a phone call.`)
      setCallingNumber(null)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h1 className="text-2xl font-bold text-white">Emergency Contacts</h1>
          </div>
          <p className="text-slate-300 text-sm">Quick access to emergency services and help</p>
        </div>

        {/* Location Info */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Current Location: New York, NY, USA</span>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <div className="space-y-4">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon
            const isEmergency = ["police", "medical", "fire"].includes(contact.category)

            return (
              <Card
                key={contact.id}
                className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors ${
                  isEmergency ? "ring-1 ring-red-500/20" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`p-2 rounded-lg ${categoryColors[contact.category as keyof typeof categoryColors]}`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white text-sm">{contact.name}</h3>
                          {isEmergency && (
                            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                              URGENT
                            </Badge>
                          )}
                        </div>

                        <p className="text-slate-400 text-xs mb-2 leading-relaxed">{contact.description}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="font-mono">{contact.number}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{contact.available}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleCall(contact.number, contact.name)}
                      disabled={callingNumber === contact.number}
                      className={`ml-3 ${
                        isEmergency ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                      size="sm"
                    >
                      {callingNumber === contact.number ? (
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs">Calling...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">Call</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Emergency Tips */}
        <Card className="mt-6 bg-slate-800/30 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Emergency Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Stay calm and speak clearly when calling</li>
              <li>• Provide your exact location if possible</li>
              <li>• Keep your phone charged and accessible</li>
              <li>• Save important numbers in your phone contacts</li>
              <li>• Use the SOS button for immediate emergency alert</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
