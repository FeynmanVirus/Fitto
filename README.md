# Fitto
#### Video Demo:  https://youtu.be/SXfYLLnsl7E
#### Description:
Fitto is a web app to track calorie intake and calories burned through physical activities done on a day to day basis by the user. The user can input what they ate on a particular day to be prompted a table of all the possible food items associated to that food item (for example when a user inputs "Pizza" they'll be prompted a list of differnet kinds of pizzas like pepperoni pizza, cheese pizza, margarita, etc. 

It also has an activity tracker where the user can input the physical activites they've done on that day to count the amount of calories burned on that day. They are prompted with the same kind of table as the calorie tracker (for eg: For input "Skiing" the user will get a list of the activity "Skiing" with different levels of effort exerted. The web app records all this data in a database to provide the user with useful data like avg calorie consumed, what time of day they consumed the most calories and the least calories. 

The web app also uses a Javascript library called Chart.js to create charts to visualize the data for the user. The charts are used to showcase the calories consumed, calories burned and calories remaining on that day. A chart to showcase the consituents(macro-nutrients) of a particular food item is also prompted when searching for the food item in the calorie tracker section. 

A modal appears as the user clicks on the "See Details" button and add it after customizing to their needs (for eg: different serving sizes or specify the time of day they're having that food item). The user is also given a Quick Add button to add the food item per 100g of serving size. 

The user is required to input their email and password as a required field at the time of registration and the age, height, weight and sex being an optional field. The avg calorie intake is based on the user's age, height, weight, sex, and their goal that they choose at the time of registration. The user is given 3 options to choose as their goal: 1. Maintain weight, 2. Gain weight, 3. Lose weight. Then the backend logic calculates the BMR(Body Metabolic Rate) and TDEE(Total Daily Energy Expenditure) of the user and determines the daily goal intake of calories based on the goal. 

The backend logic is not as thorough as other mainstream apps around who also take into consideration the macro-nutrients' requirements and determine daily macro nutrients intake as well, that functionality has not been given to the user yet. The web apps' web pages are PC-exclusive, which means they are not responsive to mobile/tablet screens. This has been done deliberately to keep the community exclusive (I'm kidding, I didn't want to go through hell one more time for the sake of mobile users who are never going to use this app.)

The tech used:

```
Vanilla HTML, CSS, JS for the frontend
Chartjs for data visualization
Django(Python) for the backend
```

