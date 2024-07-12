"use client";
import React, { useState, useEffect } from 'react';
import TeacherDashboard from '/components/TeacherClassView';
import StudentDashboard from '/components/StudentClassView';

export default function ClassDashboard() {
   
    const [userRole, setUserRole] = useState(null);
    const [assignments, setAssignments] = useState([]);
  
    useEffect(() => {
      // Fetch user role and assignments from your API or authentication context
      // For demonstration, setting role manually
      setUserRole('teacher'); // Change to 'student' to see student dashboard
      setAssignments([
        { name: 'Portfolio using Html CSS', dueDate: '15-july-2024', studentCount: 25, gradingStatus: 'pending' },
        { name: 'Print 5 table Using For Loop', dueDate: '20-july-2024', studentCount: 20, gradingStatus: 'complete' },
      ]);
    }, []);
  
    if (userRole === 'teacher') {
      return <TeacherDashboard assignments={assignments} />;
    } else if (userRole === 'student') {
      return <StudentDashboard assignments={assignments} />;
    } else {
      return <div>Loading...</div>;
    }
  };
