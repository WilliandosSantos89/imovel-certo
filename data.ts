
import { Property, User, PropertyType } from './types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', email: 'vendedor@imovel.com', password: 'password123' },
  { id: 'user-2', email: 'comprador@email.com', password: 'password123' },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    userId: 'user-1',
    title: 'Apartamento Aconchegante no Centro',
    description: 'Lindo apartamento de 2 quartos, totalmente reformado, com vista para o parque da cidade. Ideal para casais jovens e pequenas famílias. Cozinha moderna, sala de estar espaçosa e varanda ensolarada.',
    type: PropertyType.Apartment,
    price: 450000,
    area: 75,
    bedrooms: 2,
    bathrooms: 2,
    garageSpaces: 1,
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
    },
    images: [
      'https://picsum.photos/seed/prop1-1/800/600',
      'https://picsum.photos/seed/prop1-2/800/600',
      'https://picsum.photos/seed/prop1-3/800/600',
    ],
    contact: {
      name: 'Carlos Pereira',
      phone: '(11) 98765-4321',
      email: 'vendedor@imovel.com',
    },
    createdAt: new Date('2023-10-15T10:00:00Z').toISOString(),
  },
  {
    id: 'prop-2',
    userId: 'user-1',
    title: 'Casa Espaçosa com Piscina e Jardim',
    description: 'Casa de alto padrão em condomínio fechado. Possui 4 suítes, ampla área de lazer com piscina, churrasqueira e um lindo jardim. Segurança 24 horas e tranquilidade para sua família.',
    type: PropertyType.House,
    price: 1200000,
    area: 320,
    bedrooms: 4,
    bathrooms: 5,
    garageSpaces: 4,
    address: {
      street: 'Avenida do Sol, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000',
    },
    images: [
      'https://picsum.photos/seed/prop2-1/800/600',
      'https://picsum.photos/seed/prop2-2/800/600',
      'https://picsum.photos/seed/prop2-3/800/600',
    ],
    contact: {
      name: 'Carlos Pereira',
      phone: '(21) 91234-5678',
      email: 'vendedor@imovel.com',
    },
    createdAt: new Date('2023-11-01T14:30:00Z').toISOString(),
  },
  {
    id: 'prop-3',
    userId: 'user-2',
    title: 'Terreno Amplo em Área de Crescimento',
    description: 'Excelente terreno plano com 1000m², localizado em uma nova área de desenvolvimento urbano. Perfeito para construir a casa dos seus sonhos ou para investimento. Documentação em dia.',
    type: PropertyType.Land,
    price: 250000,
    area: 1000,
    address: {
      street: 'Estrada da Esperança, Lote 7',
      city: 'Curitiba',
      state: 'PR',
      zipCode: '80000-000',
    },
    images: [
      'https://picsum.photos/seed/prop3-1/800/600',
    ],
    contact: {
      name: 'Ana Costa',
      phone: '(41) 99999-8888',
      email: 'comprador@email.com',
    },
    createdAt: new Date('2023-11-20T09:00:00Z').toISOString(),
  },
   {
    id: 'prop-4',
    userId: 'user-2',
    title: 'Casa Moderna com Vista para o Mar',
    description: 'Casa com design arrojado, 3 suítes e uma incrível vista panorâmica para o mar. Acabamentos de primeira linha, conceito aberto integrando sala, cozinha e área externa. Piscina com borda infinita.',
    type: PropertyType.House,
    price: 2500000,
    area: 400,
    bedrooms: 3,
    bathrooms: 4,
    garageSpaces: 3,
    address: {
      street: 'Rua da Vista Linda, 789',
      city: 'Florianópolis',
      state: 'SC',
      zipCode: '88000-000',
    },
    images: [
      'https://picsum.photos/seed/prop4-1/800/600',
      'https://picsum.photos/seed/prop4-2/800/600',
      'https://picsum.photos/seed/prop4-3/800/600',
    ],
    contact: {
      name: 'Ana Costa',
      phone: '(48) 98877-6655',
      email: 'comprador@email.com',
    },
    createdAt: new Date('2024-01-10T11:00:00Z').toISOString(),
  },
];
