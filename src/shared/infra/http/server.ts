import express from 'express';

import '@shared/infra/typeorm';

const app = express();

app.get('/', (request, response) => response.send());

app.listen(3333, () => {
  console.log('🚀 Server running!');
});
