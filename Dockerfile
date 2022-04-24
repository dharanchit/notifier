FROM node:10

WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./

COPY src ./src
RUN ls -a
RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "dev" ]