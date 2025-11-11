
export enum PropertyType {
  Land = 'terreno',
  House = 'casa',
  Apartment = 'apartamento',
}

export interface Property {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  area: number; // in square meters
  bedrooms?: number;
  bathrooms?: number;
  garageSpaces?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  images: string[]; // URLs or base64 strings
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password?: string; // Should not be stored in client-side state in a real app
}
