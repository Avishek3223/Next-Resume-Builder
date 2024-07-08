import React, { useContext } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { UserDataContext } from '@/context/UserDataContext';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './Marketing.css'

const PDFViewer = ({ url }) => {
  return (
    <div className="flex items-center justify-center bg-gray-900 h-[100%] hello">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <div className="pdfViewer">
          <Viewer fileUrl={url} />
        </div>
      </Worker>
    </div>
  );
};

const UserResume = () => {
  const { uploadStatus } = useContext(UserDataContext);

  if (!uploadStatus || !uploadStatus.fileUrl) {
    console.error('uploadStatus or fileUrl is not defined:', uploadStatus);
    return <div>Error: No file URL provided.</div>;
  }

  console.log("UserResume component rendering with fileUrl:", uploadStatus.fileUrl);

  return <PDFViewer url={uploadStatus.fileUrl} />;
};

export default UserResume;
