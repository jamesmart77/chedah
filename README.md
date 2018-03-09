<h1>Chedah</h1>

Master Branch: [![CircleCI](https://circleci.com/gh/jamesmart77/chedah.svg?style=svg)](https://circleci.com/gh/jamesmart77/chedah)

<p>Is the fear of having to overlook your expenses and budgets preventing you from starting a side hustle? Does the word budgeting make you uncomfortable? If there was a way you could just overlook your finances vs. spending time on tracking them, would you go out and start a side gig? </p>
<h2>Lucky for you, there is Chedah!</h2>

![Alt Text](https://media.giphy.com/media/5fBH6zoAQg9dHK2ttsc/giphy.gif)



<p>Chedah aims to focus on the "Gig Economy" by allowing users to link their business accounts to a user-friendly dashboard. Users can track everything from their monthly expesnes to their own persoanl business goals. Chedah takes the burden of tracking expenses, so that users can focus on what really matters, making CHEDAH</p>

<h2>Technologies Used</h2>
    <h3>Authentication</h3>
    <ul>
        <li>Plaid API: https://plaid.com/docs/api/</li>
        <li>Auth0: https://auth0.com/</li>
    </ul>
    <h3>Databases</h3>
    <ul>
        <li>Redis: https://redis.io/</li>
        <li>MongoDb: https://www.mongodb.com/</li>
    </ul>
        <h3>Continuous Integration and Testing</h3>
        <ul>
             <li>Jest: https://facebook.github.io/jest/</li>
             <li>CircleCI: https://circleci.com/</li>
        </ul>
<<<<<<< HEAD

<h1>Starting the app locally<h1>

<p>Start by installing front and backend dependencies. While in this directory, run the following commands:<p>

=======
     
<h1>Starting the app locally</h1>

<p>Start by installing front and backend dependencies. While in this directory, run the following commands:<p>
>>>>>>> 5b4dd491ee059371e0179f1bfb58fc7b811f0002

```
yarn install
cd client
yarn install
cd ..
```


After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Setting up Mongo


1. Install `node-mongo-seeds` globally:

    ```
    npm install -g node-mongo-seeds
    ```

2. Run the seed command:

    ```
    seed
    ```
