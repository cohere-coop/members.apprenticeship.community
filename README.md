# Member Group for A.C
While A.C has great conversations in the slack channel on the regular; there's not much way to join a peer-group focused on a particular topic, share questions + show off + feedback requests (links + maybe uploads? to things).

## Running the App


1. Install Docker && Docker Compose
1. Install the node modules: `docker-compose run web npm install`
1. Run the image: `docker-compose up`
1. Migrate the database: `docker-compose run web ./node_modules/.bin/db-migrate up`
1. Seed the database: `docker-compose run web node seeds.js`
1. Visit `http://localhost:3000`
1. Log in with 'test@example.com:password'


## Workflow

* Issue is created
* Zee labels it with "will-do" and add it to a milestone
* Core team pull issues from current mile-stone and when they start them, label them with "started"
  * Start with a mockup? (Low fidelity sketch or whatever)
  * Submit a pull request immediately
  * Ask questions in Slack or in Github whenever uncertainty arises
  * Repeat until done!
