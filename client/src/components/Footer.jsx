import React from "react";

const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 right-0 bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LuxeDrive</h3>
            <p className="text-gray-400">
              Experience luxury and comfort with our premium car rental service.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Our Cars
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Luxury Lane</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@luxedrive.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-2xl hover:text-emerald-500 transition-colors"
              >
                <i className="bx bxl-facebook"></i>
              </a>
              <a
                href="#"
                className="text-2xl hover:text-emerald-500 transition-colors"
              >
                <i className="bx bxl-twitter"></i>
              </a>
              <a
                href="#"
                className="text-2xl hover:text-emerald-500 transition-colors"
              >
                <i className="bx bxl-instagram"></i>
              </a>
              <a
                href="#"
                className="text-2xl hover:text-emerald-500 transition-colors"
              >
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LuxeDrive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
