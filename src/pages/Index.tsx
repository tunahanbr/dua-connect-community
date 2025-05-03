
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import DuaRequestCard from "@/components/request/DuaRequestCard";

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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
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
                    Find Duas
                  </Button>
                </Link>
                <Link to="/requests">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light w-full sm:w-auto">
                    Request Dua
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Content */}
        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Dua */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Featured Dua</h2>
              <DuaCard {...featuredDua} />
              <div className="text-center mt-6">
                <Link to="/duas">
                  <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-light">
                    View All Duas
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Featured Request */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Featured Request</h2>
              <DuaRequestCard {...featuredRequest} />
              <div className="text-center mt-6">
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
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl md:text-2xl italic text-islamic-dark mb-6">
                "The dua of a Muslim for his brother in his absence is readily accepted. An angel is appointed to his side. Whenever he makes a beneficial dua for his brother the appointed angel says, 'Ameen, and the same for you.'"
              </p>
              <p className="text-sm text-islamic-green font-medium">
                - Sahih Muslim
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
