FROM node:8 as builder
ADD ./ /src
WORKDIR /src
RUN npm install --production
RUN mv node_modules prod_node_modules
RUN mv src/config prod_config
RUN npm install
RUN npm run compile

FROM node:8-alpine
COPY --from=builder /src/build/src /app
COPY --from=builder /src/prod_node_modules /app/node_modules
COPY --from=builder /src/package.json /app
COPY --from=builder /src/prod_config /app/config
WORKDIR /app
USER node
CMD ["npm", "run", "start"]