import PocketBase from 'pocketbase';

// Get environment variables with fallbacks
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;
const adminEmail = import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL;
const adminPassword = import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD;

const pb = new PocketBase(pocketbaseUrl);

// Initialize admin authentication
const initializeAdminAuth = async () => {
  if (adminEmail && adminPassword) {
    try {
      await pb.admins.authWithPassword(adminEmail, adminPassword);
    } catch (error) {
      console.error('Failed to authenticate with PocketBase:', error);
    }
  }
};

// Call the initialization function
initializeAdminAuth();

export interface Dua {
  id: string;
  arabicText: string;
  englishTranslation: string;
  turkishTranslation: string;
  germanTranslation: string;
  transliteration: string;
  source: string;
  category: string;
  created: string;
  updated: string;
}

export interface Request {
  id: string;
  request: string;
  status: 'pending' | 'approved' | 'rejected';
  duas_count: number;
  created: string;
  updated: string;
}

export const db = {
  duas: {
    getAll: async (options: Record<string, any> = {}) => {
      try {
        // Create a custom cancelKey to prevent auto-cancellation
        const cancelKey = `duas_${Date.now()}`;
        const result = await pb.collection('duas').getList(1, options.limit || 300, {
          ...options,
          $cancelKey: cancelKey, // Add a unique cancel key
        });
        return result.items;
      } catch (error) {
        // Only log and throw if it's not an auto-cancellation
        if (error?.status !== 0 || !error?.message?.includes('autocancelled')) {
          console.error('Error fetching duas:', error);
          throw error;
        }
        // Return empty array for cancelled requests
        return [];
      }
    },
    getOne: async (id: string) => {
      return await pb.collection('duas').getOne(id);
    },
    create: async (data: Partial<Dua>) => {
      return await pb.collection('duas').create(data);
    },
    update: async (id: string, data: Partial<Dua>) => {
      return await pb.collection('duas').update(id, data);
    },
    delete: async (id: string) => {
      return await pb.collection('duas').delete(id);
    }
  },
  requests: {
    getAll: async (options: Record<string, any> = {}) => {
      try {
        // Create a custom cancelKey to prevent auto-cancellation
        const cancelKey = `requests_${Date.now()}`;
        const result = await pb.collection('requests').getList(1, options.limit || 50, {
          ...options,
          $cancelKey: cancelKey, // Add a unique cancel key
        });
        return result.items;
      } catch (error) {
        // Only log and throw if it's not an auto-cancellation
        if (error?.status !== 0 || !error?.message?.includes('autocancelled')) {
          console.error('Error fetching requests:', error);
          throw error;
        }
        // Return empty array for cancelled requests
        return [];
      }
    },
    getOne: async (id: string) => {
      return await pb.collection('requests').getOne(id);
    },
    create: async (data: Partial<Request>) => {
      return await pb.collection('requests').create(data);
    },
    update: async (id: string, data: Partial<Request>) => {
      return await pb.collection('requests').update(id, data);
    },
    delete: async (id: string) => {
      return await pb.collection('requests').delete(id);
    },
    updateStatus: async (id: string, status: 'approved' | 'rejected') => {
      return await pb.collection('requests').update(id, { status });
    }
  }
};