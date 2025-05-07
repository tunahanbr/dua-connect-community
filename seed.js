import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // PocketBase server URL
const ADMIN_EMAIL = "me@tunahan.at"; // Replace with your admin email
const ADMIN_PASSWORD = "Tunahan59!"; // Replace with your admin password

const duasData = [
   
  ];

  (async () => {
    try {
      // ✅ Authenticate as admin
      await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
      console.log("✅ Admin authenticated.");
  
      // ➕ Add duas
      for (const dua of duasData) {
        try {
          const record = await pb.collection('duas').create(dua);
          console.log("✅ Added:", record.id);
        } catch (err) {
          console.error("❌ Failed to add:", dua.arabicText, "\nReason:", err.message);
        }
      }
  
      console.log("🎉 All duas processed.");
      pb.authStore.clear(); // optional logout
    } catch (err) {
      console.error("🚨 Admin login failed:", err.message);
    }
  })();
  
