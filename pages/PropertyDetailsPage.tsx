
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { formatCurrency } from '../utils';
import { PropertyType } from '../types';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperties();
  const property = getPropertyById(id || '');

  const [mainImage, setMainImage] = useState(property?.images[0]);

  if (!property) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Imóvel não encontrado.</h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">Voltar para a página inicial</Link>
      </div>
    );
  }
  
  const shareOnWhatsApp = () => {
    const message = `Olá! Tenho interesse neste imóvel: ${property.title}. Link: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const propertyTypeLabels: Record<PropertyType, string> = {
    [PropertyType.Apartment]: 'Apartamento',
    [PropertyType.House]: 'Casa',
    [PropertyType.Land]: 'Terreno',
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div>
            <img src={mainImage} alt={property.title} className="w-full h-96 object-cover rounded-lg shadow-md mb-4" />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${property.title} - view ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer border-4 ${mainImage === img ? 'border-primary' : 'border-transparent'} hover:border-primary/50 transition`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Price and Contact */}
          <div className="bg-light p-6 rounded-lg border border-gray-200">
             <span className="text-sm bg-accent text-white px-3 py-1 rounded-full font-semibold">{propertyTypeLabels[property.type]}</span>
            <h1 className="text-3xl font-bold text-primary mt-2">{property.title}</h1>
            <p className="text-gray-500 mb-4"><i className="fas fa-map-marker-alt mr-2"></i>{property.address.city}, {property.address.state}</p>
            <p className="text-4xl font-extrabold text-secondary mb-6">{formatCurrency(property.price)}</p>
            
            <h3 className="font-bold text-lg mb-2 border-b pb-2">Informações do Anunciante</h3>
            <p className="flex items-center gap-2"><i className="fas fa-user"></i> {property.contact.name}</p>
            <p className="flex items-center gap-2"><i className="fas fa-phone"></i> {property.contact.phone}</p>
            <p className="flex items-center gap-2"><i className="fas fa-envelope"></i> {property.contact.email}</p>
            
            <button onClick={shareOnWhatsApp} className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
              <i className="fab fa-whatsapp"></i>
              Compartilhar no WhatsApp
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t">
        {/* Details and Description */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
            <div className="bg-light p-4 rounded-lg"><p className="font-bold text-xl">{property.area} m²</p><p className="text-gray-600">Área</p></div>
            {property.bedrooms && <div className="bg-light p-4 rounded-lg"><p className="font-bold text-xl">{property.bedrooms}</p><p className="text-gray-600">Quartos</p></div>}
            {property.bathrooms && <div className="bg-light p-4 rounded-lg"><p className="font-bold text-xl">{property.bathrooms}</p><p className="text-gray-600">Banheiros</p></div>}
            {property.garageSpaces && <div className="bg-light p-4 rounded-lg"><p className="font-bold text-xl">{property.garageSpaces}</p><p className="text-gray-600">Vagas</p></div>}
        </div>

        <h2 className="text-2xl font-bold text-primary mb-4">Descrição</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
      </div>

      <div className="mt-8 pt-8 border-t">
        <h2 className="text-2xl font-bold text-primary mb-4">Localização</h2>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
             <img 
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${property.address.street},%20${property.address.city}&zoom=15&size=800x400&markers=color:red%7C${property.address.street},%20${property.address.city}&key=YOUR_API_KEY_HERE`} 
                alt="Mapa da localização" 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <p className="text-white text-center p-4">Visualização do mapa requer uma chave de API do Google Maps.</p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
