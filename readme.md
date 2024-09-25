# Instruction to setup this project
## _______________________________

1. git clone https://github.com/mohamedaflah/realestate_platform.git
2. cd client
   -> npm install
   -> setup .env based .env.local
   -> npm run dev
3. open new Terminal without closing existing terminal
4. cd server
   -> npm install
   -> setup .env based .env.local
   -> npm run dev

# Api doc
* User
 1. /api/user/user => POST => signupHandling
 2. /api/user/user => DELETE => logout handling
 3. /api/user/user => GET => get user with cookie

* Property
 1. /api/property/property => POST => add new property
 2. /api/property/property => DELETE => delete existing property
 3. /api/property/property => PUT => update property
 4. /api/property/property => GET => list all properties
 5. /api/property/withuser/:userId => GET => retrieving user posted properties
 6. /api/property/:propertyId => GET => retrieving single property with id

 



# Home page

[![Home page](/media/realestate.png)]()

# User or Seller Property add

[![Add new column](/media/image.png)]()


# more pages available