const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000
const max_body_size_mb = 10

// Configuring body parser middleware
app.use(bodyParser.json({limit: `${max_body_size_mb}mb`}));

app.post('/urls_with_text', (req, res) => {
    const doc = req.body;
    links = findURL(doc)
    res.send(links);
});

app.post('/urls', (req, res) => {
    const doc = req.body;
    links = findURL(doc).map(x => x.url)
    res.send(links);
});

app.listen(port, () => console.log(`URL extracter start on port ${port}!`));


// Find all text parts with link textStyle and return text and url
const findURL = (obj, results = []) => {
    const r = results;
    Object.keys(obj).forEach(key => {
       const value = obj[key];
       if ((key === 'textRun' || key === 'inlineObjectElement') && value.hasOwnProperty('textStyle') && value.textStyle.hasOwnProperty('link')) {
            r.push({text: value.content ?? null, url: value.textStyle.link.url})
       }
       if(typeof value === 'object'){
          findURL(value, r);
       }
    });
    return r;
 };