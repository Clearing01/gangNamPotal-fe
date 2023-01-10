# build stage
FROM node:14-alpine as build-stage
ARG MODE
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build-prod

# production stage
FROM nginx:stable-alpine as production-stage

RUN apk add --no-cache tzdata && apk add vim

ENV LANG ko_KR.UTF-8
ENV LANGUAGE ko_KR:en
ENV LC_ALL ko_KR.UTF-8
# Set Timezone
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

## COPY nginx config
COPY custom-nginx.conf /etc/nginx/
RUN cat /etc/nginx/custom-nginx.conf > /etc/nginx/conf.d/default.conf


## log
RUN mkdir /logs
RUN chmod 777 /logs

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
