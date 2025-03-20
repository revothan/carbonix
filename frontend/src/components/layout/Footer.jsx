import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="hsl(var(--primary))" />
                  <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-lg">Carbonix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A blockchain-based carbon credit marketplace for Indonesia, built on Lisk.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://twitter.com/carbonix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://linkedin.com/company/carbonix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/revothan/carbonix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">
                  My Portfolio
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-sm text-muted-foreground hover:text-foreground">
                  Impact Dashboard
                </Link>
              </li>
              <li>
                <Link to="/verification" className="text-sm text-muted-foreground hover:text-foreground">
                  Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm tracking-wide uppercase">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm tracking-wide uppercase">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-sm text-muted-foreground hover:text-foreground">
                  Compliance
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-muted-foreground hover:text-foreground">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col md:flex-row justify-between items-center py-6 space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Carbonix. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Built with</span>
            <div className="flex space-x-3 items-center">
              <span className="text-sm font-medium">Lisk</span>
              <span className="text-sm font-medium">IDRX</span>
              <span className="text-sm font-medium">Xellar Kit</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;