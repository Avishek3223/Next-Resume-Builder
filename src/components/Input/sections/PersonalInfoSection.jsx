import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import AWS from 'aws-sdk';
import InputComponent from '../InputComponent';
import Image from 'next/image';

// Configure AWS SDK using environment variables
const configureAWS = () => {
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

  if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
    console.error('Missing AWS configuration. Please check your .env file.');
    return null;
  }

  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
  });

  return new AWS.S3();
};

const s3 = configureAWS();

const PersonalInfoSection = ({ data, onChange }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [previousImageKey, setPreviousImageKey] = useState(null);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && s3) {
      const fileName = `${data.name}/${file.name}`;
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      };

      try {
        if (previousImageKey) {
          // Delete the previous image
          await s3.deleteObject({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: previousImageKey,
          }).promise();
        }

        const { Location } = await s3.upload(params).promise();
        setImagePreview(Location);
        onChange('profilePicture', Location); // Update the profile picture URL
        setPreviousImageKey(fileName); // Store the key of the uploaded image
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
    }
  };

  useEffect(() => {
    setImagePreview(data.profilePicture)
  }, [data])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <label
          className="cursor-pointer flex text-black text-[1.2rem] rounded-full font-semibold flex-col justify-center items-center w-[6rem] h-[6rem] bg-[#adadad]"
          style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full"
              width={96} // Assuming w-24 equals 96px
              height={96} // Assuming h-24 equals 96px
            />) : (
            <FaUser size="2rem" color="white" />
          )
          }
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
        <InputComponent label="Full Name *" value={data?.name} onChange={(e) => onChange('name', e.target.value)} />
      </div>
      <InputComponent width={100} label="Email *" value={data?.emailId} onChange={(e) => onChange('emailId', e.target.value)} />
      <div className="flex w-[100%] gap-2">
        <InputComponent width={100} className="w-full" label="Phone Number *" value={data?.phone} onChange={(e) => onChange('phone', e.target.value)} />
        <InputComponent label="Profession *" value={data?.jobTitle} onChange={(e) => onChange('jobTitle', e.target.value)} />
      </div>
      <div className="border-b border-[#c2c2c2]"></div>
      <textarea
        placeholder="Summary"
        className="h-[12rem] text-[1rem] border border-[#929292] rounded-[6px] outline-none p-4"
        value={data?.summary}
        onChange={(e) => onChange('summary', e.target.value)}
      />
    </div>
  );
};

export default PersonalInfoSection;
