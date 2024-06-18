import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { departments } from '../../lib/departments';
import Navbar from '../../components/Navbar';
import DepartmentWeather from '../../components/DepartmentWeather';

export default function DepartmentDashboard() {
  const router = useRouter();
  const { department } = router.query;
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    if (department) {
      const dept = departments.find((d) => d.name.toLowerCase() === department);
      setSelectedDepartment(dept);
    }
  }, [department]);

  return (
    <div>
      <Navbar />
      <main className="p-4">
        {selectedDepartment ? (
          <div>
            <h1 className="text-3xl font-bold text-center mb-4">
              {selectedDepartment.name.replace(/-/g, ' ')} Weather Dashboard
            </h1>
            <DepartmentWeather department={selectedDepartment} isExpanded={true} onExpand={() => {}} />
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </main>
    </div>
  );
}
