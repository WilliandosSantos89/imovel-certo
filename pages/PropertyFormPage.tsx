import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { Property, PropertyType } from '../types';
import { fileToBase64 } from '../utils';

const PropertyFormPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const { user } = useAuth();
    const { addProperty, updateProperty, getPropertyById } = useProperties();

    const [isEditMode, setIsEditMode] = useState(false);
    const [propertyData, setPropertyData] = useState<Omit<Property, 'id' | 'createdAt' | 'userId'>>({
        title: '',
        description: '',
        type: PropertyType.House,
        price: 0,
        area: 0,
        bedrooms: 0,
        bathrooms: 0,
        garageSpaces: 0,
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
        images: [],
        contact: {
            name: user?.email.split('@')[0] || '',
            phone: '',
            email: user?.email || '',
        },
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    useEffect(() => {
        if (id) {
            const existingProperty = getPropertyById(id);
            if (existingProperty && existingProperty.userId === user?.id) {
                setIsEditMode(true);
                const { id: propId, createdAt, userId, ...editableData } = existingProperty;
                setPropertyData(editableData);
            } else {
                navigate('/dashboard'); // Redirect if not found or not owner
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, user, navigate]);

    const handleChange = <T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,>(e: React.ChangeEvent<T>) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setPropertyData(prev => ({ ...prev, address: { ...prev.address, [field]: value } }));
        } else if (name.startsWith('contact.')) {
             const field = name.split('.')[1];
            setPropertyData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
        } else {
            // FIX: Handle numeric inputs correctly.
            const numericFields = ['price', 'area', 'bedrooms', 'bathrooms', 'garageSpaces'];
            if (numericFields.includes(name)) {
                setPropertyData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
            } else {
                setPropertyData(prev => ({ ...prev, [name]: value }));
            }
        }
    };
    
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setImageFiles(files); // Store files for preview if needed
        // FIX: Cast file to File type to resolve type inference issue.
        const base64Images = await Promise.all(files.map(file => fileToBase64(file as File)));
        setPropertyData(prev => ({ ...prev, images: [...prev.images, ...base64Images] }));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (isEditMode && id) {
            updateProperty(id, propertyData);
        } else {
            addProperty({ ...propertyData, userId: user.id });
        }
        navigate('/dashboard');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-primary mb-6">{isEditMode ? 'Editar Anúncio' : 'Criar Novo Anúncio'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md">
                    <legend className="px-2 font-semibold">Informações Básicas</legend>
                    <div className="md:col-span-2">
                        <label className="block font-medium">Título do Anúncio</label>
                        <input type="text" name="title" value={propertyData.title} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block font-medium">Descrição</label>
                        <textarea name="description" value={propertyData.description} onChange={handleChange} rows={5} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block font-medium">Tipo</label>
                        <select name="type" value={propertyData.type} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
                            <option value={PropertyType.House}>Casa</option>
                            <option value={PropertyType.Apartment}>Apartamento</option>
                            <option value={PropertyType.Land}>Terreno</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Preço (R$)</label>
                        <input type="number" name="price" value={propertyData.price} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                     <div>
                        <label className="block font-medium">Área (m²)</label>
                        <input type="number" name="area" value={propertyData.area} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                </fieldset>
                
                {/* Details */}
                {propertyData.type !== PropertyType.Land && (
                 <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-md">
                    <legend className="px-2 font-semibold">Detalhes do Imóvel</legend>
                    <div>
                        <label className="block font-medium">Quartos</label>
                        <input type="number" name="bedrooms" value={propertyData.bedrooms} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                     <div>
                        <label className="block font-medium">Banheiros</label>
                        <input type="number" name="bathrooms" value={propertyData.bathrooms} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block font-medium">Vagas na Garagem</label>
                        <input type="number" name="garageSpaces" value={propertyData.garageSpaces} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                </fieldset>
                )}

                {/* Address */}
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md">
                   <legend className="px-2 font-semibold">Endereço</legend>
                   <div className="md:col-span-2">
                        <label className="block font-medium">Rua / Logradouro</label>
                        <input type="text" name="address.street" value={propertyData.address.street} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block font-medium">Cidade</label>
                        <input type="text" name="address.city" value={propertyData.address.city} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                     <div>
                        <label className="block font-medium">Estado</label>
                        <input type="text" name="address.state" value={propertyData.address.state} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                </fieldset>

                 {/* Images */}
                <fieldset className="p-4 border rounded-md">
                    <legend className="px-2 font-semibold">Imagens</legend>
                    <label className="block font-medium">Adicionar Imagens</label>
                    <input type="file" onChange={handleImageChange} multiple accept="image/*" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                     <div className="mt-4 flex gap-4 flex-wrap">
                        {propertyData.images.map((img, index) => (
                          <img key={index} src={img} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
                        ))}
                     </div>
                </fieldset>

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="px-6 py-2 bg-secondary text-white font-bold rounded-md hover:bg-emerald-600 transition-colors">
                        {isEditMode ? 'Salvar Alterações' : 'Publicar Anúncio'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PropertyFormPage;
