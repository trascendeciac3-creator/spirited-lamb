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
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6 px-6 md:px-12 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <Logo size={48} variant={scrolled ? 'black' : 'white'} />
            <span className={`text-2xl font-extrabold tracking-tight uppercase transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>Spirited Lamb</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`font-bold uppercase tracking-widest text-[10px] transition-colors hover:text-primary ${scrolled ? 'text-black/60' : 'text-white/80'}`}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 ${scrolled ? 'text-black' : 'text-white'}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white mt-4 mx-4 p-8 rounded-3xl space-y-6 flex flex-col items-center shadow-2xl">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-xl font-black text-black hover:text-primary transition-colors uppercase tracking-widest">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-black text-white py-16 px-6">
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
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-[0.4em] font-black flex justify-between">
          <span>&copy; {new Date().getFullYear()} Spirited Lamb</span>
        </div>
      </footer>
    </div>
  );
};
