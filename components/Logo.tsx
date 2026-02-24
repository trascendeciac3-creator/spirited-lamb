import React from 'react';

interface LogoProps {
  size?: number;
  variant?: 'white' | 'black';
}

export const Logo: React.FC<LogoProps> = ({ size = 40, variant = 'white' }) => {
  const whiteLogo = "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/logo%20white.png";
  const blackLogo = "https://mlptyjrdcsxoojvszlbn.supabase.co/storage/v1/object/public/SLWeb/logo%20black.png";
  const logoUrl = variant === 'black' ? blackLogo : whiteLogo;

  return (
    <img 
      src={logoUrl} 
      alt="Spirited Lamb Logo" 
      width={size} 
      height={size} 
      className="object-contain"
    />
  );
};
