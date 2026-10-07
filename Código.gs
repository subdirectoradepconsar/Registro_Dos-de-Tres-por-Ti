// Hoja de destino: https://docs.google.com/spreadsheets/d/1MrfkECNHsUrr8NzMMEnWFEU3UkARzAyJG0HKc--cr_Q/edit?gid=0
const SPREADSHEET_ID = "1MrfkECNHsUrr8NzMMEnWFEU3UkARzAyJG0HKc--cr_Q";
const SHEET_GID = 0;

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("El cuerpo JSON es obligatorio.");
    }
    const datos = JSON.parse(e.postData.contents);
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
      throw new Error("Se esperaba un objeto JSON.");
    }
    ["nombre", "correo", "genero"].forEach(function (campo) {
      if (typeof datos[campo] !== "string" || !datos[campo].trim()) {
        throw new Error("Campo obligatorio: " + campo);
      }
      datos[campo] = datos[campo].trim();
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
      throw new Error("Correo electrónico inválido.");
    }
    if (!/^\d{4}$/.test(String(datos.anioNacimiento))) {
      throw new Error("Año de nacimiento inválido.");
    }

    const libro = SpreadsheetApp.openById(SPREADSHEET_ID);
    const hoja = libro.getSheets().filter(function (item) {
      return item.getSheetId() === SHEET_GID;
    })[0];
    if (!hoja) throw new Error("No se encontró la pestaña con gid=0.");

    const ahora = new Date();
    const zona = libro.getSpreadsheetTimeZone();
    const anio = Number(datos.anioNacimiento);
    if (anio < 1920 || anio > Number(Utilities.formatDate(ahora, zona, "yyyy"))) {
      throw new Error("Año de nacimiento fuera de rango.");
    }

    lock.waitLock(30000);
    const encabezados = ["Fecha", "Nombre", "Correo", "Año", "Género"];
    if (hoja.getLastRow() === 0) {
      hoja.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);
    } else {
      const actuales = hoja.getRange(1, 1, 1, encabezados.length).getValues()[0];
      if (actuales.some(function (valor, i) { return String(valor).trim() !== encabezados[i]; })) {
        throw new Error("Los encabezados de A1:E1 no coinciden con el formato esperado.");
      }
    }

    hoja.appendRow([
      Utilities.formatDate(ahora, zona, "yyyy-MM-dd HH:mm:ss"),
      textoSeguro_(datos.nombre),
      textoSeguro_(datos.correo),
      anio,
      textoSeguro_(datos.genero)
    ]);
    SpreadsheetApp.flush();
    return respuestaJSON_({ status: "success" });
  } catch (error) {
    return respuestaJSON_({ status: "error", message: error.message || String(error) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function respuestaJSON_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos))
    .setMimeType(ContentService.MimeType.JSON);
}

function textoSeguro_(texto) {
  return /^[=+@-]/.test(texto) ? "'" + texto : texto;
}
