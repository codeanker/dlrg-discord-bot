FROM node:10.9.0-alpine
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


WORKDIR /app
RUN \
    apk add --no-cache ca-certificates && \
    apk add --no-cache --virtual .build-deps curl && \
    curl https://dl.min.io/client/mc/release/linux-amd64/mc > /usr/bin/mc && \
    chmod +x /usr/bin/mc && apk del .build-deps
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "serve"]
