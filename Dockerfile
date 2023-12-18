# FROM node:lts AS builder
FROM node:10-slim AS builder

WORKDIR /app
COPY . .
RUN npm install && \
    npm run build:prod


FROM nginx
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/bsi-qf-front/ /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/js/env.template.js > /usr/share/nginx/html/assets/js/env.js && exec nginx -g 'daemon off;'"]