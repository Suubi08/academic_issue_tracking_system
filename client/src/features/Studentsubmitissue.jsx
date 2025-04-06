
import { useState, useEffect } from "react";
import { Paperclip } from "lucide-react";
import API from '../utils/axiosInstance';
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "marks", label: "Missing marks" },
  { value: "appeals", label: "Appeals" },
  { value: "corrections", label: "Corrections" },
];

const course_units = [
  { value: "OS", label: "Operating Systems" },
  { value: "DSA", label: "Data Structures and Algorithms" },
  { value: "SAD", label: "System Analysis and Design" },
  { value: "SD", label: "Software Development" },
  { value: "PS", label: "Probability and Statistics" },
];

const years_of_Study = [
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
    date_of_issue: "",
    course_unit: "",
    assigned_to: "",
    description: "",
    attachment: null,
    year_of_study: "",
    semester: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [lecturers, setLecturers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLecturers, setFilteredLecturers] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    if (id === "lecturer") {
      setSearchTerm(value);
      setShowDropdown(true);

      const filtered = lecturers.filter((lecturer) =>
        lecturer.username.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLecturers(filtered); // ✅ now it works
    }
  };

  const handleSelectChange = (e, id) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev, // Keep existing properties
      [id]: value || "", // Ensure it's never undefined
    }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0] || null; // Ensure it never becomes undefined

    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, attachment: "File size must be less than 5MB." }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      attachment: file, // Always set it
    }));
    setErrors((prev) => ({ ...prev, attachment: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setLoading(true);

    if (!formData.year_of_study) {
      setErrors("Year of study is required.");
      setLoading(false);
      return;
    }

    console.log("Raw formData before FormData append:", formData);

    const data = new FormData();
    data.append("category", formData.category || "");
    data.append("date_of_issue", formData.date_of_issue || "");
    data.append("course_unit", formData.course_unit || "");
    data.append("description", formData.description || "");
    data.append("semester", formData.semester || "");
    data.append("assigned_to", formData.assigned_to || "");
    data.append("year_of_study", formData.year_of_study || "");  // Make sure this is not empty
    if (formData.attachment) {
      data.append("attachment", formData.attachment);
    }

    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }  
  
    try {
      const response = await API.post("issues/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
  
      if (response.status === 201) {
        setSuccessMessage("Issue reported successfully!");
        setTimeout(() => {
          navigate("/studentdashboard");
        }, 2000);
      } else {
        setErrors("Issue submission failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Issue failed. Please try again.";
      setErrors(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/studentdashboard");
  };

  const handleLecturerSelect = (lecturer) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      assigned_to: lecturer.id,
    }));
    setSearchTerm(lecturer.username);
    setShowDropdown(false); // ✅ Hide dropdown after selection
  };




  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/lecturer/?search=${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Lecturers:", data);
          setLecturers(data); // ✅ store all
          setFilteredLecturers(data); // Optionally filtered later
        } else {
          console.error("Failed to fetch lecturers");
          setLecturers([]);
          setFilteredLecturers([]);
        }
      } catch (error) {
        console.error("Error fetching lecturers:", error);
        setLecturers([]);
        setFilteredLecturers([]);
      }
    };

    if (searchTerm) {
      fetchLecturers();
    } else {
      setLecturers([]);
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
                <label htmlFor="date_of_issue" className="block">
                  Date of Issue
                </label>
                <input
                  id="date_of_issue"
                  type="date"
                  value={formData.date_of_issue || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />

                {errors.date_of_Issue && (
                  <p className="text-red-600 text-sm">{errors.date_of_Issue}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="course_unit" className="block">
                  Course Unit
                </label>
                <select
                  id="course_unit"
                  value={formData.course_unit}
                  onChange={(e) => handleSelectChange(e, "course_unit")}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select course unit</option>
                  {course_units.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 relative">
                <label htmlFor="lecturer" className="block">
                  Lecturer
                </label>
                <input
                  id="lecturer"
                  type="search"
                  placeholder="Search lecturer"
                  value={searchTerm}
                  onChange={handleChange}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full p-2 border border-gray-300 rounded"
                />

                {showDropdown && filteredLecturers.length > 0 ? (
                  <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-lg mt-1">
                    {filteredLecturers.map((lecturer) => (
                      <li
                        key={lecturer.id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleLecturerSelect(lecturer)}
                      >
                        {lecturer.username}
                      </li>
                    ))}
                  </ul>
                ) : (
                  showDropdown && <p className="text-gray-500">No lecturers found.</p> // Show only when dropdown is open
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
                  id="year_of_study"  // ✅ Use correct ID
                  value={formData.year_of_study}
                  onChange={(e) => handleSelectChange(e, "year_of_study")}  // ✅ Matches backend
                  className="w-full p-2 border border-gray-300 rounded"
                >

                  <option value="">Select academic year</option>
                  {years_of_Study.map((option) => (
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
            <button type="submit" className="bg-green-700 rounded-md hover:bg-green-900 text-white p-2">Submit Issue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Studentsubmitissue;
