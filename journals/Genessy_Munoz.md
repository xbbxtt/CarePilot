Week 13 (4/8 - 4/11)
This week we primarily worked on coming up with project ideas and overall goals for it. Deciding
on making a medical telehealth website and stanley was able to create our logo. It was also decided then that we were going to do mob programming - setting up a rotation so we all could make sure everyone got a chance to contribute. We ended up naming our team "Missing One" as part of a inside joke that somehow atleast team member was absent for the day or out for sections of it.
In terms of specific planning, we were able to create our wireframe & database diagram.
_____________________________

Week 14 (4/15 - 4/19)
Today, we started writing code for our project. Our docker setup went smoothly

4/15
- I worked on creating our base pydantic models for reservations and doctors
- Updating user model class to have a UserUpdate class
- Created a pool.py file in queries and removed unnecesary imports in doctors.py

4/17
- Created create-reservations router
- Created reservations repo/queries
- Created insert doctors table
- Updated main.py to register queries router

4/18
We learned about bootstrap and tailwind css in lecture today. Ultimately after discussing, we decided to go with bootstrap since none of us are
really super confident with CSS and bootstrap seemed to be easier/faster to use.
_____________________________

Week 15(4/22 - 4/26) - This week we started working on our frontend as well, yay!

4/24
- Gutted out an ununsed code: deleted auth provider, construct file and delete other unnecessary code.
- Created store.js
- Created apiSlice.js
- Created nav.jsx
- Created functionality for authentication
- Finished logout functionality for website

4/26
- Added bootstrap to project
- Created index.html and home.jsx
- Implemented pastReservations list, created form
- Edited currentReservations, past Reservations and error Notification to implement error message when user is not logged in and tries to access reservations

Week 16(4/29 - 5/3)
- This week we got a lecture on CI/CD, our team is interested in deploying

4/29
-Implemeneted the cancel and finished appointment button in details page

5/3
- Created first unit test for reservations, testing our create_reservations/
We had struggled with creating this unit test trying to figure out why it kept failing, the issue ended up being we needed to return a user Response instance for fake_try_get_jwy_uder_data () instead of a dictionary and syntax errors with our status code statement and a print statement

Week 17 (5/6 - 5/10)
This week was really focused on cleaning up frontend and making everything look pretty. We ended up watching through "Net Ninja's" bootstrap crash course tutorial and that was extremely helpful in creating many componenets in our frontend. We also had a bit of a disagreement between team members on whether we should have an additional collapsible side bar, some members thought it wasn't necessary since our nav bar could host all necessary actions since our websites functionality is pretty simple for mvp. But others member thought in the future for stretch goals and future deployment, it would be good to have that set up so once we do start adding extra functionality - we would have that set and could implement. In the end, for mvp decided to stick with no side collapse bar but will implemenet in the future as stretch goal.

5/7
- Created sideNav bar componenet
- CSS on navbar, home page

5/8
- Updated JSX and CSS to not override bootstrap
- Fixed get current reservation to include doctors image
- Updated CSS on footer to get it touch all of bottom and sides

5/9
- Updated CSS on reservation details page
- Added update button to resveration details
- Updated doctors migration table to add new image links for docs
- Updated nav bar for logo/title to be clickable and naviate to home when presseHas some issues with merge conflict once again! ugh
