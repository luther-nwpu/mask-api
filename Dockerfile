FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY dist dist/
COPY package.json .
COPY processes.json .
COPY tsconfig.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose the listening port of your app
EXPOSE 10011

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2", "start", "processes.json", "--no-daemon" ]