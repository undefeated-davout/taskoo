FROM node:16.18.0-bullseye-slim

RUN apt update && apt install -y \
  git \
  && apt autoremove && apt autoclean

WORKDIR /opt/app/src

EXPOSE 3000
EXPOSE 6006
EXPOSE 9229

# ツール類
RUN echo "alias ll='ls -lahF --color=auto'" >> ~/.bashrc
