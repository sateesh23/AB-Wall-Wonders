import { TestimonialAuthor } from "@/components/ui/testimonial-card"

export interface TestimonialData {
  author: TestimonialAuthor
  text: string
  href?: string
}

// Helper function to create avatar initials
const createAvatarInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Main testimonials data for marquee sections
export const marqueeTestimonials: TestimonialData[] = [
  {
    author: {
      name: "Narendra",
      handle: "@narendra_bobbili",
      avatar: ""
    },
    text: "Excellent roller window blinds installation at our dental clinic. Professional service and quality materials. Highly recommended for medical facilities.",
  },
  {
    author: {
      name: "A Gopinath",
      handle: "@gopinath_hospital",
      avatar: ""
    },
    text: "Beautiful wallpaper installation for our hospital counter. The design perfectly matches our professional environment and has received great feedback from patients.",
  },
  {
    author: {
      name: "Appala Naidu",
      handle: "@appala_nadimikella",
      avatar: ""
    },
    text: "Amazing customized Radha Krishna wallpaper! The attention to detail and quality of work exceeded our expectations. Perfect for our prayer room.",
  },
  {
    author: {
      name: "P Ramu",
      handle: "@prasanthi_sweets",
      avatar: ""
    },
    text: "The customized Buddha wallpaper for our sweet shop creates such a peaceful atmosphere. Customers love the serene ambiance it brings to our store.",
  },
  {
    author: {
      name: "G Simhachalam",
      handle: "@simhachalam_bobbili",
      avatar: ""
    },
    text: "Perfect customized window blinds installation. The team was professional and the quality is outstanding. Great value for money.",
  },
  {
    author: {
      name: "A Radha",
      handle: "@radha_poolbagh",
      avatar: ""
    },
    text: "Stunning Radha Krishna & scenery wallpaper combination! The customization work is exceptional and has transformed our home beautifully.",
  },
  {
    author: {
      name: "U Bangar Raju",
      handle: "@bangarraju_salur",
      avatar: ""
    },
    text: "Complete home transformation with elevation, balcony, bedroom, and hall wallpapers plus customized blinds. Excellent work throughout the entire project.",
  },
  {
    author: {
      name: "Uma Ganapathi Electricals",
      handle: "@uma_ganapathi",
      avatar: ""
    },
    text: "Creative customized Buddha design for our business promotion. Unique approach and excellent execution. Great for brand visibility.",
  }
]

// Simple testimonials for home page
export const simpleTestimonials = [
  {
    name: "Narendra (Dental Clinic)",
    location: "Bobbili - Opp Sai Ganapathi Theatre",
    text: "Excellent roller window blinds installation at our dental clinic. Professional service and quality materials.",
    rating: 5,
    avatar: ""
  },
  {
    name: "A Gopinath (Hospital)",
    location: "Bobbili - Beside Sai Baba Temple",
    text: "Beautiful wallpaper installation for our hospital counter. Perfect match for our professional environment.",
    rating: 5,
    avatar: ""
  },
  {
    name: "Appala Naidu",
    location: "Nadimi Kella - Near Parvathipuram",
    text: "Amazing customized Radha Krishna wallpaper! The attention to detail exceeded our expectations.",
    rating: 5,
    avatar: ""
  },
  {
    name: "P Ramu (Prasanthi Sweets)",
    location: "Bobbili - Near Thandra Paparayadu Statue",
    text: "The customized Buddha wallpaper creates such a peaceful atmosphere in our sweet shop.",
    rating: 5,
    avatar: ""
  },
  {
    name: "G Simhachalam",
    location: "Bobbili - Near Sai Baba Temple",
    text: "Perfect customized window blinds installation. Professional team and outstanding quality.",
    rating: 5,
    avatar: ""
  },
  {
    name: "U Bangar Raju",
    location: "Salur - Near Konni Veedhi",
    text: "Complete home transformation with wallpapers and blinds. Excellent work throughout the entire project.",
    rating: 5,
    avatar: ""
  }
]

// Services page testimonials
export const servicesTestimonials: TestimonialData[] = [
  {
    author: {
      name: "Seshagiri",
      handle: "@seshagiri_kvr",
      avatar: ""
    },
    text: "Customized scenario wallpaper for our bedroom background looks absolutely stunning. Perfect execution and attention to detail.",
  },
  {
    author: {
      name: "L Sagar",
      handle: "@sagar_usodaya",
      avatar: ""
    },
    text: "Customized window blinds installation at our flat was seamless. Professional service and excellent quality materials.",
  },
  {
    author: {
      name: "G Santhu",
      handle: "@santhu_municipal",
      avatar: ""
    },
    text: "Office wallpaper installation transformed our workspace completely. Professional look that impresses our clients.",
  },
  {
    author: {
      name: "D Ashok",
      handle: "@ashok_ballakrishnapuram",
      avatar: ""
    },
    text: "TV unit wall and staircase wallpaper work exceeded expectations. Beautiful design and flawless installation.",
  },
  {
    author: {
      name: "B Parvathi",
      handle: "@parvathi_piridi",
      avatar: ""
    },
    text: "Customized Buddha wallpaper brings such peace to our home. Excellent craftsmanship and attention to spiritual details.",
  },
  {
    author: {
      name: "Dhanujay",
      handle: "@dhanujay_piridi",
      avatar: ""
    },
    text: "Old wall transformation with new wallpaper looks amazing. Great solution for renovating without major construction.",
  },
]
