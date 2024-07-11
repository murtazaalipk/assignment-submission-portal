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
        { name: 'Math Homework', dueDate: '2024-07-15', studentCount: 25 },
        { name: 'Science Project', dueDate: '2024-07-20', studentCount: 20 },
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
