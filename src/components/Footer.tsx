import React from 'react';
import { Shield, Github, Twitter, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl font-bold">VeriFind</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionary blockchain-verified missing person recovery system. 
              Combining institutional authority with community power for faster, 
              more effective search and recovery operations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Law Enforcement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Family Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Network</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 VeriFind. All rights reserved. Powered by blockchain technology.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Built on Aptos Blockchain</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Network Status: Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}