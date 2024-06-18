import Link from 'next/link';
import departments from '../lib/departments';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Bienvenido al Dashboard del Clima de El Salvador</h1>
        <nav className="flex flex-wrap justify-center gap-4">
          {departments.map((department) => (
            <Link key={department.path} href={`/dashboard${department.path}`} legacyBehavior>
              <a className="block p-4  rounded shadow hover:bg-blue-600 transition">
                {department.name.replace(/-/g, ' ')}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
