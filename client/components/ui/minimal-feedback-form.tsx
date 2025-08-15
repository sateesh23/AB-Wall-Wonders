import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, CheckCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export function MinimalFeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendToWhatsApp = () => {
    const message = `Hello AB Wall Wonders! 👋

I'm interested in your services. Here are my details:

📋 *Quote Request*
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
${formData.email ? `📧 *Email:* ${formData.email}` : ''}
🏠 *Service:* ${formData.service}

💬 *Project Details:*
${formData.message || 'No additional details provided'}

Please provide me with a quote and more information about your services.

Thank you! 🙏`;

    const whatsappUrl = `https://wa.me/918688723648?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab/window, but don't redirect current page
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to WhatsApp immediately
      sendToWhatsApp();
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });
      }, 5000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary mb-2">Message Sent to WhatsApp!</h3>
          <p className="text-green-700 mb-4">
            Your quote request has been sent via WhatsApp. We'll respond within 2 hours during business hours.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={sendToWhatsApp}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-primary mb-2">
          Get Your Free Quote
        </CardTitle>
        <p className="text-muted-foreground">
          Tell us about your project and we'll send details to WhatsApp instantly
        </p>
        <Badge variant="secondary" className="mx-auto w-fit bg-primary/10 text-primary">
          <Phone className="w-3 h-3 mr-1" />
          Instant WhatsApp Response
        </Badge>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Full Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Phone Number *
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                required
                className="w-full focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Service Required *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">Select a service</option>
              <option value="Wallpapers">Wallpapers</option>
              <option value="Window Blinds">Window Blinds</option>
              <option value="Flooring">Flooring</option>
              <option value="Complete Interior">Complete Interior Package</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Project Details
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your project requirements, room size, preferred style, budget range, etc."
              rows={4}
              className="w-full resize-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 h-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending to WhatsApp...
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send to WhatsApp
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open('tel:+918688723648')}
              className="flex-1 border-primary text-primary hover:bg-primary/10 py-3 h-auto"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Your message will be sent directly to our WhatsApp for instant response.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
