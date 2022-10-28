# adara_form

# Ejecucion

Se desarrollo con Node versión 14.18.1

Backend: `cd backend/ && yarn install && yarn start`
Frontend: `cd frontend/ && yarn install && yarn dev`

# Stack

Backend: ExpressJs
Frontend: NodeJs

# Aclaraciones y Supuestos

El backend está desarrollado en Express. No usé una base de datos ni Docker, por el tiempo que tomaba dichas configuraciones, posibles problemas al corregir, etc. Pero si quiero aclarar que he trabajado con bases de datos, en particular, para este ejemplo como dejé por escrito en el código, una base de datos relacional como Postgres se acomoda para cumplir lo pedido. También considero que sería bueno encapsular el backend en Docker para emular el entorno de producción y facilitar la instalación a los desarrolladores.

El frontend está desarrollado en Next. Consta de una sola vista, al lado izquierdo el formulario y al derecho un buscador de usuarios. En el formulario se manejan errores de input,
sin embargo no se manejan de manera total errores que vengan desde el servidor, la aplicación no se cae, pero no se muestra el error, lo que mejoraría la experiencia de usuario. Tampoco se maneja el reseteo del formulario al momento de añadir un usuario correctamente, del mismo modo en el buscador no se muestra ningún mensaje cuando el mail buscado no se encuentra.

Los colores e imágenes las saqué de la página actual de Adara Styling

# Preguntas

## ¿ Cómo haría el deploy ? 

El frontend aprovechando que usé Next, usaría Vercel que es el desarrollador de Next y tiene
buena integración con este framework.

El backend lo subiría a una estancia de Elastic Beanstalk de AWS, este servicio permite subir código desarrollado en Node por ejemplo y se encarga de manejar la capacidad, balanceo de carga entre otras funciones que en otros servicios se debería hacer de manera manual.

##  ¿ Por qué escogí esta tarea ?

Hay dos razones principales:

- 1. Me estoy postulando principalmente al cargo de desarrollador Full-Stack, en esta tarea podía mostrar de mejor manera las habilidades que tengo para este cargo.

- 2. Tengo más experiencia en el área de desarrollo web, para efectos de la postulación me sentía más cómodo haciendo la tarea sobre la que tengo más experiencia.

Aclarar que no descarto la posibilidad de aprender y poder contribuir en el ámbito de análisis de datos o entrenar un modelo de inteligencia artificial, solo que al momento de postular, encontré más pertinente enfocarme en desarrollo web que es donde tengo más experiencia.