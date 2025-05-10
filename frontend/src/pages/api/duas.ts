import { getDb } from '@/lib/db';

export async function GET(req: Request) {
  const db = await getDb();
  const duas = await db.all('SELECT * FROM duas ORDER BY created_at DESC');
  return Response.json(duas);
}

export async function POST(req: Request) {
  const db = await getDb();
  const dua = await req.json();
  
  await db.run(
    `INSERT INTO duas (id, arabic_text, english_translation, transliteration, source, category) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [dua.id, dua.arabicText, dua.englishTranslation, dua.transliteration, dua.source, dua.category]
  );
  
  return Response.json({ success: true });
}