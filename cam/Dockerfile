FROM node:16-alpine
WORKDIR /app
ADD package.json .
RUN npm install
ADD . /app
EXPOSE 3000
CMD ["node", "./index.js"]