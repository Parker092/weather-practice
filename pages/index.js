import Link from 'next/link';
import departments from '../lib/departments';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center text-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Bienvenido al Dashboard del Clima de El Salvador</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg mx-auto">
        {departments.map((department) => (
          <Link key={department.path} href={`/dashboard${department.path}`} legacyBehavior>
            <a className="block p-4 bg-gray-800 rounded shadow hover:bg-gray-200 transition text-center">
              {department.name.replace(/-/g, ' ')}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
