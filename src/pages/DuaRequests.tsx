
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaRequestCard from "@/components/request/DuaRequestCard";
import DuaRequestForm from "@/components/request/DuaRequestForm";

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
  
  const handleRequestSubmitted = () => {
    const newRequest = {
      id: `request-${new Date().getTime()}`,
      request: "Please make dua for me.", // This is a placeholder, the actual request was cleared in the form
      duasCount: 0,
      createdAt: new Date().toISOString()
    };
    
    setRequests([newRequest, ...requests]);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Duas</h1>
            <p className="text-gray-600">
              Share your request and make dua for others in our community
            </p>
          </div>
          
          <div className="mb-10">
            <DuaRequestForm onRequestSubmitted={handleRequestSubmitted} />
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Community Requests</h2>
          <div className="grid grid-cols-1 gap-6">
            {requests.map((request) => (
              <DuaRequestCard key={request.id} {...request} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DuaRequests;
