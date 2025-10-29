import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const PrivacyPoliciy = () => {

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Políticas de Privacidad</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
                <h2>1. Introducción</h2>
                <p>El Sistema de Reserva de Alojamientos Turísticos de Arroyo Seco (en adelante, " la Aplicación ", " nosotros ", " nuestro " o " nuestros ") proporciona a sus clientes y usuarios (" Usuario(s) " o " usted ") una plataforma digital que conecta directamente a anfitriones (propietarios de alojamientos) con visitantes (turistas) en la región de Arroyo Seco, Querétaro, facilitando la búsqueda, reservación y gestión de hospedajes (el "Servicio").</p>
                <p>La Aplicación está comprometida con su privacidad. Esta Política de Privacidad tiene como objetivo informarle sobre nuestra recopilación, uso, divulgación, retención y protección de su información personal al utilizar nuestro Servicio.</p>
                <p>Por favor, lea cuidadosamente este Aviso de Privacidad antes de acceder o utilizar nuestros servicios.</p>
                <p>Al hacerlo, usted acepta las prácticas descritas en el presente documento.</p>
                <p>Si no está de acuerdo con alguno de los términos aquí establecidos, le solicitamos que se abstenga de utilizar nuestros servicios.</p>
                <p>Le informamos que no está legalmente obligado a proporcionarnos sus datos personales; sin embargo, en caso de no hacerlo, es posible que ciertas funcionalidades del servicio no estén disponibles.</p>

                <h2>2. Qué Información Recopilamos</h2>
                <p>Recopilamos diferentes tipos de información para poder ofrecer nuestros servicios de manera efectiva y segura, diferenciando entre la información que usted nos proporciona directamente, la que recopilamos automáticamente y la que obtenemos de terceros.</p>

                <h3>2.1 Información que usted nos proporciona</h3>
                
                <h4>Datos de Registro de Perfil:</h4>
                <p> <strong>Para Visitantes y Anfitriones:</strong> Nombre completo, dirección de correo electrónico, número de teléfono.</p>
                <p> <strong>Para Anfitriones:</strong> Información detallada de sus propiedades (descripciones, características, precios, disponibilidad, fotografías).</p>

                <h4>Contenido de Reseñas y Calificaciones:</h4>
                <p>Cualquier comentario, reseña o calificación que usted publique sobre alojamientos o experiencias.</p>

                <h4>Documentos de Verificación:</h4>
                <p>Para aumentar la seguridad y la confianza en la plataforma, tanto Anfitriones como, eventualmente, Visitantes, podrían ser requeridos a proporcionar documentos legales de identificación oficial y/o comprobante de domicilio. Esta información será tratada con la máxima confidencialidad.</p>

                <h4>Mensajes del Chat Interno:</h4>
                <p>El contenido de las comunicaciones que mantenga con otros usuarios (Visitantes o Anfitriones) a través de nuestro chat interno.</p>

                <h3>2.2 Información que recopilamos automáticamente</h3>
                
                <h4>Información del Dispositivo:</h4>
                <p>Identificadores únicos del dispositivo, sistema operativo, tipo de navegador, información de la red móvil.</p>

                <h4>Datos de Uso:</h4>
                <p>Información sobre cómo interactúa con la Aplicación, incluyendo las propiedades que busca, los filtros que aplica, los clics realizados, las páginas visitadas y el tiempo de permanencia.</p>

                <h4>Geolocalización:</h4>
                <p>Con su consentimiento, recopilamos datos precisos sobre su ubicación geográfica para mostrarle propiedades cercanas y facilitar la navegación. Puede desactivar esta función en la configuración de su dispositivo en cualquier momento.</p>

                <h4>Cookies y Tecnologías Similares:</h4>
                <p>Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestra Aplicación y mantener cierta información. Las cookies son pequeños archivos de datos que se almacenan en tu dispositivo. Puede configurar su navegador para que rechace todas las cookies o para que le indique cuándo se envía una cookie.</p>

                <h2>3. Cómo Usamos tu Información</h2>
                <p>Utilizamos tu información recopilada para los siguientes propósitos:</p>
                <ul>
                    <li> <strong>Operar y Mantener la Plataforma:</strong> Para permitirle buscar, reservar y gestionar alojamientos, así como para que los Anfitriones puedan listar y administrar sus propiedades.</li>
                    <li> <strong>Verificar la Identidad de los Usuarios:</strong> Para prevenir fraudes, garantizar la seguridad de las transacciones y fomentar un entorno de confianza, utilizamos la información de verificación de identidad.</li>
                    <li> <strong>Enviar Notificaciones:</strong> Para mantenerlo informado sobre el estado de sus reservas, recordatorios de check-in/out, y para enviarle comunicaciones de marketing (con su consentimiento explícito).</li>
                    <li> <strong>Personalizar la Experiencia:</strong> Para ofrecerle recomendaciones de lugares y actividades basadas en sus intereses y preferencias de búsqueda. Por ejemplo: Tips de lugareños.</li>
                    <li> <strong>Mejorar Nuestros Servicios:</strong> Para analizar el uso de la Aplicación y mejorar nuestras funcionalidades, la experiencia del usuario y la calidad del servicio.</li>
                    <li> <strong>Cumplir con Obligaciones Legales:</strong> Para cumplir con las leyes y regulaciones aplicables.</li>
                </ul>

                <h2>4. Con quien Compartimos tu Información</h2>
                <p>Compartimos su información personal con terceros en las siguientes circunstancias y con las siguientes categorías de destinatarios:</p>
                <ul>
                    <li> <strong>Entre Visitantes y Anfitriones:</strong> Para facilitar la gestión de las reservas, los datos necesarios de un Visitante (nombre, fechas de reserva, número de contacto si es proporcionado) se comparten con el Anfitrión correspondiente una vez confirmada una reserva, y viceversa (información del Anfitrión con el Visitante). Esto es esencial para la operación del servicio.</li>
                    <li> <strong>Proveedores de Servicios:</strong> Compartimos información con empresas que nos prestan servicios, como proveedores de alojamiento en la nube (ej. Azure), servicios de análisis de datos, servicios de atención al cliente y plataformas de envío de notificaciones. Estos proveedores están obligados contractualmente a proteger su información y a usarla solo para los fines especificados.</li>
                    <li> <strong>Pasarelas de Pago:</strong> Cuando se implementen los pagos, su información de pago será compartida con procesadores de pago externos y seguros para completar las transacciones.</li>
                    <li> <strong>Autoridades Legales:</strong> Podemos divulgar su información si así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas (ej. una orden judicial o una solicitud gubernamental).</li>
                    <li> <strong>Transferencias de Negocio:</strong> En caso de fusión, adquisición o venta de activos, su información personal podría ser transferida como parte de dicha transacción. Le notificaremos antes de que su información personal sea transferida y quede sujeta a una política de privacidad diferente.</li>
                </ul>

                <h2>5. Tus Derechos sobre tus Datos</h2>
                <p>Usted tiene los siguientes derechos con respecto a su información personal:</p>
                <ul>
                    <li> <strong>Derecho de Acceso:</strong> Puede solicitar una copia de la información personal que tenemos sobre usted.</li>
                    <li> <strong>Derecho de Rectificación:</strong> Puede solicitar que corrijamos cualquier información personal inexacta o incompleta.</li>
                    <li> <strong>Derecho de Supresión:</strong> Puede solicitar la eliminación de su información personal, bajo ciertas condiciones.</li>
                    <li> <strong>Derecho de Oposición:</strong> Puede oponerse al procesamiento de su información personal en ciertas circunstancias.</li>
                    <li> <strong>Derecho a la Portabilidad de Datos:</strong> Puede solicitar recibir su información personal en un formato estructurado, de uso común y lectura mecánica, y a transmitirla a otro responsable del tratamiento.</li>
                </ul>
                <p>Para ejercer cualquiera de estos derechos, por favor, póngase en contacto con nosotros a través de privacidad@arroyosecoreservas.com. Responderemos a su solicitud de acuerdo con las leyes de protección de datos aplicables.</p>

                <h2>6. Seguridad de los Datos</h2>
                <p>Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Estas medidas incluyen, entre otras, el cifrado de datos en tránsito y en reposo, controles de acceso estrictos y auditorías de seguridad regulares.</p>
                <p>No obstante, debe tener en cuenta que, si bien aplicamos las mejores prácticas disponibles, ningún sistema es completamente infalible y no podemos garantizar que el acceso no autorizado nunca ocurra.</p>

                <h2>7. Retención de Datos</h2>
                <p>Retendremos su información personal sólo durante el tiempo necesario para cumplir con los fines para los que la recopilamos, incluyendo la satisfacción de cualquier requisito legal, contable o de informes. El período de retención variará según el tipo de información y el propósito de su procesamiento.</p>

                <h2>8. Menores de Edad</h2>
                <p>Nuestros servicios no están dirigidos a personas menores de 18 años. No recopilamos intencionadamente información personal de menores de 18 años. Si nos damos cuenta de que hemos recopilado información personal de un menor de 18 años sin el consentimiento verificable de sus padres, tomaremos medidas para eliminar esa información de nuestros servidores.</p>

                <h2>9. Cambios en la Política de Privacidad</h2>
                <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la "Fecha de entrada en vigor" en la parte superior. Le recomendamos revisar esta Política de Privacidad periódicamente para cualquier cambio. Los cambios a esta Política de Privacidad son efectivos cuando se publican en esta página.</p>

                <h2>10. Información de Contacto</h2>
                <p>Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad o nuestras prácticas de privacidad, no dude en ponerse en contacto con nuestro Oficial de Protección de Datos en: privacidad@arroyosecoreservas.com</p>
                <p>Gracias por confiar en el Sistema de Reserva de Alojamientos Turísticos de Arroyo Seco.</p>

            </IonContent>
        </IonPage>
    )
}

export default PrivacyPoliciy;