import Link from 'next/link';
import departments from '../lib/departments';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 flex-wrap justify-center">
        <li>
          <Link href="/" legacyBehavior>
            <a className="text-white hover:text-gray-400">Inicio</a>
          </Link>
        </li>
        {departments.map((dept) => (
          <li key={dept.path}>
            <Link href={`/dashboard${dept.path}`} legacyBehavior>
              <a className="text-white hover:text-gray-400">{dept.name.replace(/-/g, ' ')}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
