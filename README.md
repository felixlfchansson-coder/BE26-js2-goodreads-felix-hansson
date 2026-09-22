# Inkstone

Inkstone är min egen lilla variant av Goodreads.

Tanken är ganska enkel: jag ville bygga en boktracker där man kan hålla koll på böcker man vill läsa och böcker man redan läst, men jag ville samtidigt att sidan skulle kännas mer som ett eget litet bibliotek än bara en lista med data.

Projektet är gjort som en del av JavaScript 2 och har framför allt varit ett sätt för mig att jobba med JavaScript, OOP, moduler, Firebase och REST API.


## Vad kan man göra?

I Inkstone kan man:

- lägga till nya böcker
- välja om en bok är läst eller ska läsas
- sätta ett förväntat betyg på böcker man vill läsa
- sätta betyg på böcker man har läst
- markera en bok som läst
- ta bort böcker
- spara allt i Firebase Realtime Database

Böckerna delas upp mellan **To Be Read** och **Read** så att biblioteket blir lättare att överblicka.


## Tekniker jag använder

Projektet är byggt med:

- HTML
- CSS
- JavaScript
- Vite
- Firebase Realtime Database
- Firebase REST API
- Lucide Icons

Jag har försökt dela upp JavaScript-koden i mindre moduler istället för att lägga allting i en stor fil.

## Hur projektet är uppbyggt

De viktigaste JavaScript-filerna har olika ansvarsområden:

### `book.js`

Här finns min `Book`-klass.

Alla böcker som används i applikationen ska representeras som `Book`-objekt. Klassen innehåller information om boken men också beteenden som hör till själva boken.

Jag använder även encapsulation för bland annat rating så att den inte bara kan ändras hur som helst utifrån.

### `newBook.js`

Tar hand om formuläret när användaren skapar en ny bok.

Den hämtar informationen från formuläret, skapar ett nytt `Book`-objekt och skickar sedan boken vidare till Firebase.

### `displayBook.js`

Tar böckerna från Firebase och visar dem på sidan.

Eftersom Firebase skickar tillbaka vanliga JavaScript-objekt skapar jag nya instanser av `Book` när böckerna hämtas.

### `rating.js`

Ansvarar för stjärnorna och formuläret där användaren väljer betyg.

### `firebase.js`

Här ligger kommunikationen med Firebase.

Jag använder REST API och arbetar bland annat med:

- `GET`
- `POST`
- `PATCH`
- `DELETE`

### `main.js`

Startar applikationen och kopplar ihop de olika delarna.


## Firebase

Böckerna sparas i Firebase Realtime Database.

När sidan laddas hämtas böckerna från databasen och visas i biblioteket. När användaren lägger till, ändrar eller tar bort en bok uppdateras databasen och biblioteket renderas om.

Det innebär att böckerna finns kvar även om sidan laddas om.


## Design

Jag ville inte att Inkstone skulle kännas som ett vanligt skolprojekt med vit bakgrund och några inputs.

Designen bygger därför på mörk petrol, jade, guld och varma boktoner.

Detta genomförde jag med stor hjälp av ai.

Målet har varit att sidan ska kännas lite som ett lugnt digitalt bibliotek där böckerna är själva fokuset.


## Aboat

Inkstone innehåller även en **Aboat-sida**.

Denna sida är en skämtsida som ironiskt nog förklarar mer om programmeraren än en aboutsida hade gjort.

## Deployment

Projektet deployas med Netlify.

Vite används för att bygga projektet innan det publiceras.


## Skapad av

**Felix Hansson**
