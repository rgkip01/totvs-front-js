FROM node:12.2.0-alpine

# set working directory
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --unsafe-perm --silent
COPY . .
# start app
CMD ["npm", "run", "serve"]