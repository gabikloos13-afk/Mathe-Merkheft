'use strict';
// Der historische Ausgangsstand bleibt unverändert erhalten.
if(process.argv.includes('--write'))throw Error('Historische Abnahmematrix nicht überschreiben. Aktuellen Stand mit run-all.cjs prüfen.');
require('./erklaerstandard-audit.cjs');
