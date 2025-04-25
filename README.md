# Cat-Distribution-System 🐈

### **Cat Adoptions Application - React, Java Spring Boot, PostgreSQL**

Last Readme update: 25/04/2025

https://github.com/user-attachments/assets/b029250c-f09c-4180-84ed-92a58435e61d

## Current functionalities:
- CRUD operations - add, deleting and updating a cat entity
- Sorting by name or age
- Filtering by name
- Showing cats by age groups (kittens/adult cats/senior cats)
- Dynamic Pagination -> Infinite pagination or page size selection
- Displaying cat details in a detail window
- Starting a cat generation thread which perpetually adds cats to the list, generated using faker (in the front end) and [The Cat API](https://thecatapi.com/)
- Statistics chart of the cats' age categories
- Switching between data from the backend to in-list data from the frontend in case the server is offline or network connection is unavailable
- Any operations performed on the backend/frontend data will be performed on the other as well in case of a sudden switch
- Operations on the backend are performed using the **REST architectural style**
- Created tests for the frontend and the crud operations on the backend
### Currently working on the implementation of the database for the data in the backend, using PostgreSQL !
