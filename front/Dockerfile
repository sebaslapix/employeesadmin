# Usa la imagen oficial de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de servidor web ligero para servir la aplicación estática
FROM nginx:alpine

# Copia los archivos construidos al directorio que Nginx sirve por defecto
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expone el puerto en el que Nginx estará escuchando
EXPOSE 80
