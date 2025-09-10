"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Search, Star, ExternalLink, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ItineraryPage() {
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [recommendations, setRecommendations] = useState<{
    attractions: any[]
    hotels: any[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null)

  const handleGetRecommendations = async () => {
    if (!destination || !startDate || !endDate) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRecommendations({
        attractions: [
          {
            id: 1,
            name: "Central Park",
            image: "/central-park-new-york-scenic-view.jpg",
            rating: 4.8,
            reviews: 12543,
            description:
              "A massive park in the heart of Manhattan offering scenic walks, boating, and outdoor activities.",
            highlights: ["Bethesda Fountain", "Strawberry Fields", "Central Park Zoo"],
            duration: "2-4 hours",
            category: "Nature & Parks",
          },
          {
            id: 2,
            name: "Statue of Liberty",
            image: "/statue-of-liberty-new-york-harbor.jpg",
            rating: 4.6,
            reviews: 8921,
            description: "Iconic symbol of freedom and democracy, accessible by ferry with stunning harbor views.",
            highlights: ["Crown Access", "Ellis Island", "Harbor Views"],
            duration: "Half day",
            category: "Historical Sites",
          },
          {
            id: 3,
            name: "Times Square",
            image: "/times-square-new-york-bright-lights-night.jpg",
            rating: 4.4,
            reviews: 15632,
            description:
              "The bustling commercial intersection known for its bright lights, Broadway shows, and energy.",
            highlights: ["Broadway Shows", "Shopping", "Street Performers"],
            duration: "1-2 hours",
            category: "Entertainment",
          },
          {
            id: 4,
            name: "Brooklyn Bridge",
            image: "/brooklyn-bridge-new-york-skyline-sunset.jpg",
            rating: 4.7,
            reviews: 9876,
            description: "Historic suspension bridge offering spectacular views of Manhattan skyline and East River.",
            highlights: ["Walking Path", "Photography", "Skyline Views"],
            duration: "1-2 hours",
            category: "Architecture",
          },
        ],
        hotels: [
          {
            id: 1,
            name: "The Plaza Hotel",
            image: "/luxury-hotel-lobby-elegant-interior.jpg",
            price: "$450",
            rating: 4.9,
            reviews: 3421,
            amenities: ["Spa", "Fine Dining", "Concierge"],
            location: "Midtown Manhattan",
            distance: "0.2 miles from Central Park",
          },
          {
            id: 2,
            name: "Pod Hotels Times Square",
            image: "/modern-boutique-hotel-room-design.jpg",
            price: "$180",
            rating: 4.3,
            reviews: 2156,
            amenities: ["Rooftop Bar", "Fitness Center", "24/7 Front Desk"],
            location: "Times Square",
            distance: "0.1 miles from Broadway",
          },
          {
            id: 3,
            name: "1 Hotels Brooklyn Bridge",
            image: "/eco-luxury-hotel-room-river-view.jpg",
            price: "$320",
            rating: 4.6,
            reviews: 1876,
            amenities: ["Eco-Friendly", "River Views", "Farm-to-Table Restaurant"],
            location: "Brooklyn",
            distance: "0.3 miles from Brooklyn Bridge",
          },
          {
            id: 4,
            name: "HI New York City Hostel",
            image: "/modern-hostel-common-area-social-space.jpg",
            price: "$65",
            rating: 4.1,
            reviews: 5432,
            amenities: ["Shared Kitchen", "Common Areas", "Laundry"],
            location: "Upper West Side",
            distance: "0.5 miles from Central Park",
          },
        ],
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Travel Itinerary & Recommendations</h1>
          <p className="text-muted-foreground">Plan your perfect trip with personalized suggestions</p>
        </div>

        {/* Itinerary Form */}
        <Card className="mb-8 shadow-xl border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Trip Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Destination */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">Destination City *</Label>
                <Input
                  placeholder="e.g., New York, Paris, Tokyo"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-input border-border focus:ring-ring py-3"
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-input border-border py-3",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-input border-border py-3",
                        !endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < (startDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button
              onClick={handleGetRecommendations}
              disabled={!destination || !startDate || !endDate || isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              {isLoading ? "Getting Recommendations..." : "Get Recommendations"}
            </Button>
          </CardContent>
        </Card>

        {/* Recommendations */}
        {recommendations && (
          <Card className="shadow-xl border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground">Recommendations for {destination}</CardTitle>
              <p className="text-muted-foreground">
                {startDate && endDate && `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`}
              </p>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="attractions" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="attractions" className="text-base">
                    Famous Attractions
                  </TabsTrigger>
                  <TabsTrigger value="hotels" className="text-base">
                    Nearby Hotels
                  </TabsTrigger>
                </TabsList>

                {/* Attractions Tab */}
                <TabsContent value="attractions" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {recommendations.attractions.map((attraction) => (
                      <Card key={attraction.id} className="hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={attraction.image || "/placeholder.svg"}
                            alt={attraction.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                            {attraction.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg text-card-foreground">{attraction.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              {attraction.rating}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{attraction.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              {attraction.duration}
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedAttraction(attraction)}>
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{selectedAttraction?.name}</DialogTitle>
                                </DialogHeader>
                                {selectedAttraction && (
                                  <div className="space-y-4">
                                    <img
                                      src={selectedAttraction.image || "/placeholder.svg"}
                                      alt={selectedAttraction.name}
                                      className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="font-semibold">{selectedAttraction.rating}</span>
                                        <span className="text-muted-foreground ml-2">
                                          ({selectedAttraction.reviews.toLocaleString()} reviews)
                                        </span>
                                      </div>
                                      <Badge>{selectedAttraction.category}</Badge>
                                    </div>
                                    <p className="text-muted-foreground">{selectedAttraction.description}</p>
                                    <div>
                                      <h4 className="font-semibold mb-2">Highlights</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedAttraction.highlights.map((highlight: string, index: number) => (
                                          <Badge key={index} variant="secondary">
                                            {highlight}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                      <Clock className="w-4 h-4 mr-2" />
                                      <span>Recommended duration: {selectedAttraction.duration}</span>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Hotels Tab */}
                <TabsContent value="hotels" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {recommendations.hotels.map((hotel) => (
                      <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                            {hotel.price}/night
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg text-card-foreground">{hotel.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              {hotel.rating}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{hotel.location}</p>
                          <p className="text-xs text-muted-foreground mb-3">{hotel.distance}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {hotel.amenities.slice(0, 3).map((amenity: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
