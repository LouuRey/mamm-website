'use client';
import { useEffect, useState } from 'react';
import useHasMounted from '../hooks/useHasMounted';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';

export default function PublicMessageSidebar() {
  const hasMounted = useHasMounted();
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (hasMounted) {
      fetch('/api/public')
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [hasMounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return;

    const res = await fetch('/api/public', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message }),
    });

    const result = await res.json();

    if (!res.ok) {
      setWarning(result?.error || 'Gagal mengirim pesan');
      return;
    }

    setMessages([result, ...messages]);
    setTitle('');
    setMessage('');
    setWarning('');
  };

  if (!hasMounted) return null;

  return (
    <div className="w-full md:w-72 p-4 bg-blue-50 rounded-md shadow-md h-fit flex flex-col gap-4">
      {/* Public Messages */}
      <div>
        <h2 className="text-lg font-bold mb-3">🌐 Public Message</h2>
        <ul className="public-scroll space-y-2 text-sm max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 rounded">
          {messages.map((msg, idx) => (
            <li key={idx} className="bg-white p-2 rounded border shadow-sm">
              <p className="font-medium">{msg.title}</p>
              <p className="text-gray-700">{msg.message}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <div>
        <h2 className="text-lg font-bold mb-3">Tulis Pesan</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded border"
            required
          />
          <textarea
            placeholder="Isi pesan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded border"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Kirim
          </button>
        </form>

        {warning && (
          <div className="text-sm text-red-600 bg-red-100 border border-red-300 rounded p-2 mt-2">
            ⚠️ {warning}
          </div>
        )}
      </div>

      {/* Kontak */}
      <div className="pt-2 border-t border-gray-300">
        <h2 className="text-lg font-bold mb-2">📞 Kontak</h2>
        <ul className="text-sm space-y-2">
          <li className="flex items-center gap-2 hover:scale-[1.02] transition">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 w-4 h-4" />
            <a href="mailto:poxpoxbot@gmail.com" className="text-blue-700 hover:underline">
              poxpoxbot@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-2 hover:scale-[1.02] transition">
            <FontAwesomeIcon icon={faInstagram} className="text-blue-600 w-4 h-4" />
            <a
              href="https://instagram.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              @PoxPoxBotOfficial
            </a>
          </li>
          <li className="flex items-center gap-2 hover:scale-[1.02] transition">
            <FontAwesomeIcon icon={faLinkedin} className="text-blue-600 w-4 h-4" />
            <a
              href="https://linkedin.com/in/namamu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              @PoxPoxBot
            </a>
          </li>
          <li className="flex items-center gap-2 hover:scale-[1.02] transition">
            <FontAwesomeIcon icon={faGlobe} className="text-blue-600 w-4 h-4" />
            <a
              href="https://namamu.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              www.poxpoxbot.dev
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
