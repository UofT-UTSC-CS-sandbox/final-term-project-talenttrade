# Talent Trade

## Iteration 3

 * Start date: Tuesday, Jul 9
 * End date: Friday, July 19

## Process

#### Changes from previous iteration

* No major process changes from previous iteration

#### Roles & responsibilities

Suhani: Suggested post algorithm
Joyce: Sort by rating and frontend visuals
Antonio: Finish profile and help with chat
Max: User chat and notifications 

#### Events

Iteration Planning:
* July 9 (in person)
Standups:
* July 12 (online): check-in
* July 14 (online): check-in
* July 16 (in person): check-in
* July 19 (online): final review

#### Artifacts

* Jira tickets for each subtask in each story (e.g. backend, DB model, frontend) Teammates will assign tickets to themselves on Jira

#### Git / GitHub workflow

After completing a feature, we create a pull request from the feature branch to the dev branch. Someone else will review the code. If there are merge conflicts, they will leave a comment for the person who made the pull request and have them fix the conflicts. The person who made the pull request is responsible for the merging. We chose this workflow because the person who worked on the feature understands it the best so they should be the one to make any of the changes that are required. Outside of someone else reviewing the code, the feature branch is entirely managed by the person working on that feature.

We will continue to use the same naming convention for feature branches (feature-___ ).


## Product

#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

Our goal for this iteration is to finish leftover user stories from the previous sprint, complete the chat system, and create a matching algorithm to help users find more jobs relevant to them. Once the chat is done users will be able to find jobs, talk with the other person, and complete jobs with that completion reflected on their profile. A matching algorithm will help users easily find more jobs that are relevant to them. Additionally, finishing the user profile will give users more control over their website identity and sorting by rating will help users find jobs by more reliable users. Finally, the frontend visuals, specifically for the homepage, are being updated to give the website more identity.
* Unfinished Sprint 2 backlog
	* sort-by rating
	* fix profile
* User chat
* Recommendation algorithm
* Update frontend visuals

#### Artifacts

* A functional chat that users can use to message each other to discuss the details of a post 
* A functional recommendation algorithm that will filter posts based on posts the logged-in user may consider. 
	* These recommendations will be sent as an email notification to the user.
