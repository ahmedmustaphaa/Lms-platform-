import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // ← Clerk ID هنا
    name: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ]
  },
  { timestamps: true }
);

export const userModel = mongoose.model('User', userSchema);
