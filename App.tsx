import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { EventModal } from './components/EventModal';
import { Event, County, EventType } from './types';
import { SEED_EVENTS, SHOP_ITEMS } from './constants';
import { ArrowRight, Heart, Handshake, Sun, Instagram, ShoppingCart, Star } from 'lucide-react';
import { format } from 'date-fns';

const HERO_IMAGES = [
  { url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/jqs7kv1shsrmy0cvx6btn17cyr.png", label: "Sacrifice" },
  { url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/ey4tftzcjsrmw0cvx6cs3vxw50.png", label: "Sanctity" },
  { url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/sjrpkf863nrmt0cvx6ct53sbym.png", label: "Service" }
];

const App: React.FC = () => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setActiveMediaIndex((prev) => (prev + 1) % HERO_IMAGES.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <section id="hero" className="relative h-screen flex flex-col justify-center bg-charcoal overflow-hidden pt-40">
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, idx) => (
            <img key={idx} src={img.url} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] brightness-[0.45] ${idx === activeMediaIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} style={{ transitionProperty: 'opacity, transform' }} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/30 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary">Est. 2023</span>
            </div>
            <h1 className="font-black text-6xl md:text-8xl leading-[1.1] uppercase tracking-tighter text-white">
              Ignite your <br /> <span className="text-white">faith,</span> <br /> <span className="text-primary">Build bonds</span>
            </h1>
            <h2 className="text-white/90 text-xl max-w-xl border-l-4 border-primary pl-6">Your home for a faith in Catholic community</h2>
            <div className="flex gap-4 pt-4">
              <button className="px-10 py-5 bg-white text-charcoal rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-primary hover:text-white transition-all">Join the Mission <ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-30 bg-primary py-4 overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap items-center gap-24 w-max">
            {Array.from({length: 10}).map((_, i) => (
              <div key={i} className="flex gap-24 items-center">
                <div className="flex items-center gap-4 text-white font-black text-3xl uppercase tracking-widest"><Heart fill="white" /> Faith.</div>
                <div className="flex items-center gap-4 text-white font-black text-3xl uppercase tracking-widest"><Handshake /> Friends.</div>
                <div className="flex items-center gap-4 text-white font-black text-3xl uppercase tracking-widest"><Sun /> Fellowship.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aquí irían las secciones de Eventos, Pilares y Tienda que ya tienes en el código anterior */}
    </Layout>
  );
};

export default App;
