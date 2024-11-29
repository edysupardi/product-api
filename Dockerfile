# Gunakan node.js sebagai base image
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependency aplikasi
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Ekspos port aplikasi (Default nestjs port 3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start:dev"]