FROM node:22.12.0 as builder

WORKDIR /app
COPY . .
ENV CI=0
RUN npm ci && npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
RUN mkdir /etc/nginx/templates
COPY .nginx/nginx.conf.template /etc/nginx/templates/default.conf.template
