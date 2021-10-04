# MovieProject

1. This Project is shared by INCO Academy. This is team project , We used github to collabrate.
2. We used API (TMDB) to get all the movies.
3. We have to make web app where user can login to rate a movie.

# Task -

1. We create a hompage where we can see all the popular movies coming from API.
2. In homepage ther is search and and genres selction , you can search the movie.
3. Every movie display with picture, name, rating(average rating from all user in your database), your rating, movie deatils.
4. When user click on movie details use can see the details and user can rate the movie, but onlu login user can rate the movie,and if user already rated the movie then it has to display their from database.
5. Only existing user can rate the the movie.
6. If you are not user you can signup with signup page.
7. In sign up you have to fill all input field and also password and confirm-password should be same. And password will be save in database as a hash not as text.When user login password will be match with the hash password.
8. After the login user can rate the movie.
9. We create a 2 table one is for user details and second is for rating.
10. In rating table rating should be with the login user Id and movieId(getting from API)

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

