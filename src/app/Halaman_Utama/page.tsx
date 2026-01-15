"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Cake, Heart, Sparkles, PartyPopper } from 'lucide-react';

interface ParticleItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

const BirthdayWebsite = () => {
  const [confetti, setConfetti] = useState<ParticleItem[]>([]);
  const [balloons, setBalloons] = useState<ParticleItem[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Data yang bisa Anda edit
  const birthdayData = {
    name: "Nama Orang Tersayang",
    age: 25,
    quote: "Selamat ulang tahun Din! Semoga hadiah atau suprise dari aku ini bisa mengobati dompetmu yang hilang",
    message: "Di sini aku cuman bisa doa'in aja yang terbaik buat kamu dan semoga segala keininginanmu tercapai. Semangat terus yaa!!"
  };

  // Generate confetti
  useEffect(() => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      color: ['#FFB6C1', '#FFD700', '#FFF', '#FF69B4'][Math.floor(Math.random() * 4)]
    }));
    setConfetti(newConfetti);

    const newBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 3,
      color: ['#FFB6C1', '#FFD700', '#FF69B4', '#FFC0CB'][Math.floor(Math.random() * 4)]
    }));
    setBalloons(newBalloons);
  }, []);

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 overflow-hidden">
      {/* Confetti */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="fixed w-2 h-2 rounded-full animate-pulse"
          style={{
            left: `${item.left}%`,
            top: '-20px',
            backgroundColor: item.color,
            animation: `fall ${item.duration}s linear ${item.delay}s infinite`,
          }}
        />
      ))}

      {/* Balloons */}
      {balloons.map((item) => (
        <div
          key={item.id}
          className="fixed bottom-0 w-8 h-10 rounded-full opacity-70"
          style={{
            left: `${item.left}%`,
            backgroundColor: item.color,
            animation: `rise ${item.duration}s ease-in ${item.delay}s infinite`,
            boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.1)`,
          }}
        >
          <div className="w-0.5 h-12 bg-gray-300 mx-auto" style={{ marginTop: '40px' }} />
        </div>
      ))}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes rise {
          0% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-50vh) rotate(5deg); }
          100% { transform: translateY(-100vh) rotate(-5deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div 
          className="text-center mb-16 transition-all duration-500"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="inline-block animate-bounce mb-6">
            <PartyPopper className="w-20 h-20 text-pink-500 mx-auto" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent mb-4 animate-pulse">
            Happy Birthday!
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6">
            {birthdayData.name}
          </h2>
          <div className="flex items-center justify-center gap-4 text-2xl text-gray-700">
            <Cake className="w-8 h-8 text-yellow-500 animate-bounce" />
            <span className="font-bold text-3xl">{birthdayData.age}</span>
            <span>Tahun</span>
            <Sparkles className="w-8 h-8 text-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>

        {/* Quote Section */}
        <div 
          className="max-w-3xl mx-auto mb-16 transition-all duration-500"
          style={{ 
            opacity: scrollY > 50 ? 1 : 0,
            transform: `translateY(${scrollY > 50 ? 0 : 50}px)` 
          }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-pink-300 shadow-2xl">
            <CardContent className="p-8">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-pulse" />
              <p className="text-2xl text-center text-gray-700 italic font-medium">
                "{birthdayData.quote}"
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Card */}
        <div 
          className="max-w-2xl mx-auto mb-16 transition-all duration-500"
          style={{ 
            opacity: scrollY > 200 ? 1 : 0,
            transform: `translateY(${scrollY > 200 ? 0 : 50}px)` 
          }}
        >
          <div className="text-center mb-6">
            <Gift className="w-16 h-16 text-yellow-500 mx-auto mb-4" style={{ animation: 'float 2s ease-in-out infinite' }} />
            <h3 className="text-3xl font-bold text-pink-600 mb-2">Ada Hadiah Kecil Buat Kamu!</h3>
            <p className="text-gray-600">Klik kartu-Nya Din</p>
          </div>

          <div 
            className="relative cursor-pointer perspective-1000"
            onClick={() => setCardOpen(!cardOpen)}
          >
            <div 
              className={`relative w-full transition-all duration-700 transform-style-3d ${cardOpen ? 'rotate-y-180' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: cardOpen ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front of card */}
              <Card className={`w-full border-4 border-yellow-400 shadow-2xl ${cardOpen ? 'invisible' : 'visible'}`}>
                <CardContent className="p-12 bg-gradient-to-br from-pink-200 to-yellow-100">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎁</div>
                    <p className="text-2xl font-bold text-pink-600">Klik untuk membuka!</p>
                  </div>
                </CardContent>
              </Card>

              {/* Back of card */}
              <Card 
                className={`absolute top-0 w-full border-4 border-pink-400 shadow-2xl ${cardOpen ? 'visible' : 'invisible'}`}
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <CardContent className="p-8 bg-gradient-to-br from-yellow-100 to-pink-200">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-spin" />
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {birthdayData.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Secret Message Button */}
        <div 
          className="text-center transition-all duration-500"
          style={{ 
            opacity: scrollY > 400 ? 1 : 0,
            transform: `translateY(${scrollY > 400 ? 0 : 50}px)` 
          }}
        >
          <Button
            onClick={() => setShowMessage(!showMessage)}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            {showMessage ? '❤️ Tutup Pesan' : '💌 Pesan Spesial Untukmu'}
          </Button>

          {showMessage && (
            <Card className="max-w-2xl mx-auto mt-8 border-4 border-pink-400 shadow-2xl animate-bounce">
              <CardContent className="p-8 bg-gradient-to-br from-pink-100 to-yellow-50">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎉🎂🎈</div>
                  <p className="text-xl text-gray-700 font-medium leading-relaxed">
                    Semoga Kamu suka sama suprise ku ini,maaf ya aku belum bisa kasih hadiah beneran. udah sih aku kehabisan kata kata
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-24 pb-8">
          <p className="text-gray-600 text-lg">
            Dibuat dengan ❤️ khusus buat kamu
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWebsite;