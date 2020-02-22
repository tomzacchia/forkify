# [Forkify.io](https://rawcdn.githack.com/tomzacchia/forkify/8f75d4d018c030c48ba0a2254e91364f141d7ffb/dist/index.html)

![App](https://github.com/tomzacchia/forkify/blob/master/app_img.png)

Forkify.io is an applicaton made using HTML, CSS, JS and Webpack. In developing this project the following concepts were explored in detail:
- **Webpack**: Writing Webpack configuration file from scratch
- **MVC Pattern**: Separating concerns through the implementation of the Model View Controller design pattern
- **API Requests via Axios**: Making asynchronous API requests using the Axios library **Imporant note below**
- **Event Delegation**: Delegating handling user interactions to parent nodes
This project was created as part of the video series 
[The Complete Javascript Course 2019 by Jonas Schmedtmann](https://www.udemy.com/course/the-complete-javascript-course/).

# NOTE (IMPORTANT)
- I made use of Forkify-api by Jonas Schmedtmann which is based on food2fork API however it is **limited to the following keywords: "pizza", "bacon" and "broccoli"**. This API is used in place of food2fork since multiple students have had problems with food2fork, namely trouble routing their requests via a proxy to avoid CORS errors, as such Jonas made a simpler version of the API

# Lessons learned
- **Advanced JS Concepts**:  Throughout working on this project it became evident that in the past I had taken a lot of advanced JS concepts for granted, such as closures, IIFEs, Modueles etc... Jonas does a great job of explaining these concepts in depth, which allowed me to make use of them throughout the application. What I enjoyed most about working on the application was the use of Modules, in particular how the use of Modules allows developers to separate concerns and isolate code.
- **UI Flow Diagrams**: It is very easy to get lost in the big picture when starting a project. There tends to be a lot of overthinking, which delays the coding process. I'm not trying to say that one should always jump straight into code, however getting lost in the weeds is equally unproductive. The architecture planning that was done prior to coding helped to overcome this hurdle and provides a reference throughout the coding process.
