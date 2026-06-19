'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const guides = [
  {
    title: 'Mulai Chat dengan PoxPox Bot',
    description: [
      'Pertama, Klik tombol "TalkToMe" di halaman utama. Kemudian kolum Chatbot akan muncul di bagian tengah bawah layar'
    ],
    image: 'guide1.png',
  },
  {
    title: 'Mengirim Pertanyaan',
    description: [
      'Selanjutnya tulis pesanmu di kolom chat yang tersedia. Klik tombol "Kirim" (logo ➤) atau tekan Enter. Bot akan membalas otomatis dengan jawaban berbasis AI.',
    ],
    image: 'guide2.png',
  },
  {
    title: 'Prediksi Gambar Kulit',
    description: [
      'Bisa juga memprediksi penyakit menggunakan gambar, dengan klik tombol kamera di samping kolom chat. ',
      ' Pilih dan crop gambar kulit yang ingin diprediksi.',
      ' Gambar otomatis dikirim dan diproses oleh AI.',
    ],
    image: 'guide3.png',
  },
];

const intents = [
  {
    title: 'DEFINISI',
    details: ['Penjelasan singkat tentang penyakit.'],
  },
  {
    title: 'GEJALA',
    details: ['Tanda dan gejala umum dari penyakit.'],
  },
  {
    title: 'PENYEBAB',
    details: ['Faktor penyebab & cara penularan.'],
  },
  {
    title: 'PENANGANAN',
    details: ['Cara penanganan awal dan lanjut.'],
  },
  {
    title: 'PENCEGAHAN',
    details: ['Langkah-langkah untuk mencegah penyakit.'],
  },
];

export default function Guide() {
  return (
    <section className="py-16 bg-white" id="guide">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Panduan Penggunaan PoxPox Bot
        </h2>

        <div className="space-y-12">
          {guides.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center md:items-start mb-16 gap-6`}
              >
                {/* ANGKA BESAR */}
                <div className="text-[100px] font-extrabold text-orange-400 leading-none w-[100px] text-center">
                  {index + 1}
                </div>

                {/* GAMBAR SCREENSHOT */}
                <div className="w-full md:w-1/3">
                  <img
                    src={step.image}
                    alt={`Step ${index + 1}`}
                    className="rounded-xl shadow-md object-cover w-full h-auto"
                  />
                </div>

                {/* KONTEN GUIDE */}
                <div className="flex-1 p-6 rounded-2xl shadow-md bg-white relative z-10">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            );
          })}




        </div>

        {/* Intent Cards Horizontal */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Jenis Pertanyaan yang Didukung
          </h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              {intents.map((intent, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[300px] bg-white border rounded-xl shadow-sm p-5"
                >
                  <h4 className="text-xl font-bold text-[#f06c19] mb-2">
                    {intent.title}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {intent.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}