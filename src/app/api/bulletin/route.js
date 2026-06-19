import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Bulletin from "../../../../models/Bulletin";

const MONGODB_URI = process.env.MONGODB_URI;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

export async function GET() {
  try {
    const bulletins = await Bulletin.find().sort({ createdAt: -1 });
    return NextResponse.json(bulletins);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch bulletin" },
      { status: 500 }
    );
  }
}