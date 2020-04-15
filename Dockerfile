FROM node:latest

WORKDIR /home/cs806/ilend/ilend-products-service

COPY . .

RUN npm install

RUN npm run build

WORKDIR /home/cs806/ilend/ilend-products-service/dist

ENV NODE_ENV prod

EXPOSE 5001
CMD [ "node", "index.js" ]
