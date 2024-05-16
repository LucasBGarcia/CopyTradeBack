FROM node:16.16.0-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

COPY --chown=node:node . .

# COPY ./.env.production ./.env

RUN  npm install 

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]