# Extract URLs from Google Docs json document

Small express app with 2 api endpoints, which accept json as POST body and retunr array of extracted urls.
Heroku ready.

## /urls
```
curl -X POST -H "Content-Type: application/json" -d @input.json http://localhost:3000/urls

["http://youtube.com","http://google.com"]
```
## /urls_with_text
```
curl -X POST -H "Content-Type: application/json" -d @input.json http://localhost:3000/urls_with_text

[{"text":"Компания","url":"http://youtube.com"},{"text":"здесь","url":"http://google.com"}]`
```


