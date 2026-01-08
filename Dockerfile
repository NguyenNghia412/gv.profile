
FROM node:22.12.0-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy rest of the source code
COPY . .

# Build the app (set production mode)
ENV NODE_ENV=production
RUN npm run build


FROM node:22.12.0-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the necessary output from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose the port
EXPOSE 3000

# Run Next.js in standalone mode if available
# (Next.js 14 automatically creates .next/standalone when built with output: 'standalone')
CMD ["npm", "run", "start"]
