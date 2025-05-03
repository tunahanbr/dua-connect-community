
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Make Dua
            </p>
          </div>
          
          <div className="flex gap-6">
            <Link to="/duas" className="text-gray-600 hover:text-islamic-green text-sm">
              Duas
            </Link>
            <Link to="/requests" className="text-gray-600 hover:text-islamic-green text-sm">
              Requests
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-islamic-green text-sm">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
