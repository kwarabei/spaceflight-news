FROM node:18

# RUN curl -f https://get.pnpm.io/v7.16.js | node - add --global pnpm
RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

# Files required by pnpm install
COPY package.json .

RUN pnpm install

# Bundle app source
COPY . .

EXPOSE 5173
CMD ["pnpm", "run", "dev"]