import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Star, Send, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeedbackFormData {
  customerName: string
  email: string
  phone: string
  serviceReceived: string
  rating: number
  feedback: string
  wouldRecommend: string
}

export function CustomerFeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    customerName: '',
    email: '',
    phone: '',
    serviceReceived: '',
    rating: 0,
    feedback: '',
    wouldRecommend: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof FeedbackFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      // Here you would typically send the data to your backend
      console.log('Feedback submitted:', formData)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.customerName && formData.email && formData.rating > 0

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-brand-sage-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">
                Your feedback has been submitted successfully. We appreciate your time and trust in AB Wall Wonders.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    customerName: '',
                    email: '',
                    phone: '',
                    serviceReceived: '',
                    rating: 0,
                    feedback: '',
                    wouldRecommend: ''
                  })
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Submit Another Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-brand-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Share Your Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us improve and let others know about your experience with AB Wall Wonders
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-primary">Customer Feedback</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Name */}
              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                  Customer Name *
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Service Received */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Service Received
                </Label>
                <Select onValueChange={(value) => handleInputChange('serviceReceived', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Select the service you received" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wallpapers">Wallpapers</SelectItem>
                    <SelectItem value="blinds">Blinds</SelectItem>
                    <SelectItem value="flooring">Flooring</SelectItem>
                    <SelectItem value="mixed">Mixed Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Overall Experience Rating *
                </Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className={cn(
                        "transition-colors duration-200",
                        star <= formData.rating
                          ? "text-yellow-400 hover:text-yellow-500"
                          : "text-gray-300 hover:text-yellow-300"
                      )}
                    >
                      <Star className="h-8 w-8 fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating > 0 && `${formData.rating} out of 5 stars`}
                  </span>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
                  Your Feedback/Testimonial
                </Label>
                <Textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={(e) => handleInputChange('feedback', e.target.value)}
                  placeholder="Tell us about your experience with AB Wall Wonders..."
                  rows={4}
                  className="border-gray-300 focus:border-primary focus:ring-primary resize-none"
                />
              </div>

              {/* Would Recommend */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Would you recommend us to others?
                </Label>
                <RadioGroup
                  value={formData.wouldRecommend}
                  onValueChange={(value) => handleInputChange('wouldRecommend', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="recommend-yes" />
                    <Label htmlFor="recommend-yes" className="text-sm font-medium">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="recommend-no" />
                    <Label htmlFor="recommend-no" className="text-sm font-medium">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Your feedback helps us improve our services and assists other customers in making informed decisions.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
