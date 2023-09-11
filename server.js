const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });

app.use(express.static('./dist/helping-pixies-ui'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/helping-pixies-ui/'}),
);

app.listen(process.env.PORT || 8080);
