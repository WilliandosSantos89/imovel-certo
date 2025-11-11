
import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { Property, PropertyType } from '../types';

const HomePage: React.FC = () => {
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
  const [areaRange, setAreaRange] = useState({ min: 0, max: 2000 });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const searchMatch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.address.city.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = propertyType === 'all' || property.type === propertyType;
      const priceMatch = property.price >= priceRange.min && property.price <= priceRange.max;
      const areaMatch = property.area >= areaRange.min && property.area <= areaRange.max;
      return searchMatch && typeMatch && priceMatch && areaMatch;
    });
  }, [properties, searchTerm, propertyType, priceRange, areaRange]);

  const uniqueCities = useMemo(() => [...new Set(properties.map(p => p.address.city))], [properties]);

  return (
    <div className="space-y-8">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-primary mb-2">Encontre o Imóvel dos Seus Sonhos</h1>
        <p className="text-lg text-gray-600">Explore nossa seleção de imóveis e encontre o lugar perfeito para você.</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md sticky top-[81px] z-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <input
              type="text"
              placeholder="Busque por título, cidade ou bairro..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Imóvel</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType | 'all')}
            >
              <option value="all">Todos</option>
              <option value={PropertyType.Apartment}>Apartamento</option>
              <option value={PropertyType.House}>Casa</option>
              <option value={PropertyType.Land}>Terreno</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (Máx: R$ {priceRange.max.toLocaleString('pt-BR')})</label>
            <input
              type="range"
              min="0"
              max="5000000"
              step="10000"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área (Máx: {areaRange.max} m²)</label>
            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              value={areaRange.max}
              onChange={(e) => setAreaRange({ ...areaRange, max: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-500">Nenhum imóvel encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
