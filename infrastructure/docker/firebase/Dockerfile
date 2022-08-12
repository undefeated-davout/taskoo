FROM node:16.16.0-bullseye-slim

RUN apt update && apt install -y default-jre
RUN npm install -g firebase-tools

WORKDIR /opt/app/src

EXPOSE 4000
EXPOSE 4400
EXPOSE 4500
EXPOSE 5000
EXPOSE 5001
EXPOSE 8080
EXPOSE 8085
EXPOSE 9099
EXPOSE 9199
EXPOSE 9229

# ツール類
RUN echo "alias ll='ls -lahF --color=auto'" >> ~/.bashrc
