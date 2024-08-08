FROM node:20-slim

ENV HOST=0.0.0.0
ENV PORT=7420
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS=--max_old_space_size=4096

COPY . /app
WORKDIR /app

RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build

HEALTHCHECK --interval=1s --timeout=1s --start-period=1s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

CMD node build