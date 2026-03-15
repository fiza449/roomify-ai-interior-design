'use client';

import React, { useContext, useState } from 'react';
import axios from 'axios';
import ImageSelection from './_components/ImageSelection';
import RoomType from './_components/RoomType';
import DesignType from './_components/DesignType';
import AdditionalReq from '../_components/AdditionalReq';
import { Button } from '@/components/ui/button';
import CustomLoading from './_components/CustomLoading';
import AiOutputDialog from './_components/AiOutputDialog';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { UserDetailContext } from '@/app/_context/userDetailContext';

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [aiOutput, setAiOutputResult] = useState();
  const [orgImage, setOrgImage] = useState();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (fieldName === 'image') {
      setOrgImage(URL.createObjectURL(value));
    }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const GenerateAiImage = async () => {
    try {
      if (!formData.image) {
        alert('Please select an image first');
        return;
      }

      // 🚨 prevent generation if no credits
      if (userDetail?.credits <= 0) {
        alert("You don't have enough credits");
        return;
      }

      setLoading(true);
      setAiOutputResult(null);

      const base64Image = await fileToBase64(formData.image);

      const uploadRes = await axios.post('/api/upload', {
        image: base64Image,
      });

      const cloudinaryImageUrl = uploadRes.data.url;

      const aiRes = await axios.post('/api/redesign-room', {
        imageUrl: cloudinaryImageUrl,
        roomType: formData.roomType,
        designType: formData.designType,
        additionalReq: formData.additionalReq,
      });

      setAiOutputResult(aiRes.data.imageUrl);
      setOpenOutputDialog(true);

      await updateUserCredits();

    } catch (error) {
      console.error('Generate error:', error);
      alert('❌ Something went wrong. Check console.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user credits
   */
  const updateUserCredits = async () => {

    const newCredits = userDetail?.credits - 1;

    const result = await db
      .update(Users)
      .set({
        credits: newCredits,
      })
      .where(eq(Users.email, userDetail?.email))
      .returning({ id: Users.id });

    if (result) {
      setUserDetail((prev) => ({
        ...prev,
        credits: newCredits,
      }));

      return result[0].id;
    }
  };

  return (
    <div>
      <CustomLoading loading={loading} />

      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>

      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style, and
        watch AI reimagine your environment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        
        <ImageSelection
          selectedImage={(file) => onHandleInputChange(file, 'image')}
        />

        <div>
          <RoomType
            selectedRoomType={(value) =>
              onHandleInputChange(value, 'roomType')
            }
          />

          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, 'designType')
            }
          />

          <AdditionalReq
            additionalReqInput={(value) =>
              onHandleInputChange(value, 'additionalReq')
            }
          />

          <Button
            className="w-full mt-5"
            onClick={GenerateAiImage}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>

      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImageUrl={orgImage}
        aiImageUrl={aiOutput}
      />
    </div>
  );
}

export default CreateNew;