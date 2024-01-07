FROM node:21-alpine3.17 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -D typescript
ENV VITE_MY_SERVER=http://aa263ceaeb6dd45418b20af642b0e53e-586295319.eu-central-1.elb.amazonaws.com/banner/api
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]