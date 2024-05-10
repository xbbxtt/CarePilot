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

<!-- - Visitors to the site can take a home or body scent profile quiz that will filter Smelli Belli’s products to match their tastes:
  - A home quiz to find them a home product that matches their scent profile
  - A body quiz to find them a body product that matches their scent profile
- Users can click on suggested products to go to product detail page to either wish list or add to cart
- Products page for a plain list view of all products
- Accounts
- Employees can add new products, view/search inventory, and update inventory stock
- Wish list for registered accounts so users can build a list of products based on their preferences/quiz results and save those grouped products for later
- About Page with company info, ingredient sourcing info, and FAQ
- Social Media Links/Contact at the footer
- Contact => Email or Help Chat via Facebook Messenger for questions/suggestions
- Main Page features popular products and quizzes
- The cart features products that was added from the product page
  - update quantity with an increment and decrement counter
  - can checkout and will populate the order end point -->

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
