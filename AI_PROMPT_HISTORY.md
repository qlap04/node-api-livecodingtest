# AI Prompt History

Tool used: **Claude (claude.ai)**

---

## Docker Debugging

**Prompt:** "eslint: not found khi build Docker, đây là Dockerfile của tôi: [paste Dockerfile]"  
**Insight:** AI giải thích `--omit=dev` bỏ qua devDependencies, hướng dẫn fix bằng `npm ci` + `npm prune --production` sau.

**Prompt:** "Container chạy nhưng curl bị connection reset by peer"  
**Insight:** AI chỉ ra `HOST=localhost` chỉ bind internal, cần `HOST=0.0.0.0` để nhận external traffic.

**Prompt:** "no pg_hba.conf entry... no encryption"  
**Insight:** AI giải thích AWS RDS yêu cầu SSL, cần `DATABASE_SSL=true`.

---

## CI/CD Debugging

**Prompt:** "ci.yml này có vấn đề gì? [paste file]"  
**Insight:** AI phát hiện 5 bugs: omit=dev trong lint, tag mismatch, image không share giữa jobs, credential hardcode, exit-code block pipeline.

**Prompt:** "Làm sao share Docker image giữa các GitHub Actions jobs?"  
**Insight:** AI giải thích từng job chạy runner độc lập, hướng dẫn dùng `docker save` + `upload-artifact` + `download-artifact` + `docker load`.

**Prompt:** "Deploy lên Render không cần Vercel, không hardcode credential"  
**Insight:** AI hướng dẫn dùng Render Deploy API với `curl -X POST` trigger từ CI, token lưu trong GitHub Secret.

---

## Security Review

**Prompt:** "Review repo này có vấn đề security gì?"  
**Insight:** AI phát hiện `.env` bị commit, `DATABASE_URL_B64` base64 trong workflow (base64 không phải encryption), hướng dẫn fix gitignore và dùng GitHub Secrets.

---

## Cách tôi dùng AI hiệu quả

- Luôn paste **error message thật** thay vì mô tả chung chung
- Hỏi **tại sao** fix như vậy, không chỉ copy paste
- Verify từng fix bằng `curl` trước khi chuyển bước tiếp theo
- Không để AI quyết định — AI đề xuất, tôi hiểu và confirm
