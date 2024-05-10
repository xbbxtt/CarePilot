As team lead, I schedule and make plan during the stand down. Lead coding and debugging process.



Apr 15, 2024:
Volume created.
Docker up with no issue.
Create users, reservations and doctors tables in migrations.


Apr 17, 2024:
Add error handling for get user API.
Verify hashed password in database.


Apr 18, 2024:
Create update usern API.


Apr 23, 2024:
Remove our own created sign up API.
Modify provided sign up API to allow user to input more information and API output more information.


Apr 25, 2024:
Creat current reservation list frond end component.


May 01, 2024:
Consolidate our own created user queries into the original auth query
Modify api/auth/authenticate to give us everything we want
Remove user_id from put request
Remove useUserDetailQuery


May 01, 2024:
Move user update api into provided query and router
Modify user update component based on api changes
Optimize start reservation button in home page


May 02, 2024:
Creat get reservation unit test


May 06, 2024:
Create create doctor API
Create get doctor list API
Create get doctor API
Modify create reservation component to let user to select doctor from drop down list based on their full names


May 07, 2024:
Change date time format
Change drop down button style


May 07, 2024:
Use doctor api to pull doctor information for home page


May 10, 2024:
Create authorization for zoom API.
Get authorization code and exchange for access token from zoom server.
Create token table to store token in the database.
Create create meeting API by using access token to generate zoom meeting link.
Modify reservation table to include zoom meeting link column.
Modify reservation models to include zoom meeting link.
Modify reservation APIs to include zoom meeting link.
Modify frond end to show zoom meeting link in the reservation detail and current reservation list pages.
Modify unit tests due to API changes.
