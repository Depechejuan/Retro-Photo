/*
    LOGICA A TENER EN CUENTA.
    Un usuario te manda un QR con una URL para pertenecer a su lista
    Puede ser que no estés registrado, por lo que habría que hacer lo siguiente:
        - guardar la URL en el Local Storage
        - Redirigir al registro
        - Login
        - Ahí, hacer comprobacion
            Si hay localstorage "url_inv" > redirige a la boda
            else panel de control normal.
        Esto soluciona el que tras el registro, puedas acceder directamente a la boda.
*/
