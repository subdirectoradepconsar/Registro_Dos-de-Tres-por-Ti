# Registro A dos de tres por tu futuro

El formulario está conectado al spreadsheet [Registro StandTresPorMi](https://docs.google.com/spreadsheets/d/1MrfkECNHsUrr8NzMMEnWFEU3UkARzAyJG0HKc--cr_Q/edit?gid=0#gid=0), pestaña **Hoja 1** (`gid=0`). Cada envío agrega una fila en A:E: **Fecha | Nombre | Correo | Año | Género**. La validación de encabezados tolera espacios y saltos de línea en sus extremos.

## Integración

- Código del servidor: `Código.gs`.
- Proyecto de Apps Script: https://script.google.com/u/0/home/projects/1CkNBlU_DQkRA6HJ9_EcHhUO8mUFBf0koGmHd01je28WtkxLVaZGmCiDD/edit
- URL configurada en `app.js`: https://script.google.com/macros/s/AKfycbxewx68JEkqIo9jTQl-HuLOtIN0txb2O6T8B0Ry7mq2lpdwcl9zjsEpny5L1o_mJZtpGQ/exec
- Ejecuta como el propietario de la implementación y permite envíos de cualquier usuario. La hoja permanece privada.

Para actualizar el servidor, pega `Código.gs` en el editor y selecciona **Implementar → Gestionar implementaciones → Editar → Versión nueva → Implementar**. Así se conserva la URL del formulario. No borres datos existentes para adaptar los encabezados.

Publica los archivos de esta carpeta como sitio estático para que la versión pública utilice esta conexión.

El navegador envía la solicitud en modo `no-cors`, por lo que no puede leer la respuesta del Apps Script ni confirmar que la fila se guardó. La pantalla dice «Solicitud enviada» por ese motivo. Confirma los registros en la hoja. El formulario bloquea los envíos si falta una URL válida de implementación.
