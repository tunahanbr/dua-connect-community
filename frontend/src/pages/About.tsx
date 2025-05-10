
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Heart, MessageSquare, Search } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

const AboutFeature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const { t } = useLanguage();
  return (
    <Card className="border border-slate-100 bg-white">
      <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-islamic-light flex items-center justify-center mb-4 text-islamic-green">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-2">{t(title)}</h3>
        <p className="text-gray-600">{t(description)}</p>
      </CardContent>
    </Card>
  );
};

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-xl text-gray-600">
              {t('about.subtitle')}
            </p>
          </div>
          
          <div className="mb-12">
            <Card className="border border-slate-100 bg-white">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
                <p className="text-gray-700 mb-4">
                  {t('about.mission.paragraph1')}
                </p>
                <p className="text-gray-700">
                  {t('about.mission.paragraph2')}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">{t('about.offerings.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <AboutFeature 
              icon={<Book size={24} />}
              title="about.offerings.library.title"
              description="about.offerings.library.description"
            />
            
            <AboutFeature 
              icon={<Search size={24} />}
              title="about.offerings.search.title"
              description="about.offerings.search.description"
            />
            
            <AboutFeature 
              icon={<MessageSquare size={24} />}
              title="about.offerings.request.title"
              description="about.offerings.request.description"
            />
            
            <AboutFeature 
              icon={<Heart size={24} />}
              title="about.offerings.support.title"
              description="about.offerings.support.description"
            />
          </div>
          
          <div className="bg-islamic-light rounded-2xl p-8 text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('about.howto.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-islamic-green">1</div>
                <h3 className="font-medium mb-2">{t('about.howto.step1.title')}</h3>
                <p className="text-sm">{t('about.howto.step1.description')}</p>
              </div>
              
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-islamic-green">2</div>
                <h3 className="font-medium mb-2">{t('about.howto.step2.title')}</h3>
                <p className="text-sm">{t('about.howto.step2.description')}</p>
              </div>
              
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-islamic-green">3</div>
                <h3 className="font-medium mb-2">{t('about.howto.step3.title')}</h3>
                <p className="text-sm">{t('about.howto.step3.description')}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <Card className="border border-slate-100 bg-white">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('about.expanding.title')}</h2>
                <p className="text-gray-700 mb-4">
                  {t('about.expanding.paragraph1')}
                </p>
                <p className="text-gray-700">
                  {t('about.expanding.paragraph2')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
