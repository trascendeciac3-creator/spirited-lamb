export type County = 'Ventura' | 'Santa Barbara';
export type EventType = 'Spiritual' | 'Action' | 'Connection';

export interface Event {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  parishName: string;
  address: string;
  city: string;
  county: County;
  lat: number;
  lng: number;
  tags: string[];
  type: EventType;
  imageUrl?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: 'Apparel' | 'Home' | 'Accessories';
}
