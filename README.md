# employeesadmin
Una aplicación para gestionar los roles de perfil con acciones básicas de inserción, visualización y eliminación

server:
usar una base de datos relacional (postgres). Se usa el modulo sequelize para las consultas parametrizadas, conexión a la base de datos y creación de tablas

en la carpeta database se encuentra un archivo llamado "createDatabase.js". este es un script para crear la base de datos que se usa en el proyecto, para correrlo, se debe ejecutar el comando: npm run db. debe configurar la url de la conexión a la base de datos de acuerdo a su usuario y contraseña.

El codigo crea las tablas necesarias, por lo que no se debe preocupar de hacerlo. Para crear el usuario admin, debe ejecutar el comando: npm run useradmin. creará: username: admin, password: admin1234.

ejecutar el comando npm install para las dependencias.

El sistema valida las entradas vacias y saneamiento de codigo. Se valida el token para acciones que solo el role admin puede hacer.

En resumen, debe ejecutar los siguientes comando: (suponiendo que ya tiene postgres instalado)
entrar a la carpeta server
npm install
npm run db
npm run useradmin
npm run start

front:
entrar a la carpeta front
hay que ejecutar el comando
npm install
para ingresar por primera vez, usar estas credenciales: username: admin, password: admin1234

General
por cuestiones prácticas, se incluye el archivo .env, pero solo es local, por lo que lo deberá configurar de acuerdo a sus necesidades