import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { enableProdMode } from '@angular/core';
import { AppServerModule } from './src/main.server';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}



// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const debug = require('debug')('app');    
  const server = express();
  const distFolder = join(process.cwd(), 'dist/CrudList/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  debug('Prerendering started...');


  
  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  
  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function isRunningOnApachePassenger(): boolean {
  return moduleFilename.includes('lsnode.js');
}

function run(): void {
  // Start up the Node server
  const server = app();

  if (isRunningOnApachePassenger()) {
    server.listen(() => {
      console.log('Node Express listening to Passenger Apache');
    });
    return;
  }

  const port = process.env['PORT'] || 4000;

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (
  moduleFilename === __filename ||
  moduleFilename.includes('iisnode') ||
  isRunningOnApachePassenger()
) {
  run();
}

export * from './src/main.server';
