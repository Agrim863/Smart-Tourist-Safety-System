'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../src/supabaseClient';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const sendOTP = async () => {
    if (!phone) return alert('Enter phone number!');
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) alert(error.message);
    else setOtpSent(true);
  };

  const verifyOTP = async () => {
    if (!otp) return alert('Enter OTP!');
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    if (error) alert(error.message);
    else router.push('/profile'); // Navigate to profile
  };

  return (
    <div>
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
      {!otpSent ? (
        <button onClick={sendOTP}>Send OTP</button>
      ) : (
        <>
          <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP" />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
