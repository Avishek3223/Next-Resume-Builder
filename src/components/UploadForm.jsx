import React, { useRef, useState } from 'react';
import axios from 'axios';
import './Marketing.css';

function UploadForm({ setUploadStatus }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      setMessage('');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Content = reader.result.split(',')[1];
        try {
          const uploadResponse = await axios.post('https://ic1rqexx2c.execute-api.us-east-1.amazonaws.com/dev/upload/resume', {
            fileName: file.name,
            fileContent: base64Content,
          });

          setMessage('File uploaded successfully!');
          const uploadedFileUrl = `https://resume-reviewe.s3.amazonaws.com/${file.name}`;

          // Directly retrieve the file after upload
          try {
            const retrieveResponse = await axios.get('https://ic1rqexx2c.execute-api.us-east-1.amazonaws.com/dev/get-uploaded/resume', {
              params: {
                fileName: file.name,
              },
            });

            setMessage('File retrieved successfully!');
            const fileUrl = retrieveResponse.data.fileUrl;
            setUploadStatus({ uploaded: true, fileUrl: fileUrl });
          } catch (retrieveError) {
            console.error('Error retrieving file:', retrieveError);
            setMessage('File retrieve failed. Please try again.');
            if (uploadStatus.uploaded) {
              setUploadStatus((prevStatus) => ({
                ...prevStatus,
                uploaded: false
              }));
            }
          }
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError);
          setMessage('File upload failed. Please try again.');
          if (uploadStatus.uploaded) {
            setUploadStatus((prevStatus) => ({
              ...prevStatus,
              uploaded: false
            }));
          }
        } finally {
          setUploading(false);
        }
      };
    }
  };

  return (
    <div className='mt-[25rem] max1078:mt-0'>
      <input 
        ref={fileInputRef} 
        type="file" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      <button 
        className='p-3 px-8 bg-white border-b-2 border-r-2 glow-shadow border-black w-[20vw] max1078:w-[80vw]' 
        onClick={handleButtonClick}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadForm;
