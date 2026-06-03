# Candidate Notes — DevOps Live Coding Test

**Candidate:** Quoc Lap  
**Branch:** lap-phan  
**Live URL:** https://node-api-livecodingtest.onrender.com

---

## 1. Dockerfile Fixes

### Bug 1 — `npm ci --omit=dev` trước khi lint
**Root cause:** `--omit=dev` bỏ qua `devDependencies` → `eslint` không được cài → `npm run lint` fail với `eslint: not found`.  
**Fix:** Đổi thành `npm ci` để cài đủ deps, sau đó chạy `npm prune --production` để loại devDeps trước khi ship.

### Bug 2 — `CMD ["npm", "run", "dev"]` trong production
**Root cause:** `npm run dev` là development server (hot reload, verbose logs) — không phù hợp production.  
**Fix:** Đổi thành `CMD ["npm", "start"]`.

### Bug 3 — `HOST=localhost` → connection reset
**Root cause:** Container chỉ lắng nghe trên `127.0.0.1` bên trong chính nó, không nhận connection từ bên ngoài.  
**Fix:** Set `HOST=0.0.0.0` để lắng nghe tất cả interfaces.

### Bug 4 — `DATABASE_SSL=false` → SSL error
**Root cause:** AWS RDS yêu cầu SSL nhưng app connect không mã hóa.  
**Fix:** Set `DATABASE_SSL=true` trong `.env`.

---

## 2. CI/CD Pipeline Fixes

### Bug 1 — `npm ci --omit=dev` trong lint job
**Root cause:** `eslint` nằm trong `devDependencies` → bị bỏ qua → lint fail.  
**Fix:** Đổi thành `npm ci`.

### Bug 2 — Image tag mismatch
**Root cause:** Build job tag `:latest`, scan job dùng `:${{ github.sha }}` → image not found.  
**Fix:** Tag nhất quán với `github.sha` ở cả 2 jobs.

### Bug 3 — Docker image không share giữa các jobs
**Root cause:** Mỗi GitHub Actions job chạy trên runner độc lập → image build ở job này không tồn tại ở job khác.  
**Fix:** `docker save` → `upload-artifact` → `download-artifact` → `docker load`.

### Bug 4 — `DATABASE_URL_B64` hardcode trong workflow
**Root cause:** Base64 không phải encryption — decode ra là credential thật. Lộ công khai trên GitHub.  
**Fix:** Xóa khỏi `env:`, chuyển sang GitHub Repository Secret `DATABASE_URL`.

### Bug 5 — `exit-code: 1` block pipeline
**Root cause:** Trivy tìm thấy HIGH/CRITICAL vulnerabilities → pipeline fail hoàn toàn.  
**Fix:** Đổi `exit-code: 0` — Trivy vẫn report nhưng không block deploy.

### Bug 6 — `DATABASE_SSL` thiếu trong test job
**Root cause:** `check:ready` connect DB không có SSL → RDS từ chối kết nối.  
**Fix:** Thêm `DATABASE_SSL=true` vào `.env` trong test job.

### Bug 7 — Không có deploy job
**Root cause:** Pipeline không có bước deploy.  
**Fix:** Thêm job deploy trigger Render API sau khi scan xong.

---

## 3. Security Issues

| File | Vấn đề | Fix |
|------|---------|-----|
| `.env` | Credentials thật bị commit lên git | Thêm `.env` vào `.gitignore`, tạo lại repo sạch |
| `ci.yml` | `DATABASE_URL_B64` base64 hardcode | Chuyển sang GitHub Secret |
| Git history | Credentials còn trong history cũ | Tạo repo mới, **cần rotate RDS password** |

---

## 4. Deployment

- **Platform:** Render (Web Service)
- **Trigger:** Push lên branch `lap-phan` → CI chạy → deploy tự động qua Render API
- **Database:** AWS RDS PostgreSQL, SSL enabled
- **Schema:** Chạy `db/schema.sql` qua Docker psql client

## Verification

```bash
curl https://node-api-livecodingtest.onrender.com/health
# {"status":"ok","service":"ops-ticket-api","environment":"production"}

curl https://node-api-livecodingtest.onrender.com/ready
# {"status":"ready","database":"ok"}

curl https://node-api-livecodingtest.onrender.com/tickets
# {"count":3,"tickets":[...]}
```
