'use client';
import { useEffect, useState } from 'react';
import PublicMessageSidebar from '../../components/PublicMessageSidebar';

export default function ContactPage() {
  const [bulletins, setBulletins] = useState([]);

  useEffect(() => {
    fetch('/api/bulletin')
      .then(res => res.json())
      .then(data => setBulletins(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto h-screen">
      {/* Bagian daftar pesan dengan scroll */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <h1 className="text-2xl font-bold mb-4">📢 Bulletin Messages</h1>
        {bulletins.length === 0 ? (
          <p className="text-gray-500">Tidak ada pesan saat ini.</p>
        ) : (
          <ul className="space-y-4">
            {bulletins.map((b, i) => (
              <li key={i} className="p-4 bg-yellow-100  rounded-xl shadow-md">
                <h2 className="font-semibold text-lg">{b.title}</h2>
                <p>{b.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(b.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sidebar untuk kirim pesan */}
      <PublicMessageSidebar />
    </div>
  );
}
