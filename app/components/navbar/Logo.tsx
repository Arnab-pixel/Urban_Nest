"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      priority
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height={"150"}
      width={"150"}
      src={"/images/logo.svg"}
    />
  );
};
export default Logo;
