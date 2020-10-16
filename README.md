# SSD - FRONT END PROJECT

## GROUP 4 - "BoomShakaLaka"

- The Team:

  - Crystal Kim
  - Juhwan Moon
  - Russell Telen
  - Nusorn Krachangtoy
  - Vlad Preduna

  Team roles/tasks as per Project Kanban

- Company name: "SHREDZ"
  - Description: Health & Wellness Hub
  - Purpose: Connect Health & Wellness Professionals with Customers, and faciliate Transactions direclty within the app
  - User base: General Users; Service Provider Users; Admins
  - Product Type: Fitness Program Membership, Services and Products

## Use Case Diagram

Moqups URL: https://app.moqups.com/YyMjjcMyRD/view/page/a2643d858
<br>
<img src="assets\use_case_diagram\Shredz_UCD.JPG" width="600px">

## Wireframe Prototype
<br>
<div style="display: flex;">
  <div style="width: 32%;">
    <img src="assets\wireframe_prototype\page1_landing.jpg" alt="landing page">
  </div>
  <div style="width: 64%;">
    <img src="assets\wireframe_prototype\page2_programs.jpg" alt="programs page" height="300px">
    <img src="assets\wireframe_prototype\page3_team.jpg" alt="team page" height="300px">
    <img src="assets\wireframe_prototype\page5_cart_and_checkout.jpg" alt="cart and checkout page" height="300px">
    <img src="assets\wireframe_prototype\page6_contact.jpg" alt="contact page" height="300px">
    <img src="assets\wireframe_prototype\page7_register.jpg" alt="register page" height="300px">
  </div>
</div>
<img src="assets\wireframe_prototype\page4_schedule.jpg" alt="schedule page" height="300px">

## General Layout

### Brand Color

#### Base colors

<img src="assets/color-palette/ color palette.png" alt="Highligting contents">

- Light blue - cfdbd5 - 207, 219, 213
- Light grey - e8eddf - 232, 237, 223
- Yellow - f5cb5c - 245, 203, 92
- Blackish - 242423 - 36, 36, 35
- Dark Grey -333533 - 51, 53, 51

#### Highlight color

<img src="assets/color-palette/green color.png" alt="Highligting contents"  />
   * Grey - 2d5931 - 45, 89, 49

#### Landing Page:

- Header with Logo
- Nav (Browse Links, Login/Register, View Cart)
- Featured Products ("Best Sellers") - Grid?)
- Intagram Promos (#Sweatyselfie)
- Footer with general contact & Social media

#### About / "Meet our team!"

- info page with Mission Statement
- Image Card for each team member

#### Contact (Form)

- User input form
- Contact info
- Map Location

#### Log & Sign-up Page

- Sign-up form initially hidden; jQuery slideToggle to open

#### View Products & Services

- Categorized Lists (each category = section)
  Examples: - Group training (scheduled classes) - different categories (MMA, Yoga, Cardio, Zumba, etc.) - Individual Personal Training (by appointment, charged per hour, instructors have different rates) - Detailed Info Drop-down (jQuery) - List of ALL products (categorized) - Side Bar (Filter/Navigation; list of all Categries @click takes to a section )

#### Program Page (Schedule)

- Scuedule Table for Classes
- Users can register directly into schedule
- Users can remove themselves from schedule

#### View Cart Page

- display user added items
- user can remove/modify
- user can access item details

#### Checkout Page ("confirm order"/"place order")

- Complete order:

  - prompt user to confirm
  - clears cart
  - modify user account history

- Cancel order:
  - clears cart)

### Nice to Have

- User Dashboard (via 'mock' Login)
  - "Hello Bob! Here's our latest!" --> Featured Products ("Best Sellers") - Grid?) ("Personalized")
  - Access Cart (hard-code a couple items)
  - Access User History (hard-code a few sessions and services)
  - Manage Account

### Bluesky

- Provider Dashboard (via 'mock' Login)
  - "Hello Chad! Here's our latest!" --> Featured Products ("Best Sellers") - Grid?) ("Personalized")
  - Access Cart (hard-code a couple items)
  - Access User History (hard-code a few sessions and services)
  - Manage Account
- Community Page
  - Filter Services by Providers (ordered by Rating)
  - Filter Services by Cateogry (Trainers, Nutritionists, Instructors)
  - in-app Messaging between Users and Health Professionals
- Library of Member Health Professional video content
  - Tiered membership system (pay-wall system)
  - Video Streaming
  - Various forms of information sharing (routines, meal plans, etc.)
- Excercise Routine App with direct input from Member Health Professionals
- Excercise/Nutrition Logs, track metrics/progress

### Technologies to be used

- jQuery for Website Appearance Functionality
- CSS/SASS for styling

### Notes:

- Research: take a look at other e-commerce sites; what components do they implement and why? Should you incorporate something similar? How would you go about doing so?

- Create your group Github repository and add a "project" using the automated Kanban template. Add your prioritized "issues" to the project. These should include all of the above

- decisions you've made as a team. Be sure to create a readme.md file with your repo and provide a description of your website as well as the technologies used and any supporting links or resources. A link to the assignment will be given on the first day of this module.
