
# Running the App

1. Install Docker && Docker Compose
1. Run the image: `docker-compose up`
1. Migrate the database: `docker-compose run web ./node_modules/.bin/db-migrate up`
1. Seed the database: `docker-compose run web node seeds.js`
1. Visit `http://localhost:3000`
1. Log in with 'test@example.com:password'
