
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, MessageSquare, ArrowUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import DuaRequestCard from "@/components/request/DuaRequestCard";
import { Badge } from "@/components/ui/badge";
import { useSpotlight } from "@/components/search/SpotlightProvider";
import { db } from "@/lib/db";
import { useLanguage } from "@/contexts/LanguageContext";

// Remove static data imports and define types
interface Dua {
  id: string
  arabicText: string;
  englishTranslation: string;
  turkishTranslation: string;
  germanTranslation: string;
  transliteration: string;
  source: string;
  category: string;
}

interface Request {
  id: string;
  request: string;
  duas_count: number;
  created_at: string;
}


const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center text-center p-4 transition-all duration-300 hover:translate-y-[-5px]">
      <div className="w-8 h-8 rounded-full bg-islamic-light flex items-center justify-center mb-2 text-islamic-green">
        {icon}
      </div>
      <h3 className="text-sm font-medium mb-1">{t(title)}</h3>
      <p className="text-gray-600 text-xs">{t(description)}</p>
    </div>
  );
};

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { openSearch } = useSpotlight();
  const [featuredDua, setFeaturedDua] = useState<Dua | null>(null);
  const [featuredRequest, setFeaturedRequest] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      setIsLoading(true);
      try {
        // First, ensure we have duas loaded
        const duas = await db.duas.getAll({
          sort: '-created',
          limit: 1,
          $autoCancel: false
        });

        // Get the most recent dua
        if (duas.length > 0) {
          setFeaturedDua({
            id: duas[0].id,
            arabicText: duas[0].arabicText,
            englishTranslation: duas[0].englishTranslation,
            turkishTranslation: duas[0].turkishTranslation,
            germanTranslation: duas[0].germanTranslation,
            transliteration: duas[0].transliteration,
            source: duas[0].source,
            category: duas[0].category
          });
          console.log('Featured dua loaded:', duas[0].id);
        }
        
        // Then load requests after duas are processed
        const requests = await db.requests.getAll({
          sort: '-created',
          limit: 1,
          filter: 'status = "approved"',
          $autoCancel: false 
        });
        
        if (requests.length > 0) {
          setFeaturedRequest({
            id: requests[0].id,
            request: requests[0].request,
            duas_count: requests[0].duas_count || 0,
            created_at: requests[0].created
          });
        }
      } catch (error) {
        console.error('Failed to fetch featured content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-56 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-3 inline-block">
                <Badge variant="outline" className="text-islamic-green bg-islamic-light border-islamic-green/10 px-3 py-1 text-sm">
                  {t('home.searchShortcut')}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                {t('home.title')}
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                {t('home.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/duas">
                  <Button className="btn-primary w-full sm:w-auto transition-all hover:scale-105 duration-300">
                    <Search size={16} className="mr-1" />
                    {t('home.browseDuas')}
                  </Button>
                </Link>
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light w-full sm:w-auto transition-all hover:scale-105 duration-300">
                    <MessageSquare size={16} className="mr-1" />
                    {t('home.requestDua')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-8 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-6">
              <h2 className="text-lg md:text-xl font-bold">{t('home.howItWorks')}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <FeatureItem 
                icon={<Search size={16} />}
                title="home.features.findDuas.title"
                description="home.features.findDuas.description"
              />
              <FeatureItem 
                icon={<BookOpen size={16} />}
                title="home.features.learnMemorize.title"
                description="home.features.learnMemorize.description"
              />
              <FeatureItem 
                icon={<MessageSquare size={16} />}
                title="home.features.requestPrayers.title"
                description="home.features.requestPrayers.description"
              />
              <FeatureItem 
                icon={<Heart size={16} />}
                title="home.features.supportOthers.title"
                description="home.features.supportOthers.description"
              />
            </div>
          </div>
        </section>
        
        
        {/* Featured Content */}
        <section className="py-10 container mx-auto px-4 md:px-6">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold">{t('home.featuredContent')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Featured Dua */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">{t('home.featuredDua')}</h3>
              {isLoading ? (
                <div className="animate-pulse bg-slate-100 rounded-lg h-48"></div>
              ) : featuredDua ? (
                <DuaCard
                  id={featuredDua.id}
                  arabicText={featuredDua.arabicText}
                  englishTranslation={featuredDua.englishTranslation}
                  turkishTranslation={featuredDua.turkishTranslation}
                  germanTranslation={featuredDua.germanTranslation}
                  transliteration={featuredDua.transliteration}
                  source={featuredDua.source}
                  category={featuredDua.category}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">{t('home.noDuasAvailable')}</div>
              )}
              <div className="flex justify-center mt-3">
                <Link to="/duas">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light transition-all hover:scale-105 duration-300 text-sm">
                    {t('home.viewAllDuas')}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Featured Request */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">{t('home.recentRequest')}</h3>
              {isLoading ? (
                <div className="animate-pulse bg-slate-100 rounded-lg h-48"></div>
              ) : featuredRequest ? (
                <DuaRequestCard
                  id={featuredRequest.id}
                  request={featuredRequest.request}
                  duasCount={featuredRequest.duas_count}
                  createdAt={featuredRequest.created_at}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">{t('home.noRequestsAvailable')}</div>
              )}
              <div className="flex justify-center mt-3">
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light transition-all hover:scale-105 duration-300 text-sm">
                    {t('home.viewAllRequests')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        
        {/* Quote Section */}
        <section className="bg-islamic-light py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto border-none bg-white/80 backdrop-blur p-5 rounded-lg">
              <p className="text-base md:text-lg italic text-islamic-dark mb-3 text-center">
                {t('home.quote.text')}
              </p>
              <p className="text-sm text-islamic-green font-medium text-center">
                {t('home.quote.source')}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Back to top button */}
      {scrollPosition > 300 && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 bg-islamic-green text-white p-2 rounded-full shadow-lg hover:bg-islamic-dark transition-all z-50"
          aria-label={t('home.backToTop')}
        >
          <ArrowUp size={16} />
        </button>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
