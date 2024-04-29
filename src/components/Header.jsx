import Image from "next/image";
import logoLong from "./../../public/instagram-long.webp";
import logoShort from "./../../public/instgram-short.webp";
import Link from "next/link";

const Header = () => {
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
          <Link href="/" className="text-blue-600 text-xl font-semibold">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
