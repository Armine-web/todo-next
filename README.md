#schema. migrate
npm install prisma --save-dev

#metod schema 
npm install @prisma/client

# .env, prisma/prisma
npx prisma init

#migrate
npx prisma migrate dev --name init

npx prisma studio

#validation
npm install zod

npm run dev
