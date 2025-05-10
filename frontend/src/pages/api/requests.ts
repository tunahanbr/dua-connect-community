import { getDb } from '@/lib/db';

export async function GET(req: Request) {
  const db = await getDb();
  const requests = await db.all('SELECT * FROM requests ORDER BY created_at DESC');
  return Response.json(requests);
}

export async function POST(req: Request) {
  const db = await getDb();
  const request = await req.json();
  
  await db.run(
    `INSERT INTO requests (id, request) VALUES (?, ?)`,
    [request.id, request.request]
  );
  
  return Response.json({ success: true });
}