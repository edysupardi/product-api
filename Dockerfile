# Stage 1: Build
FROM node:22.11.0-alpine AS build

# Tentukan working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh project ke container
COPY . .

# Build aplikasi
RUN npm run build

# Stage 2: Production
FROM node:22.11.0-alpine

# Tentukan working directory
WORKDIR /app

# Salin hanya hasil build dari stage sebelumnya
COPY --from=build /app/dist ./dist

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install hanya dependencies yang diperlukan untuk production
RUN npm install --only=production

# Expose port aplikasi
EXPOSE 3001

# Jalankan aplikasi
CMD ["node", "--max-old-space-size=512", "dist/main.js"]
