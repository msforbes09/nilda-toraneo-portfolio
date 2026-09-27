---
name: feedback-worktree-shell
description: The worktree guard refuses heredoc/compound shell commands, `cd` before git, and quoted/escaped binary paths; use the Write tool and bare commands
metadata:
  type: feedback
---

In this repo's worktrees, the isolation guard refused a `cd ... && mkdir ... && cat > file <<EOF`
command as "too complex to verify". Create files with the Write tool and keep git commands plain
and separate.

It also refuses: `cd <worktree>; git status` (run bare `git status`, the cwd is already the
worktree), and any command whose binary path has spaces (quoted or backslash-escaped), e.g.
headless Chrome at `/Applications/Google Chrome.app/...`. So no local headless screenshots; the
browser check is the `browser-checker` step's job. `cd <worktree>; npx ...` for non-git commands
works.

**Why:** the guard can't prove complex shell stays inside the worktree, so it blocks it.

**How to apply:** Write/Edit tools for new files; one plain git command per call (`git add`,
`git commit -F` for messages); don't try to work around the guard.
