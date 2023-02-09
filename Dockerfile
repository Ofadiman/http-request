FROM node:18.13.0-bullseye-slim@sha256:bc946484118735406562f17c57ddf5fded436e175b6a51f827aa6540ba1e13de as builder

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm build

FROM gcr.io/distroless/nodejs18-debian11:nonroot as production

USER nonroot

COPY --from=builder --chown=nonroot:nonroot /dist/index.js /home/node/index.js

ENTRYPOINT ["/nodejs/bin/node", "/home/node/index.js"]
