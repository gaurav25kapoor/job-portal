import React from 'react';
import { Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 ml-2">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job<span className='text-[#f83002]'>Hunt</span></h2>
            <p className="text-sm mt-2">Connecting talent with opportunity. Search, apply, and level up your career with ease.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600">Jobs</a></li>
              <li><a href="#" className="hover:text-blue-600">Companies</a></li>
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Subscribe</h3>
            <p className="text-sm mb-4">Get weekly job updates and career tips straight to your inbox.</p>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white px-3 py-2 w-full outline-none text-sm placeholder:text-gray-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2">
                <Mail className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-blue-600">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-200 pt-6">
          © 2024 Job Hunt. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
