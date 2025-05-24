'use client';
import { useState, useEffect } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quản lý người dùng</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.email} - {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}