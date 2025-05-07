import { useState, useEffect, useRef, useCallback } from "react";
import { db, type Request } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DuaRequestCard from "@/components/request/DuaRequestCard";
import DuaRequestForm from "@/components/request/DuaRequestForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DuaRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("browse");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const mountedRef = useRef(true);

  const fetchRequests = useCallback(async (isInitialLoad = false) => {
    // Reset error state
    setError(null);
    if (!isInitialLoad) {
      setIsLoading(true);
    }
    
    try {
      // Use the correct API based on your db structure
      const result = await db.requests.getAll({
        filter: 'status = "approved"',
        expand: 'user',
        sort: '-created',
        $cancelKey: 'requests_' + Date.now() // Use unique cancel key for each request
      });
      
      // Check if component is still mounted before updating state
      if (mountedRef.current) {
        setRequests(result);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Failed to fetch requests:', err);
      
      // Don't show error toast for aborted requests
      if (err.name === 'AbortError' || 
          (err.name === 'ClientResponseError' && err.status === 0 && err.message.includes('autocancelled'))) {
        console.log('Request was aborted/cancelled - likely due to component unmounting');
        return;
      }
      
      // Only update state if component is still mounted
      if (mountedRef.current) {
        setError(err);
        setIsLoading(false);
        if (!isInitialLoad) {
          toast({
            title: "Error",
            description: "Failed to load requests. Please try again.",
            variant: "destructive"
          });
        }
      }
    } finally {
      // Only update loading state if component is still mounted
      if (mountedRef.current && !isInitialLoad) {
        setIsLoading(false);
      }
    }
  }, [toast]);

  useEffect(() => {
    // Set mountedRef to true when component mounts
    mountedRef.current = true;
    
    // Initial fetch - setting isLoading here instead of in fetchRequests
    setIsLoading(true);
    
    // Use a slight delay to ensure proper component initialization
    const loadTimer = setTimeout(() => {
      if (mountedRef.current) {
        fetchRequests(true).catch(err => {
          if (mountedRef.current) {
            console.error("Initial fetch failed:", err);
            setError(err);
            setIsLoading(false);
          }
        });
      }
    }, 100);

    // Set up periodic refresh - only if not in error state
    const intervalId = setInterval(() => {
      if (mountedRef.current && !error) {
        fetchRequests().catch(err => {
          console.error("Interval fetch failed:", err);
        });
      }
    }, 30000); // Refresh every 30 seconds

    // Cleanup function
    return () => {
      mountedRef.current = false;
      clearTimeout(loadTimer);
      clearInterval(intervalId);
    };
  }, [fetchRequests, error]);

  const handleRequestSubmitted = async (formData) => {
    if (!formData || !formData.request) {
      toast({
        title: 'Error',
        description: 'Please enter a request message',
        variant: 'destructive'
      });
      return;
    }

    try {
      await db.requests.create({
        request: formData.request,
        status: 'approved',
        duas_count: 0,
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      });
      
      toast({
        title: 'Success',
        description: 'Your dua request has been submitted successfully'
      });
      
      // Fetch updated requests list
      fetchRequests(false);
      setActiveTab('browse');
    } catch (err) {
      console.error('Failed to submit request:', err);
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-islamic-green animate-spin mb-4" />
          <p className="text-gray-600">Loading requests...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center py-8 border border-red-100 bg-red-50 rounded-lg p-4">
          <p className="text-red-600 mb-3">Failed to load requests</p>
          <button 
            onClick={() => fetchRequests(false)} 
            className="text-islamic-green hover:text-islamic-dark flex items-center justify-center mx-auto px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Try again
          </button>
        </div>
      );
    }
    
    if (requests.length === 0) {
      return (
        <div className="text-center py-8 border border-gray-100 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No requests found</p>
        </div>
      );
    }
    
    return requests.map((request, index) => (
      <div 
        key={request.id} 
        className="animate-fade-up" 
        style={{animationDelay: `${index * 0.05}s`}}
      >
        <DuaRequestCard 
          id={request.id}
          request={request.request}
          duasCount={request.duas_count || 0}
          createdAt={request.created}
        />
      </div>
    ));
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
              {renderContent()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DuaRequests;