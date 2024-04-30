"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import Image from "next/image";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center mt-14 ml-10">
      <Image
        src={session?.user?.image || "/instgram-short.webp"}
        height={50}
        width={75}
        className="rounded-full p-[2px]"
        alt="user profile pic or instagram logo"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      {session ? (
        <button onClick={() => signOut()} className="text-red-500 font-bold">
          Log Out
        </button>
      ) : (
        <button onClick={() => signIn()} className="text-blue-600 font-bold">
          Log In
        </button>
      )}
    </div>
  );
};

export default MiniProfile;
