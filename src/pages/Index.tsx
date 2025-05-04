
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, MessageSquare, ArrowUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import DuaRequestCard from "@/components/request/DuaRequestCard";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CommandDialog } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

const featuredDua = {
  id: "dua-001",
  arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
  englishTranslation: "Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire.",
  transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar.",
  source: "Quran 2:201",
  category: "general"
};

const featuredRequest = {
  id: "request-001",
  request: "Please make dua for my mother who is unwell. May Allah grant her complete shifa.",
  duasCount: 124,
  createdAt: new Date().toISOString()
};

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
    <div className="w-10 h-10 rounded-full bg-islamic-light flex items-center justify-center mb-3 text-islamic-green">
      {icon}
    </div>
    <h3 className="text-base font-medium mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        {/* Command dialog content */}
      </CommandDialog>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-10 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-4 inline-block">
                <Badge variant="outline" className="text-islamic-green bg-islamic-light border-islamic-green/10 px-3 py-1 text-sm animate-fade-up">
                  Press ⌘K to search duas
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up" style={{animationDelay: '0.1s'}}>
                Find & Request <span className="text-islamic-green">Duas</span> for Every Moment
              </h1>
              <p className="text-base text-gray-600 mb-6 animate-fade-up" style={{animationDelay: '0.2s'}}>
                A beautiful collection of Islamic supplications and a community of people making dua for one another.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{animationDelay: '0.3s'}}>
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
        <section className="py-10 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 animate-fade-up">
              <h2 className="text-xl md:text-2xl font-bold">How Make Dua Works</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <FeatureItem 
                icon={<Search size={20} />}
                title="Find Duas"
                description="Search our extensive collection of authentic duas for every situation"
              />
              <FeatureItem 
                icon={<BookOpen size={20} />}
                title="Learn & Memorize"
                description="Read Arabic text with translations and transliterations"
              />
              <FeatureItem 
                icon={<MessageSquare size={20} />}
                title="Request Prayers"
                description="Share your needs anonymously with the community"
              />
              <FeatureItem 
                icon={<Heart size={20} />}
                title="Support Others"
                description="Make dua for those in need and earn rewards"
              />
            </div>
          </div>
        </section>
        
        {/* Quick Links Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-6 animate-fade-up">
              <h2 className="text-xl md:text-2xl font-bold">Quick Access Duas</h2>
              <p className="text-gray-600 mt-2 text-sm">Find duas for common situations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {quickLinks.map((link, index) => (
                <Link to={`/duas?category=${link.category}`} key={index} className="animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-white border border-slate-100 hover:border-islamic-green/20 hover:bg-islamic-light/30 p-4 rounded-xl text-center transition-all duration-300 h-16 flex items-center justify-center">
                    <p className="text-sm font-medium text-gray-800">{link.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Content */}
        <section className="py-12 container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-xl md:text-2xl font-bold">Featured Content</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Featured Dua */}
            <div className="space-y-4 animate-fade-up">
              <h3 className="text-lg font-semibold">Dua of the Day</h3>
              <DuaCard {...featuredDua} />
              <div className="flex justify-center mt-4">
                <Link to="/duas">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light transition-all hover:scale-105 duration-300 text-sm">
                    View All Duas
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Featured Request */}
            <div className="space-y-4 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-lg font-semibold">Recent Request</h3>
              <DuaRequestCard {...featuredRequest} />
              <div className="flex justify-center mt-4">
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
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 animate-fade-up">
              <h2 className="text-xl md:text-2xl font-bold">What Our Users Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-xl border border-slate-100 animate-fade-up"
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  <p className="text-gray-600 italic mb-4 text-sm">"{testimonial.text}"</p>
                  <p className="text-sm font-medium text-right">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="bg-islamic-light py-12">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="max-w-3xl mx-auto border-none bg-white/80 backdrop-blur animate-fade-up">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-lg md:text-xl italic text-islamic-dark mb-4">
                  "The dua of a Muslim for his brother in his absence is readily accepted. An angel is appointed to his side. Whenever he makes a beneficial dua for his brother the appointed angel says, 'Ameen, and the same for you.'"
                </p>
                <p className="text-sm text-islamic-green font-medium">
                  - Sahih Muslim
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      {/* Back to top button */}
      {scrollPosition > 300 && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 bg-islamic-green text-white p-2.5 rounded-full shadow-lg hover:bg-islamic-dark transition-all z-50 animate-fade-up"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
