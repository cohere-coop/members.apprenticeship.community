FROM node:5.0

COPY . /src

EXPOSE 3000
WORKDIR /src
CMD ["node", "/src/index.js"]
