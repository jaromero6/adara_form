/*
Para efectos de esta tarea se usará una base de datos en memoria,
es decir simplemente un objeto de javascript.

Esto es para evitar configurar una base de datos en el computador,
pasando variables de entorno o traer complicaciones al revisor al configurar
Docker o algún motor de bases de datos. De todas maneras explicito el stack
que habría usado si se tratara de un caso en la vida real:

Base de datos relacional: Los datos a guardar son estructurados por lo
                          que se ajustan a un modelo relacional
PostgreSQL: Motor de base de datos relacionales con buen rendimiento,
            escalable.

Sequelize: Ayuda a no tratar con consultas en SQL en bruto, lo que hace el codigo
           mas legible

Docker-compose: Para evitar problema de versionamiento y poder emular el entorno de produccion
                al momento de desarrollar
*/

const User = {};

module.exports = {
    User
};