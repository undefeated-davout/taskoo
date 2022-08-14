FROM node:16.16.0-bullseye-slim

RUN apt update && apt install -y \
  default-jre \
  git \
  && apt autoremove && apt autoclean
RUN npm install -g firebase-tools

WORKDIR /opt/app/src

EXPOSE 4000
EXPOSE 5001
EXPOSE 8080
EXPOSE 9005
EXPOSE 9099

# ツール類
RUN echo "alias ll='ls -lahF --color=auto'" >> ~/.bashrc
