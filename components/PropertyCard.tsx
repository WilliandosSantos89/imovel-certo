
import React from 'react';
import { Link } from 'react-router-dom';
import { Property, PropertyType } from '../types';
import { formatCurrency } from '../utils';

interface PropertyCardProps {
  property: Property;
}

const PropertyTypeLabel: Record<PropertyType, { label: string; icon: string; color: string }> = {
  [PropertyType.Apartment]: { label: 'Apartamento', icon: 'fa-building', color: 'bg-blue-500' },
  [PropertyType.House]: { label: 'Casa', icon: 'fa-house-chimney', color: 'bg-green-500' },
  [PropertyType.Land]: { label: 'Terreno', icon: 'fa-map-marked-alt', color: 'bg-yellow-500' },
};


const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { label, icon, color } = PropertyTypeLabel[property.type];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <div className="relative">
        <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
        <div className={`absolute top-2 right-2 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${color}`}>
            <i className={`fas ${icon}`}></i>
            <span>{label}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-primary truncate">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
            <i className="fas fa-map-marker-alt"></i>
            {property.address.city}, {property.address.state}
        </p>
        <div className="text-2xl font-extrabold text-secondary mb-4">
            {formatCurrency(property.price)}
        </div>
        <div className="flex justify-around text-center text-sm text-gray-600 border-t pt-3 mt-auto">
            <div className="flex items-center gap-2"><i className="fas fa-ruler-combined text-accent"></i><span>{property.area} m²</span></div>
            {property.bedrooms && <div className="flex items-center gap-2"><i className="fas fa-bed text-accent"></i><span>{property.bedrooms}</span></div>}
            {property.bathrooms && <div className="flex items-center gap-2"><i className="fas fa-bath text-accent"></i><span>{property.bathrooms}</span></div>}
        </div>
      </div>
       <Link to={`/property/${property.id}`} className="block bg-primary text-white text-center font-bold py-3 hover:bg-blue-800 transition-colors">
            Ver Detalhes
        </Link>
    </div>
  );
};

export default PropertyCard;
