import React, { useRef, useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function Addcourse() {
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseDiscount, setCourseDiscount] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [chapters, setChapters] = useState([{ id: uniqid(), title: '', videoUrl: '' }]);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'اكتب وصف الدورة...',
      });
    }
  }, []);

  const handleChapterChange = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const addNewChapter = () => {
    setChapters([...chapters, { id: uniqid(), title: '', videoUrl: '' }]);
  };

  const handleSubmit = () => {
    const description = quillRef.current?.root.innerHTML;
    const data = {
      title: courseTitle,
      price: coursePrice,
      discount: courseDiscount,
      image: courseImage,
      description: description,
      chapters: chapters,
    };
    console.log('Submitting course:', data);
    // ممكن تضيف إرسال للسيرفر هنا باستخدام fetch أو axios
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📘 Add New Course</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount</label>
            <input
              type="number"
              value={courseDiscount}
              onChange={(e) => setCourseDiscount(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course Image</label>
          <input
            type="file"
            onChange={(e) => setCourseImage(e.target.files[0])}
            className="w-full mt-1 text-sm"
          />
        </div>
        {courseImage && <img src={URL.createObjectURL(courseImage)}></img>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
          <div ref={editorRef} className="h-40 bg-white rounded-md border border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chapters</label>
          {chapters.map((chapter, index) => (
            <div key={chapter.id} className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                placeholder="Chapter Title"
                value={chapter.title}
                onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Video URL"
                value={chapter.videoUrl}
                onChange={(e) => handleChapterChange(index, 'videoUrl', e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
          ))}
          <button onClick={addNewChapter} className="text-blue-600 hover:underline text-sm">
            + Add Another Chapter
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Course
        </button>
      </div>
    </div>
  );
}

export default Addcourse;
