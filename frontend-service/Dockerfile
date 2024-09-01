FROM node:22 AS base
WORKDIR /app

COPY package*.json ./

RUN npm ci

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install -g nodemon
RUN npm install --save-dev ts-node
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
ENV NODE_ENV=production
COPY . .
RUN npm run build

# Production stage
FROM node:22 AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3001
CMD ["npm", "start"]
