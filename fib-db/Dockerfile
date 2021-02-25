## Pull the mysql:5.7 image
FROM mysql:5.7

## The maintainer name and email
MAINTAINER Hariprasad Sundaresan  <hariprasad.sundharesan@gmail.com>

# database = fibdb and password for root = password
ENV MYSQL_DATABASE=fibdb \
    MYSQL_ROOT_PASSWORD=password

# when container will be started, we'll have `fibdb` database created with this schema
COPY ./create-db.sql /docker-entrypoint-initdb.d/
