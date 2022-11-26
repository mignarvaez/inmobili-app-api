###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# Imagen base con linux alpine, una distribución ligera
FROM node:18-alpine AS development

# Directorio interno de trabajo
WORKDIR /usr/src/app

# Se copia package.json y package-lock.json al contenedor
# El copiar primero esto antes de instalar las dependencias
# Evita que que se corra npm install en cualquier cambio de código
# Se indica como owner de los archivos copiados al usuario node 
COPY --chown=node:node package*.json ./

# Instala dependencias usando npm ci, un install optimizado
RUN npm ci

# Se copia el código compilado al sistema de archivos del contenedor
COPY --chown=node:node . .

# Se usa el usuario node de la imagen
USER node

###################
#  BUILD FOR PRODUCTION
###################
FROM node:18-alpine AS BUILD

# Directorio interno de trabajo
WORKDIR /usr/src/app

# Se copia package.json y package-lock.json al contenedor
# El copiar primero esto antes de instalar las dependencias
# Evita que que se corra npm install en cualquier cambio de código
# Se indica como owner de los archivos copiados al usuario node 
COPY --chown=node:node package*.json ./

# Para ejecutar npm run build se necesita acceder al CLI de nest el cuál es
# una dependencia de desarollo. En el stage previo se instalarón todas las dependencias
# con npm ci, por lo que podemos copiar el directorio node_modules desde la imagen de desarollo
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

# Se ejecuta el comando build que crea el empaquetamiento de producción
RUN npm run build

# Se setea la variable de entorno NODE_ENV de la imagen como producción
ENV NODE_ENV production

# Se corre npm ci para remover el directorio node_modules existente y
# con --only=production nos aseguramos que solo las dependencias de 
# producción son instaladas. Esto hace que el directorio node_modules
# se la más optimo posible
RUN npm ci --only=production && npm cache clean --force

# Se usa el usuario node
USER node

###################
# PRODUCTION
###################
FROM node:18-alpine AS production
# Se copia la aplicación compilada del stage build a la imagen de producción
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env .

# Se inicia la aplicación usando el build de producción
CMD [ "node", "dist/main.js" ]
