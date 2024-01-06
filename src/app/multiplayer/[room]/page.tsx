"use client";
import Footer from '@/components/Footer';
import PlayerList from '@/components/multiplayer/PlayerList';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { BiRename } from "react-icons/bi";

interface roomProp {
  params: {
    room: string;
  };
};

const Room: React.FC<roomProp> = ({ params }) => {
  const router = useRouter();

  const { room } = params;
  const [socket, setSocket] = useState<Socket>();
  const [userName, setUserName] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [playersReady, setPlayersReady] = useState<number>(4);
  const [userList, setUserList] = useState<string[]>([]);


  const handleNameChange = (e: any) => {
    setUserName(e.target.value);
    socket?.emit('nameChange', e.target.value);
  };

  const handleReady = () => {
    console.log("handle ready");
    socket?.emit('ready');
  };

  const handleStart = () => {
    socket?.emit('start');
  };

  useEffect(() => {
    if (!socket) {
      setSocket(io("http://localhost:4000", {
        transports: ['websocket']
      }));
    }
  }, [socket]);


  useEffect(() => {

    if (!socket)
      return;

    socket.on("log", (message: string) =>
      console.log(message));


    socket.on("connect", () => {
      console.log("Connected to server");
      setSocket(socket);
    });

    socket.on("connect_error", (e: any) => {
      console.error("connection failed");
    });


    socket.on("roomFull", (message: string) => {
      alert(message);
      router.push('/multiplayer');
    });


    socket.emit("joinRoom", room);

    socket.on('username', (username) => {
      console.log(username);
      setUserName(username);
    });

    socket.on('userListChange', (userList) => {
      console.log(userList);
      let users: string[] = JSON.parse(userList);
      setUserList(users);
    });

    socket.on('ready', (pr: number) => { console.log(pr); setPlayersReady(pr); });

    socket.on('ownerChange', (owner: string) => {
      console.log(owner);
      setOwner(owner);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="mt-auto text-4xl font-bold font-serif mb-5">Lobby</h1>
      <div className="mt-8 flex items-center rounded-lg border-2 border-black focus-within:border-amber-800 focus-within:ring-2 focus-within:ring-amber-500 focus-within:text-amber-800 h-12">
        <div className="mx-2 text-4xl"><BiRename /></div>
        <input className="mx-2 px-4 text-lg w-36 rounded-lg focus:outline-none font-semibold bg-transparent" type="text" value={userName} onChange={handleNameChange} />
      </div>
      <button onClick={handleReady} className="mt-14 text-2xl font-bold font-mono">Ready</button>
      <h1 className="mt-16 text-2xl font-bold font-serif mb-5">Player List</h1>
      <PlayerList list={userList} />


      {/* {playersReady === 4 && ( */}
      {socket?.id === owner && playersReady === 4 && (
        <div className="mt-auto">
          <button
            onClick={handleStart}
            className={`p-4 border-orange-700 bg-amber-500 text-slate-900 text-2xl font-mono font-semibold rounded-xl shadow-lg hover:shadow-md`}>
            Start
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Room;