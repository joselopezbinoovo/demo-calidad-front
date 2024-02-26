# FROM node:lts AS builder
FROM node:10-slim AS builder


WORKDIR /app
COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build

#CMD ng serve --host 0.0.0.0


FROM nginx:stable

COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/.htpasswd /etc/nginx/.htpasswd
COPY --from=builder /app/dist/demo-calidad-front/ /usr/share/nginx/html

EXPOSE 80
