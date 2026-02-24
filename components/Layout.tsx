import React from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'media', label: 'Media' },
    { id: 'shop', label: 'Shop' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6 px-6 md:px-12 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <Logo 
              size={48} 
              variant={scrolled ? 'black' : 'white'}
            />
            <span className={`text-2xl font-black tracking-tight uppercase transition-colors ${scrolled ? 'text-charcoal' : 'text-white'}`}>Spirited Lamb</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8 mr-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`font-bold uppercase tracking-widest text-[10px] transition-colors hover:text-primary ${scrolled ? 'text-charcoal/60' : 'text-white/80'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button 
                className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg ${
                  scrolled ? 'bg-primary text-white' : 'bg-white text-charcoal'
                }`}
              >
                Join Now
              </button>
              <button 
                className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 border ${
                  scrolled 
                    ? 'border-charcoal/10 text-charcoal hover:bg-charcoal/5' 
                    : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 transition-colors ${scrolled ? 'text-charcoal' : 'text-white'}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white mt-4 mx-4 p-8 rounded-3xl space-y-6 flex flex-col items-center shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xl font-black text-charcoal hover:text-primary transition-colors uppercase tracking-widest"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo size={40} variant="white" />
              <div className="flex flex-col">
                <p className="font-black text-4xl uppercase tracking-tighter leading-none">Spirited Lamb</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mt-1">Est. 2023</p>
              </div>
            </div>
            <p className="text-white/40 max-w-xs text-sm">Authentic Catholic community for young adults in Santa Barbara & Ventura Counties.</p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Social</span>
               <span className="text-sm font-bold hover:text-primary cursor-pointer">Instagram</span>
               <span className="text-sm font-bold hover:text-primary cursor-pointer">YouTube</span>
            </div>
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Contact</span>
               <span className="text-sm font-bold hover:text-primary cursor-pointer">Email</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-[0.4em] font-black flex justify-between items-center">
            <span>&copy; {new Date().getFullYear()} Spirited Lamb</span>
            <div className="flex gap-4">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
      </footer>
    </div>
  );
};
