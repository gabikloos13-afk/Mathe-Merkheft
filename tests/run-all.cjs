'use strict';
const fs=require('node:fs'),cp=require('node:child_process');
const files=fs.readdirSync('tests').filter(f=>f.endsWith('.test.cjs'));let failed=0;
for(const f of files){
 const r=cp.spawnSync(process.execPath,['tests/'+f],{encoding:'utf8'});
 console.log('\n'+f+'\n'+r.stdout);if(r.status!==0){failed++;console.error(r.stderr);}
}
console.log(JSON.stringify({files:files.length,passed:files.length-failed,failed}));process.exitCode=failed?1:0;
