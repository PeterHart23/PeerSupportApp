# PeerSupportApp
This application was created as a way for CSU students to connect with each other while monitoring their personal mental health. The app has a search page to find other students and see what their major, academic level, and interests are. Once a fellow student has been found, they can be added as a friend and the chat functionality is unlocked between the two. Also, the main page contains an EMA (Ecological momentary assessment) which is basically a short survey that tracks how the student’s behaviors and school life is currently going. This app helps improve students’ mental health by connecting students with common interests and providing a way for students to track their personal mental health.

# Design and Implementation 
The app was created using React Native while Google Firestore was used to store all the data online and the dependencies were managed using yarn. Using React allowed for the app to be run on both android and iOS devices which makes the overall development process much quicker. Firestore was chosen since it was free and simple to implement. 
The first page of the app displayed is the login page where the user can enter their email and password to sign in, or if they don’t have an account yet, there is a button at the bottom to open the register page. When the Sign In button is selected, a function is run that checks in the firebase authentication to see if the entered email and password are an existing match in the database and if not, then an error is printed. The register page allows the user to fill out their personal data such as username, name, major, academic level and etc. When the register button is selected, each field is checked to make sure it is filled out while the password has a check to make sure it is at least six characters long. If the data is all good, then it is all sent to firebase and the email and password is used to create a new user while the rest of the data is stored in a ‘users’ collection. When the login or registration is successful, App.JS will recognize the auth state change and navigate to the home page which is the EMA survey.

![Picture1](images/Picture1.png) ![Picture2](images/Picture2.png)


The EMA page works by displaying eight different questions about daily practices and mental well-being. All the textinputs are inside of a scrollview since they wouldn’t all fit in one page. When the submit button at the button is selected, all the questions are checked to make sure they are filled out and then all the data from the questions is sent to firebase and stores them in a collection named ‘ema.’ 

![Picture3](images/Picture3.png) ![Picture4](images/Picture4.png)


The profile page draws all the data stored in the firebase under the “users” collection for the current user. The followers and following numbers are also stored in firebase for each user and updated when a user is followed. Selecting the ‘Edit Profile’ button opens a page that allows the change of the displayed fields. It has an option to set/change the users profile picture. Finally the edit profile contains the logout button that when clicked runs the firebase signout function.

![Picture1](images/Picture5.png) ![Picture1](images/Picture6.png)

  
The search page has a TextInput that when text is entered, runs a querybyusername in firebase and displays the names in a flatlist below it. Clicking on a profile opens that users profile page where they can be followed and or messaged. Selecting the message button opens the chat page. 
  
  ![Picture1](images/Picture7.png) ![Picture1](images/Picture8.png)

The chatlist page displays all ongoing chats with other users and if there is a new message, the chat with the new message will be highlighted blue. In addition, the chat icon at the bottom has a notification badge on it. Selecting a chat from the list will open the chat page where messages can be sent from one user to another. The chat allows for the sending of pictures and videos. These messages are stored in firebase inside a collection named ‘chats’ which then holds another collection for each message.
  
  ![Picture1](images/Picture9.png) ![Picture1](images/Picture10.png)

Firestore authentication was setup using the simple email and password option. Each user created has a unique User UID generated for it that is used to keep track each user and it’s data.
In the images below, it can be seen that the UID for phart@gmail.com corresponds to the selected document under the “users” collection in the next image. This is where all the user’s personal data is stored. 

![Picture1](images/Picture11.png) ![Picture1](images/Picture12.png)
  
Below are more images showing how the firebase storage works. The first image contains the EMA scores for the selected user UID. The second image shows how the chat storage works. Each chat has a unique UID for it. Selecting the messages collection under a chat UID will display each message sent inside a document.
  
![Picture1](images/Picture13.png) ![Picture1](images/Picture14.png)

# Problems 
The first problem encountered was the difference in emulators. Something may work perfectly fine running on an iPhone but when it’s ran on an android, it acts completely different and vice versa. For example, on Android the send button inside the chat page automatically moves up when the keyboard is opened. However, on an iPhone, the button stays right where it is so the keyboard covers it up, making it impossible to actually send a message. Another example is buttons that display the text normally on an iPhone show up as a box inside another box on an Android. The final problem run into was running the app on the web browser. A typeError kept displaying for the web version that didn’t appear on either mobile device. After doing research online, it is found to be a problem that others are having with no notable solutions.

# Conclusion 
In summary, a React Native app was created in conjunction with Google Firebase. This app works as a social platform for CSU students to find other students with common interests and reach out and message them. This app also provides an EMA survey that tracks the state of a student’s current mental and behavioral health.
