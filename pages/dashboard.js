import Head from 'next/head';
import { useState } from 'react';
import { departments } from '../lib/departments';
import DepartmentWeather from '../components/DepartmentWeather';

export default function Dashboard() {
  const [expandedDepartment, setExpandedDepartment] = useState(null);

  const handleExpand = (departmentName) => {
    setExpandedDepartment((prev) => (prev === departmentName ? null : departmentName));
  };

  return (
    <div>
      <Head>
        <title>El Salvador Weather Dashboard</title>
        <meta name="description" content="Weather dashboard for El Salvador's departments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap justify-center p-4">
        <h1 className="text-3xl font-bold w-full text-center mb-4">El Salvador Weather Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {departments.map((department) => (
            <DepartmentWeather
              key={department.name}
              department={department}
              isExpanded={expandedDepartment === department.name}
              onExpand={() => handleExpand(department.name)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
