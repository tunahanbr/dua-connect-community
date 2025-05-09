import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white py-3 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Duara
          </div>
          
          <div className="flex gap-3">
            <Link to="/duas" className="text-xs text-gray-500 hover:text-islamic-green">
              {t('nav.duas')}
            </Link>
            <Link to="/requests" className="text-xs text-gray-500 hover:text-islamic-green">
              {t('nav.requests')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
