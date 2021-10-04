# MovieProject

1. This project was created for INCO Academy. This is a team project , We used github to collabrate.
2. We API used fot the project is TMDB.
3. The goal of the project is to create a web app to display movies, its ratings and providing an option for users to login and rate the movies.

# Task -

1. We created a hompage where all the popular movies are fetched from API and dispalyed.
2. The home page has options to search movies based on keywords,genres and a combination of both.
3. All the movies display a movie poster, name, rating(average rating from all users in your database), the loged in users rating, movie deatils.
4. When users click on movie details, an overview of the movie is dispalyed and users can rate the movies only if the user is logged in. It also has the feature of displaying the ratings, if the user has already rated the movie from our database.
5. If a user does not have an account,he/she can signup and create a new account.
6. In the sign up page, users will have to fill all input field, password and confirm-password should be same. Passwords are savd as a hash not as text in the database.When user logs in,the password user inputs will be matched with the hashed password.
9. We have created 2 tables in the database.One for storing the users details and second for storing the movie ratings.
10. The rating table saves the ratings along with the logged in User's user Id and movieId(Fetched from the API)

# Technology we used -
1. Node.js
2. Express
3. Ejs
4. bcrypt -  for converting the password in hash.
5. DATABASE - SQL AND PostgreSQL
6. We used Session for adding userId in cookies so we can use it for logout logic and also get rating by user login Id.

# This is how project will work

# Homepage -![Screen Shot 2021-10-04 at 5 34 14 pm](https://user-images.githubusercontent.com/59786494/135805095-a99db5d7-1c3b-46a1-8c83-22aeef6f4772.png)


# details page -

![Screen Shot 2021-10-04 at 5 41 31 pm](https://user-images.githubusercontent.com/59786494/135805174-bcdb44b8-5e50-4fa6-99d0-21733d3668e8.png)
 
 # After login
 
 ![Screen Shot 2021-10-04 at 5 41 17 pm](https://user-images.githubusercontent.com/59786494/135805200-b5c0f6f6-345f-483f-bea3-56d714d3dc05.png)

