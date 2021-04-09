# Analisa
   + Analisa secara general flow game yang akan kita buat                  ✓
   + Analisa flow login dan register                                       ✓
   + Analisa flow game dan ketentuan masing-masing usecase                 ✓
   + Analisa schema database                                               ✓

# Perancangan
   + Merancang flow login dan registraso                                   ✓
   + Merancang flow game secara general                                    ✓
   + Merancang flow game secara spesifik dari masing-masing usecase        ✓
   + Merancang schema database                                             ✓


# Starter Template
   + Setup app.js                                                          ✓
   + Setup route with own folder (Routes)                                  ✓
   + Setup controller with own folder (Controllers)                        ✓
   + Setup model with own folder (Models)                                  ✓
   + Setup connection database with own folder (Database)                  ✓
   + Setup error handdler                                                  ✓

# Users
   + As a user, can register
      - Create schema and model Users                                      ✓
      - Create Endpoint register                                           ✓
      - Create controller.register                                         ✓
      - Encrypt password with bcrypt                                       ✓
      - Re-Check endpoint register with postman                            ✓

   + As a user, can login
      - Create endpoint login                                              ✓
      - Create controller.login                                            ✓
      - Compare bcrypt                                                     ✓
      - Sign jsonwebtoken                                                  ✓
      - Create middleware authentication                                   ✓
      - Create env and setup                                               ✓
      - Create middleware authorization
      - Re-Check endpoint login with postman

   + As a user, can see all resource townhall
      - Create endpoint detail resource
      - Create controller.detail
      - Re-Check endpoint detail with postman

   + As a user, can attack another player
      - Create endpoint attack
      - Create controller.attack with condition
      - Re-Check endpoint attack with postman


# Market
   + As a user, can create new market
      - Create endpoint create                                             ✓
      - Create schema market                                               ✓
      - Create controller.create                                           ✓
      - Re-check endpoint attack                                           ✓

   + As a user, can see all markets
      - Create endpoint get all markets                                    ✓
      - Create controller.getAll markets                                   ✓
      - Re-check endpoint getAll                                           ✓

   + As a user, can see detail market
      - Create endpoint get get one                                        ✓
      - Create controller.getOne market                                    ✓
      - Re-check endpoint getOne                                           ✓

   + As a user, can update the market
      - Create endpoint put market                                         ✓
      - Create controller.update market                                    ✓
      - Re-check endpoint update                                           ✓

   + As a user, can delete the market
      - Create endpoint delete market                                      ✓
      - Create controller.delete market                                    ✓
      - Re-check endpoint delete                                           ✓

   + As a user, can collect resource of market
      - Create endpoint collect
      - Create controller.collect
      - Re-check endpoint collect

# Farm
   + As a user, can create new farm
      - Create endpoint create                                             ✓
      - Create schema farm                                                 ✓
      - Create controller.create                                           ✓
      - Re-check endpoint attack                                           ✓

   + As a user, can see all farms
      - Create endpoint get all markets                                    ✓
      - Create controller.getAll markets                                   ✓
      - Re-check endpoint getAll                                           ✓

   + As a user, can see detail farm
      - Create endpoint get get one                                        ✓
      - Create controller.getOne market                                    ✓
      - Re-check endpoint getOne                                           ✓

   + As a user, can update the farm
      - Create endpoint put market                                         ✓
      - Create controller.update market                                    ✓
      - Re-check endpoint update                                           ✓

   + As a user, can delete the farm
      - Create endpoint delete market                                      ✓
      - Create controller.delete market                                    ✓
      - Re-check endpoint delete                                           ✓

   + As a user, can collect resource of farm
      - Create endpoint collect
      - Create controller.collect
      - Re-check endpoint collect

# Barrack
   + As a user, can create new barrack
      - Create endpoint create                                             ✓
      - Create schema barrack                                              ✓
      - Create controller.create                                           ✓
      - Re-check endpoint barrack                                          ✓

   + As a user, can see all barracks
      - Create endpoint get all barrack                                    ✓
      - Create controller.getAll barrack                                   ✓
      - Re-check endpoint getAll                                           ✓

   + As a user, can see detail barrack
      - Create endpoint get get one                                        ✓
      - Create controller.getOne barrack                                   ✓ 
      - Re-check endpoint getOne                                           ✓

   + As a user, can update the barrack
      - Create endpoint put barrack                                        ✓ 
      - Create controller.update barrack                                   ✓ 
      - Re-check endpoint update                                           ✓

   + As a user, can delete the barrack
      - Create endpoint delete barrack                                     ✓ 
      - Create controller.delete barrack                                   ✓ 
      - Re-check endpoint delete                                           ✓

   + As a user, can collect resource of barrack
      - Create endpoint collect                                            ✓
      - Create controller.collect                                          ✓
      - Re-check endpoint collect                                          ✓