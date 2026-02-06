# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Run tests
CMD ["npx", "playwright", "test"]