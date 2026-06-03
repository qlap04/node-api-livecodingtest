FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN npm run lint

ENV NODE_ENV=production
ENV HOST=localhost
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
