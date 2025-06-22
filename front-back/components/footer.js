'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ... (socialIcons, quickLinks, contactInfo, legalLinks, hoverEffect data remains the same)
  const socialIcons = [
    { href: 'https://twitter.com/cleverlyai', icon: Twitter, label: 'Twitter' },
    { href: 'https://facebook.com/cleverlyai', icon: Facebook, label: 'Facebook' },
    { href: 'https://instagram.com/cleverlyai', icon: Instagram, label: 'Instagram' },
    { href: 'https://linkedin.com/company/cleverlyai', icon: Linkedin, label: 'LinkedIn' },
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@cleverly.ai', href: 'mailto:info@cleverly.ai' },
    { icon: Phone, text: '+1 (234) 567-890', href: 'tel:+1234567890' },
    { icon: MapPin, text: '123 AI Magic Lane, Innovate City', href: 'https://maps.google.com/?q=123+AI+Magic+Lane,+Innovate+City' },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
  ];

  const hoverEffect = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  };

   const linkMotionProps = {
    whileHover: {
      color: "#6366F1", // indigo-500
      transition: { duration: 0.2 }
    }
  };


  return (
    <footer className="bg-slate-50 text-gray-700 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo and Description */}
          <div className="lg:col-span-2 md:col-span-2">
            {/* CORRECTED LOGO LINK */}
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
                <motion.span
                  className="bg-indigo-600 text-white text-3xl font-bold p-2.5 rounded-xl"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  C
                </motion.span>
                <div>
                  <span className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Cleverly.AI</span>
                  <p className="text-xs text-indigo-500 font-medium">Education AI</p>
                </div>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md">
              Transform your study materials into interactive learning experiences with our AI-powered education platform.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-200 hover:bg-indigo-500 rounded-full text-gray-600 hover:text-white transition-all duration-300"
                  whileHover={hoverEffect}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-5 text-lg">Quick Links</h5>
            <ul className="space-y-3">
              {quickLinks.map((linkItem) => ( // Renamed link to linkItem to avoid conflict with Link component
                <li key={linkItem.label}>
                  <Link href={linkItem.href} passHref legacyBehavior>
                    <motion.a className="text-sm text-gray-600 hover:text-indigo-600 transition-colors" {...linkMotionProps}>
                      {linkItem.label}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-5 text-lg">Contact</h5>
            <ul className="space-y-3">
              {contactInfo.map((contact) => (
                <li key={contact.text} className="flex items-start">
                  <motion.a
                    href={contact.href}
                    target={contact.href.startsWith('http') || contact.href.startsWith('mailto:') || contact.href.startsWith('tel:') ? "_blank" : undefined}
                    rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex items-start text-sm text-gray-600 hover:text-indigo-600 transition-colors group"
                    {...(contact.href !== '#' ? linkMotionProps : {})} // Apply motion only if it's a real link
                  >
                    <contact.icon className="w-5 h-5 mr-3 mt-0.5 text-indigo-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{contact.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sub-Footer: Copyright and Legal Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p className="mb-4 sm:mb-0">
            © {currentYear} Cleverly.AI. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            {legalLinks.map((linkItem) => ( // Renamed link to linkItem
               <Link href={linkItem.href} key={linkItem.label} passHref legacyBehavior>
                <motion.a className="hover:text-indigo-600 transition-colors" {...linkMotionProps}>
                  {linkItem.label}
                </motion.a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;