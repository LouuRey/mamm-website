
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Bulletin from '../../../../models/Bulletin';


const MONGODB_URI = 'mongodb+srv://poxpox:andri@cluster0.7eryetz.mongodb.net/chatdb?retryWrites=true&w=majority';// Ganti jika beda

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export async function GET() {
  try {
    const bulletins = await Bulletin.find().sort({ createdAt: -1 });
    return NextResponse.json(bulletins);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch bulletin' }, { status: 500 });
  }
}
