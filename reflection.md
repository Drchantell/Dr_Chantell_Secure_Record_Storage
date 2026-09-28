Secure Record Storage Reflection


In this lab, I learned the difference between authentication and authorization. Authentication checks that a user is logged in. Authorization checks what that logged-in user is allowed to do.

The biggest change I made was adding the user field to each note. This lets the API remember which user owns each note. When a user creates a note, I save req.user._id with the note.

I also learned how to protect routes by comparing the note owner's ID with the logged-in user's ID. If the IDs do not match, the API sends a 403 Forbidden response. This stops one user from updating or deleting another user's notes.

The GET route was also important because it originally returned every note in the database. I changed it so it only searches for notes that belong to the logged-in user.

This lab helped me understand why secure applications need both authentication and authorization. A user being logged in does not mean they should have access to every record in the database.


Author: 
Dr. Chantell McDowell, 
Per Scholas Student