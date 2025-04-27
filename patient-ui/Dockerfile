# Build aşaması
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Serve aşaması
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Eski default html dosyalarını temizle
RUN rm -rf ./*

# Yeni build dosyalarını kopyala
COPY --from=build /app/dist/patient-ui/browser .

# Nginx ayar dosyasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf
