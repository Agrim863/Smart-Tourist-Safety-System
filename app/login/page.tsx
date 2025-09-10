"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MessageSquare, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone")
  const [countryCode, setCountryCode] = useState("+1")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!phoneNumber) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
    }, 2000)
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
      // Auto-continue after success animation
      setTimeout(() => {
        router.push("/profile")
      }, 2000)
    }, 1500)
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format as (XXX) XXX-XXXX for US numbers
    if (countryCode === "+1" && digits.length <= 10) {
      if (digits.length >= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      } else if (digits.length >= 3) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
      }
    }

    return digits
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    setPhoneNumber(formatted)
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header with Progress */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tourist Safety</h1>
          <p className="text-muted-foreground mb-6">Secure Login</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className={`w-8 h-1 rounded-full ${step === "phone" ? "bg-primary" : "bg-primary/50"}`}></div>
            <div
              className={`w-8 h-1 rounded-full ${step === "otp" ? "bg-primary" : step === "success" ? "bg-primary/50" : "bg-muted"}`}
            ></div>
            <div className={`w-8 h-1 rounded-full ${step === "success" ? "bg-primary" : "bg-muted"}`}></div>
            <span className="ml-2">
              {step === "phone" && "Step 1 of 3"}
              {step === "otp" && "Step 2 of 3"}
              {step === "success" && "Step 3 of 3"}
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-border bg-card">
          {step === "phone" && (
            <>
              <CardHeader className="pb-4 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">Enter Mobile Number</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll send you a verification code to confirm your number
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-card-foreground">Mobile Number</Label>
                  <div className="flex gap-3">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-24 bg-input border-border focus:ring-ring">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+91">🇮🇳 +91</SelectItem>
                        <SelectItem value="+86">🇨🇳 +86</SelectItem>
                        <SelectItem value="+81">🇯🇵 +81</SelectItem>
                        <SelectItem value="+33">🇫🇷 +33</SelectItem>
                        <SelectItem value="+49">🇩🇪 +49</SelectItem>
                        <SelectItem value="+39">🇮🇹 +39</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="(555) 123-4567"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="flex-1 bg-input border-border focus:ring-ring text-lg py-6"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOTP}
                  disabled={!phoneNumber || isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold shadow-lg"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              </CardContent>
            </>
          )}

          {step === "otp" && (
            <>
              <CardHeader className="pb-4 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">Enter Verification Code</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  We sent a 6-digit code to {countryCode} {phoneNumber}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-card-foreground">6-Digit Code</Label>
                  <Input
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="bg-input border-border focus:ring-ring text-lg py-6 text-center tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold shadow-lg"
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep("phone")}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  Change Phone Number
                </Button>
              </CardContent>
            </>
          )}

          {step === "success" && (
            <CardContent className="py-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Login Successful!</h2>
              <p className="text-muted-foreground">Welcome to Tourist Safety. Redirecting to profile setup...</p>
            </CardContent>
          )}
        </Card>

        {step === "otp" && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button onClick={handleSendOTP} className="text-primary hover:underline font-medium">
                Resend OTP
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
