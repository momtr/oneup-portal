FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --only=production
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]