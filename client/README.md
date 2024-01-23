# CLIENT
Esta aplicación cliente cuenta con un inicio de sesión en el cual podrás crear un usuario para posteriormente ingresar al panel de control. 
En este panel, tendrás una sesión de 5 minutos, durante la cual podrás crear, actualizar, eliminar o editar usuarios. 
También tendrás la opción de cerrar sesión.

## Endpoints

### "/" 
Ruta base que muestra el formulario de inicio de sesión para acceder al dashboard.

### "/dashboard"
Ruta protegida que solo se puede acceder después de iniciar sesión. En esta ruta, se mostrarán todos los usuarios en una tabla, 
con los siguientes botones:
- **Submit**: Al hacer clic en este botón, se abrirá un popup con un formulario y la información 
del usuario seleccionado. Aquí podrás editar cada uno de los campos del usuario. La contraseña no es un dato obligatorio, 
por lo que si la dejas en blanco, tu contraseña seguirá siendo la misma.
- **Delete**: Al hacer click en este botón podrás eliminar el usuario seleccionado.

En la parte superior de la aplicación encontraras 2 botones:
- **Add**: En este podras crear nuevos usuarios.
-  **Log out**: Boton para cerrar sesión y volver al login

## Tipos de datos

| Nombre | Tipo | Descripción |
|----------|----------|----------|
| Name    | Texto  | Nombre completo de usuario |
| Lastname    | Texto   | Apellido completo de usuario   |
| Email | Email   | Email del usuario |
| Birthdate | Fecha   | Fecha de nacimiento del usuario |
| Password | Texto   | Contraseña del usuario |


