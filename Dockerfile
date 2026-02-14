# Step 1: Build (Heavy image for compiling)
FROM node:20-alpine AS builder

# Define the working directory
WORKDIR /app

# Copy only the dependencies files to optimize the Docker cache
COPY package*.json ./

# Install ALL dependencies (including devDependencies like TypeScript)
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript into JavaScript (generates the /dist folder)
RUN npm run build


# Step 2: Production (Lightweight and secure image)
FROM node:20-alpine

WORKDIR /app

# Copy the dependencies files
COPY package*.json ./

# Install only the dependencies needed to run the app
RUN npm install --omit=dev

# Copy only the compiled code from the previous step
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 3000

# Lancer l'application compilée
CMD ["node", "dist/app.js"]