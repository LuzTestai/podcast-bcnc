# Podcast BCN Challenge :cd:

Este repositorio contiene el código fuente de una aplicación de podcast. La aplicación permite explorar diferentes podcasts, ver detalles de cada episodio y reproducirlos.

## Características

- Listado de podcasts disponibles.
- Detalle de cada podcast con información adicional.
- Visualización de episodios individuales.
- Reproductor de audio del episodio seleccionado.
- Funcionalidad de búsqueda de podcasts por título o nombre de artista.

## Tecnologías utilizadas

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario. Utilizada por su capacidad de crear componentes reutilizables y su eficiencia en la actualización de la interfaz de usuario.
- **Next.js**: Un framework de React para aplicaciones web. Utilizado por sus capacidades de renderizado del lado del servidor y generación de sitios estáticos, lo que mejora el rendimiento y la SEO.
- **TypeScript**: Un superset de JavaScript que añade tipado estático. Utilizado para mejorar la calidad del código y reducir errores.
- **SWC**: Un compilador de JavaScript y TypeScript escrito en Rust. Utilizado en lugar de Babel por su velocidad y eficiencia en la compilación.
- **React Testing Library**: Una biblioteca para realizar pruebas de componentes de React. Utilizada para fomentar mejores prácticas de pruebas al interactuar con los componentes de manera similar a como lo haría un usuario.
- **Jest**: Un framework de pruebas para JavaScript. Utilizado por su integración con React y su capacidad para realizar pruebas unitarias, de integración y snapshot.
- **CSS Modules**: Una técnica para modularizar estilos en CSS. Utilizada para evitar conflictos de nombres en los estilos y facilitar el mantenimiento del código CSS.

## Estructura del proyecto

El código fuente se encuentra en el directorio `src` y está organizado de la siguiente manera:

- `app`: Contiene las páginas principales de la aplicación y los archivos de configuración de Next.js.
  - `__tests__`: Contiene los archivos de pruebas para las páginas principales.
  - `episode`: Contiene la página y las pruebas relacionadas con los episodios.
  - `podcast/[name]`: Contiene la página y las pruebas relacionadas con los detalles de cada podcast.
- `context`: Contiene los contextos utilizados para manejar el estado global de la aplicación.
- `hooks`: Contiene hooks personalizados para manejar la lógica de la aplicación.
- `lib`: Contiene funciones de utilidad y helpers.
- `services`: Contiene los servicios para realizar solicitudes HTTP.
- `ui`: Contiene los componentes reutilizables utilizados en la aplicación.
  - `cardDetail`: Contiene el componente y las pruebas relacionadas con la visualización de los detalles del podcast.
  - `cardEpisode`: Contiene el componente y las pruebas relacionadas con la visualización de los episodios.
  - `cardProduct`: Contiene el componente y las pruebas relacionadas con la visualización de los productos.
  - `loading`: Contiene el componente y las pruebas relacionadas con el indicador de carga.
  - `navbar`: Contiene el componente y las pruebas relacionadas con la barra de navegación.

## Instalación :rocket:

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/LuzTestai/podcast-bcnc.git

2. Accede al directorio del proyecto:
  cd podcast-bcnc

3. Instala las dependencias del proyecto:
  npm install

```

## USO:

1.  Inicio de la aplicación en modo desarrollo:
    npm run dev

2.  Abre tu navegador web y accede a http://localhost:3000/ para ver la aplicación en funcionamiento.

## Construcción del proyecto para producción

    1. Construye el proyecto:
      npm run build

    2. Inicia el servidor en modo producción:
      npm start

    3. Accede a http://localhost:3000/ para ver la aplicación en funcionamiento.

## Diseño técnico

La organización de las carpetas y archivos sigue las mejores prácticas para proyectos de React y Next.js, permitiendo una separación clara de responsabilidades y facilitando el mantenimiento y escalabilidad del código. La elección de tecnologías como TypeScript y SWC ayuda a mejorar la calidad del código y el rendimiento de la aplicación.

## Procesador SWC

SWC se eligió en lugar de Babel debido a su alto rendimiento en la compilación de JavaScript y TypeScript. SWC está escrito en Rust, lo que le permite ser significativamente más rápido y eficiente en comparación con Babel. Esto resulta en tiempos de construcción más rápidos y una mejor experiencia de desarrollo. Además, SWC es totalmente compatible con las configuraciones de Babel, lo que facilita la migración y el uso en proyectos existentes.
