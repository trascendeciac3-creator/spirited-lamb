import { Event, ShopItem } from './types';

export const SEED_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Beach Rosary & Sunrise',
    description: 'Gather for a morning Rosary on the sand at San Buenaventura State Beach, followed by coffee and fellowship.',
    start: new Date(new Date().setHours(7, 0, 0, 0)),
    end: new Date(new Date().setHours(9, 0, 0, 0)),
    parishName: 'San Buenaventura State Beach',
    address: '901 San Pedro St',
    city: 'Ventura',
    county: 'Ventura',
    lat: 34.2721,
    lng: -119.2801,
    tags: ['Rosary', 'Beach', 'Prayer'],
    type: 'Spiritual',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Coastal Theology on Tap',
    description: 'Deep dive into Catholic Social Teaching over local craft beers. All coastal young adults welcome.',
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
    parishName: 'Transmission Brewing',
    address: '1098 E Front St',
    city: 'Ventura',
    county: 'Ventura',
    lat: 34.2798,
    lng: -119.2861,
    tags: ['Talk', 'Social', 'Theology'],
    type: 'Connection',
    imageUrl: 'https://images.unsplash.com/photo-1514525253344-f814d874591a?auto=format&fit=crop&q=80&w=800'
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 's1',
    name: 'Signature Lamb Hoodie',
    price: '$55',
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's4',
    name: 'Unity Cotton Tee',
    price: '$32',
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'
  }
];
