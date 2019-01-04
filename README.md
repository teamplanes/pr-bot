## Planes Project GitHub Bot

- [x] Block merge until all items in a checklist are marked as complete
- [ ] Authenticate with Scrumpy
- [ ] Fetch `scrumpy.projects` prop in package.json of repo
- [ ] Derive Scrumpy tickets from PR title and/or body
- [ ] Write checklist updates to srumpy comments 

### Current PR/QA Process

1. Scrumpy ticket is created and added to sprint
2. Developer starts on tickets assigned to them, and as they start, they move the ticket to the 'Doing' colum on Scrumpy
3. Once the ticket is finished the developer pushes the fix/update to GitHub and created a pull request
4. The PR is created using the Repo's pull request template, the template auto creates a checklist with:
  - [ ] Code complete
  - [ ] Code reviewed
  - [ ] QA complete
5. Once the developer is happy that the feauture/fix is complete they check the 'Code complete'
6. Another developer will now review the code and mark the PR as 'Approved' (or changes requested)
  - Each PR requires at least 1 code review
7. Once code reviewed, the reviewer will also check the 'Codde reviewed' box in the body of the PR
8. Its now ready to be QA'd, the PR's code will have been auto-deployed under a unique URL via Now, the QA can find it by clicking 'View details' on the status of the PR
9. If the QA passes, then they'll check the 'QA complete' box of the PR, which will result in the state of the PR as 'success' (using the bot in this repo)
  - If it fails QA, then the reviewer will note the problem on Scrumpy and the PR will remain in a 'failed' state
10. The PR is then merged into master
