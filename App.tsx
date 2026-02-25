import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { EventModal } from './components/EventModal';
import { Event, County, EventType } from './types';
import { SEED_EVENTS, SHOP_ITEMS } from './constants';
import { ArrowRight, Heart, Handshake, BookOpen, Play, Instagram, Mic2, ExternalLink, ShoppingCart, Sparkles, Star, Sun, Coins } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { Logo } from './components/Logo';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      {/* SECTION 1: HERO */}
      <section id="hero" className="relative h-screen flex flex-col justify-center bg-charcoal overflow-hidden pt-32">
        <div className="absolute inset-0 z-0 bg-charcoal">
          {HERO_IMAGES.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-[2000ms] ${idx === activeMediaIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={img.url} className={`w-full h-full object-cover brightness-[0.4] transition-transform duration-[4000ms] ${idx === activeMediaIndex ? 'scale-110' : 'scale-100'}`} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/30 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col justify-center h-full pb-32">
          <div className="max-w-4xl space-y-8 -mt-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary">Est. 2023</span>
            </div>
            <h1 className="font-black text-5xl md:text-8xl leading-[1.1] uppercase tracking-tighter text-white">
              Ignite your <br /> <span className="text-white">faith,</span> <br /> <span className="text-primary">Build bonds</span>
            </h1>
            <h2 className="text-white/90 text-lg md:text-xl max-w-xl border-l-4 border-primary pl-6">
              Your home for a faith in Catholic community
            </h2>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => scrollToSection('events')} className="px-10 py-5 bg-white text-charcoal rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-2xl">
                Join the Mission <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollToSection('events')} className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Explore Events
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling Banner */}
        <div className="absolute bottom-0 left-0 w-full z-30 bg-primary py-4 overflow-hidden shadow-2xl">
          <div className="flex animate-scroll whitespace-nowrap items-center gap-24 w-max">
            {Array.from({length: 10}).map((_, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-6">
                  <Heart size={28} fill="white" className="text-white" />
                  <span className="text-3xl font-black tracking-[0.15em] uppercase text-white">Faith.</span>
                </div>
                <div className="flex items-center gap-6">
                  <Handshake size={28} className="text-white" />
                  <span className="text-3xl font-black tracking-[0.15em] uppercase text-white">Friends.</span>
                </div>
                <div className="flex items-center gap-6">
                  <Sun size={28} className="text-white" />
                  <span className="text-3xl font-black tracking-[0.15em] uppercase text-white">Fellowship.</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: CALENDAR */}
      <section id="events" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <span className="text-gold font-bold uppercase tracking-[0.6em] text-[11px]">Local Pulse</span>
            <h2 className="text-6xl md:text-8xl font-black text-charcoal tracking-tighter uppercase leading-none mt-4">Calendar</h2>
          </div>
          <div className="flex flex-wrap gap-2 bg-charcoal/5 p-2 rounded-[2rem]">
            {['All', 'Spiritual', 'Action', 'Connection'].map(t => (
              <button key={t} onClick={() => setActiveType(t as any)} className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeType === t ? 'bg-primary text-white shadow-xl' : 'text-charcoal/40 hover:text-charcoal'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div key={event.id} onClick={() => openEvent(event)} className="group bg-white p-10 rounded-[3rem] shadow-xl border border-charcoal/5 hover:-translate-y-2 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-8">
                <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{event.type}</div>
                <span className="text-charcoal/20 font-black text-xl">0{event.id}</span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
              <p className="text-charcoal/40 text-sm font-bold uppercase tracking-widest mb-8">{format(event.start, 'EEEE, MMM do')}</p>
              <button className="w-full py-4 bg-charcoal text-white rounded-2xl font-bold text-xs uppercase tracking-widest group-hover:bg-primary transition-colors">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PARTNER */}
      <section className="bg-charcoal py-20 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Local <span className="text-primary">Partners</span></h2>
          <div className="flex gap-6">
            <button className="px-10 py-5 bg-primary text-white rounded-3xl font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Donate Now</button>
            <button className="px-10 py-5 bg-white text-charcoal rounded-3xl font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Sponsorship</button>
          </div>
        </div>
      </section>

      {/* SECTION 4: PILLARS */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-[4rem] overflow-hidden bg-charcoal p-4 shadow-2xl">
          {[
            { title: 'Education', img: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800" },
            { title: 'Faith', img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800" },
            { title: 'Connection', img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" }
          ].map((card, idx) => (
            <div key={idx} className="group relative h-[600px] overflow-hidden rounded-[3rem] cursor-pointer">
              <img src={card.img} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3] group-hover:scale-110 transition-transform duration-[2000ms]" alt={card.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 text-white z-10">
                <h4 className="text-5xl font-black uppercase tracking-tighter">{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: MEDIA */}
      <section id="media" className="py-32 bg-charcoal text-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-24">
            <span className="text-gold font-bold uppercase tracking-[0.8em] text-[11px]">Digital Community</span>
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.75] mt-6">SHARED <br /> <span className="text-primary">MISSION</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => window.open('https://open.spotify.com')} className="bg-[#1DB954] rounded-[3rem] p-12 flex flex-col justify-between h-[450px] cursor-pointer hover:shadow-2xl transition-all">
              <Mic2 size={48} />
              <div>
                <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">Listen on <br /> Spotify</h3>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">The Lamb's Path Podcast</p>
              </div>
            </div>
            <div onClick={() => window.open('https://youtube.com')} className="bg-[#FF0000] rounded-[3rem] p-12 flex flex-col justify-between h-[450px] cursor-pointer hover:shadow-2xl transition-all">
              <Play size={48} fill="white" />
              <div>
                <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">YouTube <br /> Channel</h3>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Featured Content</p>
              </div>
            </div>
            <div onClick={() => window.open('https://instagram.com')} className="bg-white/5 border border-white/10 rounded-[3rem] p-12 flex flex-col justify-between h-[450px] cursor-pointer hover:shadow-2xl transition-all">
              <Instagram size={48} className="text-primary" />
              <div>
                <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">@spirited_lamb</h3>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Daily Highlights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: SHOP */}
      <section id="shop" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.8em] text-primary">Limited Release</span>
            <h2 className="text-7xl md:text-[10rem] font-black text-charcoal tracking-tighter leading-[0.75] uppercase">THE <br /> SPIRITED <br /> <span className="text-gold">SHOP</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {SHOP_ITEMS.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden bg-charcoal/5 shadow-2xl transition-all duration-700 group-hover:-translate-y-4">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-charcoal px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3">Add to Cart <ShoppingCart size={16} /></button>
                </div>
              </div>
              <div className="mt-10 flex justify-between items-center px-6">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-charcoal">{item.name}</h3>
                <span className="text-3xl font-bold text-primary">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
};

export default App;
