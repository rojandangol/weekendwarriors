
# docker docs: https://docs.docker.com/guides/nodejs/
FROM node:18.15

# WORKDIR /golf-tips-for-the-weekend-warriors/GolfTipsServer

WORKDIR /app

#install app dependencies
COPY package*json ./
RUN npm install

#Bundle app source
COPY . .

# Expose the port your app runs on
# EXPOSE 3000

# RUN npm install

#runnning the command
CMD ["npm" , "start"]


# CMD ["node" , "server.js"]

#-t is for naming the image
#build: docker build -t express .

# u use docker run & then the name of the image
#run: docker run express

#have to run this to specify the port
#run: docker run -p 3000:3000 testing1

# need to redbuild docker if server.js has been updated.
