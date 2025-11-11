
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { properties, deleteProperty } = useProperties();

  const userProperties = properties.filter(p => p.userId === user?.id);
  
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.')) {
      deleteProperty(id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Meus Anúncios</h1>
        <Link to="/new-property" className="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <i className="fas fa-plus-circle"></i>
          Novo Anúncio
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {userProperties.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {userProperties.map(property => (
              <div key={property.id} className="p-4 flex flex-col md:flex-row items-center gap-4 hover:bg-light/50 transition-colors">
                <img src={property.images[0]} alt={property.title} className="w-32 h-20 object-cover rounded-md" />
                <div className="flex-grow text-center md:text-left">
                  <Link to={`/property/${property.id}`} className="font-bold text-lg text-primary hover:underline">{property.title}</Link>
                  <p className="text-gray-600">{property.address.city}, {property.address.state}</p>
                  <p className="text-secondary font-semibold">{formatCurrency(property.price)}</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Link to={`/edit-property/${property.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors">
                    <i className="fas fa-edit mr-1"></i> Editar
                  </Link>
                  <button onClick={() => handleDelete(property.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors">
                    <i className="fas fa-trash mr-1"></i> Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-xl text-gray-500">Você ainda não tem nenhum anúncio.</p>
            <Link to="/new-property" className="mt-4 inline-block text-secondary font-bold hover:underline">
              Crie seu primeiro anúncio agora!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
