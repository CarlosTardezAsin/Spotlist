### Documentación y explicación de las decisiones tomadas en el desarrollo del proyecto:

Se ha elegido nestjs como el framework para desarrollar la REST API de SpotList. 
La logica de negocio ha sido encapsulada en diferentes módulos de acuerdo a su contexto. Los servicios se encargan de proporcionar la informacion correspondiente respectos las sentencias ejecutadas sobre la base de datos, los controladores son los encargados de manejar las requests recibidas

Se ha implementado el registro de usuarios guardando la contraseña encriptada por la librería bcrypt. La autenticación se realiza usando JWT, los tokens tienen que ser mandados en cada endpoint excepto a los correspondientes del controlador Auth
Class-transformer es utilizada para mapear las entidades almacenadas en nuestra base de datos a su respectivo DTO  y class-validator para comprobar que los DTOs enviados desde la request cumplen las diferentes validaciones y de asegurarse de que el JSON enviado no envia informacion que puede ser vulnerable para nuestro sistema
Se ha utilizado MySql como base de datos aunque no sea necesaria y TypeORM como orm para ejecutar y llevar a cabo las futuras migraciones que requierra el proyecto.
Para llevar a cabo el desarrollo de nuevas features hay que levantar en local una base de datos MySql y cambiar la configuracion del .ENV por la correspondiente en su local, la cual la primera vez que ponga en ejecucion el servicio se seteara un usuario para con una lista asociada.
Se han implementado algunos test end to end que emulan las peticiones de un cliente, levantando en el modulo de Testing una base de datos en memoria gracias a SQLLite y seteando una data antes de llevar a cabo los diferentes test.

Para ejecutar cualquier script, checkea el package.json para saber cual ejecutar tanto para los tests como las migraciones

De acuerdo a los principios SOLID, cada clase tiene una única responsabilidad, están abiertas a la escalabilidad, , las interfaces son segregadas para combinarlas después y el control es invertido (SERVICIOS => CONTROLADOR). Se ha evitado desarrollar la mayor cantidad de código duplicado en las diferentes partes del proyecto.

El rendimiento es acorde a lo esperado, se ha intentado hacer uso del código asíncrono y la agrupación de promesas para el aumento del rendimiento
