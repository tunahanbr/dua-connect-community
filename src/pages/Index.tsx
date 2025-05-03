
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import DuaRequestCard from "@/components/request/DuaRequestCard";
import { Card, CardContent } from "@/components/ui/card";

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

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="w-12 h-12 rounded-full bg-islamic-light flex items-center justify-center mb-4 text-islamic-green">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find & Request <span className="text-islamic-green">Duas</span> for Every Moment
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A beautiful collection of Islamic supplications and a community of people making dua for one another.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/duas">
                  <Button className="btn-primary w-full sm:w-auto">
                    <Search size={18} className="mr-1" />
                    Browse Duas
                  </Button>
                </Link>
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light w-full sm:w-auto">
                    <MessageSquare size={18} className="mr-1" />
                    Request Dua
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">How Make Dua Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <FeatureItem 
                icon={<Search size={24} />}
                title="Find Duas"
                description="Search our extensive collection of authentic duas for every situation"
              />
              <FeatureItem 
                icon={<BookOpen size={24} />}
                title="Learn & Memorize"
                description="Read Arabic text with translations and transliterations"
              />
              <FeatureItem 
                icon={<MessageSquare size={24} />}
                title="Request Prayers"
                description="Share your needs anonymously with the community"
              />
              <FeatureItem 
                icon={<Heart size={24} />}
                title="Support Others"
                description="Make dua for those in need and earn rewards"
              />
            </div>
          </div>
        </section>
        
        {/* Featured Content */}
        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Content</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Featured Dua */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Dua of the Day</h3>
              <DuaCard {...featuredDua} />
              <div className="flex justify-center mt-6">
                <Link to="/duas">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light">
                    View All Duas
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Featured Request */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Recent Request</h3>
              <DuaRequestCard {...featuredRequest} />
              <div className="flex justify-center mt-6">
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light">
                    View All Requests
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="bg-islamic-light py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="max-w-3xl mx-auto border-none bg-white/80 backdrop-blur">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-xl md:text-2xl italic text-islamic-dark mb-6">
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
      
      <Footer />
    </div>
  );
};

export default Index;
