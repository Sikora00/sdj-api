FROM node:lts-stretch
ARG LOCAL_USER_ID

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y --fix-missing build-essential gcc g++ ca-certificates curl dos2unix ffmpeg sox libsox-fmt-mp3 mp3info libasound2-dev
# For Cypress headless
RUN apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y

RUN npm install -g pm2
RUN pm2 install pm2-server-monit
RUN pm2 install pm2-redis
RUN pm2 set pm2-redis:ip redis
RUN mkdir -p /app

COPY ./apps/backend/docker/dev /var/docker
RUN find /var/docker -name "*.sh" | xargs dos2unix

# Handle permissions
WORKDIR /var/docker
RUN ./handle-permissions.sh

WORKDIR /opt
RUN curl -L http://archive.debian.org/debian/pool/main/m/mp3gain/mp3gain_1.5.2-r2-2+deb7u1_amd64.deb > mp3gain.deb
RUN dpkg -i mp3gain.deb
WORKDIR /app

EXPOSE 58585
EXPOSE 58586
EXPOSE 58587
EXPOSE 8888
EXPOSE 8889

#ENTRYPOINT ["/var/docker/entrypoint.sh"]

CMD ["sh", "sleep", "infinity"]
