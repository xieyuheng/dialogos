FROM node:14
COPY . .
EXPOSE 3000/tcp
CMD ./bin/little.js book books/the-little-typer.xml
