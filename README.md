# React - Bloggplats
Anne-Lii Hansen anha2324@student.miun.se

Detta är en Single Page Application (SPA) byggd med React, Typescript och Vite. 
Applikationen fungerar som en bloggplattform där användaren kan skapa, läsa, uppdatera och radera blogginlägg. Autentisering hanteras med JWT för att skydda vissa endpoints.

## Funktioner

- Publik startsida där alla blogginlägg visas i nedkortad version, de tre senaste Nyheterna samt Arkiv.
- Enskilda blogginlägg kan visas på egna sidor
- Användarautentisering med JWT
- Skyddade rutter för att hantera blogginlägg
- CRUD-operationer för blogginlägg
- Responsiv design

## Teknologier

- React
- TypeScript
- Vite
- React Router
- Axios
- JWT-autentisering
- CSS

## Installation och körning

Klona repository från Github:
```sh 
git clone https://github.com/Anne-Lii/react_m3_spa_blog.git
 ```

Gå in i projektmappen: 
```sh 
cd react_m3_spa_blog
```

Installera beroenden:
```sh 
npm install 
```

Starta utvecklingsserver:
```sh 
npm run dev
```

Nu körs applikationen lokalt på localhost.

## API
Denna applikation kommunicerar med ett backend-API som hanterar autentisering och blogginlägg och det finns publicerat på: https://react-api-m3.onrender.com/ 

Repository för APIet på Github:
```sh 
git clone https://github.com/Anne-Lii/react_api_m3.git
```

## Endpoints

### Autentisering
POST /auth/register:  Registrera användare
POST /auth/login:     Logga in och få en JSON Web Token - JWT

### Användare

### Blogginlägg
GET /posts:           Hämta alla blogginlägg
GET /posts/id:        Hämta ett specifikt blogginlägg med id
POST /posts:          Skapa ett nytt blogginlägg (kräver autentisering)
PUT /posts/id:        Uppdatera ett specifikt blogginlägg med id (kräver autentisering)
DELETE /posts/id:     Ta bort ett specifikt blogginlägg med id (kräver autentisering)

**Skyddade endpoints kräver en Authorization: Bearer <token> i headers.**
