import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk user ID
    name: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: false }, // خليها مش required عشان ما تعطلش الحفظ لو مفيش صورة
    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ]
  },
  { timestamps: true }
);

export const userModel = mongoose.model('User', userSchema);
