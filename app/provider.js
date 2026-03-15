"use client"
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from './_context/userDetailContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function Provider({ children }) {

  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (isLoaded && user) {
      VerifyUser();
    }
  }, [isLoaded, user])

  const VerifyUser = async () => {
    try {
      const dataResult = await axios.post('/api/verify-user', {
        user: user
      });
      setUserDetail(dataResult.data.result);
    } catch (err) {
      console.error("VerifyUser error: ", err)
    }
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
<PayPalScriptProvider
  options={{
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture"
  }}
>
  {children}
</PayPalScriptProvider>


    </UserDetailContext.Provider>
  )
}

export default Provider