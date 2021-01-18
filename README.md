
# Shopify 2021 Summer Internship Challange

## Hesham Nimri

Hello 👋 I built out a REST API for handling image functionalities and a small lightweight front end to be able to interact with the API!

I levered GCP firestore and storage to ensure secure uploads and downloads and integrate some cloud computing into my work. 

## REST API Documentation

- [Upload](docs/upload.md) : `POST /image/`
- [Download](docs/download.md) : `GET /image/{id}/`
- [Delete](docs/delete.md) : `DELETE /image/{id}`
- [Image Search](docs/image-search.md) : `POST /image/search/`
- [Tag Search](docs/tag-search.md) : `POST /image/search/tags/{tag}/`

## Instructions

Open two terminals to launch the front end and backend. Note, the credentials for the GCP instance are purposely left out for security reasons (no bitcoin being mined on my instance under my watch)

### Backend

1. Download this [JSON file](https://drive.google.com/file/d/1ct-hftF4K6IFmuKbo3I55uUvo9hdacQZ/view?usp=sharing) and insert it in the `/config` folder 
2. Run the following commands :

```
cd server
npm i 
npm run api
```

The API will now be up and running on port `1234`. You can interact with it using postman, curl, etc... or use the provided UI !

### Frontend

1. Run the following commands:

```
cd frontend
yarn install
yarn serve
```

The frontend will be up and running on `localhost:8080`, visit this link in any browser to interact with the API!
