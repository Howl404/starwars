import { Routes } from '@/constants/api';
import { Link } from '@tanstack/react-router';
import { FaHome } from 'react-icons/fa';
import { GiCharacter } from 'react-icons/gi';
import { IoFilmSharp } from 'react-icons/io5';

export function Header() {
  return (
    <nav
      aria-label="Main Navigation"
      className="sticky top-0 z-10 m-auto flex w-full flex-wrap justify-center gap-4 bg-gray-950 p-4 sm:flex-row"
    >
      <Link
        role="link"
        aria-label="Navigate to Home page"
        className="flex items-center gap-1 rounded p-2 text-xl text-white hover:bg-gray-800"
        to={Routes.HOME}
      >
        <FaHome />
        Home
      </Link>
      <Link
        role="link"
        aria-label="Navigate to Movies page"
        className="flex items-center gap-1 rounded p-2 text-xl text-white hover:bg-gray-800"
        to={Routes.MOVIES}
      >
        <IoFilmSharp />
        Movies
      </Link>
      <Link
        role="link"
        aria-label="Navigate to Characters page"
        className="flex items-center gap-1 rounded p-2 text-xl text-white hover:bg-gray-800"
        to={Routes.CHARACTERS}
      >
        <GiCharacter />
        Characters
      </Link>
    </nav>
  );
}
