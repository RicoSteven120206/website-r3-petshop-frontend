"use client";

import React from 'react';
import { AuthGuard } from '@/src/components/guards/AuthGuard';
import { useAuth } from '@/src/lib/auth-context';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
 
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className='p-8 min-h-screen bg-red-50'>
        <h1 className='text-2xl font-bold text-red-900'>Admin R3 Petshop</h1>
        <p>Selamat Bekerja, Admin {user?.name}</p>

        <button onClick={logout} className='mt-4 bg-black text-white px-4 py-2 rounded'>
          logout
        </button>
      </div>
    </AuthGuard>
  )
}

export default AdminDashboard;
