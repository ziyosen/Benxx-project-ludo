"use client";
import { useState } from 'react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { TiTick } from "react-icons/ti";


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

  const handleRoomIdChange = (e: any) => (setRoomId(e.target.value.substring(0, 15).trim()));

  return (
    <div className="h-screen flex flex-col items-center">
      <h2 className="mt-auto my-12 py-4 px-4 text-5xl font-bold font-serif text-slate-900 text-center">
        Multiplayer Rooms
      </h2>
      <div className="flex flex-col items-center justify-evenly">
        <div className="mb-12 text-2xl md:flex-row flex flex-col items-center gap-x-12 gap-y-4 text-slate-800">
          <button onClick={handleCreateRoom} className="font-mono my-2 hover:text-slate-900 hover:font-semibold">
            Create Room
          </button>
          <button onClick={() => setShowInput('visible')} className="font-mono my-4 hover:text-slate-900 hover:font-semibold">
            Join Room
          </button>
        </div>
        <div className={`${showInput} flex`}>
          <input className={`w-40 h-12 p-4 rounded-xl focus:outline-none focus:ring-4 font-mono focus:ring-sky-600`} type="text" placeholder="Nom de Room" value={roomId} onChange={handleRoomIdChange} />
          <button className="mx-4 text-5xl text-blue-500 hover:text-blue-700" onClick={handleJoinRoom}><TiTick /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Multiplayer;
