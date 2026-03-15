'use client'

import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { eq } from "drizzle-orm";
import { UserDetailContext } from '@/app/_context/userDetailContext';
import { useRouter } from 'next/navigation';

function BuyCredits() {

  const creditsOption = [
    { credits: 5, amount: 0.99 },
    { credits: 10, amount: 1.99 },
    { credits: 25, amount: 3.99 },
    { credits: 50, amount: 6.99 },
    { credits: 100, amount: 9.99 },
  ]

  const [selectedOption, setSelectedOption] = useState(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const router = useRouter()

  const onPaymentSuccess = async () => {
    console.log("Payment success")

    const newCredits = userDetail?.credits + selectedOption?.credits

    // update only current user
    const result = await db.update(Users)
      .set({
        credits: newCredits
      })
      .where(eq(Users.email, userDetail?.email))
      .returning({ id: Users.id });

    if (result) {

      setUserDetail(prev => ({
        ...prev,
        credits: newCredits
      }))

      router.push('/dashboard');
    }
  }

  return (
    <div className="space-y-6">

      <div>
        <h2 className='font-bold text-2xl'>Buy More Credits</h2>
        <p className='text-gray-500'>
          Unlock endless possibilities — Buy more credits and transform your room with AI magic ✨
        </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>

        {creditsOption.map((item) => (
          <div
            key={item.credits}
            onClick={() => setSelectedOption(item)}
            className={`
              cursor-pointer flex flex-col gap-3 justify-center items-center 
              p-6 rounded-xl border shadow-sm transition-all
              ${selectedOption?.credits === item.credits
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary'
              }
            `}
          >
            <h2 className='font-bold text-3xl'>{item.credits}</h2>
            <h2 className='font-medium'>Credits</h2>

            <Button className='w-full mt-2'>
              {selectedOption?.credits === item.credits ? 'Selected' : 'Select'}
            </Button>

            <h2 className='text-primary font-semibold'>
              ${item.amount}
            </h2>
          </div>
        ))}

      </div>

      <div className='mt-10'>
        {selectedOption?.amount && (
          <PayPalButtons
            style={{ layout: "horizontal" }}

            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOption.amount.toFixed(2),
                      currency_code: 'USD'
                    }
                  }
                ]
              })
            }}

            onApprove={async (data, actions) => {

              try {

                const details = await actions.order.capture();
                console.log("Transaction completed:", details);

                await onPaymentSuccess();

              } catch (error) {
                console.error("Payment capture failed:", error);
              }

            }}

            onCancel={() => console.log("Payment Cancelled")}
          />
        )}
      </div>

    </div>
  )
}

export default BuyCredits

