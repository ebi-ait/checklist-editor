# Step 1: Build
ARG DOCKER_REGISTRY=docker.io/library
FROM ${DOCKER_REGISTRY}/node:20-alpine AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM ${DOCKER_REGISTRY}/nginx:1.25.4-alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
