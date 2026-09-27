---
name: feedback-worktree-shell
description: The worktree guard refuses heredoc/compound shell commands that write files; use the Write tool instead
metadata:
  type: feedback
---

In this repo's worktrees, the isolation guard refused a `cd ... && mkdir ... && cat > file <<EOF`
command as "too complex to verify". Create files with the Write tool and keep git commands plain
and separate.

**Why:** the guard can't prove complex shell stays inside the worktree, so it blocks it.

**How to apply:** Write/Edit tools for new files; one plain git command per call (`git add`,
`git commit -F` for messages).
