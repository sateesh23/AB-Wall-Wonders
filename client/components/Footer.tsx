import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-brand-sage-900 text-brand-sage-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-brand-sage-100 flex items-center justify-center">
                <span className="text-brand-sage-900 font-bold text-sm">
                  AB
                </span>
              </div>
              <span className="font-bold text-xl">Wall Wonders</span>
            </div>
            <p className="text-brand-sage-200 text-sm">
              Transforming spaces with premium wallpapers, blinds, and flooring
              solutions. 2 years of professional service experience with 100+ happy customers.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/services/wallpapers"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  Wallpapers
                </Link>
              </li>
              <li>
                <Link
                  to="/services/blinds"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  Blinds
                </Link>
              </li>
              <li>
                <Link
                  to="/services/flooring"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  Flooring
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-sage-300" />
                <a
                  href="tel:+918500900827"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  +91 8500900827
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-sage-300" />
                <a
                  href="tel:+918688723648"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  +91 8688723648
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-sage-300" />
                <a
                  href="mailto:abwollwonders@gmail.com"
                  className="text-brand-sage-200 hover:text-brand-sage-100 transition-colors"
                >
                  abwollwonders@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-brand-sage-300 mt-0.5" />
                <span className="text-brand-sage-200">
                  Shop No: 06, Municipal Shopping Complex
                  <br />
                  Opp. Govt.Hospital, Bobbili, Vizianagaram Dist
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-sage-800 mt-8 pt-8 text-center text-sm text-brand-sage-300">
          <p>&copy; 2024 AB Wall Wonders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
