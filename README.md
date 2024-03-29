
## ankilanguage.com
*A webapplication version of AnkiTool CLI.*

Anki Spaced Repetition Software is great for studying all sorts of things, but suffers due to too much generality. Anki Language Webapp takes out the hassle of making anki flashcards for language learners (currently supporting English, German, and French.) Easily create, manage, and export language vocab cards in an immersion setting. While consuming content or traveling in your target language, create vocab cards on the fly without the long pipeline. 

**Old Vocab Card Making Pipeline**

1. Save new sentence/word in notes for later
2. Copy/Paste sentence into translator
3. Copy Paste translation into Anki
4. Search for image and past it in.
5. Study

**New Vocab Card Making Pipeline**

1. Save new sentence into Anki Language, and view translation immediatly
2. Export and Study

#### Create a new deck
![New Deck](https://raw.githubusercontent.com/ChrisWeldon/AnkiLanguage/main/public/ankiweb_newdeck_new.png)

#### Add Cards on the fly
![Adding Card](https://raw.githubusercontent.com/ChrisWeldon/AnkiLanguage/main/public/ankiweb_addcard_new.png)

#### Export Deck
![Exporting Deck](https://raw.githubusercontent.com/ChrisWeldon/AnkiLanguage/main/public/ankiweb_exportdeck.png)

#### Import into Anki Software
Note: please set import divider to the pipe symbol "|"

![Importing Deck](https://raw.githubusercontent.com/ChrisWeldon/AnkiLanguage/main/public/ankiweb_importdeck.png)



## Development

Please feel free to submit a pull request/issue on this project. Any contribution would be greatly appreciated.

This project is built using NextJS 13 App directory framework.

- Frontend: NextJS
- Backend: NextJS API Routing
- Database: MongoDB
- Language: Typescript
- CI/CD and Deployment: Vercel

The authentication solution is written using NextAuth.

This service taps into a number of services to pull translations for target words, some of which will require the use of api developer keys obtained from different suppliers. A DeepL API key and Google Image API keys are recommended but not essential for the opperation of the service. Deepl simply supplies more accurate translation options for phrases and longer vocabulary blocks.

### To run locally

`npm run install`

**Setup .env.local file**

In root directory of project

```
touch .env.local

echo MONGO_USERNAME=<your mongodb api username>
echo MONGO_PASSWORD=<your mongodb passkey>
echo MONGODB_URI=<your db connection>

echo GOOGLE_IMAGE_SEARCH=<Google Image API Key>
echo CID=<Google CID Key>
echo DEEPL_API_KEY=<Deepl API Key>

echo ANKI_OUTPUT_DIR=./public/
echo NEXT_PUBLIC_API_ADDRESS_PUBLIC=http://localhost:3000
echo API_PRIVATE_ADDRESS=http://localhost:3000

```

**to run dev server**

```npm run dev```


### Deployment

Depending on whichever deployment service you use, the process will be similar to running locally.

1. Clone and install packages in deployment same as locally.
2. Create `.env.local` file same as local only with deployment keys

*To start server*

```
npm run build
npm start
```

