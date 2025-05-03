
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-soft">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Make Dua</h1>
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Purpose</h2>
              <p className="text-gray-700">
                Make Dua was created to provide a beautiful, accessible collection of Islamic duas (supplications) for Muslims around the world. Our mission is to make it easier for Muslims to find and recite appropriate duas for every situation in their lives, as well as to facilitate a community of believers supporting each other through prayer.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Why Duas Matter</h2>
              <p className="text-gray-700 mb-4">
                Dua (supplication) is the essence of worship in Islam. It is a direct conversation with Allah, where we express our needs, hopes, fears, and gratitude. The Prophet Muhammad (peace be upon him) made dua for all aspects of his life and taught us to do the same.
              </p>
              <div className="bg-islamic-light p-4 rounded-lg">
                <p className="text-islamic-dark italic">
                  "And your Lord says, 'Call upon Me; I will respond to you.'" — Quran 40:60
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Making Dua for Others</h2>
              <p className="text-gray-700 mb-4">
                In Islam, making dua for your fellow Muslims is highly encouraged. The Prophet Muhammad (peace be upon him) taught us that when a Muslim makes dua for another Muslim in their absence, an angel is appointed who says "Ameen, and the same for you" after each dua.
              </p>
              <p className="text-gray-700">
                Our "Request Dua" feature allows Muslims to anonymously share their needs with the community and receive the spiritual support of prayers from around the world.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Collection</h2>
              <p className="text-gray-700">
                Our collection of duas is sourced from the Quran and authentic hadith. We continuously work to expand our library and ensure that all supplications are accurately represented with proper Arabic text, transliteration, and translation. If you notice any errors or have suggestions for additional duas to include, please contact us.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
