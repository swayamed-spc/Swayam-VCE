FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev && \
    npm cache clean --force

COPY src ./src
COPY server.js ./server.js
USER node

EXPOSE 4001

CMD ["node", "server.js"]