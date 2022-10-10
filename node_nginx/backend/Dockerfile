FROM node:15 as builder

WORKDIR /var/www/backend

RUN apt-get update && apt-get install -y wget
COPY ./package.json .
COPY ./index.js .
RUN npm install --save

FROM node:15-alpine
WORKDIR /var/www
COPY --from=builder /var/www/backend .
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN ln -s public html
EXPOSE 3000
CMD ["node", "index.js"]

