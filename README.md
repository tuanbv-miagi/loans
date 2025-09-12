# Run database
create database loans_db

# Run source backend
- cd ./backend
- npm install

# Run migrate
- npx prisma migrate dev --name init

# Run source frontend
- npm install

# Run project
- npm run dev