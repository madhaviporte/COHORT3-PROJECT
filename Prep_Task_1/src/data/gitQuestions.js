export const gitQuestions = [
  {
    id: 1,
    question: 'How do you resolve a merge conflict in Git?',
    answer: `When a merge conflict occurs, Git marks the conflicting sections inside the affected files using conflict markers (<<<<<<<, =======, >>>>>>>). To resolve it:

1. Open the conflicting file(s) and look for the markers.
2. Decide which change to keep — yours, the incoming branch's, or a combination of both.
3. Remove all conflict markers manually.
4. Stage the resolved file with: git add <filename>
5. Complete the merge with: git commit

Example: If you and a teammate both edited the same line in index.js, Git cannot auto-merge it. You open the file, pick the correct version, remove the markers, then commit.

Tip: Use a visual merge tool (e.g. VS Code's built-in diff editor or git mergetool) to make this easier.`,
  },
  {
    id: 2,
    question: 'What is the difference between git merge and git rebase?',
    answer: `Both commands integrate changes from one branch into another, but they work differently:

git merge:
- Creates a new "merge commit" that ties the histories of both branches together.
- Preserves the full history, including when branches diverged.
- Safe to use on shared/public branches.
- Example: git merge feature-branch

git rebase:
- Moves (replays) your commits on top of another branch's latest commit.
- Produces a linear, cleaner history with no merge commits.
- Should NOT be used on shared/public branches because it rewrites commit history.
- Example: git rebase main

Rule of thumb: Use merge for shared branches (main, develop). Use rebase to clean up your local feature branch before opening a pull request.`,
  },
  {
    id: 3,
    question: 'How do you revert a commit that has already been pushed?',
    answer: `There are two safe approaches depending on your situation:

Option 1 — git revert (recommended for shared branches):
Creates a new commit that undoes the changes of the target commit without rewriting history.
  git revert <commit-hash>
  git push

This is safe because it does not alter existing history — it just adds a new "undo" commit.

Option 2 — git reset (only for local/private branches):
Moves the branch pointer back, effectively removing the commit from history.
  git reset --hard <commit-hash>   # dangerous: discards changes permanently
  git push --force

Warning: Never force-push to a shared branch. It will overwrite other people's work.`,
  },
  {
    id: 4,
    question: 'How do you remove a file that was accidentally committed?',
    answer: `If you committed a file (like .env or a large binary) that should not be tracked:

Step 1 — Remove it from Git tracking without deleting it locally:
  git rm --cached <filename>

Step 2 — Add the file to .gitignore so it is never tracked again:
  echo ".env" >> .gitignore

Step 3 — Commit the changes:
  git add .gitignore
  git commit -m "Remove .env from tracking and add to .gitignore"

Step 4 — Push to remote:
  git push

Note: If the file contained sensitive data (passwords, API keys), you should rotate those credentials immediately because the file still exists in the Git history.`,
  },
  {
    id: 5,
    question: 'How do you safely undo changes in Git?',
    answer: `The right command depends on how far along the changes are:

1. Undo changes in the working directory (not staged yet):
   git restore <filename>        # discard changes to a specific file
   git restore .                 # discard all unstaged changes

2. Unstage a file (staged but not committed):
   git restore --staged <filename>

3. Undo the last commit but keep your changes in the working directory:
   git reset --soft HEAD~1

4. Undo the last commit AND discard changes (destructive — use carefully):
   git reset --hard HEAD~1

5. Undo a pushed commit safely:
   git revert <commit-hash>      # creates a new "undo" commit

Always prefer non-destructive approaches (restore, reset --soft, revert) unless you are absolutely sure of what you are undoing.`,
  },
];
