# Contact Engine Challenge - Brandon Lawrence

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

# How to install and run project

1) Clone the repo to your local machine

2) Open the project in your preferred IDE or editor

3) Run ‘npm install’ to install dependencies

4) Run ‘ng serve’ to run the application after ‘npm install’ has completed

# Setting up the server

1) Open the ContactEngineApi folder

2) Within the folder, access ContactEngineApi\ContactEngineApi\ContactEngineApi

3) Open your CLI within the directory

4) Run ‘dotnet run’

# Application logic 

## Server Not Running:

If you haven’t run the server, the application will load and present the user with an error message stating that the server is currently down. The only field that will be available for use will be the SMS Provider field, however the Countries Select field will be disabled due to having no data to populate it with. As both of these fields are required, the form submission button will also be disabled.

## Server Running:

If the server is running, the form will be available for full use. The SMS Provider field will allow entry of characters but will be set to invalid if any special characters (excluding whitespace) or numbers are entered. Providing this form value only has characters entered, it’ll be deemed valid.

The Country Select field will be populated with the response from the countries endpoint, allowing the user to choose from an array of countries. If no country is selected this field will be deemed invalid as it’s a required field. 

When both form fields have valid values the submit button will be available to click. Once the user submits form data, if the request is successful a dialog will appear indicating that the request was successful. The user can either click out or click a go back button which will default the form to its original state and allow the user to re-enter new values. If the request fails, a user will be presented with a snackbar message indicating that either there was an error or that a provider already exists. This logic is dependent on the type of error.

# Architecture

I used container and presentational components to create a parent to child relationship between the forms and the sms-post-form component. Forms was rather an abstract name for the folder, however this was decided with the idea of scalability in mind. 

The main aim was to leave my presentational components to deal with UI based functionality while leveraging my container component to deal with endpoint calls and state manipulation. The child will emit events which the parent component will respond to, ultimately creating a loop of actions between parent to child and likewise. 
 
# Assumptions

When developing the application, I had several assumptions to simplify the project scope:

1) The user will be redirected to the form page. No other navigation will be added.

2) The SMS Providers will only contain characters and not special characters or numbers.

# Improvements For The Application

1) If I had more time I would have implemented a dynamic form-builder which will reduce the sms-post-form and any other forms that could be added in the future. The form builder component will take form field and style configuration and generate the form based on this.

2) Use a responsive breakpoint library (Bootstrap or preferably @angular/flex-layout) to dynamically add classes. This would reduce the use of media queries and allow me to add classes to breakpoints. 

3) Added better error handling for each specific error response. Would use a switch case to dictate which error was returned and dynamically return a message. 

# Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
