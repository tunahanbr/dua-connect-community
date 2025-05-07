
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpotlight } from "@/components/search/SpotlightProvider";
import { db, type Dua } from '@/lib/db';

const DuasLibrary = () => {
  const [searchParams] = useSearchParams();
  const [duas, setDuas] = useState([]);
  const [filteredDuas, setFilteredDuas] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { openSearch } = useSpotlight();

  useEffect(() => {
    fetchDuas();
  }, []);

  const fetchDuas = async () => {
    try {
      const result = await db.duas.getAll();
      // Transform the data to match the expected prop names
      const transformedDuas = result.map(dua => ({
        id: dua.id,
        arabicText: dua.arabicText,
        englishTranslation: dua.englishTranslation,
        germanTranslation: dua.germanTranslation,
        turkishTranslation: dua.turkishTranslation,
        transliteration: dua.transliteration,
        source: dua.source,
        category: dua.category
      }));

      // Extract unique categories from duas
      const uniqueCategories = ['all', ...new Set(transformedDuas.map(dua => dua.category))];
      
      setDuas(transformedDuas);
      setFilteredDuas(transformedDuas);
      setCategories(uniqueCategories);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch duas:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Handle URL parameters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const id = searchParams.get('id');
    
    if (category && categories.includes(category)) {
      setActiveCategoryTab(category);
    }
    
    if (search) {
      setSearchTerm(search);
    }
    
    if (id) {
      const dua = duas.find(d => d.id === id);
      if (dua) {
        setFilteredDuas([dua]);
        return;
      }
    }
    
    handleFilterChange(search || "", category || activeCategoryTab);
  }, [searchParams, duas]);

  const handleFilterChange = (search: string, category: string) => {
    let result = duas;
    
    if (search) {
      result = result.filter(
        (dua) => 
          dua.englishTranslation.toLowerCase().includes(search.toLowerCase()) ||
        dua.germanTranslation.toLowerCase().includes(search.toLowerCase()) ||
        dua.turkishTranslation.toLowerCase().includes(search.toLowerCase()) ||
          dua.transliteration?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category && category !== 'all') {
      result = result.filter((dua) => dua.category === category);
    }
    
    setFilteredDuas(result);
  };
  
  const handleTabChange = (value: string) => {
    setActiveCategoryTab(value);
    handleFilterChange(searchTerm, value);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-xl md:text-2xl font-bold mb-2">Duas Library</h1>
            <p className="text-gray-600 mb-4">
              Find duas for every situation in your life
            </p>
            <Button 
              onClick={openSearch}
              variant="outline" 
              className="mt-2 border-islamic-green/30 text-islamic-green"
            >
              <Search size={16} className="mr-2" />
              Search duas (⌘K)
            </Button>
          </div>
          
          <div className="mt-6 mb-4">
            <Tabs 
              value={activeCategoryTab} 
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="mb-6 overflow-x-auto pb-2">
                <TabsList className="flex h-auto p-1">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="capitalize data-[state=active]:bg-white/80 data-[state=active]:text-islamic-green"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="animate-pulse">
                          <div className="h-48 bg-slate-100 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : filteredDuas.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {filteredDuas.map((dua) => (
                        <DuaCard key={dua.id} {...dua} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No duas found matching your filters.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DuasLibrary;
