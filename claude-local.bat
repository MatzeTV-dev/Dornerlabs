@echo off
set ANTHROPIC_AUTH_TOKEN=ollama
set ANTHROPIC_BASE_URL=http://localhost:11434
claude --model gpt-oss:20b %*