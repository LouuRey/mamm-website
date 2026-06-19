'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './utils/cropImage';
import { motion, AnimatePresence } from 'framer-motion';


export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m Poxpox Bot Assistant. How can I help you?' },
  ]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [penyakitPrediksi, setPenyakitPrediksi] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const chatEndRef = useRef(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingMessage]);

  const simulateTyping = (text) => {
    let i = 0;
    let buffer = '';
    setTypingMessage('');
    const type = () => {
      if (i < text.length) {
        buffer += text[i++];
        setTypingMessage(buffer);
        setTimeout(type, 30);
      } else {
        setTimeout(() => {
          setTypingMessage('');
          setMessages((prev) => [...prev, { from: 'bot', text }]);
        }, 300);
      }
    };
    type();
  };

  const handleSendText = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    try {
      const res = await axios.post('https://andriyasmusa-coba.hf.space/chat', {
        pertanyaan: userText,
        penyakit_prediksi: penyakitPrediksi,
      });
      const { respon, penyakit_prediksi } = res.data;
      setPenyakitPrediksi(penyakit_prediksi);
      simulateTyping(respon);
    } catch (err) {
      simulateTyping('Maaf, terjadi kesalahan saat menjawab.');
    }
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels, 224);
      const preview = URL.createObjectURL(blob);
      setMessages((prev) => [...prev, { from: 'user', image: preview }]);
      setImageSrc(null);
      setIsCropping(false);

      const formData = new FormData();
      formData.append('image', blob, 'cropped.jpg');

      const res = await axios.post('https://andriyasmusa-coba.hf.space/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { labels, respon_awal } = res.data;
      if (labels) setPenyakitPrediksi(labels);
      simulateTyping(`🧪 ${respon_awal}`);
    } catch (err) {
      console.error(err);
      setIsCropping(false);
      simulateTyping('Gagal memproses gambar. Coba lagi.');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-8 sm:px-12 font-sans overflow-hidden">
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl text-center sm:text-left sm:gap-12 mb-8"
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="sm:w-2/3"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-[#292929]">
            👋 Hi there!
            <span className="text-[#f06c19]"> I’m PoxPox Bot.</span> 👋
          </h1>
          <p className="text-gray-600 sm:text-lg mb-6">
            I can help you detect rash-related diseases like Chickenpox, Monkeypox, and Measles from images.
            Feel free to ask me anything about these diseases — symptoms, causes, treatments, and more! 🩺💬
          </p>
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-[#f06c19] hover:bg-[#ff9625] text-white px-6 py-3 rounded-full text-lg"
          >
            {showChat ? 'Close Chat' : 'Talk To Me!'}
          </button>
        </motion.div>

        {/* Mascot Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="sm:w-1/3 mt-8 sm:mt-0 flex justify-center"
        >
          <Image src="/maskot.png" alt="Chatbot Mascot" width={250} height={250} priority />
        </motion.div>
      </motion.section>

      {/* Chatbox with AnimatePresence */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 center -translate-x-1/2 w-[370px] sm:w-[600px] h-[520px] bg-white border shadow-xl rounded-xl p-4 z-50 flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-[#f06c19]">Poxpox Chatbot</h2>
              <button onClick={() => setShowChat(false)} className="text-gray-400 text-xl hover:text-red-500">
                ×
              </button>
            </div>

            {/* Cropper */}
            {imageSrc && (
              <div className="relative w-full h-[400px] md:h-[500px] bg-gray-200 flex justify-center items-center mb-4">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
                <button
                  onClick={handleCropConfirm}
                  className="absolute bottom-2 right-2 bg-[#f06c19] text-white px-3 py-1 rounded"
                >
                  ✔️ Confirm Crop
                </button>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-100 rounded p-3 space-y-2 text-sm">
              {messages.map((m, i) => (
                <motion.div
                  key={`${m.from}-${i}-${m.text ?? 'img'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-fit max-w-[75%] px-4 py-2 rounded-lg break-words ${
                    m.from === 'user'
                      ? 'ml-auto bg-[#f06c19] text-white'
                      : 'mr-auto bg-white border'
                  }`}
                >
                  {m.image ? (
                    <img
                      src={m.image}
                      alt="Uploaded"
                      className="w-[224px] h-[224px] object-cover rounded-md"
                    />
                  ) : (
                    m.text
                  )}
                </motion.div>
              ))}
              {typingMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-[80%] px-4 py-2 rounded-lg bg-white border font-mono"
                >
                  {typingMessage}
                  <span className="ml-1 animate-pulse">|</span>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendText();
              }}
              className="flex items-center gap-2 mt-2"
            >
              <label htmlFor="upload" className="cursor-pointer text-2xl">📷</label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
              />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu..."
                className="flex-1 border rounded px-3 py-2 text-sm outline-none"
                disabled={typingMessage !== '' || isCropping}
              />
              <button
                type="submit"
                disabled={typingMessage !== '' || isCropping}
                className="bg-[#ff9625] hover:bg-[#f06c19] text-white px-3 py-2 rounded text-xl"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );

}
