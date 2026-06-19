'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const diseases = [
  {
    title: 'Chickenpox (Cacar Air)',
    description:
      'Chickenpox adalah infeksi virus yang menyebabkan ruam merah gatal dan bintik-bintik berisi cairan. Sangat menular, namun bisa dicegah dengan vaksin.',
    image: '/chickenpox.png',
    link: '/chickenpox',
  },
  {
    title: 'Monkeypox (Cacar Monyet)',
    description:
      'Monkeypox adalah penyakit langka mirip cacar, disebabkan oleh virus zoonosis. Gejalanya termasuk demam, pembengkakan kelenjar getah bening, dan ruam.',
    image: '/monkeypox.png',
    link: '/monkeypox',
  },
  {
    title: 'Measles (Campak)',
    description:
      'Measles adalah infeksi virus yang sangat menular. Gejalanya termasuk demam tinggi, batuk, mata merah, dan ruam khas. Pencegahan terbaik: vaksinasi.',
    image: '/measles.png',
    link: '/measles',
  },
];

export default function DiseaseInfoPage() {
  return (
    <main className="min-h-screen bg-white px-4 sm:px-12 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#292929] mb-4">
        Know the <span className="text-[#f06c19]">Rash!</span>
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
        Pelajari 3 penyakit kulit menular yang sering muncul di masyarakat. Kenali gejalanya, pahami penyebabnya, dan ketahui cara pencegahannya.
      </p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {diseases.map((disease, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-[#fefefe] rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="relative w-full h-[180px]">
              <Image
                src={disease.image}
                alt={disease.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-[#292929]">{disease.title}</h2>
              <p className="text-sm text-gray-600 mb-4 text-justify">
                {disease.description}
              </p>
              <Link
                href={disease.link}
                className="text-[#f06c19] hover:underline font-medium text-sm"
              >
                Pelajari lebih lanjut →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
