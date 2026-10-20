# Tutorial: extensión Programa de refuerzo de aprendizajes (PRA)

Permite elegir las medidas de los Programas de Refuerzo (PRA) en un panel lateral y escribirlas directamente en los cuadros de texto de Séneca.

## 1. Instalación (una sola vez)
1. Abre `chrome://extensions`.
2. Activa **Modo de desarrollador**.
3. Pulsa **Cargar descomprimida** y elige la carpeta `extension`.
4. Opcional: fija la extensión en la barra con el icono de puzle.

## 2. Abrir el panel
1. Entra en Séneca y abre la pantalla con los cinco cuadros de texto del PRA.
2. Recarga la página de Séneca si estaba abierta antes de instalar la extensión.
3. Pulsa el icono de la extensión: se abre el panel lateral y permanece abierto mientras trabajas.

## 3. Calibrar los campos (una sola vez por apartado)
Sirve para que la extensión sepa qué cuadro de Séneca corresponde a cada apartado.
1. En el panel, pulsa **Calibrar campo** en el apartado 1.
2. Haz clic dentro del cuadro de Séneca «Tipos de actividades y tareas». El clic no escribe nada.
3. El panel mostrará **Campo calibrado** en verde.
4. Repite con los apartados 2 a 5, cada uno con su cuadro.

La calibración se guarda y se reutiliza en otros informes. Si al rellenar aparece «No se encontró el campo», vuelve a calibrar ese apartado.

## 4. Preparar las medidas
1. Pulsa las **tipologías** del alumno. Se preseleccionan las medidas recomendadas de cada apartado.
2. Marca o desmarca medidas según necesites.
3. Para una medida propia, escríbela en «Añadir medida propia…» y pulsa **Añadir**. Se guarda y queda seleccionada.
4. Las medidas propias tienen botones **Editar** (el texto pasa al cuadro, y se confirma con **Guardar cambio**) y **Borrar**.
5. **Limpiar selección** borra tipologías y selecciones del panel (no toca Séneca).

## 5. Rellenar Séneca
- **Rellenar en Séneca** (dentro de un apartado): escribe solo ese apartado.
- **Rellenar todos los apartados**: escribe los cinco de una vez.
- Revisa los textos y guarda en Séneca como siempre.

## 6. Cambiar o ampliar lo ya escrito
| Quieres… | Haz… |
|---|---|
| Un retoque puntual | Edita el texto directamente en el cuadro de Séneca. |
| Sustituir todo el contenido | Cambia la selección en el panel, deja **Añadir al texto existente** desmarcada y pulsa Rellenar. |
| Añadir más sin borrar | Marca **Añadir al texto existente** y rellena: el texto nuevo va en una línea nueva. |

Con «Añadir al texto existente» marcada, las medidas que ya estén en el cuadro no se repiten: solo se añaden las nuevas. Ese ajuste se aplica a todos los apartados y se recuerda entre sesiones.

## 7. Exportar e importar tus medidas
Sirve para copia de seguridad, para llevarlas a otro ordenador o para compartirlas con compañeros.
- **Exportar mis medidas**: descarga `pra-medidas.json` con tus medidas propias, las tipologías activas y la selección actual. No incluye la calibración de campos ni datos del alumnado.
- **Importar medidas**: elige un `pra-medidas.json`. Las medidas se **suman** a las que ya tienes, sin borrar nada ni duplicar las repetidas.
- En otro ordenador, la calibración de los campos de Séneca hay que repetirla (sección 3).
- Si aparece «El archivo no es una exportación válida», el archivo no procede de esta extensión.

## 8. Privacidad
- La extensión solo actúa en `https://seneca.juntadeandalucia.es/*`.
- No guarda nombres ni datos del alumnado: solo tus selecciones, medidas propias y calibraciones, en el almacenamiento local de Chrome.

## 9. Problemas frecuentes
- **«Abre una página de Séneca en la pestaña activa»**: la pestaña activa no es Séneca o hay que recargarla.
- **«No se encontró el campo»**: recalibra ese apartado.
- **El texto aparece pero Séneca no lo guarda**: pulsa fuera del cuadro y guarda; si persiste, avísalo para ajustar la extensión.

## Limitaciones actuales
- Las medidas de la base de datos (no las propias) se editan en un único archivo, `extension/data.js`, que usan tanto la extensión como `index.html`. Tras cambiarlo, recarga la extensión.
- Al publicar `index.html` en GitHub Pages hay que subir también la carpeta `extension/` (al menos `data.js`).
