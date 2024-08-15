# TalentTrade

TalentTrade is a marketplace web app designed for people with various skills and trades to connect and exchange their services.

## Motivation

TalentTrade aims to solve several common problems:

- **High Cost of Services**: Many people find it expensive to hire professionals for various services. TalentTrade allows users to trade their services instead of paying with money, making it a cost-effective way to obtain needed services.
- **Underused Skills**: Skilled individuals often have talents that are underused because they lack opportunities to showcase them or can't find clients. TalentTrade provides a platform for users to showcase their skills.
- **Time Wasted Searching for Service Providers**: Finding services or clients through traditional methods can be inefficient and frustrating. TalentTrade uses a matchmaking algorithm to make it easier for users to find local matches for service exchanges.

The platform is designed to build trust within the community through user reviews and ratings, and efficiently match users based on their skills, needs, and location.

## Technologies Used

### Frontend

- **React**: Chosen for its component-based architecture and community of existing components/packages. In addition, it is easy to learn and prototype on, which suits the time constraint of this course well.
- **Vite**: Its dev-tooling is very useful.

### Backend

- **Django REST Framework**: We wanted to conform to REST for our backend to mimic industry standards. We selected Django REST Framework for its robustness, built-in features, and rapid development.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Python and pip installed on your machine.
- install Redis on your machine and have it running in a terminal.

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install the required npm packages:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install the required Python packages:

   ```sh
   pip install -r requirements.txt
   ```

3. Apply database migrations:

   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Initialize the World Cities database:

   ```sh
   python manage.py populate_worldcities
   ```

5. Apply Migrations for django_celery_beat app:

   ```sh
   python3  manage.py  migrate django_celery_beat
   ```

6. Open a new terminal and start Celery Worker

   ```sh
   celery -A backend worker --loglevel=info
   ```

7. Open a new terminal and start Celery Beat

   ```sh
   celery -A backend beat --loglevel=info
   ```

8. Start the Django development server:

   ```sh
   python manage.py runserver
   ```

## Running the Application

Once both the frontend and backend servers are running, you can access the application in your web browser at `http://localhost:5173`.

## Contribution: the process for contributing to this project.

- **1. Do we use git flow?**
  Yes, to make it more organized. Using git flow will allow us to split up our project and make it easier to manage and review each feature more conveniently. Gitflow also provides a clear structure for managing our branches, which makes it easier to follow the development process.
- **2. What do we name our branches?**
  The Main branch is “main”, the Develop branch is “develop” and the Feature branches follow the format “feature-**_” where _** is the feature name
- **3. Do we use github issues or another ticketing website?**
  We use Jira for tracking user stories. Jira allows us to track and assign user stories to group members.
- **4. Do we use pull requests?**
  Yes, pull requests are used to merge feature branches into the develop branch to have other members review and test the features.
