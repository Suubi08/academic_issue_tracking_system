
import { useState, useEffect } from "react";
import { Paperclip } from "lucide-react";
//import { Button } from "../components";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "marks", label: "Missing marks" },
  { value: "appeals", label: "Appeals" },
  { value: "corrections", label: "Corrections" },
];

const courseUnits = [
  { value: "OS", label: "Operating Systems" },
  { value: "DSA", label: "Data Structures and Algorithms" },
  { value: "SAD", label: "System Analysis and Design" },
  { value: "SD", label: "Software Development" },
  { value: "PS", label: "Probability and Statistics" },
];

const yearsOfStudy = [
  { value: "2025/2026", label: "2025/2026" },
  { value: "2024/2025", label: "2024/2025" },
  { value: "2023/2024", label: "2023/2024" },
  { value: "2022/2023", label: "2022/2023" },
  { value: "2021/2022", label: "2021/2022" },
];

const semesters = [
  { value: "one", label: "Semester One" },
  { value: "two", label: "Semester Two" },
];

const Studentsubmitissue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    dateOfIssue: "",
    courseUnit: "",
    lecturer: "",
    description: "",
    attachment: null,
    yearOfStudy: "",
    semester: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLecturers, setFilteredLecturers] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (id === "lecturer") {
      setSearchTerm(value);
      setShowDropdown(true);
    }
  };

  const handleSelectChange = (e, id) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, attachment: "File size must be less than 5MB." });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));
    setErrors({ ...errors, attachment: null });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.dateOfIssue)
      newErrors.dateOfIssue = "Date of issue is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form submitted:", formData);
    setSuccessMessage("Issue reported successfully!");
    setTimeout(() => {
      navigate("/studentdashboard");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/studentdashboard");
  };

  const handleLecturerSelect = (lecturer) => {
    setFormData((prev) => ({
      ...prev,
      lecturer: lecturer.name,
    }));
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/users/lecturer/?search=${searchTerm}`
        );
        if (response.ok) {
          const data = await response.json();
          setFilteredLecturers(data);
        } else {
          console.error("Failed to fetch lecturers");
        }
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    if (searchTerm) {
      fetchLecturers();
    } else {
      setFilteredLecturers([]);
    }
  }, [searchTerm]);

  return (
    <div className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-xl font-semibold mb-6">
          Academic Issue Report Form
        </h2>
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Details Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b">
              Issue Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="category" className="block">
                  Issue Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleSelectChange(e, "category")}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Issue</option>
                  {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm">{errors.category}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="dateOfIssue" className="block">
                  Date of Issue
                </label>
                <input
                  id="dateOfIssue"
                  type="date"
                  value={formData.dateOfIssue}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.dateOfIssue && (
                  <p className="text-red-600 text-sm">{errors.dateOfIssue}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="courseUnit" className="block">
                  Course Unit
                </label>
                <select
                  id="courseUnit"
                  value={formData.courseUnit}
                  onChange={(e) => handleSelectChange(e, "courseUnit")}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select course unit</option>
                  {courseUnits.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="lecturer" className="block">
                  Lecturer
                </label>
                <input
                  id="lecturer"
                  type="search"
                  placeholder="Search lecturer"
                  value={formData.lecturer}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {showDropdown && (
                  <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-lg mt-1">
                    {filteredLecturers.map((lecturer) => (
                      <li
                        key={lecturer.id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleLecturerSelect(lecturer)}
                      >
                        {lecturer.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label htmlFor="description" className="block">
                Issue Description
              </label>
              <textarea
                id="description"
                placeholder="Please describe your issue in detail..."
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="attachment" className="block">
                  Attachment
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-full p-2 border border-gray-300 rounded"
                    onClick={() =>
                      document.getElementById("attachment").click()
                    }
                  >
                    <Paperclip className="mr-2 h-4 w-4" />
                    {formData.attachment
                      ? formData.attachment.name
                      : "Upload File"}
                  </button>
                  <input
                    id="attachment"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {errors.attachment && (
                  <p className="text-red-600 text-sm">{errors.attachment}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="yearOfStudy" className="block">
                  Year of Study
                </label>
                <select
                  id="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={(e) => handleSelectChange(e, "yearOfStudy")}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select academic year</option>
                  {yearsOfStudy.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="semester" className="block">
                  Semester
                </label>
                <select
                  id="semester"
                  value={formData.semester}
                  onChange={(e) => handleSelectChange(e, "semester")}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select semester</option>
                  {semesters.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="w-32 p-2 border border-gray-300 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <Button type="submit">Submit Issue</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Studentsubmitissue;
