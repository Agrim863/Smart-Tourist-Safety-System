"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Camera, User, CalendarIcon, Globe, Save } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: undefined as Date | undefined,
    nationality: "",
    passportNumber: "",
    tripItinerary: "",
    emergencyContact: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isScanningPassport, setIsScanningPassport] = useState(false)

  const handleScanPassport = async () => {
    setIsScanningPassport(true)
    // Simulate passport scanning and MRZ extraction
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        fullName: "John Michael Smith",
        dateOfBirth: new Date("1990-05-15"),
        nationality: "United States",
        passportNumber: "123456789",
      }))
      setIsScanningPassport(false)
    }, 3000)
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/itinerary")
    }, 2000)
  }

  const isFormValid =
    formData.fullName &&
    formData.dateOfBirth &&
    formData.nationality &&
    formData.passportNumber &&
    formData.emergencyContact

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Registration</h1>
          <p className="text-muted-foreground">Complete your travel profile for a personalized experience</p>
        </div>

        {/* Passport Scan Button */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <Button
              onClick={handleScanPassport}
              disabled={isScanningPassport}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 text-lg font-semibold"
            >
              <Camera className="w-5 h-5 mr-2" />
              {isScanningPassport ? "Scanning Passport..." : "📷 Scan Passport (MRZ)"}
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Automatically fill your details by scanning your passport's machine-readable zone
            </p>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="shadow-xl border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Full Name *</Label>
              <Input
                placeholder="Enter your full name as shown on passport"
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                className="bg-input border-border focus:ring-ring py-3"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-input border-border py-3",
                      !formData.dateOfBirth && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select your date of birth"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => setFormData((prev) => ({ ...prev, dateOfBirth: date }))}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Nationality */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Nationality *</Label>
              <Select
                value={formData.nationality}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, nationality: value }))}
              >
                <SelectTrigger className="bg-input border-border focus:ring-ring py-3">
                  <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">🇺🇸 United States</SelectItem>
                  <SelectItem value="United Kingdom">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                  <SelectItem value="Australia">🇦🇺 Australia</SelectItem>
                  <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                  <SelectItem value="France">🇫🇷 France</SelectItem>
                  <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
                  <SelectItem value="India">🇮🇳 India</SelectItem>
                  <SelectItem value="China">🇨🇳 China</SelectItem>
                  <SelectItem value="Brazil">🇧🇷 Brazil</SelectItem>
                  <SelectItem value="Other">🌍 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Passport/ID Number */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Passport/ID Number *</Label>
              <Input
                placeholder="Enter your passport or ID number"
                value={formData.passportNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, passportNumber: e.target.value }))}
                className="bg-input border-border focus:ring-ring py-3"
              />
            </div>

            {/* Trip Itinerary */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Trip Itinerary</Label>
              <Textarea
                placeholder="Describe your planned destinations and activities (optional)"
                value={formData.tripItinerary}
                onChange={(e) => setFormData((prev) => ({ ...prev, tripItinerary: e.target.value }))}
                className="bg-input border-border focus:ring-ring min-h-[100px] resize-none"
                rows={4}
              />
            </div>

            {/* Emergency Contact */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">Emergency Contact Number *</Label>
              <Input
                placeholder="+1 (555) 123-4567"
                value={formData.emergencyContact}
                onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                className="bg-input border-border focus:ring-ring py-3"
                type="tel"
              />
              <p className="text-xs text-muted-foreground">
                Include country code. This contact will be notified in case of emergency.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Floating Save Button */}
        <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto">
          <Button
            onClick={handleSaveProfile}
            disabled={!isFormValid || isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold shadow-2xl"
          >
            <Save className="w-5 h-5 mr-2" />
            {isLoading ? "Saving Profile..." : "Save Profile"}
          </Button>
        </div>

        {/* Bottom spacing for floating button */}
        <div className="h-24"></div>
      </div>
    </div>
  )
}
