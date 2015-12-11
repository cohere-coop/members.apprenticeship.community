FROM node:4.2.3

COPY . /src

EXPOSE 3000
WORKDIR /src
CMD ["node", "/src/index.js"]
