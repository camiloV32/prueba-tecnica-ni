# SERVER
Aplicación API/REST desarrollado con express.js y como base de datos se utiliza planetscale el cual es una base de datos
compatible con MySQL. Esta aplicación cuenta con diferentes módulos los cuales permite autenticar, crear, leer, actualizar 
y eliminar usuarios.

**Importante:** Debido a que no se debe compartir usuarios y contraseñas en proyectos públicos, la conexión a la base de datos
no funciona, en caso de necesitarla, por favor contactarme.

**Nota**: Algunos endpoint contienen métodos de depuración y validación de datos.
___
## Endpoints
### "/api/login"
- **Tipo:** POST
- **Requiere Token:** No
#### Recibe:
| Nombre | Tipo | 
|----------|----------|
| email   | Texto   |
| password    | Texto   |
#### Devuelve:
```json
{
  "token" : "JsonWebToken",
}
```
___
### "/api/crud/create" 
- **Tipo:** POST
- **Requiere Token:** No
#### Recibe:
| Nombre | Tipo |
|----------|----------|
| Name    | Texto  |
| Lastname    | Texto   |
| Email | Texto   |
| Birthdate | Fecha   |
| Password | Texto   |
#### Devuelve:
```json
{
  "message" : "Usuario creado exitosamente"
}
```
___
### "/api/crud/read" 
- **Tipo:** POST
- **Requiere Token:** Si
#### Devuelve:
```json
[
  {
    "id": "Id de usuario",
    "name": "Nombre usuario",
    "lastName": "Apellido usuario",
    "email": "Email usuario",
    "birthDate" : "Fecha de nacimiento usuario"
  }
]
```
___
### "/api/crud/update" 
- **Tipo:** GET
- **Requiere Token:** Si

#### Recibe:
| Nombre | Tipo |
|----------|----------|
| Name    | Texto  |
| Lastname    | Texto   |
| Email | Texto   |
| Birthdate | Fecha   |
| Password (opcional) | Texto   |
#### Devuelve:
```json
{
  "message" : "Updated"
}
```
___
### "/api/crud/delete" 
- **Tipo:** GET
- **Requiere Token:** Si

#### Recibe:
| Nombre | Tipo |
|----------|----------|
| id    | Numero  |
#### Devuelve:
```json
{
  "message" : "Deleted"
}
```
___


## Próximas versiones.
Se piensa implementar para próximas versiones:
- Aumentar la seguridad de la aplicación con encriptación.
