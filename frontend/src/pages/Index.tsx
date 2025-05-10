import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, MessageSquare, ArrowUp, ChevronRight } from "lucide-react";
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


const FeatureItem = ({ icon, title, description, index }: { icon: React.ReactNode, title: string, description: string, index: number }) => {
  const { t } = useLanguage();
  return (
    <div 
      className="group relative flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-islamic-light flex items-center justify-center mb-4 text-islamic-green group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-base font-medium mb-2">{t(title)}</h3>
      <p className="text-gray-600 text-sm">{t(description)}</p>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-islamic-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

const JourneyStep = ({ number, title, description }: { number: number, title: string, description: string }) => {
  const { t } = useLanguage();
  return (
    <div className="relative flex items-start group">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-islamic-light flex items-center justify-center text-islamic-green font-medium mr-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
        {number}
      </div>
      <div className="flex-grow bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group-hover:translate-x-2">
        <h3 className="text-lg font-semibold mb-2 text-islamic-green group-hover:text-islamic-dark transition-colors duration-300">{t(title)}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{t(description)}</p>
      </div>
      {number < 4 && (
        <div className="absolute left-6 top-12 w-0.5 h-[calc(100%+2rem)] bg-islamic-light group-hover:bg-islamic-green transition-colors duration-300"></div>
      )}
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
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-slate-50">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-4 inline-block animate-fade-in">
                <Badge variant="outline" className="text-islamic-green bg-islamic-light border-islamic-green/10 px-4 py-1.5 text-sm">
                  {t('home.searchShortcut')}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">
                {t('home.title')}
              </h1>
              <p className="text-lg text-gray-600 mb-8 animate-slide-up delay-100">
                {t('home.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
                <Link to="/duas">
                  <Button className="btn-primary w-full sm:w-auto transition-all hover:scale-105 duration-300 px-8 py-6 text-base">
                    <Search size={20} className="mr-2" />
                    {t('home.browseDuas')}
                  </Button>
                </Link>
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light w-full sm:w-auto transition-all hover:scale-105 duration-300 px-8 py-6 text-base">
                    <MessageSquare size={20} className="mr-2" />
                    {t('home.requestDua')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('home.howItWorks')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('home.howItWorksDescription')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <FeatureItem 
                icon={<Search size={24} />}
                title="home.features.findDuas.title"
                description="home.features.findDuas.description"
                index={0}
              />
              <FeatureItem 
                icon={<BookOpen size={24} />}
                title="home.features.learnMemorize.title"
                description="home.features.learnMemorize.description"
                index={1}
              />
              <FeatureItem 
                icon={<MessageSquare size={24} />}
                title="home.features.requestPrayers.title"
                description="home.features.requestPrayers.description"
                index={2}
              />
              <FeatureItem 
                icon={<Heart size={24} />}
                title="home.features.supportOthers.title"
                description="home.features.supportOthers.description"
                index={3}
              />
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-islamic-green">{t('home.yourJourney')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t('home.journeyDescription')}</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-12">
              <JourneyStep 
                number={1}
                title="home.journey.discover.title"
                description="home.journey.discover.description"
              />
              <JourneyStep 
                number={2}
                title="home.journey.learn.title"
                description="home.journey.learn.description"
              />
              <JourneyStep 
                number={3}
                title="home.journey.connect.title"
                description="home.journey.connect.description"
              />
              <JourneyStep 
                number={4}
                title="home.journey.grow.title"
                description="home.journey.grow.description"
              />
            </div>
          </div>
        </section>
        
        {/* Featured Content */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('home.featuredContent')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('home.featuredContentDescription')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Featured Dua */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{t('home.featuredDua')}</h3>
                  <Link to="/duas" className="text-islamic-green hover:text-islamic-dark flex items-center text-sm">
                    {t('home.viewAll')} <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
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
              </div>
              
              {/* Featured Request */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{t('home.recentRequest')}</h3>
                  <Link to="/requests" className="text-islamic-green hover:text-islamic-dark flex items-center text-sm">
                    {t('home.viewAll')} <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
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
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Scroll to Top Button */}
      {scrollPosition > 300 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-islamic-green text-white shadow-lg hover:bg-islamic-dark transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Index;
