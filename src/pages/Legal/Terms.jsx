import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Terms = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Términos y Condiciones</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <h2>Términos de servicio de SRAT</h2>
                <p><strong>Última actualización: 16 de octubre de 2025</strong></p>

                <p>SRAT (“la Plataforma”, “nosotros”, “nuestro” o “el Sistema”) le da la bienvenida al sitio web y aplicación móvil del Sistema de Reserva de Alojamientos Turísticos de Arroyo Seco, desarrollada por el equipo de Ingeniería en Desarrollo y Gestión de Software de la Universidad Tecnológica de Querétaro (en adelante, “UTQROO” o “el Equipo Desarrollador”).</p>
                <p>Estos Términos y Condiciones de Uso (en adelante, “los Términos”) regulan el acceso y uso de la Plataforma, su sitio web y sus funcionalidades asociadas, incluyendo el registro de usuarios, la publicación de propiedades, la gestión de reservaciones y la comunicación entre anfitriones y huéspedes (en conjunto, “el Servicio”).</p>
                <p>Al acceder, registrarse, navegar o utilizar la Plataforma, el usuario (en adelante, “usted”, “Usuario”, “Huésped” o “Propietario”) reconoce que ha leído, comprendido y aceptado estos Términos y Condiciones, así como nuestra Política de Privacidad, disponible en la sección correspondiente del sitio o aplicación.</p>
                <p>El uso del Servicio implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este documento.</p>
                <p><strong>SI USTED NO ESTÁ DE ACUERDO CON ESTOS TÉRMINOS, DEBERÁ ABSTENERSE DE UTILIZAR LA PLATAFORMA, SU SITIO WEB O SUS SERVICIOS ASOCIADOS.</strong></p>
                
                <p>Al aceptar estos Términos, usted declara que:</p>
                <ul>
                    <li>Toda la información proporcionada en el registro es veraz y actual.</li>
                    <li>Es mayor de edad y cuenta con la capacidad legal para celebrar contratos.</li>
                    <li>Comprende que SRAT actúa únicamente como intermediario digital entre anfitriones y huéspedes, sin asumir responsabilidad directa sobre los servicios de hospedaje.</li>
                </ul>
                <p>Asimismo, usted autoriza a SRAT a enviarle comunicaciones electrónicas (por correo, notificaciones dentro de la aplicación o mensajes SMS) relacionadas con el uso del Servicio.</p>
                <p>Puede solicitar la cancelación de dichas comunicaciones en cualquier momento, sin afectar el envío de mensajes esenciales de funcionamiento del sistema (como confirmaciones o recordatorios de reserva).</p>

                <h2>1. Aceptación de los Términos</h2>
                <h3>1.1 Propósito del Servicio</h3>
                <p>SRAT (Sistema de Reserva de Alojamientos Turísticos de Arroyo Seco) es una Plataforma digital de intermediación diseñada para facilitar la conexión directa entre propietarios de alojamientos (denominados Anfitriones) y visitantes (denominados Huéspedes) interesados en reservar estancias en Arroyo Seco.</p>
                <p>Al utilizar nuestro sitio web o aplicación móvil, usted reconoce que SRAT actúa únicamente como un tercero digital que provee la tecnología, el marco de confianza y las herramientas para que las transacciones y la comunicación se lleven a cabo de manera segura.</p>
                <p>SRAT no es, bajo ninguna circunstancia, el propietario, operador, arrendador ni proveedor directo de los servicios de alojamiento, ni participa en la prestación física de dicho servicio.</p>

                <h3>1.2 Funcionalidades Esenciales de la Plataforma</h3>
                <p>El Servicio se centra en ofrecer las funcionalidades necesarias para una gestión eficiente de reservas. Esto incluye, entre otras cosas: la Gestión de Propiedades, permitiendo a los Anfitriones crear, editar y listar sus propiedades; la Búsqueda y Exploración, facilitando a los Huéspedes encontrar alojamientos por filtros como fechas, precio y capacidad; la Gestión de Reservaciones, que abarca el envío, la recepción, la aceptación, el rechazo y la cancelación de solicitudes de reserva.</p>
                <p>Un pilar fundamental de SRAT es la Seguridad y Confianza, por lo que implementamos medidas de autenticación basadas en roles y hemos establecido un proceso para la Verificación de Propiedades y Usuarios con el fin de asegurar que los alojamientos y Anfitriones sean legítimos, reduciendo así el riesgo de fraude o estafa para los visitantes y protegiendo a los Anfitriones.</p>
                <p><strong>NOTA IMPORTANTE SOBRE ALCANCE:</strong> Usted reconoce que funcionalidades como el procesamiento de pagos directos a través de la plataforma y el sistema completo de reseñas públicas y calificaciones están consideradas para implementaciones futuras y no forman parte de la primera etapa del Servicio actual.</p>

                <h3>1.3 Condiciones y Limitaciones de la Información</h3>
                <p>SRAT se esfuerza por presentar una experiencia clara y precisa. Sin embargo, toda la información relacionada con los anuncios, incluyendo descripciones, precios, disponibilidad, fotografías y reglas de la casa, es proporcionada y responsabilidad exclusiva de los Anfitriones.</p>
                <p><strong>USTED RECONOCE Y ACEPTA</strong> que SRAT no garantiza la precisión, veracidad, legalidad, calidad o idoneidad de las Propiedades publicadas y su información. La verificación de disponibilidad es básica y la reserva solo se confirma cuando el Anfitrión la aprueba, por lo que la solicitud no garantiza la estancia. Asimismo, SRAT no se hace responsable por el cumplimiento de las leyes locales o normativas municipales por parte del Anfitrión o la propiedad.</p>

                <h3>1.4 Aceptación Vinculante de los Términos</h3>
                <p>Al acceder, registrarse o utilizar la Plataforma SRAT, usted acepta quedar legalmente vinculado por la totalidad de los presentes Términos y Condiciones.</p>
                <p>Si usted no está de acuerdo con alguna de las disposiciones, deberá abstenerse inmediatamente de utilizar el Servicio.</p>
                <p>Su uso continuado del Servicio, una vez publicados los cambios en estos Términos, constituirá su aceptación irrevocable de dichos nuevos términos.</p>

                <h2>2. Definiciones</h2>
                <p><strong>Plataforma SRAT:</strong> Aplicación web que permite la gestión de alojamientos turísticos en Arroyo Seco, desarrollada por el equipo de Ingeniería en Desarrollo y Gestión de Software de la Universidad Tecnológica de Querétaro.</p>
                <p><strong>Usuario:</strong> Toda persona que utilice la plataforma, sea como huésped o propietario.</p>
                <p><strong>Huésped:</strong> Usuario que busca y reserva alojamientos.</p>
                <p><strong>Propietario o Anfitrión:</strong> Usuario que publica y administra propiedades para su renta.</p>
                <p><strong>Reserva:</strong> Solicitud generada por un huésped para ocupar una propiedad en fechas determinadas.</p>

                <h2>3. Obligaciones y Conducta del Usuario</h2>
                <p>Todos los usuarios se comprometen a:</p>
                <ul>
                    <li>Cumplir con todas las leyes locales, estatales y federales aplicables.</li>
                    <li>No utilizar la Plataforma para fines ilegales, fraudulentos, engañosos o perjudiciales.</li>
                    <li>No suplantar la identidad de ninguna persona o entidad.</li>
                </ul>

                <h3>3.1. Obligaciones Específicas del Anfitrión</h3>
                <ul>
                    <li><strong>Veracidad de los Anuncios:</strong> Usted es el único responsable de la exactitud y legalidad del contenido que publica, incluyendo descripciones, precios, disponibilidad y fotografías de la propiedad.</li>
                    <li><strong>Gestión de Reservas:</strong> Es su responsabilidad aceptar o rechazar las solicitudes de reserva de manera oportuna y mantener actualizado el calendario de disponibilidad, incluyendo el registro manual de reservas hechas por canales externos.</li>
                    <li><strong>Derechos Legales:</strong> Usted declara y garantiza que tiene pleno derecho legal para alquilar la propiedad que publica en la Plataforma.</li>
                </ul>

                <h3>3.2. Obligaciones Específicas del Huésped</h3>
                <ul>
                    <li><strong>Solicitud de reserva:</strong> Usted entiende que enviar una solicitud de reserva no garantiza la misma. La reserva solo se confirma cuando el Anfitrión la acepta a través de la Plataforma.</li>
                    <li><strong>Cumplimiento:</strong> Usted se compromete a cumplir con las reglas y condiciones establecidas por el anfitrión para el alojamiento.</li>
                </ul>

                <h2>4. Contenido Generado por el Usuario</h2>
                <p>Al subir contenido a SRAT (como texto, fotos o cualquier otro material para los anuncios de propiedades), usted:</p>
                <ul>
                    <li>Declara que es el propietario de dicho contenido o que tiene todos los derechos necesarios para publicarlo.</li>
                    <li>Nos otorga una licencia mundial, no exclusiva, transferible y libre de regalías para usar, alojar, mostrar, reproducir y distribuir su contenido con el fin de operar, promocionar y mejorar los Servicios de la Plataforma.</li>
                    <li>Acepta que SRAT se reserva el derecho de eliminar cualquier contenido que, a nuestro juicio, viole estos Términos o sea inapropiado.</li>
                </ul>

                <h2>5. Privacidad y Protección de Datos Personales</h2>
                <p>SRAT se compromete a proteger su privacidad. Nuestro tratamiento de datos personales se rige por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.</p>
                <p><strong>Consentimiento:</strong> Al utilizar nuestros Servicios, usted otorga su consentimiento para la recopilación, uso, almacenamiento y tratamiento de sus datos personales, tal como se describe en nuestro Aviso de Privacidad.</p>
                <p><strong>Derechos ARCO:</strong> Conforme a la ley, usted tiene derecho al Acceso, Rectificación, Cancelación y Oposición (ARCO) sobre el tratamiento de sus datos personales.</p>
                <p>Para ejercer sus derechos ARCO, por favor, envíe una solicitud detallada a nuestro correo electrónico de contacto: terminosycondiciones@arroyosecoreservas.mx .</p>
                <p>Responderemos a su solicitud en un plazo máximo de veinte días hábiles, y si resulta procedente, la haremos efectiva dentro de los quince días siguientes a la fecha en que se comunique la respuesta, de acuerdo con los plazos establecidos por la ley.</p>
                <p><strong>Aviso de Privacidad:</strong> Para obtener información detallada sobre qué datos recopilamos, con qué finalidad y cómo los protegemos, por favor consulte nuestro Aviso de Privacidad.</p>

                <h2>6. Exclusión de Garantías y Limitación de Responsabilidad</h2>
                <p>La Plataforma se proporciona "tal cual", sin garantías de ningún tipo.</p>
                <p>SRAT no verifica la identidad de los usuarios, la exactitud de los anuncios, ni la condición o legalidad de las propiedades.</p>
                <p>No nos hacemos responsables de las acciones u omisiones de ningún Usuario.</p>
                <p>Nuestra responsabilidad máxima ante usted por cualquier causa y sin importar la forma de la acción, se limitará al monto pagado, si lo hubiera, por usted a SRAT por los Servicios.</p>

                <h2>7. Terminación</h2>
                <p>Usted puede dejar de usar los Servicios y eliminar su cuenta en cualquier momento.</p>
                <p>Nos reservamos el derecho de suspender o cancelar su acceso a la Plataforma si usted incumple estos Términos.</p>

                <h2>8. Modificaciones a los Términos</h2>
                <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento.</p>
                <p>Le notificaremos sobre los cambios publicando la nueva versión en la Plataforma.</p>
                <p>El uso continuado de los Servicios después de la fecha de actualización constituirá su aceptación de los nuevos Términos.</p>

                <h2>9. Legislación Aplicable y Jurisdicción</h2>
                <p>Estos Términos se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos Mexicanos.</p>
                <p>Cualquier disputa que surja en relación con estos Términos se someterá a la jurisdicción de los tribunales competentes en Santiago de Querétaro, Querétaro.</p>

                <h2>10. Contacto</h2>
                <p>Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos en: terminosycondiciones@arroyosecoreservas.mx</p>

            </IonContent>
        </IonPage>
    )
}

export default Terms;