"use client";
import Image from "next/image";
import logoLong from "./../../public/instagram-long.webp";
import logoShort from "./../../public/instgram-short.webp";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { useState } from "react";
import { HiCamera } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-3 shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <div className="flex items-center">
          <Link href="/" className="hidden lg:inline-flex">
            <Image src={logoLong} alt="instagram logo" height={96} width={96} />
          </Link>
          <Link href="/" className="lg:hidden">
            <Image
              src={logoShort}
              alt="instagram logo"
              height={40}
              width={40}
            />
          </Link>
        </div>

        {/*  input */}
        <div className="max-w-60">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 w-full outline-none rounded-md bg-slate-100 text-sm ring-1 ring-gray-200 placeholder:text-lg focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Login */}
        <div className="">
          {session ? (
            <div className="flex items-center justify-end gap-10">
              <Link
                href="/"
                onClick={() => signOut()}
                className="text-red-600 text-xl font-semibold cursor-pointer "
              >
                Log Out
              </Link>
              <Image
                src={session.user.image}
                className="rounded-full"
                alt={session.user.name}
                width={60}
                height={60}
              />
              <button
                onClick={() => setIsOpen(true)}
                className="bg-sky-500 text-white py-3 px-4 rounded-lg shadow-md text-md font-semibold hover:scale-105 transition-all"
              >
                Create Post
              </button>
            </div>
          ) : (
            <Link
              href="/"
              onClick={() => signIn()}
              className="text-blue-600 text-xl font-semibold"
            >
              Log In
            </Link>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="absolute right-2 top-2">
            <IoCloseOutline
              className="cursor-pointer text-xl text-gray-700 hover:text-red-500 transform hover:scale(125)"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <HiCamera className="text-5xl text-gray-400 opacity-90 cursor-pointer" />
            <input
              type="text"
              placeholder="Please enter your caption"
              maxLength="150"
              className="w-full text-center active:outline-none focus:outline-none pl-2"
            />
            <button disabled className="bg-red-600 w-full p-2 rounded-md text-white text-lg shadow-md hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:brightness-100">
              Upload Post
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Header;
