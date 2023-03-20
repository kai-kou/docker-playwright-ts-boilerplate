FROM mcr.microsoft.com/playwright:v1.20.0-focal

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . /app
