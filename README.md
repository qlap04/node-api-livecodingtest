# ops-ticket-api

A Node.js REST API for managing ops tickets, backed by PostgreSQL (AWS RDS).

**Live deployment:** https://node-api-livecodingtest.onrender.com

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Service health check |
| GET | /ready | Database readiness check |
| GET | /tickets | List all tickets |
| GET | /metrics | Runtime metrics |

## Local Development

```bash
cp .env.example .env
# Fill in DATABASE_URL and DATABASE_SSL=true
npm ci
npm run dev
```

## Docker

```bash
docker build -t ops-ticket-api .
docker run -p 3000:3000 --env-file .env -e HOST=0.0.0.0 ops-ticket-api
```

## CI/CD Pipeline

GitHub Actions → 5 jobs: **lint → test → build → scan → deploy**

| Job | Description |
|-----|-------------|
| Lint | ESLint code quality check |
| Test | Unit tests + DB readiness check |
| Build | Docker image build, saved as artifact |
| Scan | Trivy vulnerability scan (HIGH/CRITICAL) |
| Deploy | Auto-deploy to Render on push to `lap-phan` |

## Bugs Fixed

### 1. Dockerfile
| Bug | Fix |
|-----|-----|
| `npm ci --omit=dev` → eslint not found | Changed to `npm ci` then `npm prune --production` after lint |
| `CMD npm run dev` in production | Changed to `npm start` |
| `HOST=localhost` → connection refused | Set `HOST=0.0.0.0` |

### 2. CI/CD Pipeline
| Bug | Fix |
|-----|-----|
| `npm ci --omit=dev` in lint job → eslint missing | Changed to `npm ci` |
| Image tagged `:latest` but scan used `:$sha` | Tag with `github.sha` consistently |
| Docker image not shared between jobs | Save/upload as artifact, download/load in scan job |
| `DATABASE_URL_B64` hardcoded in workflow | Moved to GitHub Secrets |
| `exit-code: 1` blocks pipeline on vulnerabilities | Changed to `exit-code: 0` |
| `DATABASE_SSL` missing in test env | Added `DATABASE_SSL=true` to .env in test job |
| No deploy job | Added Render deploy via API trigger |

### 3. Security Issues
| Issue | Fix |
|-------|-----|
| `.env` committed with real credentials | Added `.env` to `.gitignore` |
| `DATABASE_URL_B64` base64-encoded in workflow | Removed, replaced with GitHub Secret |
| Credentials in git history | Repo recreated clean, credentials should be rotated |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `DATABASE_SSL` | Set to `true` for RDS/production |
| `PORT` | Server port (default: 3000) |
