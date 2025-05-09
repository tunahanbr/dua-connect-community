import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpotlight } from "@/components/search/SpotlightProvider";
import { db, type Dua } from "@/lib/db";
import { useLanguage } from "@/contexts/LanguageContext";

const DuasLibrary = () => {
  const [searchParams] = useSearchParams();
  const [duas, setDuas] = useState<Dua[]>([]);
  const [filteredDuas, setFilteredDuas] = useState<Dua[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { openSearch } = useSpotlight();
  const { language, t } = useLanguage();
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    fetchDuas();
  }, []);

  const checkScrollPosition = () => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 300);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  useEffect(() => {
    checkScrollPosition();
  }, [categories]);

  // Helper function to normalize category names
  const normalizeCategory = (category) => {
    if (!category) return 'uncategorized';
    // Handle both "Category." and "category." prefixes
    return category.toLowerCase().replace(/^category\./i, '');
  };

  const fetchDuas = async () => {
    try {
      const result = await db.duas.getAll();

      // Make sure to normalize all category values
      const transformedDuas = result.map(dua => ({
        ...dua,
        // Normalize the category but preserve the original for display purposes
        originalCategory: dua.category,
        category: normalizeCategory(dua.category)
      }));

      const uniqueCategories = ['all', ...new Set(transformedDuas.map(dua => dua.category))];

      setDuas(transformedDuas);
      setFilteredDuas(transformedDuas);
      setCategories(uniqueCategories);
      setIsLoading(false);
      
      // Debug log to check category values
      console.log("Categories after processing:", uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch duas:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const id = searchParams.get("id");

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
      result = result.filter((dua) => {
        const translationToCheck =
          language === "tr"
            ? dua.turkishTranslation
            : language === "de"
            ? dua.germanTranslation
            : dua.englishTranslation;

        return (
          translationToCheck.toLowerCase().includes(search.toLowerCase()) ||
          dua.transliteration?.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (category && category !== "all") {
      result = result.filter((dua) => dua.category === category);
    }

    setFilteredDuas(result);
  };

  const handleTabChange = (value: string) => {
    setActiveCategoryTab(value);
    handleFilterChange(searchTerm, value);
  };

  const getTranslatedCategory = (category: string) => {
    if (category === "all") return t("category.all");
    const normalizedCategory = normalizeCategory(category);
    return t(`category.${normalizedCategory}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-xl md:text-2xl font-bold mb-2">{t("duas.title")}</h1>
            <p className="text-gray-600 mb-4">{t("duas.subtitle")}</p>
            <Button
              onClick={openSearch}
              variant="outline"
              className="mt-2 border-islamic-green/30 text-islamic-green"
            >
              <Search size={16} className="mr-2" />
              {t("duas.search")} (⌘K)
            </Button>
          </div>

          <div className="mt-6 mb-4">
            <Tabs value={activeCategoryTab} onValueChange={handleTabChange} className="w-full">
              <div className="mb-6 relative">
                {showLeftArrow && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-500 hover:text-islamic-green hover:bg-transparent"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                )}

                {showRightArrow && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-500 hover:text-islamic-green hover:bg-transparent"
                    onClick={scrollRight}
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={16} />
                  </Button>
                )}

                <div className="px-8">
                  <TabsList
                    ref={tabsListRef}
                    className="flex h-auto p-1 w-full justify-start gap-2 overflow-x-auto scrollbar-hide"
                    onScroll={checkScrollPosition}
                  >
                    {categories.map((category) => {
                      // Double check that we're using clean category names for display
                      const displayCategory = category === 'all' ? 'all' : normalizeCategory(category);
                      return (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="capitalize data-[state=active]:bg-white/80 data-[state=active]:text-islamic-green text-xs sm:text-sm whitespace-nowrap flex-shrink-0 my-1"
                        >
                          {t(`category.${displayCategory}`)}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
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
                      <p className="text-gray-500">{t("duas.noResults")}</p>
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