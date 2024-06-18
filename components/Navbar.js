import Link from 'next/link';
import { useState } from 'react';
import { departments } from '../lib/departments';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white text-2xl">Weather Dashboard</a>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
        >
          ☰
        </button>
        <ul className={`lg:flex ${menuOpen ? 'block' : 'hidden'}`}>
          {departments.map((department) => (
            <li key={department.name} className="lg:ml-4">
              <Link href={`/dashboard/${department.name.toLowerCase()}`} legacyBehavior>
                <a className="text-white">{department.name.replace(/-/g, ' ')}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
