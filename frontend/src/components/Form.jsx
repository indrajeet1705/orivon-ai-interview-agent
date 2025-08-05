import React, { useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { GoOrganization } from "react-icons/go";
import { IoPersonOutline, IoDocumentTextOutline } from "react-icons/io5";
import { PiSuitcaseBold } from "react-icons/pi";
import { MdOutlineListAlt } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";

const Form = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    orgName: "",
    yourName: "",
    role: "",
    requirements: "",
    jobDescription: "",
    aboutOrg: "",
  });

  const FileSelectClick = () => fileInputRef.current.click();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData, selectedFile);
    setFormData({
      orgName: "",
      yourName: "",
      role: "",
      requirements: "",
      jobDescription: "",
      aboutOrg: "",
    });
    setSelectedFile(null);
  };

  return (
    <div className="w-full bg-black p-4 md:p-8 flex flex-col">
      <h1 className="text-pink-600 text-4xl md:text-6xl font-bold text-center my-4">
        Application Form
      </h1>
      <p className="text-gray-400 text-xl md:text-2xl font-semibold text-center mb-6">
        Fill in all the required information to complete your application
      </p>

      <form
        className="w-full max-w-7xl mx-auto bg-gray-900 text-white shadow-md shadow-pink-400 rounded-xl p-4 md:p-8 flex flex-col gap-8"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* LEFT COLUMN */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
          
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <GoOrganization size={20} /> Organization name
              </label>
              <input
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                type="text"
                placeholder="Enter organization name"
                className="bg-gray-800 outline-none pl-4 w-full rounded-lg py-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <IoPersonOutline size={20} /> Your name
              </label>
              <input
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="bg-gray-800 outline-none pl-4 w-full rounded-lg py-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <PiSuitcaseBold size={20} /> Job Role
              </label>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                type="text"
                placeholder="Enter job role"
                className="bg-gray-800 outline-none pl-4 w-full rounded-lg py-3"
              />
            </div>

          
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <MdOutlineListAlt size={20} /> Skills
              </label>
              <input
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                type="text"
                placeholder="Enter required skills"
                className="bg-gray-800 outline-none pl-4 w-full rounded-lg py-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <IoDocumentTextOutline size={20} /> Resume
              </label>
              <div
                className="border border-dashed border-gray-500 w-full items-center justify-center p-4 rounded-xl hover:border-pink-600 flex flex-col cursor-pointer"
                onClick={FileSelectClick}
              >
                <LuUpload size={30} className="hover:scale-110 transition-all mt-2 duration-500" />
                <p className="hover:text-pink-500 transition-all duration-500">Upload</p>
                <p className="text-gray-500 text-sm">PDF, DOC, or DOCX (max 10MB)</p>
                {selectedFile && (
                  <p className="text-green-400 mt-2 text-sm">{selectedFile.name}</p>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
         
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <PiSuitcaseBold size={20} /> Job Description
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={9}
                placeholder="Enter job description"
                className="w-full outline-none p-4 bg-gray-800 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <GoOrganization size={20} /> About Organization
              </label>
              <textarea
                name="aboutOrg"
                value={formData.aboutOrg}
                onChange={handleChange}
                rows={9}
                placeholder="Tell us about your organization"
                className="w-full outline-none p-4 bg-gray-800 rounded-xl"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex mx-auto mt-6 py-4 px-10 bg-pink-500 rounded-xl items-center gap-2 text-lg font-semibold hover:scale-110 transition duration-500"
        >
          <CiLocationArrow1 size={20} /> Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
