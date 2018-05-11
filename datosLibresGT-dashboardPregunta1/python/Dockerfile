FROM python:3
#Install MongoDB.
#RUN \
#  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5 && \
#  echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list && \
#  apt-get update && \
#  apt-get install -y mongodb-org
  
#Install Python and Pip
RUN pip install pymongo && pip install requests

# Create app directory
WORKDIR /usr/src/app

#Copy files
COPY . . 


# Define default command.
CMD ["python", "./api.py"]
