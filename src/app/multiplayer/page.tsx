"use client";
import { useState } from 'react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

const Multiplayer = () => {
  const [showInput, setShowInput] = useState('invisible');
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = new Date().getTime().toString().slice(5);
    router.push(`/multiplayer/${roomId}`);
  };

  const handleJoinRoom = () => {
    router.push(`/multiplayer/${roomId}`);
  };

  const handleRoomIdChange = (e: any) => (setRoomId(e.target.value));

  return (
    <div className="md:h-screen flex flex-col justify-center items-center">
      <h2 className="lg:mt-auto my-8 py-4 px-4 text-4xl font-bold font-serif mb-8 text-slate-900 text-center">
        Multiplayer
      </h2>
      <div className="mb-12 text-2xl md:flex-row flex flex-col items-center">
        <button onClick={handleCreateRoom} className="font-mono mx-16 my-2">
          Create Room
        </button>
        <button onClick={() => setShowInput('visible')} className="font-mono mx-16 my-4">
          Join Room
        </button>
      </div>
      <div className={`${showInput} flex`}>
        <input className={`h-12 p-4 rounded-md transition-all duration-300`} type="text" placeholder="Room ID" value={roomId} onChange={handleRoomIdChange} />
        <button className="mx-4" onClick={handleJoinRoom}>✔️</button>
      </div>
      <Footer />
    </div>
  );
};

export default Multiplayer;
