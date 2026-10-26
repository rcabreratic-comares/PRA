# Programas de Refuerzo de los Aprendizajes · PRA

Sitio estático con dos formas de preparar los Programas de Refuerzo de los Aprendizajes (PRA): crear un informe imprimible/guardable como PDF con `generador.html`, o rellenar Séneca desde Chrome con la extensión (que no se publica en este repositorio). La portada `index.html` presenta ambas opciones y la presentación de referencia.

## Uso

Abre `index.html` para elegir cómo trabajar.

- **Informe en PDF:** abre `generador.html`, selecciona las tipologías y medidas y personaliza la cabecera con las iniciales, materia, curso, grupo, profesor/a y el nombre o logotipo del centro. Desde el navegador puedes imprimir o guardar el resultado como PDF, además de copiarlo o descargarlo como texto.
- **Extensión de Chrome:** se instalará desde el enlace directo de su ficha no listada en Chrome Web Store. Ese enlace se añadirá a la portada cuando esté disponible; el ZIP no se ofrecerá a los usuarios.
- La portada incrusta la presentación de referencia de Google Slides. Los tutoriales de YouTube están enlazados desde la portada.

No necesita servidor propio. El generador carga Tailwind CSS, Google Fonts y Font Awesome desde sus CDN, por lo que algunas mejoras visuales requieren conexión a internet.

## Privacidad

Los datos escritos en el generador y el logotipo elegido se procesan en el navegador. No se envían a GitHub ni se incluyen en el código publicado. El botón **Guardar borrador** almacena localmente en ese dispositivo el borrador, que puede incluir iniciales, materia, curso, grupo, profesor/a, nombre del centro, logotipo, selecciones y medidas propias. La extensión también guarda sus selecciones, medidas propias y calibraciones localmente en Chrome. Evita introducir datos personales innecesarios y sigue las normas de protección de datos del centro.

Si el repositorio es público, el código y el logotipo incluidos en él serán visibles públicamente. La página publicada mediante GitHub Pages también será accesible públicamente; no introduzcas información real del alumnado en enlaces, archivos o capturas compartidos.

El pie de página incluye un enlace de contacto a Twitter: [@rcabreratic](https://twitter.com/rcabreratic).

## Publicación en GitHub Pages

1. El repositorio público utilizado para esta aplicación es `rcabreratic-comares/PRA`.
2. Sube `index.html`, `generador.html`, `privacidad.html`, `README.md`, `.gitignore`, `Logo_Comares_Color_Horizontal (1).png`, `nombreserendipia.jpg` y `data.js` a la rama `main`. La extensión, su ZIP y los documentos internos no se publican.
3. En **Settings → Pages**, selecciona **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`.
4. Cuando finalice el despliegue, abre `https://rcabreratic-comares.github.io/PRA/`.
