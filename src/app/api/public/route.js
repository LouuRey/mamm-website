import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import PublicMessage from '../../../../models/PublicMessage';
import { isRateLimited } from '../../../lib/rateLimit';


const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

export async function GET() {
  try {
    await connectDB();
    const messages = await PublicMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}


export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Tunggu 1 jam sebelum kirim lagi' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const created = await PublicMessage.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal mengirim pesan' }, { status: 500 });
  }
}
