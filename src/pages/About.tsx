
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Heart, MessageSquare, Search } from 'lucide-react';

const AboutFeature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="border border-slate-100 bg-white">
    <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-islamic-light flex items-center justify-center mb-4 text-islamic-green">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Make Dua</h1>
            <p className="text-xl text-gray-600">
              A platform for finding and sharing duas in the Islamic tradition
            </p>
          </div>
          
          <div className="mb-12">
            <Card className="border border-slate-100 bg-white">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  Make Dua was created with the goal of making Islamic duas accessible to everyone, 
                  everywhere. Our mission is to help Muslims strengthen their connection with Allah 
                  through dua (supplication) and foster a community of believers supporting one 
                  another through prayer.
                </p>
                <p className="text-gray-700">
                  The Prophet Muhammad (peace be upon him) said: <span className="italic">"Dua is worship."</span> 
                  We believe in the power of dua to transform lives and bring comfort in times of need.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <AboutFeature 
              icon={<Book size={24} />}
              title="Dua Library"
              description="A comprehensive collection of authenticated duas from the Quran and Sunnah, categorized and searchable."
            />
            
            <AboutFeature 
              icon={<Search size={24} />}
              title="Easy Search"
              description="Find the perfect dua for any situation with our powerful search and filtering tools."
            />
            
            <AboutFeature 
              icon={<MessageSquare size={24} />}
              title="Request Duas"
              description="Share your need for dua anonymously and have the community support you through prayer."
            />
            
            <AboutFeature 
              icon={<Heart size={24} />}
              title="Support Others"
              description="Make dua for others in need and be part of a caring community of believers."
            />
          </div>
          
          <div className="bg-islamic-light rounded-2xl p-8 text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">How To Use Make Dua</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-islamic-green">1</div>
                <h3 className="font-medium mb-2">Browse the Library</h3>
                <p className="text-sm">Find duas by category or search for specific needs</p>
              </div>
              
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-islamic-green">2</div>
                <h3 className="font-medium mb-2">Request Prayers</h3>
                <p className="text-sm">Share your prayer needs with the community</p>
              </div>
              
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-islamic-green">3</div>
                <h3 className="font-medium mb-2">Support Others</h3>
                <p className="text-sm">Make dua for those who have requested prayers</p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <Card className="border border-slate-100 bg-white">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-2xl font-semibold mb-4">Expanding Our Collection</h2>
                <p className="text-gray-700 mb-4">
                  We are constantly working to expand our dua collection. Our team researches and verifies 
                  duas from authentic sources to ensure accuracy. The library is structured to easily 
                  accommodate growth as we add more duas across various categories.
                </p>
                <p className="text-gray-700">
                  If you have suggestions for duas to add or notice any errors in our content, 
                  please reach out to us through our contact form.
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
