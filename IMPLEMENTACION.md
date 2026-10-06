# Registro sin área

Esta carpeta es una copia independiente del registro original. El formulario conserva nombre, correo, año de nacimiento y género. Las respuestas se escriben en la pestaña con `gid=0` del archivo de Google Sheets indicado por el usuario, en las columnas A:E.

1. Abre la hoja de cálculo y comprueba que tienes permiso para editarla. Si A1:E1 ya contiene datos, verifica que sean exactamente: **Fecha y Hora | Nombre | Correo | Año de nacimiento | Género**. Si la pestaña está vacía, el script creará estos encabezados con el primer envío. No borres datos existentes para adaptar la hoja.
2. En esa hoja, abre **Extensiones → Apps Script** y pega el contenido completo de `Código.gs` en el archivo `Código.gs` del editor.
3. Selecciona **Implementar → Nueva implementación → Aplicación web**. Elige **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier persona**. Autoriza los permisos y copia la URL terminada en `/exec`.
4. En el `app.js` de esta carpeta, reemplaza `PEGA_AQUI_LA_URL_DE_TU_NUEVA_IMPLEMENTACION` por esa URL. No uses la URL del registro original: apunta a otro archivo de Sheets.
5. Publica esta carpeta como un sitio estático y envía un registro de prueba. Verifica directamente en la pestaña `gid=0` que aparece una fila con cinco columnas. Si falta, revisa **Ejecuciones** en Apps Script y los encabezados de la hoja. Cuando modifiques el script, crea una nueva versión desde **Gestionar implementaciones**.

El navegador envía la solicitud en modo `no-cors`, por lo que no puede leer la respuesta del Apps Script ni confirmar que la fila se guardó. La pantalla dice «Solicitud enviada» por ese motivo. Confirma los registros en la hoja.
