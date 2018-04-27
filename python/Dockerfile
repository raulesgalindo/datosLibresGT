FROM debian:8

#Install MongoDB.
RUN \
  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5 && \
  echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list && \
  apt-get update && \
  apt-get install -y mongodb-org
  
#Install Python and Pip
RUN \
    apt-get install -y python-dev build-essential && \
    apt-get install python-pip && \
    pip install pymongo && pip install requests

COPY entry-point.sh /entry-point.sh
COPY ./app /app

ENTRYPOINT [ "/entry-point.sh" ]

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["python", "/app/api.py"]

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017