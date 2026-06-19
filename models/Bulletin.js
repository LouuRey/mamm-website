import mongoose from 'mongoose';

const bulletinSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Ini penting agar tidak error saat hot reload di Next.js
export default mongoose.models.Bulletin || mongoose.model('Bulletin', bulletinSchema);
