FROM node:10-alpine

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN yarn install

# for production
# RUN npm ci --only=production

COPY ./app .

ENTRYPOINT [ "node", "index.js" ]
