"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPersonExclamation } from "react-icons/bs";

const Nav = () => {
  return (
    <main>
      <nav className="grid grid-cols-8">
        <div className="col-span-2 flex flex-row">
          <Image
            className="ml-11 my-3"
            src="https://imgs.search.brave.com/GJenX1iEUl3yNehAWjydSJy9r03yOF8J560ryoNZI7E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzM1Lzk3LzQx/LzM2MF9GXzEzNTk3/NDE2OV9pbkdNUGZX/TXZ3aEdJRWZ2dXBH/YXduUmhOY2owVlky/My5qcGc"
            width="70"
            height="50"
            alt="woodico logo"
          />
          <h1 className="text-xl font-extrabold justify-center text-center mt-6 ml-3">
            HOMMIE
          </h1>
        </div>
        <div className="grid col-span-4 gap-full justify-center text-center text-lg font-medium">
          <ul className="flex flex-row gap-10 items-center font-sans my-3">
            <Link className="mx-3 hover:font-bold hover:text-xl" href="/">
              Home
            </Link>
            <Link className="mx-3 hover:font-bold hover:text-xl" href="\shop">
              Shop
            </Link>
            <Link className="mx-3 hover:font-bold hover:text-xl" href="\about">
              About
            </Link>
            <Link
              className="mx-3 hover:font-bold hover:text-xl"
              href="\contact"
            >
              Contact
            </Link>
          </ul>
        </div>
        <div className="grid col-span-2 justify-center text-2xl mr-11">
          <ul className="flex flex-row gap-10 items-center my-3">
            <li className="hover:font-bold hover:text-3xl">
              <BsPersonExclamation />
            </li>
            <li className="hover:font-bold hover:text-3xl">
              <AiOutlineSearch />
            </li>
            <li className="hover:font-bold hover:text-3xl">
              <AiOutlineHeart />
            </li>
            <li className="hover:font-bold hover:text-3xl">
              <AiOutlineShoppingCart />
            </li>
          </ul>
        </div>
      </nav>
    </main>
  );
};

export default Nav;
