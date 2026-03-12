# API Consolas Retro

API REST desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar consolas retro.

Permite realizar operaciones CRUD sobre consolas y usuarios, además de autenticación mediante **JWT**.

---

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token (JWT)

---

## Instalación

1. Clonar el repositorio:

git clone https://github.com/ferguzmanv/api-consolas-retro.git

2. Entrar al proyecto:

cd api-consolas-retro

3. Instalar dependencias:

npm install

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

MONGODB_URI=tu_conexion_mongodb
JWT_SECRET=tu_clave_secreta
PORT=3000

---

## Ejecutar el proyecto

Para iniciar el servidor ejecutar:

npm start

El servidor se iniciará en:

http://localhost:3000

---

## Probar la API

La API puede probarse usando **Postman** importando la colección incluida en el proyecto.

---

## Autor

Fernanda Guzmán
