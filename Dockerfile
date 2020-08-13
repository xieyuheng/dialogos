FROM node:14
COPY . .
EXPOSE 3000/tcp
CMD BOOKS=books npm run dev
