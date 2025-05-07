
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

// Remove static data imports and define types
interface Dua {
  id: string
  arabic_text: string;
  english_translation: string;
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

const quickLinks = [
  { title: "Morning & Evening", category: "daily" },
  { title: "Before Sleep", category: "daily" },
  { title: "Anxiety Relief", category: "anxiety" },
  { title: "Travel Protection", category: "travel" },
  { title: "Health & Healing", category: "health" },
  { title: "Seeking Forgiveness", category: "forgiveness" }
];

const testimonials = [
  { text: "This app has transformed how I remember and recite my daily duas.", author: "Ahmed S." },
  { text: "Being able to request prayers from the community has been a blessing during difficult times.", author: "Fatima K." },
  { text: "I use Make Dua every day with my children to teach them important supplications.", author: "Ibrahim M." }
];

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-4 transition-all duration-300 hover:translate-y-[-5px]">
    <div className="w-8 h-8 rounded-full bg-islamic-light flex items-center justify-center mb-2 text-islamic-green">
      {icon}
    </div>
    <h3 className="text-sm font-medium mb-1">{title}</h3>
    <p className="text-gray-600 text-xs">{description}</p>
  </div>
);

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { openSearch } = useSpotlight();
  const [featuredDua, setFeaturedDua] = useState<Dua | null>(null);
  const [featuredRequest, setFeaturedRequest] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        const [duas, requests] = await Promise.all([
          db.duas.getAll({
            sort: '-created',
            limit: 1
          }),
          db.requests.getAll({
            sort: '-created',
            limit: 1,
            filter: 'status = "approved"'
          })
        ]);

        // Get the most recent dua and request
        if (duas.length > 0) {
          setFeaturedDua({
            id: duas[0].id,
            arabic_text: duas[0].arabic_text,
            english_translation: duas[0].english_translation,
            transliteration: duas[0].transliteration,
            source: duas[0].source,
            category: duas[0].category
          });
        }
        
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-8 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-3 inline-block">
                <Badge variant="outline" className="text-islamic-green bg-islamic-light border-islamic-green/10 px-3 py-1 text-sm">
                  Press ⌘K to search duas
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                Find & Request <span className="text-islamic-green">Duas</span> for Every Moment
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                A beautiful collection of Islamic supplications and a community of people making dua for one another.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/duas">
                  <Button className="btn-primary w-full sm:w-auto transition-all hover:scale-105 duration-300">
                    <Search size={16} className="mr-1" />
                    Browse Duas
                  </Button>
                </Link>
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light w-full sm:w-auto transition-all hover:scale-105 duration-300">
                    <MessageSquare size={16} className="mr-1" />
                    Request Dua
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
              <h2 className="text-lg md:text-xl font-bold">How Make Dua Works</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <FeatureItem 
                icon={<Search size={16} />}
                title="Find Duas"
                description="Search our extensive collection of authentic duas"
              />
              <FeatureItem 
                icon={<BookOpen size={16} />}
                title="Learn & Memorize"
                description="Read Arabic text with translations"
              />
              <FeatureItem 
                icon={<MessageSquare size={16} />}
                title="Request Prayers"
                description="Share your needs with the community"
              />
              <FeatureItem 
                icon={<Heart size={16} />}
                title="Support Others"
                description="Make dua for others and earn rewards"
              />
            </div>
          </div>
        </section>
        
        {/* Quick Links Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-5">
              <h2 className="text-lg md:text-xl font-bold">Quick Access Duas</h2>
              <p className="text-gray-600 mt-1 text-xs">Find duas for common situations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {quickLinks.map((link, index) => (
                <Link to={`/duas?category=${link.category}`} key={index}>
                  <div className="bg-white border border-slate-100 hover:border-islamic-green/20 hover:bg-islamic-light/30 p-4 rounded-xl text-center transition-all duration-300 h-14 flex items-center justify-center">
                    <p className="text-sm font-medium text-gray-800">{link.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Content */}
        <section className="py-10 container mx-auto px-4 md:px-6">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold">Featured Content</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Featured Dua */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Dua of the Day</h3>
              {isLoading ? (
                <div className="animate-pulse bg-slate-100 rounded-lg h-48"></div>
              ) : featuredDua ? (
                <DuaCard
                  id={featuredDua.id}
                  arabicText={featuredDua.arabic_text}
                  englishTranslation={featuredDua.english_translation}
                  transliteration={featuredDua.transliteration}
                  source={featuredDua.source}
                  category={featuredDua.category}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">No duas available</div>
              )}
              <div className="flex justify-center mt-3">
                <Link to="/duas">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light transition-all hover:scale-105 duration-300 text-sm">
                    View All Duas
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Featured Request */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Recent Request</h3>
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
                <div className="text-center py-8 text-gray-500">No requests available</div>
              )}
              <div className="flex justify-center mt-3">
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light transition-all hover:scale-105 duration-300 text-sm">
                    View All Requests
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-10 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-6">
              <h2 className="text-lg md:text-xl font-bold">What Our Users Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-xl border border-slate-100"
                >
                  <p className="text-gray-600 italic mb-3 text-sm">"{testimonial.text}"</p>
                  <p className="text-sm font-medium text-right">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="bg-islamic-light py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto border-none bg-white/80 backdrop-blur p-5 rounded-lg">
              <p className="text-base md:text-lg italic text-islamic-dark mb-3 text-center">
                "The dua of a Muslim for his brother in his absence is readily accepted. An angel is appointed to his side. Whenever he makes a beneficial dua for his brother the appointed angel says, 'Ameen, and the same for you.'"
              </p>
              <p className="text-sm text-islamic-green font-medium text-center">
                - Sahih Muslim
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
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
