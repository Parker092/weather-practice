import Link from 'next/link';
import { departments } from '../lib/departments';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Select a Department</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {departments.map((department) => (
            <Link key={department.name} href={`/dashboard/${department.name}`} legacyBehavior>
              <a className="p-4 border rounded-lg shadow-md text-center bg-gray-800 text-white">
                {department.name.replace(/-/g, ' ')}
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
