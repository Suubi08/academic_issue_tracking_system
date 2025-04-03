"use client";

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
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.studentNumber)
      newErrors.studentNumber = "Student number is required.";
    if (!formData.registrationNumber)
      newErrors.registrationNumber = "Registration number is required.";
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
            {/* Personal Details Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 pb-1 border-b">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  id="name"
                  label="Your Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <FormField
                  id="studentNumber"
                  label="Student Number"
                  placeholder="Enter your student number"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  error={errors.studentNumber}
                />
                <FormField
                  id="registrationNumber"
                  label="Registration Number"
                  placeholder="Enter your registration number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  error={errors.registrationNumber}
                />
              </div>
            </div>

            {/* Issue Details Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 pb-1 border-b">
                Issue Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormField
                  id="issueId"
                  label="Issue ID"
                  type="number"
                  placeholder="1009"
                  value={formData.issueId}
                  onChange={handleChange}
                />
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

              <div className="space-y-2 mb-6">
                <Label htmlFor="description">Issue Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your issue in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                {errors.description && (
                  <p className="text-red-600 text-sm">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="attachment" className="block">
                    Attachment
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("attachment").click()
                      }
                    >
                      <Paperclip className="mr-2 h-4 w-4" />
                      {formData.attachment
                        ? formData.attachment.name
                        : "Upload File"}
                    </Button>
                    <Input
                      id="attachment"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <FormSelect
                  id="yearOfStudy"
                  label="Year of Study"
                  value={formData.yearOfStudy}
                  onChange={handleSelectChange}
                  options={yearsOfStudy}
                  placeholder="Select academic year"
                />
                <FormSelect
                  id="semester"
                  label="Semester"
                  value={formData.semester}
                  onChange={handleSelectChange}
                  options={semesters}
                  placeholder="Select semester"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Submit Issue</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

const FormSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Select onValueChange={(value) => onChange(id, value)} value={value}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

export default Studentissuereport;
