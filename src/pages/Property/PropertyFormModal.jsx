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
    IonSpinner,
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
    location: {
        calle: '',
        colonia: '',
        numero: '',
        codigoPostal: ''
    },
    description: {
        general: '',
        internet: false,
        camasIndividuales: 0,
        camasMatrimoniales: 0,
        lavado: false
    },
    imagen: [],
};

const PropertyFormModal = ({ isOpen, onClose, onSave, propertyData }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const parseMapValues = (mapObject) => {
        if (!mapObject) return {};
        const newMap = {};
        for (const key in mapObject) {
            try {
                newMap[key] = JSON.parse(mapObject[key]);
            } catch (e) {
                newMap[key] = mapObject[key];
            }
        }
        return newMap;
    };

    const uploadImage = async (file) => {
        const CLOUD_NAME = "drnbqdbp4";
        const UPLOAD_PRESET = "arroyoSeco";
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', UPLOAD_PRESET);

        try {
            const response = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: data,
            });
            const responseData = await response.json();

            return responseData.secure_url;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (propertyData) {
            const parsedLocation = parseMapValues(propertyData.location);
            const parsedDescription = parseMapValues(propertyData.description);
            setFormData({
                id: propertyData.id,
                name: propertyData.name || '',
                pricePerNight: propertyData.pricePerNight || 0.0,
                type: propertyData.type || '',
                numberOfGuests: propertyData.numberOfGuests || 1,
                kidsAllowed: propertyData.kidsAllowed || false,
                petsAllowed: propertyData.petsAllowed || false,
                showProperty: propertyData.showProperty || false,
                location: parsedLocation,
                description: parsedDescription,
                imagen: propertyData.imagen || [],
            });
            setSelectedFiles([]);
        } else {
            setFormData(initialFormData);
            setSelectedFiles([]);
        }
    }, [propertyData, isOpen]);

    const handleNestedChange = (e) => {
        const name = e.target.name;
        const parent = e.target.dataset.parent;

        const detail = e.detail;
        let value;

        if (detail.checked !== undefined) {
            value = detail.checked;
        } else {
            value = detail.value;

            const inputType = e.target.type;
            if (inputType === 'number') {
                value = value === '' ? 0 : parseInt(value, 10);
            }
        }

        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [name]: value
            }
        }));
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const detail = e.detail;

        if (detail.checked !== undefined) {
            setFormData(prev => ({
                ...prev,
                [name]: detail.checked
            }));
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: detail.value
            }));
        }
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);

        const currentTotalImages = formData.imagen.length + selectedFiles.length;
        const newTotal = currentTotalImages + files.length;

        if (newTotal > MAX_IMAGES) {
            const filesToAdd = MAX_IMAGES - currentTotalImages;
            if (filesToAdd > 0) {
                setSelectedFiles(prevFiles => [
                    ...prevFiles,
                    ...files.slice(0, filesToAdd)
                ]);
            }
            setShowAlert(true);
        } else {
            setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        }

        e.target.value = null;
    };

    const handleRemoveFile = (indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleRemoveExistingFile = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            imagen: prev.imagen.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedFiles.length === 0 && !propertyData) {
            alert(`Debes subir al menos 1 fotografía para la propiedad. Máximo ${MAX_IMAGES} fotos.`);
            return;
        }

        //Carga de imagenes a Cloudinary
        setIsUploading(true);
        let uploadedImageUrls = [];
        try {
            const uploadPromises = selectedFiles.map(file => uploadImage(file));
            uploadedImageUrls = await Promise.all(uploadPromises);
        } catch (error) {
            alert("Error al subir las imágenes. Inténtalo de nuevo.");
            setIsUploading(false);
            return;
        }
        setIsUploading(false);

        const stringifyMapValues = (mapObject) => {
            const newMap = {};
            for (const key in mapObject) {
                newMap[key] = JSON.stringify(mapObject[key]);
            }
            return newMap;
        };

        const finalImageUrls = [...formData.imagen, ...uploadedImageUrls];

        const dataToSave = {
            ...formData,
            location: stringifyMapValues(formData.location),
            description: stringifyMapValues(formData.description),
            imagen: finalImageUrls,
            ownerId: localStorage.getItem('userId')
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
                                    <strong>{formData.imagen.length + selectedFiles.length}</strong> de <strong>{MAX_IMAGES}</strong> fotos seleccionadas
                                </p>

                                {/* Input de archivo oculto (se mantiene igual) */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }}
                                    disabled={formData.imagen.length + selectedFiles.length >= MAX_IMAGES}
                                />

                                {/* Botón visible que dispara el click del input oculto (se mantiene igual) */}
                                <IonButton
                                    expand="block"
                                    fill="outline"
                                    onClick={() => fileInputRef.current.click()}
                                    disabled={formData.imagen.length + selectedFiles.length >= MAX_IMAGES}
                                    className="ion-margin-bottom"
                                >
                                    <IonIcon slot="start" icon={cameraOutline} />
                                    {selectedFiles.length === 0 ? 'Seleccionar Fotos' : 'Añadir Más Fotos'}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        {/* Previsualización de Imágenes*/}
                        {(formData.imagen.length > 0 || selectedFiles.length > 0) && (
                            <IonRow className="ion-margin-bottom">
                                {/* 1. Renderiza las imágenes EXISTENTES (de formData.imagen) */}
                                {formData.imagen.map((imageUrl, index) => (
                                    <IonCol size="6" size-md="4" key={`existing-${index}`} className="ion-padding-bottom">
                                        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden' }}>
                                            <img
                                                src={imageUrl}
                                                alt={`Existente ${index + 1}`}
                                                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <IonButton
                                                size="small"
                                                color="danger"
                                                onClick={() => handleRemoveExistingFile(index)}
                                                style={{ position: 'absolute', top: '5px', right: '5px' }}
                                            >
                                                <IonIcon icon={closeCircle} />
                                            </IonButton>
                                        </div>
                                    </IonCol>
                                ))}
                                {/* 2. Renderiza las imágenes NUEVAS (de selectedFiles) */}
                                {selectedFiles.map((file, index) => (
                                    <IonCol size="6" size-md="4" key={`new-${index}`} className="ion-padding-bottom">
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
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Calle</IonLabel>
                                    <IonInput
                                        name="calle"
                                        value={formData.location.calle}
                                        onIonChange={handleNestedChange}
                                        data-parent="location"
                                        required
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Número</IonLabel>
                                    <IonInput
                                        name="numero"
                                        value={formData.location.numero}
                                        onIonChange={handleNestedChange}
                                        data-parent="location"
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Colonia</IonLabel>
                                    <IonInput
                                        name="colonia"
                                        value={formData.location.colonia}
                                        onIonChange={handleNestedChange}
                                        data-parent="location"
                                        required
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Código Postal</IonLabel>
                                    <IonInput
                                        name="codigoPostal"
                                        type="number"
                                        value={formData.location.codigoPostal}
                                        onIonChange={handleNestedChange}
                                        data-parent="location"
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        {/* Fila 5: Descripción */}
                        <h2 className="ion-margin-top ion-margin-bottom">Características</h2>
                        <IonRow>
                            <IonCol size="12">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Descripción General</IonLabel>
                                    <IonTextarea
                                        name="general"
                                        value={formData.description.general}
                                        onIonChange={handleNestedChange}
                                        data-parent="description"
                                        rows={4}
                                        required
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel>Servicio de Internet</IonLabel>
                                    <IonToggle
                                        name="internet"
                                        checked={formData.description.internet}
                                        onIonChange={handleNestedChange}
                                        data-parent="description"
                                        slot="end"
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel>Cuarto de Lavado</IonLabel>
                                    <IonToggle
                                        name="lavado"
                                        checked={formData.description.lavado}
                                        onIonChange={handleNestedChange}
                                        data-parent="description"
                                        slot="end"
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Camas Individuales</IonLabel>
                                    <IonInput
                                        name="camasIndividuales"
                                        type="number"
                                        value={formData.description.camasIndividuales}
                                        onIonChange={handleNestedChange}
                                        data-parent="description"
                                        min="0"
                                    />
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6">
                                <IonItem lines="full" className="ion-margin-bottom">
                                    <IonLabel position="stacked">Camas Matrimoniales</IonLabel>
                                    <IonInput
                                        name="camasMatrimoniales"
                                        type="number"
                                        value={formData.description.camasMatrimoniales}
                                        onIonChange={handleNestedChange}
                                        data-parent="description"
                                        min="0"
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
                        disabled={isUploading}
                    >
                        {
                            isUploading ?
                                <IonSpinner name="crescent" /> :
                                (propertyData ? 'Guardar Cambios' : 'Registrar Propiedad')
                        }
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