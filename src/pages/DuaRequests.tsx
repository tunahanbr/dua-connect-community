
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaRequestCard from "@/components/request/DuaRequestCard";
import DuaRequestForm from "@/components/request/DuaRequestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare } from "lucide-react";
import SpotlightSearch from "@/components/search/SpotlightSearch";

// Sample data (in a real app, this would come from an API)
const initialRequests = [
  {
    id: "request-001",
    request: "Please make dua for my mother who is unwell. May Allah grant her complete shifa.",
    duasCount: 124,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "request-002",
    request: "I have my final exams next week. Please make dua that Allah makes it easy for me and grants me success.",
    duasCount: 87,
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: "request-003",
    request: "I'm struggling with anxiety. Please make dua that Allah grants me peace and tranquility.",
    duasCount: 205,
    createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  },
  {
    id: "request-004",
    request: "Please make dua for my family's well-being and that Allah protects us all from harm.",
    duasCount: 156,
    createdAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
  },
  {
    id: "request-005",
    request: "I'm searching for a job. Please make dua that Allah opens doors of halal rizq for me.",
    duasCount: 132,
    createdAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  }
];

const DuaRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  
  const handleRequestSubmitted = () => {
    const newRequest = {
      id: `request-${new Date().getTime()}`,
      request: "Please make dua for me.", // This is a placeholder, the actual request was cleared in the form
      duasCount: 0,
      createdAt: new Date().toISOString()
    };
    
    setRequests([newRequest, ...requests]);
    setActiveTab("browse"); // Switch to browse tab after submission
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <SpotlightSearch 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
        items={requests.map(request => ({
          id: request.id,
          title: request.request.substring(0, 40) + "...",
          category: "request",
          path: `/requests?id=${request.id}`
        }))}
      />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="mb-2">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-islamic-light text-islamic-green animate-fade-up">
                <MessageSquare size={24} />
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up" style={{animationDelay: '0.1s'}}>Request Duas</h1>
            <p className="text-gray-600 animate-fade-up" style={{animationDelay: '0.2s'}}>
              Share your request and make dua for others in our community
            </p>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-10"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6 bg-slate-100/80 p-1 animate-fade-up" style={{animationDelay: '0.3s'}}>
              <TabsTrigger value="browse" className="data-[state=active]:bg-white data-[state=active]:text-islamic-green">
                <Heart size={16} className="mr-2" />
                Browse Requests
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-islamic-green">
                <MessageSquare size={16} className="mr-2" />
                Create Request
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-0 animate-fade-up" style={{animationDelay: '0.4s'}}>
              <DuaRequestForm onRequestSubmitted={handleRequestSubmitted} />
            </TabsContent>
            
            <TabsContent value="browse" className="mt-0 space-y-6">
              {requests.map((request, index) => (
                <div key={request.id} className="animate-fade-up" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
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
