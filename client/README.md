## CLIENT
This client application features a login where you can create a user to subsequently access the dashboard. 
Once logged in, you'll have a 5-minute session in the dashboard where you can create, update, delete, 
or edit a user. You also have the option to log out.

## Endpoints

### "/" 
Base route displaying the login form to access the dashboard.

### "/dashboard"
A protected route that can only be accessed after logging in. In this route, all users will be listed in a table, 
with a button to update their information. Clicking this button will show a popup with a form and the user's information, 
allowing you to edit each field. The password is not a required field, so if left blank, your password will remain the same.


