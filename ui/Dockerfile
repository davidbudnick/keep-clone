FROM node:20-alpine as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
COPY .env .
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]