# CI/CD Pipeline for Saayam API

## Branch Strategy
- **test** → Test env
- **dev** → Development env
- **main** → Production

## GitHub Actions
### CI (`.github/workflows/api-ci.yml`)
- Runs on PRs to test/dev/main
- Builds with AWS SAM; runs tests if present

### CD (`.github/workflows/api-cd.yml`)
- Runs on pushes to test/dev/main
- **Stubbed**: builds package only; no AWS deploy
- To enable deploy later:
  - Add OIDC role ARNs + `AWS_REGION` as repo secrets
  - Use `aws-actions/configure-aws-credentials`
  - Run `sam deploy` per branch
