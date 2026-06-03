# AI Prompt History

Tool used: **Claude (claude.ai)**

---

## Docker Debugging

**Prompt:** "eslint: not found when building Docker. Here is my Dockerfile: [paste Dockerfile]. Why is this happening and how do I fix it?"
**AI Insight:** `--omit=dev` skips devDependencies so eslint is never installed. Fix: use `npm ci` to install all deps, then `npm prune --production` after lint to strip devDeps before shipping.

**Prompt:** "Container starts but curl returns connection reset by peer. What is wrong?"
**AI Insight:** `HOST=localhost` binds only to the container's internal loopback — external traffic is rejected. Fix: set `HOST=0.0.0.0` to listen on all interfaces.

**Prompt:** "Getting error: no pg_hba.conf entry, no encryption. Database connection fails inside container."
**AI Insight:** AWS RDS requires SSL for all connections. Fix: set `DATABASE_SSL=true` in environment variables.

---

## CI/CD Debugging

**Prompt:** "Here is my ci.yml. What bugs does it have and why do they cause failures? [paste file]"
**AI Insight:** Five bugs identified:
1. `npm ci --omit=dev` in lint job — eslint missing
2. Build tags `:latest`, scan references `:$sha` — image not found
3. Each job runs on an isolated runner — Docker image does not persist between jobs
4. `DATABASE_URL_B64` is base64 hardcoded in workflow — base64 is not encryption, credential is exposed
5. `exit-code: 1` causes Trivy to fail the entire pipeline on any vulnerability

**Prompt:** "How do I share a Docker image between GitHub Actions jobs without a registry?"
**AI Insight:** Each job runs on a fresh isolated runner. Solution: `docker save` to tar → `upload-artifact` → `download-artifact` in next job → `docker load`.

**Prompt:** "How do I deploy to Render from GitHub Actions without hardcoding credentials?"
**AI Insight:** Use Render's Deploy API endpoint with a POST request. Store `RENDER_API_KEY` and `RENDER_SERVICE_ID` as GitHub Repository Secrets.

---

## Security Review

**Prompt:** "Review this repository for security issues. What credentials are exposed and how should I fix them?"
**AI Insight:** Three issues found:
1. `.env` with real credentials committed to git — add to `.gitignore`, recreate repo clean
2. `DATABASE_URL_B64` base64-encoded in workflow — base64 is reversible, not encryption; move to GitHub Secret
3. Credentials remain in git history — repo was recreated; RDS password should be rotated

---

## How I Used AI Effectively

- Always pasted **real error messages** instead of vague descriptions
- Asked **why** each fix works, not just what to change
- Verified every fix with `curl` before moving to the next step
- AI suggested — I understood and confirmed before applying
- Never blindly copy-pasted — every line was reviewed and explained
