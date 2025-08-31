# Node for Next.js (dev image)
FROM node:20-alpine

WORKDIR /app

# Install OS deps occasionally needed for node modules
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* .npmrc* ./
# Use one of these depending on your lock file:
# RUN npm ci
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "run", "dev"]
