# DevOps Live Coding Test: Ops Ticket API

| Field | Value |
| --- | --- |
| Duration | `60 minutes` |
| Type | `AI-assisted DevOps debugging` |
| AI Tool | `Codex` |

## Context

You are joining a DevOps team. A developer created a small Node.js API called **Ops Ticket API**. The API should expose basic health, readiness, metrics, and ticket endpoints backed by PostgreSQL.

The application has not been successfully shipped yet. Your job is to inspect the repository, identify what is broken, fix the smallest set of issues, and prove your fixes with real verification.

The interviewer will provide `DATABASE_URL` at the start of the test.

## Before You Start

Make sure you can:

- access this private GitHub repository,
- push a branch to the repository,
- run Docker locally,
- use Codex during the session.

The interviewer will not point out where the issues are. Use command output, logs, GitHub Actions, and Codex to investigate.

## Rules

- You may use Codex throughout the exercise.
- Inspect real files and command output before changing anything.
- Do not hardcode credentials.
- Do not delete quality, security, or CI checks just to make the result look green.
- Avoid broad application rewrites unless logs or tests prove they are needed.
- Own every change you make and be ready to explain it.

## Work Branch

Start from `main`, create a new branch for your work, then commit your changes there.

```bash
git switch main
git pull
git switch -c your-name/live-coding
```

Use small, meaningful commits. Do not work directly on `main`.

## Starting Points

```bash
npm install
npm run lint
npm test
```

Explore the rest of the repository yourself. Decide what else needs to be verified locally and in GitHub Actions.

If you need a database connection string, ask the interviewer.

## Public Endpoint Deployment Bonus

Getting the baseline workflow working is the priority. Deploying a public endpoint is bonus work. If you finish early, deploy the API as a **Render Web Service**.

If you deploy, include the Render public endpoint URL and the deployment verification evidence in your notes.

## Expected Outcome

By the end of the session, the repository should be in a safe, working state for the baseline DevOps workflow.

You should submit:

- committed code changes,
- a green GitHub Actions run,
- Render public endpoint URL and evidence, if you attempted the bonus deployment,
- updated notes in this README,
- an `ai-history.md` file,
- any remaining risks or unfinished items.

## AI History

Create `ai-history.md` before submitting. Keep it concise and factual:

- main prompts you asked Codex,
- useful suggestions from Codex,
- suggestions you rejected or manually verified,
- commands or evidence used to verify fixes,
- remaining risks.

Do not claim something passed unless you actually verified it.

## Evaluation

| Area | Weight |
| --- | ---: |
| Debugging and verification | 30 |
| Docker and runtime readiness | 20 |
| GitHub Actions CI | 20 |
| Security and secret management | 15 |
| AI fluency and communication | 15 |

## Candidate Notes

Write your findings, fixes, verification, and remaining risks here.
