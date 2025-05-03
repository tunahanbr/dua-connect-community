
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">Make Dua</h3>
            <p className="text-gray-600 text-sm">
              A beautiful collection of Islamic duas and a community to share and request prayers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/duas" className="text-gray-600 hover:text-islamic-green text-sm">
                  Duas Library
                </Link>
              </li>
              <li>
                <Link to="/requests" className="text-gray-600 hover:text-islamic-green text-sm">
                  Request Duas
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-islamic-green text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-islamic-green text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 text-sm">
              Have suggestions or feedback? We'd love to hear from you.
            </p>
            <Link to="/contact" className="text-islamic-green hover:underline text-sm">
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="border-t border-slate-100 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Make Dua. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
