import mongoose, { models, model, Schema } from 'mongoose';

const publicMessageSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

export default models.PublicMessage || model('PublicMessage', publicMessageSchema);
