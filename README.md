# HabitYouHeard
[INSERT LOVELY DESCRIPTION OF IT HERE WOO]

Original project: [back-end](https://github.com/Jul-2022-LC-LiftOff/HabitYouHeard), [front-end](https://github.com/Jul-2022-LC-LiftOff/Habit-You-Heard-Frontend).  
Created by Micah Young, Raven Almira, Stève Levillain, Eric Smith, and Brandon Cope. This is Brandon's fork of the project.


## Installation
In order to view this project you need: Java, JavaScript, npm, an IDE that has runtime integration, and an open mind.

Use the following command in a directory you wish to install the project.  
&nbsp;&nbsp;&nbsp;&nbsp;
```
git clone https://github.com/CopeBrandon/HabitYouHeard.git
```

### Java
Install and use Java version 17. In order to install Java on Windows follow these instructions: [freecodecamp](https://www.freecodecamp.org/news/how-to-install-java-on-windows/).

Download IntelliJ or similar IDE. Instructions use IntelliJ as an example, so it will be easier that way.

Download a version of MySQL Workbench that has server functionality(the non-web, non-client version). We used version 8, and cannot confirm whether any other versions would work. [Here](https://education.launchcode.org/SQL/appendices/mysql-install.html) are some lovely instructions from the codecamp we took, LaunchCode, that will aid you in your installation journey. If this is your first time using MySQL Workbench, DO NOT forget your root password.
### JavaScript & React
Make sure that you have npm [installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

After instaling npm, route to the `Javascript` directory and run the command:  
```
npm install
```
to install the required dependencies. May take a while, sorry. :)  
After all of this you should have your project installed and ready for...

## Setup
### Back-end

#### MySQL Workbench. 
Open up Local Instance 3306 connection or add a new one.  


>Each step here is very important. Ensure that these instructions are followed to the letter.

<table>
<tr>
    <td valign=middle>
        1. Create new Schema called<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<code>habityouheard</code>
    </td>
    <td align="center">
        &nbsp;<br/>
        <img alt="Image showing how to create schema." src="readmefiles/createschema.png" width="60%"/><br/>
        &nbsp;
    </td>
</tr>
<tr>
    <td valign=middle>
        <br/>
        2. In MySQL, navigate to <br/>Administration -> Users and Privileges<br/>
        Click add account. Set login name and password at your whim.<br/>
        <b>Make sure that you take note of the login name and password.</b><br/><br/>
        3. Navigate to Schema Privileges.<br/>
        Click "add entry", selecting habityouheard as your schema.<br/>
        Click the Select “ALL” button
    </td>
<td align="center">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img alt="Image showing how to add an account and distribute priveleges." width="100%" src="readmefiles/add account.png"/>
    <br/>&nbsp;
</td>
</tr></table>

#### In IntelliJ
I would recommend running the back-end section of the project in its own IDE. If your folder was called HabitYouHeard, then you would open  
&nbsp;&nbsp;&nbsp;&nbsp;`HabitYouHeard/Java`  
Before bootRun, add the previously mentioned login name and password from your Add Account step and create [Environmental Variables](https://education.launchcode.org/gis-devops/configurations/02-environment-variables-intellij/index.html) in IntelliJ named: “DB_LOGIN” And “DB_PASSWORD” respectively. If your login name and password were set to username and password, it would look something like this:
``` 
DB_LOGIN=username;DB_PASSWORD=password;
```
>If you aren't using IntelliJ, you could add a gradle.properties file within the root folder of the Java section of the project. I laid out an example file that allows you to see how to structure it. You can place your DB_LOGIN and DB_PASSWORD inside of the gradle.properties file you would make-- not the gradle.properties.example file.

<table><tr>
  <td>
    <p>Since IntelliJ uses the Gradle wrapper, the easiest way to run the program is:</p>
    1. Opening the Gradle tab on the right side of the screen, near the notifactions tab.<br/>
    2. Expand the folders: habityouheard, tasks, application.<br/>
    3. If you haven't set your environmental variables, you can do so by right clicking bootrun and modifying the run condition.  <br/>
    4. Run the bootrun configuration.<!--Since IntelliJ uses the Gradle Wrapper, the easiest way to run the program is opening the Gradle tab, navigate to habityouheard -> Tasks -> application -> bootrun.--></td>
  <td> _____________________________________________________________________<img src="readmefiles/bootrun.png" alt="Image displaying bootrun instructions" width="100%"/>
</td></tr></table>

>If you are not using IntelliJ, you can use the bootRun task by typing in the following terminal command while inside of the root folder of the Java section: `./gradlew bootRun`

The API can then be accessed at [http://localhost:8080](http://localhost:8080) via Postman or another tool to access endpoints. Specific endpoint routes can be found by inspecting the Controllers. 

To stop running the project in IntelliJ, there's a red square you can press to stop, or just close it.
### In the Front-end
This is a lot simpler. Once you have npm installed, navigate to the Javascript portion in your terminal, so if your folder was called HabitYouHeard  
then you would open  
&nbsp;&nbsp;&nbsp;&nbsp;`HabitYouHeard/JavaScript`  
and then run the following command:
```
npm start
```
and it will run, deploying the react side of the project. It should open the page on your browser, but if it doesn't you can type localhost:3000 into your navbar of choice and it will route you to our project.

To stop running the project, press ctrl+c in the terminal or close it.

# Clean Up
If you wish to clean up the project after having installed it, make sure that you uninstall MySQL Workbench (it uses resources when not being used) and delete all project files. Easy as.
