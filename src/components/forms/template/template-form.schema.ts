import * as y from 'yup';

import { CreateTemplateRequest } from '~/api/utils/api-requests';

const contentDefault = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Тема письма</title>
  </head>
  <body>

  </body>
</html>`;

export const schema: y.ObjectSchema<CreateTemplateRequest> = y.object().shape({
  name: y.string().required().default(''),
  content: y.string().required().default(contentDefault),
});
