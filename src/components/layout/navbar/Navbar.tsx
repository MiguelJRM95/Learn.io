import Link from 'next/link';
import React, { useState } from 'react';
import { ProfileData } from '../../../hooks/database/users';
import { routes } from '../../../utils/routes';

type Props = {
  userProfile: ProfileData | null | undefined;
};

export const Navbar = ({ userProfile }: Props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex items-center flex-wrap bg-white p-3 sm:shadow-lg">
        <a href={routes.home} className="inline-flex items-center p-2 mr-4 ">
          <span className="text-xl text-white font-extrabold uppercase tracking-wide bg-black p-4">
            Learn.io
          </span>
        </a>

        <button
          className=" inline-flex p-3 hover:bg-slate-200 hover:sm:shadow-sm rounded lg:hidden text-slate-800 ml-auto hover:text-stone-900 outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div className={`${active ? '' : 'hidden'}   w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-slate-800 font-bold items-center justify-center hover:bg-black hover:text-white text-xl">
                My Subjects
              </a>
            </Link>
            <Link href="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-slate-800 font-bold items-center justify-center hover:bg-black hover:text-white text-xl">
                Find
              </a>
            </Link>
            <Link href="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-slate-800 font-bold items-center justify-center hover:bg-black hover:text-white text-xl">
                Grades
              </a>
            </Link>
            <Link href="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-slate-800 font-bold items-center justify-center hover:bg-black hover:text-white text-xl">
                Profile
              </a>
            </Link>
            {userProfile?.role !== 'STUDENT' ? (
              <Link href="/">
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-slate-800 font-bold items-center justify-center hover:bg-black hover:text-white text-xl">
                  Admin
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};
