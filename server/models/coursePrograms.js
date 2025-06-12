import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true }, // ✅ Use consistent camelCase (CourseId → courseId)
    completed: { type: Boolean, default: false },

    lectureCompleted: {
      type: [String], // ✅ Define the type of array elements
      default: [],
    },
  },
  { minimize: false }
);


export const CourseProgress=mongoose.model('courseprogress',programSchema)