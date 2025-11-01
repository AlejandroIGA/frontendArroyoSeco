import React, { useState, useEffect, useRef } from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonAlert,
} from '@ionic/react';
import { cameraOutline, closeCircle } from 'ionicons/icons';

// Define el número máximo de imágenes permitido
const MAX_IMAGES = 5; 

// Valores iniciales (se mantiene igual)
const initialFormData = {
    name: '',
    pricePerNight: 0.0,
    type: '',
    numberOfGuests: 1,
    kidsAllowed: false,
    petsAllowed: false,
    showProperty: false,
    location: { address: '' },
    description: { fullDescription: '' },
    imagen: [], 
};

const PropertyFormModal = ({ isOpen, onClose, onSave, propertyData }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);

    // ... (Lógica de useEffect, handleChange, handleFileSelect, etc. - SE MANTIENE IGUAL)
    useEffect(() => {
        if (propertyData) {
            setFormData({
                id: propertyData.id,
                name: propertyData.name || '',
                pricePerNight: propertyData.pricePerNight || 0.0,
                type: propertyData.type || '',
                numberOfGuests: propertyData.numberOfGuests || 1,
                kidsAllowed: propertyData.kidsAllowed || false,
                petsAllowed: propertyData.petsAllowed || false,
                showProperty: propertyData.showProperty || false,
                location: propertyData.location || { address: '' },
                description: propertyData.description || { fullDescription: '' },
                imagen: propertyData.imagen || [], 
            });
            setSelectedFiles([]); 
        } else {
            setFormData(initialFormData);
            setSelectedFiles([]); 
        }
    }, [propertyData, isOpen]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' || type === 'toggle' ? checked : value
        }));
    };

    const handleLocationChange = (e) => {
        setFormData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                address: e.detail.value
            }
        }));
    };

    const handleDescriptionChange = (e) => {
        setFormData(prev => ({
            ...prev,
            description: {
                ...prev.description,
                fullDescription: e.detail.value
            }
        }));
    };
    
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const totalFiles = [...selectedFiles, ...files];
        
        if (totalFiles.length > MAX_IMAGES) {
            const filesToAdd = MAX_IMAGES - selectedFiles.length;
            setSelectedFiles(prevFiles => [
                ...prevFiles, 
                ...files.slice(0, filesToAdd)
            ]);
            setShowAlert(true); 
        } else {
            setSelectedFiles(totalFiles);
        }
        
        e.target.value = null; 
    };

    const handleRemoveFile = (indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedFiles.length === 0 && !propertyData) {
            alert(`Debes subir al menos 1 fotografía para la propiedad. Máximo ${MAX_IMAGES} fotos.`);
            return;
        }

        const dataToSave = {
            ...formData,
            newImages: selectedFiles,
        };

        onSave(dataToSave);
    };

    const modalTitle = propertyData ? 'Editar Propiedad: ' + propertyData.name : 'Registrar Nueva Propiedad';
    const propertyTypes = ['Casa', 'Apartamento', 'Cabaña', 'Estudio', 'Habitación'];


    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{modalTitle}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose} color="danger">Cerrar</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form onSubmit={handleSubmit}>
                    <IonGrid>
                        
                        {/* 1. INFORMACIÓN BÁSICA (Sin negritas en h2, sin clase ion-text-bold en IonLabel) */}
                        <h2 className="ion-margin-top ion-margin-bottom">Información General</h2>
                        
                        <IonRow>
                            <IonCol size="12">
                                <IonItem lines="full" className="ion-margin-bottom"> 
                                    <IonLabel position="stacked">Nombre del Alojamiento</IonLabel>
                                    <IonInput 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onIonChange={handleChange} 
                                        required 
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        {/* Fila 2: Precio y Huéspedes */}
                        <IonRow>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Precio por Noche ($)</IonLabel>
                                    <IonInput 
                                        type="number" 
                                        name="pricePerNight" 
                                        value={formData.pricePerNight} 
                                        onIonChange={handleChange} 
                                        min="0.01"
                                        step="0.01"
                                        required
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Máximo Huéspedes</IonLabel>
                                    <IonInput 
                                        type="number" 
                                        name="numberOfGuests" 
                                        value={formData.numberOfGuests} 
                                        onIonChange={handleChange} 
                                        min="1" 
                                        required
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        
                        {/* Fila 3: Tipo */}
                        <IonRow>
                            <IonCol size="12">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel>Tipo de Propiedad</IonLabel>
                                    <IonSelect 
                                        name="type" 
                                        value={formData.type} 
                                        onIonChange={handleChange} 
                                        placeholder="Selecciona uno"
                                        required
                                    >
                                        {propertyTypes.map(type => (
                                            <IonSelectOption key={type} value={type}>{type}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        {/* 2. IMÁGENES */}
                        <h2 className="ion-margin-top ion-margin-bottom">Imágenes del Alojamiento</h2>

                        <IonRow>
                            <IonCol size="12">
                                <p className="ion-no-margin">
                                    {/* NEGRITAS APLICADAS AQUÍ */}
                                    Sube <strong>entre 1 y {MAX_IMAGES} fotos</strong> para tu propiedad.
                                </p>
                                <p className="ion-text-end ion-margin-top">
                                    {/* NEGRITAS APLICADAS AQUÍ */}
                                    <strong>{selectedFiles.length}</strong> de <strong>{MAX_IMAGES}</strong> fotos seleccionadas
                                </p>
                                
                                {/* Input de archivo oculto (se mantiene igual) */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }}
                                    disabled={selectedFiles.length >= MAX_IMAGES}
                                />

                                {/* Botón visible que dispara el click del input oculto (se mantiene igual) */}
                                <IonButton 
                                    expand="block" 
                                    fill="outline" 
                                    onClick={() => fileInputRef.current.click()}
                                    disabled={selectedFiles.length >= MAX_IMAGES}
                                    className="ion-margin-bottom"
                                >
                                    <IonIcon slot="start" icon={cameraOutline} />
                                    {selectedFiles.length === 0 ? 'Seleccionar Fotos' : 'Añadir Más Fotos'}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        
                        {/* Previsualización de Imágenes (se mantiene igual) */}
                        {selectedFiles.length > 0 && (
                            <IonRow className="ion-margin-bottom">
                                {selectedFiles.map((file, index) => (
                                    <IonCol size="6" size-md="4" key={index} className="ion-padding-bottom">
                                        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden' }}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <IonButton 
                                                size="small" 
                                                color="danger" 
                                                onClick={() => handleRemoveFile(index)} 
                                                style={{ position: 'absolute', top: '5px', right: '5px' }}
                                            >
                                                <IonIcon icon={closeCircle} />
                                            </IonButton>
                                        </div>
                                        <p className="ion-text-center ion-text-wrap ion-no-margin" style={{ fontSize: '10px' }}>
                                            {file.name}
                                        </p>
                                    </IonCol>
                                ))}
                            </IonRow>
                        )}


                        {/* 3. DESCRIPCIÓN Y UBICACIÓN */}
                        <h2 className="ion-margin-top ion-margin-bottom">Detalles y Ubicación</h2>

                        <IonRow>
                            <IonCol size="12">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Dirección (Ubicación)</IonLabel>
                                    <IonTextarea
                                        name="location"
                                        value={formData.location.address}
                                        onIonChange={handleLocationChange}
                                        rows={2}
                                        required
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        
                        {/* Fila 5: Descripción */}
                        <IonRow>
                            <IonCol size="12">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Descripción Completa</IonLabel>
                                    <IonTextarea
                                        name="description"
                                        value={formData.description.fullDescription}
                                        onIonChange={handleDescriptionChange}
                                        rows={4}
                                        required
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        {/* 4. CARACTERÍSTICAS Y ESTATUS */}
                        <h2 className="ion-margin-top ion-margin-bottom">Reglas y Publicación</h2>

                        <IonRow>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel>Permitir Niños</IonLabel>
                                    <IonToggle 
                                        name="kidsAllowed" 
                                        checked={formData.kidsAllowed} 
                                        onIonChange={handleChange}
                                        slot="end"
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel>Permitir Mascotas</IonLabel>
                                    <IonToggle 
                                        name="petsAllowed" 
                                        checked={formData.petsAllowed} 
                                        onIonChange={handleChange}
                                        slot="end"
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        {/* Fila 7: Estatus */}
                        <IonRow>
                            <IonCol size="12">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel>Visible para el Público (Publicar)</IonLabel>
                                    <IonToggle 
                                        name="showProperty" 
                                        checked={formData.showProperty} 
                                        onIonChange={handleChange}
                                        slot="end"
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        
                    </IonGrid>
                    
                    {/* Botón de Guardar */}
                    <IonButton 
                        expand="block" 
                        type="submit" 
                        className="ion-margin-top ion-padding-vertical"
                    >
                        {propertyData ? 'Guardar Cambios' : 'Registrar Propiedad'}
                    </IonButton>
                </form>
            </IonContent>
            
            {/* Alerta de Límite de Fotos */}
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Límite de Fotos Alcanzado'}
                message={`Solo puedes subir un máximo de ${MAX_IMAGES} fotos por propiedad.`}
                buttons={['OK']}
            />
        </IonModal>
    );
};

export default PropertyFormModal;