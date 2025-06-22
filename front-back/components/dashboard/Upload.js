"use client";

import {
  UploadCloud,
  FileText as FileTextIconForJourney, // Renamed to avoid conflict
  ScanText,
  Lightbulb,
  CheckCircle2,
  CircleDotDashed,
  // Icons for the new section
  FileType2,
  Presentation,
  Image as ImageIcon,
  ArrowRight,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";



const featureCards = [
  { title: "Upload", subtitle: "Study materials", icon: UploadCloud },
  { title: "Extract", subtitle: "Text content", icon: FileTextIconForJourney },
  { title: "Summarize", subtitle: "Key concepts", icon: ScanText },
  { title: "Quiz", subtitle: "Test knowledge", icon: Lightbulb },
];

// Data for the new file type options section
const fileTypeOptions = [
  {
    title: "PDF Files",
    subtitle: "Documents, books",
    icon: FileType2,
    bgColor: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-200",
  },
  {
    title: "PPT Files",
    subtitle: "Presentations",
    icon: Presentation,
    bgColor: "bg-orange-50 hover:bg-orange-100",
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-200",
  },
  {
    title: "TXT Files",
    subtitle: "Text documents",
    icon: FileTextIconForJourney, // Using the renamed one
    bgColor: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-200",
  },
  {
    title: "Images",
    subtitle: "JPG, PNG",
    icon: ImageIcon,
    bgColor: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-200",
  },
];

export default function Progress() {
  const journeySteps = [
    { id: 1, name: "Upload", status: "Current Step", icon: UploadCloud },
    { id: 2, name: "Extract", status: "Pending", icon: FileTextIconForJourney },
    { id: 3, name: "Summarize", status: "Pending", icon: ScanText },
    { id: 4, name: "Quiz", status: "Pending", icon: Lightbulb },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // New state for "Extracting Text" phase

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setUploadedFiles((prevFiles) => {
      // Avoid duplicate files if user drops the same file again
      const newFiles = acceptedFiles.filter(
        (newFile) =>
          !prevFiles.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size
          )
      );
      return [...prevFiles, ...newFiles];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "text/plain": [".txt"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  const handleStepClick = (stepId) => {
    // Prevent navigating away from upload if no files or if processing
    if (isProcessing) return;
    if (stepId > 1 && uploadedFiles.length === 0 && currentStep === 1) {
      alert("Please upload files first to proceed.");
      return;
    }
    setCurrentStep(stepId);
  };

  const handleCancelUpload = () => {
    setUploadedFiles([]);
    // Optionally reset to beginning of step 1 if needed
  };

  const handleContinueToExtract = () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload some files before continuing.");
      return;
    }
    setIsProcessing(true); // Start "Extracting Text" visual
    setCurrentStep(2); // Move to the extract step conceptually

    // Simulate backend processing
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would typically get results from backend
      // and then maybe move to step 3 or show extracted text
      console.log("Extraction complete (simulated)");
    }, 3000); // Simulate 3 seconds of processing
  };

  return (
    // ... (journeySteps and featureCards remain the same) ...

    <>
      {/* Stepper */}
      {/* ... (this part remains the same) ... */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
        <div className="flex items-center">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              className="flex-1 flex items-center group cursor-pointer"
              onClick={() => handleStepClick(step.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                  ${
                    currentStep === step.id
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : currentStep > step.id
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-100 text-gray-400 border-gray-300 group-hover:border-indigo-400"
                  }`}
              >
                {currentStep > step.id ? <CheckCircle2 size={20} /> : step.id}
              </div>
              <div className="ml-3">
                <h4
                  className={`font-semibold 
                    ${
                      currentStep === step.id
                        ? "text-indigo-600"
                        : currentStep > step.id
                        ? "text-green-600"
                        : "text-gray-700 group-hover:text-indigo-500"
                    }`}
                >
                  {step.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {currentStep === step.id
                    ? "Current Step"
                    : currentStep > step.id
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>
              {index < journeySteps.length - 1 && (
                <div
                  className={`flex-auto border-t-2 transition-colors duration-500 ease-in-out mx-4
                    ${
                      currentStep > step.id
                        ? "border-green-500"
                        : "border-gray-200"
                    }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- Main Content Area based on currentStep --- */}

      {/* STEP 1: UPLOAD & FILE OPTIONS */}
      {currentStep === 1 && (
        <>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-colors duration-300 bg-white
                ${
                  isDragActive
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <UploadCloud
                className={`w-12 h-12 mb-4 transition-colors duration-300
                    ${isDragActive ? "text-indigo-600" : "text-indigo-500"}`}
              />
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Drag & Drop Files Here
              </p>
              <p className="text-gray-500 mb-6">
                or click to browse from your device
              </p>
              <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Choose Files
              </button>
              <p className="mt-6 text-xs text-gray-400">
                Supported formats: PDF, PPT, TXT, JPG, PNG
              </p>
              {uploadedFiles.length > 0 && (
                <div className="mt-6 text-left w-full max-w-lg bg-gray-50 p-4 rounded-md">
                  <h5 className="font-semibold text-gray-700 mb-2">
                    Uploaded files:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index}>
                        {file.name} - {Math.round(file.size / 1024)} KB
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* NEW: File Type Options and Actions - Show if files are uploaded */}
          {uploadedFiles.length > 0 && !isProcessing && (
            <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {fileTypeOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.title}
                      className={`p-4 rounded-lg flex items-center space-x-3 cursor-pointer transition-all duration-200 border-2 border-transparent hover:border-indigo-300 ${opt.bgColor}`}
                      // Add onClick handler here if these cards are interactive (e.g., for filtering)
                    >
                      <div className={`p-2 rounded-full ${opt.iconBgColor}`}>
                        <Icon className={`w-5 h-5 ${opt.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700">
                          {opt.title}
                        </h4>
                        <p className="text-xs text-gray-500">{opt.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end items-center space-x-4">
                <button
                  onClick={handleCancelUpload}
                  className="px-6 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center space-x-2"
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleContinueToExtract}
                  className="px-6 py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* STEP 2: EXTRACTING & EXTRACTED CONTENT */}
      {currentStep === 2 && (
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            {isProcessing ? "Extracting Text" : "Extraction Complete"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            {isProcessing
              ? "Our AI is analyzing your documents and extracting all the important information. Please wait a moment."
              : "Text extraction is complete. You can now proceed to summarize or quiz."}
          </p>
          {isProcessing && (
            <CircleDotDashed className="w-16 h-16 text-indigo-500 animate-spin mx-auto my-6" />
          )}
          {!isProcessing && uploadedFiles.length > 0 && (
            <>
              {/* Placeholder for showing extracted text or summary of what was processed */}
              <div className="mt-6 text-left w-full max-w-2xl mx-auto bg-gray-50 p-4 rounded-md">
                <h5 className="font-semibold text-gray-700 mb-2">
                  Processed Files:
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>{file.name} - Extraction simulated.</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => handleStepClick(1)} // Go back to upload/modify
                  className="px-6 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                >
                  Upload More
                </button>
                <button
                  onClick={() => handleStepClick(3)} // Proceed to Summarize
                  className="px-6 py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>Summarize</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 3: SUMMARIZE */}
      {currentStep === 3 && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-700">
            Summarizing Content...
          </h3>
          <CircleDotDashed className="w-12 h-12 text-indigo-500 animate-spin mx-auto my-6" />
          <p className="text-gray-600">
            The summary of your document will be shown here.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => handleStepClick(2)}
              className="px-6 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Extract
            </button>
            <button
              onClick={() => handleStepClick(4)}
              className="px-6 py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <span>Create Quiz</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
      {/* STEP 4: QUIZ */}
      {currentStep === 4 && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-700">
            Generating Quiz...
          </h3>
          <CircleDotDashed className="w-12 h-12 text-indigo-500 animate-spin mx-auto my-6" />
          <p className="text-gray-600">
            Your personalized quiz based on the material will load here.
          </p>
          <div className="mt-8">
            <button
              onClick={() => handleStepClick(3)}
              className="px-6 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Summary
            </button>
          </div>
        </div>
      )}
    </>
  );
}
