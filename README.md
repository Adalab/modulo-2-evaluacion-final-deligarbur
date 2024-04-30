![Adalab](https://github.com/Adalab/modulo-2-evaluacion-final-deligarbur/blob/main/public/images/logo-adalab.png)

**Dirección GitHub Pages:**

http://beta.adalab.es/modulo-2-evaluacion-final-deligarbur/

# Módulo 2: Ejercicio de evaluación final

## Estructura básica de carpetas

La estructura de carpetas sigue el esquema siguiente:

```
src
 ├─ scss (layout)
 |  ├─ footer
 |  ├─ header
 |  ├─ form (apartado de búsqueda)
 |  └─ results (listado de búsqueda y favoritos)
 |
 |
 └─ html (partials)
    ├─ footer
    ├─ header
    ├─ form (apartado de búsqueda)
    └─ results (listado de búsqueda y favoritos)

```

## Enunciado

El ejercicio consiste en desarrollar una aplicación web que contiene un listado de las bebidas y cócteles de todo el mundo, que nos permite des-marcar/marcar las bebidas como favoritas y guardarlas en local storage. El ejercicio también tiene una parte de maquetación con HTML y Sass.

Vamos de definir los distintos hitos completados del ejercicio:

### 1. Funcionalidad básica

La aplicación de búsqueda de cócteles consta de dos partes:

1. Un campo de texto, un botón para buscar un cóctel por su título y un botón reset para limpiar el campo de búsqueda y resultados actuales.
1. Un listado de resultados de búsqueda donde aparece la imagen del cóctel y el nombre, y el listado de favoritos.

### 2. Búsqueda

- Al hacer clic sobre el botón de Buscar, la aplicación se conecta al API abierto de [TheCocktailDB](https://www.thecocktaildb.com/) y precarga la lista de búsqueda por defecto de la palabra "margarita".
- Para construir la URL de búsqueda se recoge el texto que ha introducido la usuaria en el campo de búsqueda.
- Por cada cóctel contenido en el resultado de la búsqueda se pinta una tarjeta que muestra la imagen del cóctel y el nombre.
- Algunas de los cócteles que devuelve el API no tienen imagen y en ese caso se hace una validación paa mostrar una imagen de relleno.
- Para pintar la información en la página se ha utilizado el método mediante innerHTML.

### 3. Favoritos

Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus cócteles favoritos haciendo click sobre una cóctel de manera que se cumplen las siguientes premisas:

- El color de fondo y el de fuente se intercambian, indicando que es un cóctel favorito.
- Se muestra el listado de los cócteles favoritos en la parte izquierda de la pantalla, debajo del formulario de búsqueda.
- Los cócteles favoritos siguen apareciendo a la izquierda aunque la usuaria realice otra búsqueda o se recargue la página de nuevo.

### 4. Almacenamiento local

Se almacena el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos seguirá mostrándose.

### 5. Borrar favoritos

- Al hacer clic sobre el icono de una 'x' al lado de cada favorito, se borra el favorito seleccionado de la lista de favoritos y del localStorage.
- Se pueden añadir/quitar como favorito al hacer click sobre un cóctel del lado de la derecha (lista de resultados de búsqueda).
- Si realizamos una nueva búsqueda y sale un cóctel que ya es favorito, aparezca resaltado en los resultados de búsqueda (con colores de fondo y texto intercambiados).
- Al final de la lista de favoritos hay un botón para borrar todos los favoritos a la vez.

### 6. Afinar la maquetación

![Screenshots](https://github.com/Adalab/modulo-2-evaluacion-final-deligarbur/blob/main/public/images/Preview.png)
