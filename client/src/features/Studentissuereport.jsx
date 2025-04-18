
import { useState } from "react";
import { Paperclip } from "lucide-react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/Label";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";


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

const Studentissuereport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    registrationNumber: "",
    issueId: "",
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));
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

 return (
    <div className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-center">
            Academic Issue Report Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Details Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 pb-1 border-b">
                Issue Details
              </h2>
              <div className="flex items-center justify-center">
                <FormSelect
                  id="category"
                  label="Issue Category"
                  value={formData.category}
                  onChange={handleSelectChange}
                  options={categories}
                  placeholder="Select Issue"
                  error={errors.category}
                />
                <FormField
                  id="dateOfIssue"
                  label="Date of Issue"
                  type="date"
                  value={formData.dateOfIssue}
                  onChange={handleChange}
                  error={errors.dateOfIssue}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormSelect
                  id="courseUnit"
                  label="Course Unit"
                  value={formData.courseUnit}
                  onChange={handleSelectChange}
                  options={courseUnits}
                  placeholder="Select course unit"
                />
                <FormField
                  id="lecturer"
                  label="Lecturer"
                  type="search"
                  placeholder="Search lecturer"
                  value={formData.lecturer}
                  onChange={handleChange}
                />
              </div>
