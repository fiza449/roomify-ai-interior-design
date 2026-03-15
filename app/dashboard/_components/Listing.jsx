'use client'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
import Link from 'next/link';
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import RoomDesignCard from '../create-new/_components/RoomDesignCard';

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserRoomList();
    }
  }, [user]);

  const GetUserRoomList = async () => {
    try {
      const result = await db
        .select()
        .from(AiGeneratedImage)
        .where(
          eq(
            AiGeneratedImage.userEmail,
            user?.primaryEmailAddress?.emailAddress
          )
        );

      setUserRoomList(result);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  return (
    <div className="pt-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-bold text-3xl">
          Hello, {user?.fullName}
        </h2>

        <Link href="/dashboard/create-new">
          <Button>+ Redesign Room</Button>
        </Link>
      </div>

      {userRoomList?.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          <h2 className="font-medium text-primary text-xl mb-8">
            AI Room Studio
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {userRoomList.map((room) => (
              <RoomDesignCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;