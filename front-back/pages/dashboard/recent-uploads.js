// app/dashboard/recent-uploads/page.js
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, FileBarChart2, FileImage, FileType, MoreHorizontal, Clock, CheckCircle, XCircle, AlertTriangle, Trash2, Eye as EyeIcon, Download, Edit3, UploadCloud } from 'lucide-react';
import DashboardLayout from './layout';

// Dummy Data (from step 2)
const initialRecentUploads = [
  { id: 'file1', fileName: 'Advanced AI Concepts.pdf', uploadDate: '2024-06-18T10:30:00Z', size: '2.5 MB', status: 'Processed', fileType: 'pdf', },
  { id: 'file2', fileName: 'Machine Learning Presentation.pptx', uploadDate: '2024-06-17T15:45:00Z', size: '5.1 MB', status: 'Processed', fileType: 'ppt', },
  { id: 'file3', fileName: 'Project Notes - Chapter 1.txt', uploadDate: '2024-06-17T09:12:00Z', size: '120 KB', status: 'Processing', fileType: 'txt', },
  { id: 'file4', fileName: 'Neural Network Diagram.png', uploadDate: '2024-06-16T18:00:00Z', size: '800 KB', status: 'Error', fileType: 'img', },
  { id: 'file5', fileName: 'Research Paper Draft.docx', uploadDate: '2024-06-15T11:05:00Z', size: '1.2 MB', status: 'Processed', fileType: 'doc', },
  { id: 'file6', fileName: 'Quantum Computing Basics.pdf', uploadDate: '2024-06-14T14:20:00Z', size: '3.0 MB', status: 'Processed', fileType: 'pdf', },
];


const FileTypeIcon = ({ type }) => {
  switch (type?.toLowerCase()) {
    case 'pdf': return <FileText className="text-red-500" size={28} />;
    case 'ppt':
    case 'pptx': return <FileBarChart2 className="text-orange-500" size={28} />;
    case 'txt': return <FileText className="text-gray-500" size={28} />;
    case 'doc':
    case 'docx': return <FileType className="text-blue-500" size={28} />;
    case 'img':
    case 'png':
    case 'jpg':
    case 'jpeg': return <FileImage className="text-purple-500" size={28} />;
    default: return <FileType className="text-gray-400" size={28} />;
  }
};

const StatusIndicator = ({ status }) => {
  switch (status) {
    case 'Processed': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"><CheckCircle size={14} className="mr-1.5" /> {status}</span>;
    case 'Processing': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"><Clock size={14} className="mr-1.5 animate-spin" /> {status}</span>;
    case 'Error': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"><XCircle size={14} className="mr-1.5" /> {status}</span>;
    default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100">{status || 'Unknown'}</span>;
  }
};

const RecentUploadsPage = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openActionsMenu, setOpenActionsMenu] = useState(null); // To track which row's action menu is open

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setUploads(initialRecentUploads);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleDelete = (fileId) => {
    console.log("Delete file:", fileId);
    setUploads(prevUploads => prevUploads.filter(upload => upload.id !== fileId));
    setOpenActionsMenu(null);
  };

  // Framer Motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const actionMenuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -5 },
    open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Clock size={48} className="text-indigo-600 animate-spin" />
        <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Loading recent uploads...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={pageVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
          Recent Uploads
        </h1>
        <Link href="/dashboard/upload" legacyBehavior>
          <motion.a
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <UploadCloud size={18} className="mr-2" />
            Upload New File
          </motion.a>
        </Link>
      </motion.div>

      {uploads.length === 0 && !loading ? (
        <motion.div variants={pageVariants} className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <FileText size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">No uploads yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Start by uploading your first study material!</p>
        </motion.div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date Uploaded</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <motion.tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" variants={{ visible: { transition: { staggerChildren: 0.05 }}}}>
              {uploads.map((upload) => (
                <motion.tr key={upload.id} variants={tableRowVariants} exit="exit">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        <FileTypeIcon type={upload.fileType} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{upload.fileName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(upload.uploadDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{upload.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIndicator status={upload.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left">
                      <motion.button
                        onClick={() => setOpenActionsMenu(openActionsMenu === upload.id ? null : upload.id)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreHorizontal size={20} />
                      </motion.button>
                      <AnimatePresence>
                        {openActionsMenu === upload.id && (
                          <motion.div
                            variants={actionMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-10"
                          >
                            <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <EyeIcon size={16} className="mr-3" /> View Details
                            </button>
                            <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Edit3 size={16} className="mr-3" /> Edit
                            </button>
                            <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Download size={16} className="mr-3" /> Download
                            </button>
                            <hr className="my-1 dark:border-gray-700"/>
                            <button
                              onClick={() => handleDelete(upload.id)}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                              <Trash2 size={16} className="mr-3" /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </motion.div>
    </DashboardLayout>
  );
};

export default RecentUploadsPage;