import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { EventModal } from './components/EventModal';
import { Event, County, EventType } from './types';
import { SEED_EVENTS, SHOP_ITEMS } from './constants';
import { ArrowRight, Heart, Handshake, BookOpen, Play, Instagram, Mic2, ExternalLink, ShoppingCart, Sparkles, Star, Sun, Coins } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { Logo } from './components/Logo';
import { GoogleGenAI } from "@google/genai";

const HERO_IMAGES = [
  { url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/jqs7kv1shsrmy0cvx6btn17cyr.png", label: "Sacrifice" },
  { url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/ey4tftzcjsrmw0cvx6cs3vxw50.png", label: "Sanctity" },
  { url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/sjrpkf863nrmt0cvx6ct53sbym.png", label: "Service" }
];

const App: React.FC = () => {
  const [events] = useState<Event[]>(SEED_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeType, setActiveType] = useState<EventType | 'All'>('All');
  const [activeCounty, setActiveCounty] = useState<County | 'All'>('All');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [aiReflection, setAiReflection] = useState<string>("Seeking the light in our daily walk...");
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchReflection = async () => {
      const apiKey = (window as any).process?.env?.GEMINI_API_KEY || "";
      if (!apiKey) return;
      setIsAiLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Write a one-sentence spiritual intention for a Catholic Young Adult in California coast.",
        });
        setAiReflection(response.text || "Grace is found in community.");
      } catch (err) {
        console.error(err);
      } finally {
        setIsAiLoading(false);
      }
    };
    fetchReflection();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const typeMatch = activeType === 'All' || e.type === activeType;
      const countyMatch = activeCounty === 'All' || e.county === activeCounty;
      return typeMatch && countyMatch;
    });
  }, [events, activeType, activeCounty]);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  return (
    <Layout>
      <section id="hero" className="relative h-screen flex flex-col justify-center bg-charcoal overflow-hidden pt-40">
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, idx) => (
            <img key={idx} src={img.url} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === activeMediaIndex ? 'opacity-40' : 'opacity-0'}`} />
          ))}
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Ignite your <br /> <span className="text-primary">faith</span>
          </h1>
          <p className="text-white/60 text-xl mt-6 max-w-xl">Your home for a faith in Catholic community.</p>
        </div>
      </section>

      <section id="events" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">Calendar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white p-8 rounded-[2rem] shadow-xl border border-black/5">
              <h3 className="text-2xl font-black uppercase tracking-tight">{event.title}</h3>
              <p className="text-black/40 mt-2">{format(event.start, 'PPP')}</p>
              <button onClick={() => { setSelectedEvent(event); setIsModalOpen(true); }} className="mt-6 text-primary font-bold uppercase text-xs tracking-widest">Details &rarr;</button>
            </div>
          ))}
        </div>
      </section>

      <section id="media" class="bg-charcoal py-24 px-6 text-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-7xl font-black uppercase tracking-tighter mb-12">Shared Mission</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div onClick={() => window.open('https://www.instagram.com/spirited_lamb/')} class="bg-white/5 p-10 rounded-[3rem] border border-white/10 cursor-pointer">
                <Instagram class="text-primary mb-6" size={48} />
                <h3 class="text-3xl font-black uppercase tracking-tighter">@spirited_lamb</h3>
             </div>
          </div>
        </div>
      </section>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
};

export default App;
