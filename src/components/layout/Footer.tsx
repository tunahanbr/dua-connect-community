
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-3 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Make Dua
          </p>
          
          <div className="flex gap-3">
            <Link to="/duas" className="text-xs text-gray-500 hover:text-islamic-green">
              Duas
            </Link>
            <Link to="/requests" className="text-xs text-gray-500 hover:text-islamic-green">
              Requests
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
