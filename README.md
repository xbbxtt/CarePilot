# CarePilot

- Shiran Xiao
- Genessy Munoz
- Sean Burch
- Jose Medina
- Stanley Dorosz

CarePilot – Experience the future of healthcare with our state-of-the-art virtual care platform that connects you with highly qualified doctors across a multitude of specialties, all from the comfort of your home.


## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting general consumers in health market who are looking for a quick face-to-face meeting with doctors.

## Functionality

<-- - Visitors to the site are able to make a reservation to see a dr.
- On the home page they will see a group of our doctors and what they specialize in. Along with our mission statement.
- Users will need to click on sign up to create a profile and it will direct them to their current reservations list.
- Once logged in, they can click the create reservation link in the reservations dropdown to make a reservation to see a dr.
- They can click the past reservations link in the reservations dropdown to take them to see their history of completed reservations.
- They can click on the clipboard icon in their current reservations page to take them to the details of that reservation where the can cancel their reservation with the red x, complete their reservation with the green checkmark, or edit their reservation with the yellow pencil.
- Completing the reservation will send it to the past reservations to see.
- In the update reservations page, patients can edit their insurance, reason for the visit, the date of the reservation, and the time of the reservation.
- Patients can access the details to their profile by clicking on the profile link at the top of the page in the nav bar.
- Once on their details page, patients can click on the yellow pencil to take them to their update information page where they can update their password and phone number.
- On any page, as well as using the home button to get home they can click either the company logo or name and it will take them back to the home page. -->

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create database_volume`
4. Run `docker compose build`
5. Run `docker compose up`
6. Go to `https://marketplace.zoom.us/` and login with your own zoom account
7. Click `Develop` -> `Build App`
8. Copy and add `Client ID` and `Client Secret` to .env
9. Go back to zoom marketplace and add `http://localhost:8000/callback` in the `OAuth Redirect URL` filed
10. In `Surface` tab, select `Meeting`, `Room` and `Phone`. Also enable `Zoom App SDK` and `Guest Mode`
11. In `Scopes` tap, add `meeting:write:meeting` and `zoomapp:inmeeting`
12. go to `http://localhost:8000/zoom` and finish authorization process. This will return access token which allows meeting link to be created.
13. Access token will expire in 1 hour. You need to repeat step 12 to get a new access token
14. `http://localhost:8000/url` can be used to confirm meeting url is generated
15. Out web application is ready to use. Feel free to create reservation!
