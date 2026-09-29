Secure Record Storage Reflection

In this lab, I learned more about how authentication and authorization work together.

Authentication checks that I am logged in. Authorization checks what I am allowed to do after I log in.

One of the main things I learned was how to connect each note to the user who created it. I did this by adding a user field to the Note model and saving req.user._id with each new note.

I also learned how to protect records so one user cannot update or delete another user's note. I compared the note owner's ID with the logged-in user's ID before allowing those changes.

Another important part of this lab was the GET route. I made sure it only returns notes that belong to the logged-in user instead of returning every note in the database.

I used MongoDB Atlas for the database and Mongoose to connect my app to MongoDB and create my models.

I also used timestamps: true in my Note model. This lets Mongoose automatically add createdAt and updatedAt fields to each note.

This lab was challenging because I had to learn how several parts work together, including JWT tokens, bcrypt, MongoDB, Mongoose, and route protection. After working through it, I understand much better how to keep user records private and secure.

Author: Dr. Chantell McDowell, Per Scholas Student
