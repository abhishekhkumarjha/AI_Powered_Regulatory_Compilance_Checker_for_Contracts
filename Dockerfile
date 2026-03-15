FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY python-requirements.txt ./
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 python3-pip \
  && pip3 install --no-cache-dir -r python-requirements.txt \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV BACKEND_PORT=4000

EXPOSE 4000

CMD ["node", "backend/server.js"]
