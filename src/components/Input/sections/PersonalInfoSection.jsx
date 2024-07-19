import React, { useContext, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import AWS from 'aws-sdk';
import InputComponent from '../InputComponent';
import Image from 'next/image';
import { UserDataContext } from '@/context/UserDataContext';
import { FadeLoader } from 'react-spinners';

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
  const [imagePreview, setImagePreview] = useState(data?.profilePicture || "");
  const [loading, setLoading] = useState(false);
  const { resumeDataFetch } = useContext(UserDataContext);

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
        setLoading(true);

        // List objects in the user's folder
        const listParams = {
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
          Prefix: `${data.name}/`
        };
        const listedObjects = await s3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents.length > 0) {
          // Prepare list of image objects to be deleted
          const deleteParams = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Delete: { Objects: [] }
          };

          listedObjects.Contents.forEach(({ Key }) => {
            if (Key.match(/\.(jpg|jpeg|png|gif)$/i)) {
              deleteParams.Delete.Objects.push({ Key });
            }
          });

          if (deleteParams.Delete.Objects.length > 0) {
            await s3.deleteObjects(deleteParams).promise();
          }
        }

        const { Location } = await s3.upload(params).promise();
        setImagePreview(Location);
        onChange('profilePicture', Location); // Update the profile picture URL
      } catch (error) {
        console.error('Error uploading file: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setImagePreview(data?.profilePicture);
  }, [data?.profilePicture]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <label
          className="cursor-pointer flex text-black text-[1.2rem] rounded-full font-semibold flex-col justify-center items-center w-[6.5rem] h-[6rem] bg-[#adadad] relative"
          style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}
        >
          {loading ? (
            <FadeLoader className='ml-3' color={"black"} width={4} height={13} radius={2}/>
          ) : imagePreview ? (
            <Image
              src={imagePreview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full"
              width={96} // Assuming w-24 equals 96px
              height={96} // Assuming h-24 equals 96px
            />
          ) : (
            <FaUser size="2rem" color="white" />
          )}
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
