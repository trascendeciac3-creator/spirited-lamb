
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
  {
    url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/jqs7kv1shsrmy0cvx6btn17cyr.png",
    label: "Sacrifice"
  },
  {
    url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/ey4tftzcjsrmw0cvx6cs3vxw50.png",
    label: "Sanctity"
  },
  {
    url: "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/sjrpkf863nrmt0cvx6ct53sbym.png",
    label: "Service"
  }
];

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(SEED_EVENTS);
  
  // NOTE: To make this functional with n8n/WordPress:
  // 1. Create an API endpoint that returns your events from n8n.
  // 2. Use a useEffect hook here to fetch data:
  //    useEffect(() => { fetch('/api/events').then(res => res.json()).then(setEvents) }, []);
  
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

  // Fetch AI Reflection from Gemini
  useEffect(() => {
    const fetchReflection = async () => {
      if (!process.env.API_KEY) return;
      setIsAiLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Write a one-sentence, powerful spiritual intention for a Catholic Young Adult in Santa Barbara or Ventura County, California. Focus on coastal beauty or community growth.",
        });
        setAiReflection(response.text || "Grace is found in the simple moments of community.");
      } catch (err) {
        console.error("AI Reflection failed", err);
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

  const openEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const eventTypes: (EventType | 'All')[] = ['All', 'Spiritual', 'Action', 'Connection'];
  const counties: (County | 'All')[] = ['All', 'Ventura', 'Santa Barbara'];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* SECTION 1: HERO GALLERY */}
      <section id="hero" className="relative h-screen flex flex-col justify-center bg-charcoal overflow-hidden pt-32">
        <div className="absolute inset-0 z-0 bg-charcoal">
          {HERO_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === activeMediaIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={img.url} 
                className={`w-full h-full object-cover brightness-[0.45] contrast-110 transition-transform duration-[4000ms] ease-out ${idx === activeMediaIndex ? 'scale-110' : 'scale-100'}`}
                alt={img.label}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/90 z-10" />
        </div>

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col justify-center h-full pb-48">
  <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000 -mt-16">
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[1px] bg-primary" />
                <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.5em] text-primary">Est. 2023</span>
              </div>
              
              <h1 className="font-sans font-black text-5xl md:text-8xl leading-[1.1] uppercase tracking-tighter text-white drop-shadow-2xl">
                Ignite your <br />
                <span className="text-white">faith,</span> <br />
                <span className="text-primary">Build bonds</span>
              </h1>
            </div>
            
            <h2 className="font-sans font-light text-white/95 text-lg md:text-xl max-w-xl leading-relaxed border-l-4 border-primary pl-6 py-1 drop-shadow-md">
              Your home for a faith in Catholic community
            </h2>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('events')}
                className="group relative px-10 py-5 bg-white text-charcoal rounded-full font-sans font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                Join the Mission 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('events')}
                className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full font-sans font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
              >
                Explore Events
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-30 bg-primary border-t border-white/10 py-4 overflow-hidden shadow-2xl">
          <div className="flex animate-scroll whitespace-nowrap items-center gap-24 w-max">
            {Array.from({length: 12}).map((_, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-6 group/item">
                  <Heart size={28} strokeWidth={3} fill="white" className="text-white group-hover/item:scale-125 transition-transform" />
                  <span className="text-3xl font-sans font-black tracking-[0.15em] uppercase text-white">Faith.</span>
                </div>
                <div className="flex items-center gap-6 group/item">
                  <Handshake size={28} strokeWidth={2.5} className="text-white group-hover/item:scale-125 transition-transform" />
                  <span className="text-3xl font-sans font-black tracking-[0.15em] uppercase text-white">Friends.</span>
                </div>
                <div className="flex items-center gap-6 group/item">
                  <Sun size={28} strokeWidth={2.5} className="text-white group-hover/item:rotate-90 transition-transform duration-500" />
                  <span className="text-3xl font-sans font-black tracking-[0.15em] uppercase text-white">Fellowship.</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: EVENTS (RESTORED TO CARDS) */}
      <section id="events" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <span className="text-gold font-bold uppercase tracking-[0.6em] text-[11px]">Local Pulse</span>
            <h2 className="text-6xl md:text-8xl font-black text-charcoal tracking-tighter uppercase leading-none mt-4">Calendar</h2>
          </div>
          <div className="flex flex-wrap gap-2 bg-charcoal/5 p-2 rounded-[2rem]">
            {eventTypes.map(t => (
              <button 
                key={t} 
                onClick={() => setActiveType(t)} 
                className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeType === t ? 'bg-primary text-white shadow-xl' : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              onClick={() => openEvent(event)} 
              className="group bg-white p-10 rounded-[3rem] shadow-xl border border-charcoal/5 hover:-translate-y-2 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {event.type}
                </div>
                <span className="text-charcoal/20 font-black text-xl">0{event.id}</span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-charcoal/40 text-sm font-bold uppercase tracking-widest mb-8">
                {format(event.start, 'EEEE, MMM do')}
              </p>
              <button className="w-full py-4 bg-charcoal text-white rounded-2xl font-bold text-xs uppercase tracking-widest group-hover:bg-primary transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PARTNER (DONATE SECTION) - Animated & Interactive */}
      <section id="partner" className="relative py-6 md:py-10 bg-charcoal text-white overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,90,63,0.1),transparent)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
          <div className="max-w-xl text-center lg:text-left group/text cursor-default">
            <h2 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[1] transition-transform duration-500 group-hover/text:translate-x-2">
              LOCAL <span className="text-primary inline-block hover:scale-110 transition-transform">PARTNERS</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto items-center">
             <button className="group/btn relative px-10 py-5 bg-primary text-white rounded-3xl font-sans font-bold text-xs uppercase tracking-widest shadow-xl overflow-hidden active:scale-95 transition-all">
                <span className="relative z-10 flex items-center gap-3">
                  Donate Now <Coins size={16} className="group-hover/btn:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 rounded-full animate-ping" />
             </button>
             <button className="px-10 py-5 bg-white text-charcoal rounded-3xl font-sans font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-gold hover:text-white transition-all transform hover:-rotate-1 active:scale-95">
                Sponsorship Opportunities
             </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: PILLARS */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl border border-charcoal/5 bg-charcoal">
          {[
            { title: 'Education', img: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200" },
            { title: 'Faith', img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800" },
            { title: 'Connection', img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" }
          ].map((card, idx) => (
            <div key={idx} className="group relative h-[500px] md:h-[600px] overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-white/5">
              <img src={card.img} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.25] group-hover:scale-110 transition-transform duration-[2000ms]" alt={card.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 text-white z-10">
                <h4 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter">{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: MEDIA DISCOVERY HUB */}
      <section id="media" className="py-24 md:py-48 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute -top-64 -right-64 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-6 mb-24">
            <div className="space-y-4">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.8em] text-gold">Digital Community</span>
              <h2 className="font-sans text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.75] text-white">
                SHARED <br /> <span className="text-primary">MISSION</span>
              </h2>
            </div>
            <div className="max-w-md text-left lg:text-right">
               <p className="text-white/40 text-xl font-sans font-light leading-relaxed italic">
                 Get connected and be part of our digital community
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 auto-rows-[300px]">
            {/* AI Reflection Card */}
            <div className="md:col-span-2 lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-[3rem] p-10 border border-white/10 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <Sparkles size={80} className="text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-primary">Daily Intention</span>
                </div>
                <h3 className={`text-2xl md:text-4xl font-sans font-light leading-tight uppercase tracking-tighter transition-opacity duration-500 ${isAiLoading ? 'opacity-30' : 'opacity-100'}`}>
                   {aiReflection}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-charcoal bg-white/20" />)}
                </div>
                <p className="text-[10px] font-sans font-bold text-white/30 uppercase tracking-widest">Coastal Community</p>
              </div>
            </div>

            {/* Spotify Card */}
            <div 
              onClick={() => window.open('https://open.spotify.com', '_blank')}
              className="md:col-span-2 lg:col-span-3 bg-[#1DB954] rounded-[3rem] p-10 flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:shadow-[#1DB954]/20 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Mic2 size={32} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest mb-1">Spotify</p>
                  <p className="text-xs font-sans font-light text-white/70 italic">The Lamb's Path Podcast</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-sans text-4xl font-black uppercase tracking-tighter leading-none">LISTEN ON <br /> SPOTIFY</h3>
                <div className="flex items-center gap-4">
                   <div className="flex-grow h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-2/3 group-hover:w-full transition-all duration-1000" />
                   </div>
                </div>
              </div>
              <button className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.4em] hover:gap-5 transition-all">
                Open App <ArrowRight size={16} />
              </button>
            </div>

            {/* Educational Resources Card */}
            <div className="md:col-span-2 lg:col-span-3 bg-gold rounded-[3rem] p-10 flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:shadow-gold/20 transition-all">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <BookOpen size={32} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest mb-1">Resources</p>
                  <p className="text-xs font-sans font-light text-white/70 italic">Deepen your faith</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-sans text-4xl font-black uppercase tracking-tighter leading-none">EDUCATIONAL <br /> RESOURCES</h3>
              </div>
              <button className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.4em] hover:gap-5 transition-all">
                Explore Library <ArrowRight size={16} />
              </button>
            </div>

            {/* YouTube Card */}
            <div 
              onClick={() => window.open('https://www.youtube.com/@SpiritedLamb/featured', '_blank')}
              className="md:col-span-4 lg:col-span-6 row-span-2 rounded-[3.5rem] overflow-hidden relative group cursor-pointer shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover object-top grayscale brightness-[0.4] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-[0.6] transition-all duration-[1500ms]"
                alt="YouTube Channel"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-115 group-hover:bg-[#FF0000] transition-all duration-700 shadow-[0_0_50px_rgba(255,0,0,0.3)]">
                  <Play fill="white" size={48} className="translate-x-1" />
                </div>
              </div>
              <div className="absolute bottom-16 left-16 right-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                 <div className="space-y-4">
                   <span className="text-xs font-sans font-bold uppercase tracking-[0.6em] text-gold block">YouTube Channel</span>
                   <h3 className="font-sans text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">Spirited <br /> Lamb <br /> Featured</h3>
                 </div>
                 <button className="px-10 py-5 bg-white text-charcoal rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl">
                    Subscribe Now
                 </button>
              </div>
            </div>

            {/* Instagram */}
            <div className="md:col-span-4 lg:col-span-6 border-t border-white/10 pt-16 mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
               <div 
                 onClick={() => window.open('https://www.instagram.com/spirited_lamb/', '_blank')}
                 className="col-span-2 flex flex-col justify-center cursor-pointer group"
               >
                  <div className="flex items-center gap-5 mb-6">
                    <Instagram size={48} className="text-primary group-hover:scale-110 transition-transform" />
                    <h4 className="font-sans text-4xl font-black uppercase tracking-tighter">@spirited_lamb</h4>
                  </div>
                  <p className="text-white/40 text-sm font-sans font-light uppercase tracking-[0.2em] leading-relaxed max-w-sm">Connect for local stories, highlights, and community updates.</p>
               </div>
               {[
                 "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400",
                 "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400"
               ].map((img, idx) => (
                 <div key={idx} className="aspect-square rounded-[2.5rem] overflow-hidden bg-white/5 group relative cursor-pointer">
                    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="IG Preview" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <ExternalLink size={24} />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP SECTION */}
      <section id="shop" className="py-24 md:py-48 bg-background relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <div className="space-y-6">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.8em] text-primary">Limited Release</span>
              <h2 className="font-sans text-7xl md:text-[10rem] font-black text-charcoal tracking-tighter leading-[0.75] uppercase">
                THE <br /> SPIRITED <br /> <span className="text-gold">SHOP</span>
              </h2>
            </div>
            <div className="max-w-md text-right flex flex-col items-end gap-6">
               <p className="text-charcoal/50 text-xl font-sans font-light leading-relaxed italic">
                 Every purchase fuels our local community events and spiritual outreach.
               </p>
               <div className="w-24 h-1 bg-gold rounded-full" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-24">
            {SHOP_ITEMS.map((item) => (
              <div key={item.id} className="group relative flex flex-col">
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-charcoal/5 shadow-2xl transition-all duration-700 group-hover:-translate-y-4">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800`;
                    }}
                  />
                  <div className="absolute top-10 left-10">
                     <div className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg">
                        <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary">{item.category}</p>
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-white text-charcoal px-10 py-5 rounded-full font-sans font-bold text-[11px] uppercase tracking-widest shadow-2xl flex items-center gap-3 transform translate-y-6 group-hover:translate-y-0 transition-all">
                      Add to Cart <ShoppingCart size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-10 right-10 opacity-30 group-hover:opacity-70 transition-all">
                    <Logo size={64} color="#FFFFFF" />
                  </div>
                </div>
                <div className="mt-10 px-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-sans text-3xl font-black uppercase tracking-tight text-charcoal leading-none group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-sans font-bold text-2xl text-primary">{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Star size={12} className="text-gold fill-gold" />
                     <p className="text-[11px] font-sans font-bold text-charcoal/40 uppercase tracking-[0.4em]">Spirited Apparel</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Bottom Banner */}
      <div className="relative z-10 bg-charcoal py-8 overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap items-center gap-16 w-max">
            {Array.from({length: 12}).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-4xl font-sans font-black tracking-tighter uppercase text-white/90">Coastal Faith</span>
                <Heart size={32} fill="#C05A3F" className="text-primary" />
                <span className="text-4xl font-sans font-black tracking-tighter uppercase text-gold">Community Joy</span>
                <ShoppingCart size={32} className="text-white" />
              </React.Fragment>
            ))}
          </div>
      </div>

      <EventModal 
        event={selectedEvent} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </Layout>
  );
};

export default App;
