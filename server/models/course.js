import mongoose from "mongoose";

// Lecture Schema
const lectureSchema = new mongoose.Schema({
  lectureId: {
    type: String,
    required: true,
  },
  lectureTitle: {
    type: String,
    required: true,
    
  },
  lectureDuration: {
    type: String,
    required: true,
  },
  lectureUrl: {
    type: String,
    required: true,
  },
  lectureIsPreview: {
    type: Boolean,
    default: false,
  },
  lectureOrder: {
    type: Number,
  },
}, { _id: false }); // _id false لو مش عايز يضيف id لكل محاضرة داخل الفصل

// Chapter Schema
const chapterSchema = new mongoose.Schema({
  chapterID: { type: String, required: true },
  chapterOrder: { type: Number, required: true },
  chapterTitle: { type: String, required: true },

  chapterContent: [lectureSchema], // قائمة المحاضرات داخل الفصل
}, { _id: false }); // لو مش عايز _id لكل فصل

// Course Schema
const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseThumbnail: { type: String },
  coursePrice: { type: Number, required: true },
  isPublished: { type: Boolean, default: true },

  discount: { type: Number, required: true, min: 0, max: 100 },

  courseContent: [chapterSchema], // قائمة الفصول

  courseRatings: [
    {
      userId: { type: String },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],

  educator: { type: String, ref: 'User', required: true },

  enrolledStudent: [
    { type: String, ref: 'User' }
  ],
}, { timestamps: true });

const CouserModel = mongoose.model('Course', courseSchema);


export default CouserModel