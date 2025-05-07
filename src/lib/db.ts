import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// Authenticate as admin
const adminEmail = 'me@tunahan.at';    // Replace with your admin email
const adminPassword = 'Tunahan59!';          // Replace with your admin password

// Try to authenticate
try {
  await pb.admins.authWithPassword(adminEmail, adminPassword);
} catch (error) {
  console.error('Failed to authenticate with PocketBase:', error);
}

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
    getAll: async () => {
      const signal = new AbortController();
      try {
        const result = await pb.collection('duas').getList(1, 300, {
          sort: '-created',
          signal: signal.signal,
        });
        return result.items;
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request was cancelled');
          return [];
        }
        throw error;
      } finally {
        signal.abort(); // Clean up the signal
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
    getAll: async () => {
      const signal = new AbortController();
      try {
        const result = await pb.collection('requests').getList(1, 50, {
          sort: '-created',
          signal: signal.signal,
        });
        return result.items;
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request was cancelled');
          return [];
        }
        throw error;
      } finally {
        signal.abort(); // Clean up the signal
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