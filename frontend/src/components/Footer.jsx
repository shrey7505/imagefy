import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaMagic,
  FaImage,
  FaPaintBrush
} from 'react-icons/fa';
import { assets } from '../assets/assets';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Generate', path: '/generate' },
    { name: 'Pricing', path: '/buy-credit' },
    { name: 'About', path: '/about' }
  ];

  return (
    <footer className="border-t border-gray-200 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <img src={assets.logo} alt="Imagify logo" className="w-32" />
            </div>
            <p className="text-gray-600 text-sm max-w-xs">
              Transform your imagination into stunning visuals with our AI-powered text-to-image generator.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaLinkedinIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-gray-600 hover:text-black transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Features
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <FaMagic className="text-purple-500" />
                AI-Powered Generation
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <FaImage className="text-blue-500" />
                High-Quality Output
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <FaPaintBrush className="text-green-500" />
                Creative Customization
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Imagify. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
              Contact Us
            </a>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-4 text-center md:text-left text-xs text-gray-400">
          <p>Created with ❤️ by Shrey Shah</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;