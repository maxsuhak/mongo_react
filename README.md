rails+mongoid+react test app
===================

## Testing

Current functionality is covered by rspec and jest tests.
```ruby
$ rubocop -a
Inspecting 23 files
.......................

23 files inspected, no offenses detected
```

```ruby
$ rspec
Run options: exclude {:feature=>true}

Api::V1::UsersController
  GET #index
    returns success response
    returns json

Users
Capybara starting Puma...
* Version 4.3.7 , codename: Mysterious Traveller
* Min threads: 0, max threads: 4
* Listening on tcp://127.0.0.1:38239
  visit users page
  page has table

User
  is expected to include Mongoid::Document
  is expected to be a Mongoid document with timestamps
  is expected to have fields named "email", "first_name", and "last_name"
  has a valid factory
  is invalid with invalid attributes

Api::V1::UsersController
  routing
    routes to #index
    routes to #show
    routes to #create
    routes to #update via PUT
    routes to #destroy

Finished in 3.88 seconds (files took 1.42 seconds to load)
14 examples, 0 failures
```

```ruby
$ yarn test
yarn run v1.22.5
$ NODE_PATH=$NODE_PATH:./app/javascript NODE_ENV=test jest
 PASS  spec/javascript/users/index.spec.js
  New
    ✓ matches snapshot (6 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        2.316 s
Ran all test suites.
Done in 3.01s.
```
