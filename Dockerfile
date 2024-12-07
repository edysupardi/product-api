# Gunakan Node.js sebagai base image
FROM node:18-alpine

# Tentukan working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies

# Salin seluruh project ke container
RUN npm install
COPY . .

# Build aplikasi
RUN npm run build

# Expose port aplikasi
EXPOSE 3001

# Jalankan aplikasi
# CMD ["npm", "run", "start:dev"]
CMD ["node", "--max-old-space-size=512", "dist/main.js"]
