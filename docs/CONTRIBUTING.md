# PR Guidelines

## Naming Commits and Branches

Create branches off our development branch, `dev`. Include a summary of the feature in addition to the JIRA ticket (formatted in caps). Ex: `add-buttons-WCS-123`

Guidelines for commit messages:

- Use active voice
- Include JIRA ticket number in brackets

### Squash and Merge

If you Squash and Merge your PR, be sure that the final commit has the PR number in the title (GitHub will automatically do this for you):

```
[WCS-123] Implement PDP header (#456)
```

Before squashing, please remove (preferred) or consolidate the automatically generated PR description. A consolidated description can be in simple bullet format:

```
- Created the PDP template
- Fixed modal tests
```

### Rebase and Merge

If you Rebase and Merge your PR, each commit should follow proper formatting:

```
[WCS-789] Define Catalog endpoints
[WCS-789] Wire up Catalog container
[WCS-789] Implement Catalog page styles
```

## Merging PRs

Please choose one of the following methods when merging your PRs:

1. [Squash and Merge](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#squash-and-merge-your-pull-request-commits)
   Good if code can be collapsed into one meaningful commit.

2. [Rebase and Merge](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#rebase-and-merge-your-pull-request-commits)
   Good if all commits will be valuable in the git history.

The current configuration will automatically delete the branch upon merging but if this fails, delete the branch manually.

### Branching off branches

In some cases you might want to branch off of a branch created by yourself or a teammate while you wait for an open PR to be reviewed and merged. (This should be done with caution because that open PR might change!)

If the base branch is still an open PR when you're done with your work, you may open a PR against that branch. When the base branch is merged, update the base branch of your PR to `dev`. **Do not** merge your PR into a branch other than `dev`.

## Submitting PRs

- Prefer small PRs to make code easier to review and get merged
- Use **human readable** titles on PRs, including JIRA tickets numbers:

```
[WCS-123] Setup readme file
```

- Give detailed description of what your PR addresses; use images, links, or videos to provide context
- Assign **yourself** to the PR
- When iterating on a feedback, use the "Resolve conversation" button to mark the item as complete
- Use [granular commits](https://dev.to/wes/opening-a-pr-a-primer-4kgc#commits)
  to separate chunks of work to make code easier to review. It's especially important to isolate "noisy" changes like an extra div that adds indentation on every line of a component
- Be explicit if your PR is a work-in-progress (use the `WIP` label)
- Before assigning reviewers, add inline comments on your PR for areas of code where you're looking for particular feedback or that require extra explanation

For all PRs that involve creating/updating stories, be sure to:

- Include a link to the relevant ticket(s)
- Include a link to the relevant story in Storybook (eg: https://`branch`.steer.now.sh/storybook/index.html?path=`path-to-the-story`)

Also be sure to add links to QA branch (eg: https://qa.steer.now.sh/storybook/index.html?path=`path-to-the-story`) to our **Storybook tickets** to help QA.

## Assigning Reviewers

You do not need to assign specific developers to review your PR. Since one team is working on this project, we can use our judgment on which PRs to review. In general, developers should try to achieve a balance by reviewing parts of the code they know well, and other parts they are less familiar with.

However, you can assign reviewers if you want to specifically request their feedback on your work.

Please assign the entire `w-c-reviewers` group for changes you think the whole team should be aware of. These would include new conventions or big structural changes to the code.

Since not all team members will be looking at all PRs, important discussions should also be posted in the **#simpletire-development** Slack channel to increase visibility.

## Giving Feedback

- Be intentional in how you review a PR:

  **Approve:**
  Code is OK to be merged. Any comments or suggestions left can be implemented according to the author's discretion. Code does not need to be re-reviewed after these changes.

  **Request Changes:**
  At least one comment must be addressed before merge (make sure it's clear which comments are must-change). After changes have been made, the reviewer that requested changes can re-review, or, another reviewer can dismiss their review and review on their behalf.

  **Comment:**
  Does not count as an approval, but adds comments or questions the author can address at their discretion.

- For optional comments on change requests, start them with hints such as "_(optional)_", "_(minor)_", or "_(nit)_" to indicate their intent.
