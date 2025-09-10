'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../src/supabaseClient';

interface SOSButtonProps {
  userId: string;
}

export default function SOSButton({ userId }: SOSButtonProps) {
  const [tapCount, setTapCount] = useState(0);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Get live location as soon as component mounts
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      (err) => console.error('Failed to get location:', err)
    );
  }, []);

  const handleSOS = async () => {
    setTapCount(prev => prev + 1);

    if (tapCount + 1 === 3) {
      try {
        await supabase.from('sos_alerts').insert([{
          user_id: userId,
          latitude: location?.latitude ?? null,
          longitude: location?.longitude ?? null,
          status: 'pending'
        }]);
        alert('SOS sent!');
      } catch (error) {
        console.error('Failed to send SOS:', error);
        alert('Failed to send SOS.');
      }
      setTapCount(0);
    }

    // Reset tap count after 5 seconds if not tapped enough
    setTimeout(() => setTapCount(0), 5000);
  };

  return (
    <button
      onClick={handleSOS}
      className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
    >
      SOS
    </button>
  );
}
