# Talent Trade

## Iteration 2

 * Start date: Tuesday, June 25
 * End date: Friday, July 5

## Process

#### Changes from previous iteration

* Use the story ID/Task ID in our git commit messages
    * Success metric: Reviewing the commits ensuring they contain story ID/task ID
* Create and update backend API documentation
    * Success metric: all backend paths and their endpoints have documentation

#### Roles & responsibilities

Suhani & Joyce: Filtering and searching for posts and search for users
Antonio: Profile view and edit system. Will work with Max to integrate profile with ratings and reviews after it is done
Max: Ratings and reviews. Will work with Antonio to integrate ratings and reviews after profile is complete

#### Events

Iteration Planning:
* June 25 (in person)
Standups:
* June 28 (online): check-in
* June 30 (online): check-in
* July 2 (in person): check-in
* July 5 (online): final review

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

Our goal for this iteration is to be able to search for posts as well as filter them by location, and sort by ratings. We want to be able to search for a user by their name. We will also create a user profile page and users will be able to leave ratings and reviews.
* Search, filtering and sorting
* User profile and editing
* Ratings and reviews

#### Artifacts

* A functional search that can have the results filtered on its own page
* A build of the user profile that can both be viewed by another along with the user themself.
