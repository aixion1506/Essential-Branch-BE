# base image
FROM node:18

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
RUN npm install

# copy app files
COPY . .

# build the project
RUN npm run build


# 기본 명령 설정
ENTRYPOINT ["npm", "run"]

# start the app
CMD ["start"]


# expose the port the app runs on
EXPOSE 3000
