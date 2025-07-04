import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-50">
      <div className="flex items-center max-w-6xl justify-between h-14 mx-auto px-3">
        <div className="flex items-center gap-2">
          <Image src="/Linkedin_logo.png" alt="Logo" width={35} height={35} />
          <div className="md:block hidden">
            <SearchInput />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems />
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton asChild mode="modal">
                <Button className="rounded-full" variant="secondary">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
