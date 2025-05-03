
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpotlightSearch from "@/components/search/SpotlightSearch";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// This is a sample dataset - in a production app, this would be in a database
// We're structuring it in a way that makes it easy to expand
const duasData = [
  {
    id: "dua-001",
    arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    englishTranslation: "Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire.",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar.",
    source: "Quran 2:201",
    category: "general"
  },
  {
    id: "dua-002",
    arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
    englishTranslation: "O Allah, I ask You for pardon and well-being in this life and the next.",
    transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyah fid-dunya wal-akhirah.",
    source: "Ibn Majah",
    category: "health"
  },
  {
    id: "dua-003",
    arabicText: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    englishTranslation: "My Lord, expand for me my chest and ease for me my task.",
    transliteration: "Rabbish-rahli sadri wa yassirli amri.",
    source: "Quran 20:25-26",
    category: "anxiety"
  },
  {
    id: "dua-004",
    arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    englishTranslation: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by men.",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-daini wa ghalabatir-rijal.",
    source: "Sahih al-Bukhari",
    category: "anxiety"
  },
  {
    id: "dua-005",
    arabicText: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
    englishTranslation: "O Allah, Lord of mankind, remove the harm and heal him, for You are the Healer, and there is no healing except Your healing, a healing that leaves no disease behind.",
    transliteration: "Allahumma Rabban-nas, adh-hibil-ba's, washfi antash-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqaman.",
    source: "Sahih al-Bukhari",
    category: "health"
  },
  {
    id: "dua-006",
    arabicText: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ",
    englishTranslation: "O Allah, I seek Your guidance by virtue of Your knowledge, and I seek ability by virtue of Your power, and I ask You of Your great bounty.",
    transliteration: "Allahumma inni astakhiruka bi'ilmika wa astaqdiruka biqudratika wa as'aluka min fadlikal-'azim.",
    source: "Sahih al-Bukhari",
    category: "guidance"
  },
  {
    id: "dua-007",
    arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    englishTranslation: "O Allah, I seek refuge in You from the punishment of the grave, from the punishment of Hell-fire, from the trials of life and death, and from the evil of the trial of the False Messiah.",
    transliteration: "Allahumma inni a'udhu bika min 'adhabil-qabri, wa min 'adhabi jahannam, wa min fitnatil-mahya wal-mamat, wa min sharri fitnatil-masihid-dajjal.",
    source: "Sahih Muslim",
    category: "protection"
  },
  {
    id: "dua-008",
    arabicText: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    englishTranslation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik.",
    source: "Abu Dawud",
    category: "guidance"
  },
  // Expanded duas set - these can be easily added to since they follow the same structure
  {
    id: "dua-009",
    arabicText: "اللهم اغفر لي ذنبي، ووسع لي في داري، وبارك لي فيما رزقتني",
    englishTranslation: "O Allah, forgive my sin, make my house spacious, and bless what You have provided me.",
    transliteration: "Allahumma-ghfir li dhanbi, wa wassi' li fi dari, wa barik li fima razaqtani.",
    source: "An-Nasa'i",
    category: "forgiveness"
  },
  {
    id: "dua-010",
    arabicText: "اللهم إني أسألك علما نافعا، ورزقا طيبا، وعملا متقبلا",
    englishTranslation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan.",
    source: "Ibn Majah",
    category: "knowledge"
  },
  {
    id: "dua-011",
    arabicText: "اللهم إني أعوذ بك من الهم والحزن",
    englishTranslation: "O Allah, I seek refuge in You from anxiety and sorrow.",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan.",
    source: "Abu Dawud",
    category: "anxiety"
  },
  {
    id: "dua-012",
    arabicText: "اللهم لا سهل إلا ما جعلته سهلا، وأنت تجعل الحزن إذا شئت سهلا",
    englishTranslation: "O Allah, nothing is easy except what You make easy, and You make the difficult easy if You wish.",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alul-hazna idha shi'ta sahla.",
    source: "Ibn Hibban",
    category: "difficulty"
  },
  {
    id: "dua-013",
    arabicText: "اللهم إني أستودعك ديني، وأمانتي، وخواتيم عملي، وأهلي ومالي",
    englishTranslation: "O Allah, I entrust to You my religion, my trusts, the results of my deeds, my family, and my property.",
    transliteration: "Allahumma inni astawdi'uka dini, wa amanati, wa khawatima 'amali, wa ahli wa mali.",
    source: "Abu Dawud",
    category: "protection"
  },
  {
    id: "dua-014",
    arabicText: "اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ. وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً",
    englishTranslation: "O Allah, have mercy on me through the Quran, and make it for me a leader, a light, a guidance and a mercy.",
    transliteration: "Allahummar-hamni bil-Qur'an. Waj'alhu li imaman wa nuran wa hudan wa rahma.",
    source: "Ibn Majah",
    category: "guidance"
  },
  {
    id: "dua-015",
    arabicText: "اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمن سواك",
    englishTranslation: "O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.",
    transliteration: "Allahumma-kfini bi halaalika 'an haraamika wa aghnini bi fadlika 'amman siwaak.",
    source: "At-Tirmidhi",
    category: "provision"
  },
  {
    id: "dua-016",
    arabicText: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    englishTranslation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    transliteration: "A'udhu bi kalimati-llahit-tammati min sharri ma khalaq.",
    source: "Muslim",
    category: "protection"
  }
];

// Expanded categories list
const categories = [
  "all", "general", "health", "anxiety", "protection", "guidance", 
  "travel", "forgiveness", "knowledge", "difficulty", "provision"
];

const DuasLibrary = () => {
  const [searchParams] = useSearchParams();
  const [filteredDuas, setFilteredDuas] = useState(duasData);
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
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
      const dua = duasData.find(d => d.id === id);
      if (dua) {
        setFilteredDuas([dua]);
        return;
      }
    }
    
    handleFilterChange(search || "", category || activeCategoryTab);
  }, [searchParams]);
  
  const handleFilterChange = (search: string, category: string) => {
    let result = duasData;
    
    if (search) {
      result = result.filter(
        (dua) => 
          dua.englishTranslation.toLowerCase().includes(search.toLowerCase()) ||
          dua.transliteration?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category && category !== 'all') {
      result = result.filter((dua) => dua.category === category);
    }
    
    setFilteredDuas(result);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveCategoryTab(value);
    handleFilterChange(searchTerm, value);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <SpotlightSearch 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
        items={duasData.map(dua => ({
          id: dua.id,
          title: dua.englishTranslation.substring(0, 40) + "...",
          category: dua.category,
          path: `/duas?id=${dua.id}`
        }))}
      />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Duas Library</h1>
            <p className="text-gray-600 mb-4">
              Find duas for every situation in your life
            </p>
            <Button 
              onClick={() => setIsSearchOpen(true)}
              variant="outline" 
              className="mt-2 border-islamic-green/30 text-islamic-green"
            >
              <Search size={16} className="mr-2" />
              Search duas (⌘K)
            </Button>
          </div>
          
          <div className="mt-8 mb-4">
            <Tabs 
              value={activeCategoryTab} 
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="mb-6 overflow-x-auto pb-2">
                <TabsList className="flex h-auto p-1 bg-slate-100/80">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="capitalize data-[state=active]:bg-white data-[state=active]:text-islamic-green"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  {filteredDuas.length > 0 ? (
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
