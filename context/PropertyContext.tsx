
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Property } from '../types';
import { MOCK_PROPERTIES } from '../data';

interface PropertyContextType {
  properties: Property[];
  getProperties: () => Property[];
  getPropertyById: (id: string) => Property | undefined;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => Property;
  updateProperty: (id: string, updatedProperty: Partial<Property>) => Property | null;
  deleteProperty: (id:string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);

  const getProperties = () => {
    return properties;
  };

  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
        ...propertyData,
        id: `prop-${Date.now()}`,
        createdAt: new Date().toISOString(),
    };
    setProperties(prev => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id: string, updatedData: Partial<Property>) => {
    let updatedProperty: Property | null = null;
    setProperties(prev => prev.map(p => {
        if (p.id === id) {
            updatedProperty = { ...p, ...updatedData };
            return updatedProperty;
        }
        return p;
    }));
    return updatedProperty;
  };
  
  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };


  return (
    <PropertyContext.Provider value={{ properties, getProperties, getPropertyById, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
