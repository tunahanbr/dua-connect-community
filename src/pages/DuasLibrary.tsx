
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaCard from "@/components/dua/DuaCard";
import DuaFilter from "@/components/dua/DuaFilter";

// Sample data (in a real app, this would come from an API)
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
  }
];

const categories = ["all", "general", "health", "anxiety", "protection", "guidance", "travel", "forgiveness"];

const DuasLibrary = () => {
  const [filteredDuas, setFilteredDuas] = useState(duasData);
  
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
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Duas Library</h1>
            <p className="text-gray-600">
              Find duas for every situation in your life
            </p>
          </div>
          
          <DuaFilter 
            categories={categories} 
            onFilterChange={handleFilterChange} 
          />
          
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DuasLibrary;
