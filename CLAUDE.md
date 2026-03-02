# Claude Code Instructions for ultra-home-repair

## Git & Deployment Workflow

### Autonomous Git Operations
You are authorized to:
- **Commit changes directly** after making edits (no need to ask for confirmation on each commit)
- **Push to main branch** after committing (no need to ask for approval before pushing)
- **Create feature branches** for larger changes if needed
- **Merge PRs** if they pass basic checks

**Exception:** Only ask for confirmation if:
- Destructive operations (force push, hard reset, deleting branches)
- Major refactoring or architectural changes
- Anything you're uncertain about

### When working on changes:
1. Edit files as needed
2. Review changes with git diff if helpful
3. Commit with clear, concise messages
4. Push to appropriate branch (main for direct changes, feature branch if needed)
5. Keep user informed of what was done, but don't wait for GitHub-specific approvals

### Communication Style
- Be concise and direct
- Show what was changed (file paths and brief descriptions)
- Let me know when changes are live/deployed
- Don't ask "should I push?" - just do it and tell me it's done

---

*Last updated: March 2, 2026*
