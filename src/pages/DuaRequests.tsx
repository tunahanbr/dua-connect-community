
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaRequestCard from "@/components/request/DuaRequestCard";
import DuaRequestForm from "@/components/request/DuaRequestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare } from "lucide-react";
import { requestsData } from "@/data/requests";

const DuaRequests = () => {
  const [requests, setRequests] = useState(requestsData);
  const [activeTab, setActiveTab] = useState("browse");
  
  const handleRequestSubmitted = () => {
    const newRequest = {
      id: `request-${new Date().getTime()}`,
      request: "Please make dua for me.", // Placeholder
      duasCount: 0,
      createdAt: new Date().toISOString()
    };
    
    setRequests(prevRequests => [newRequest, ...prevRequests]);
    setActiveTab("browse"); // Switch to browse tab after submission
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <div className="mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-islamic-light text-islamic-green">
                <MessageSquare size={16} />
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold mb-2">Request Duas</h1>
            <p className="text-gray-600 text-sm">
              Share your request and make dua for others in our community
            </p>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6 bg-slate-100/80 p-1">
              <TabsTrigger value="browse" className="data-[state=active]:bg-white data-[state=active]:text-islamic-green">
                <Heart size={16} className="mr-2" />
                Browse Requests
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-islamic-green">
                <MessageSquare size={16} className="mr-2" />
                Create Request
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-0">
              <DuaRequestForm onRequestSubmitted={handleRequestSubmitted} />
            </TabsContent>
            
            <TabsContent value="browse" className="mt-0 space-y-4">
              {requests.map((request, index) => (
                <div key={request.id} className="animate-fade-up" style={{animationDelay: `${index * 0.05}s`, animationPlayState: 'running', animationIterationCount: 1}}>
                  <DuaRequestCard {...request} />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DuaRequests;
