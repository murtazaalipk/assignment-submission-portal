"use client"
import { useState } from 'react';
import UserList from '@/components/UserList';
import AddClass from '@/components/AddClass';
import AddStudent from '@/components/AddStudent';

export default function Home() {
  const [activeTab, setActiveTab] = useState('userList');

  const renderTab = () => {
    switch (activeTab) {
      case 'userList':
        return <UserList />;
      case 'addClass':
        return <AddClass />;
      case 'addStudent':
        return <AddStudent />;
      default:
        return <UserList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
      <div className="flex space-x-4 mb-6">
        <button className={`py-2 px-4 ${activeTab === 'userList' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTab('userList')}>User List</button>
        <button className={`py-2 px-4 ${activeTab === 'addClass' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTab('addClass')}>Add Class</button>
        <button className={`py-2 px-4 ${activeTab === 'addStudent' ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => setActiveTab('addStudent')}>Add Student</button>
      </div>
      {renderTab()}
    </div>
  );
}
