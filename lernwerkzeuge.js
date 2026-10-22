
(function(){
  function $(sel, root=document){ return root.querySelector(sel); }
  function all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function frac(a,b){ return `<span class="fraction"><span>${a}</span><span>${b}</span></span>`; }
  function clamp(v,min,max){ v=Number(v)||0; return Math.max(min,Math.min(max,v)); }
  function bar(n,d){ return `<div class="bar" role="img" aria-label="${n} von ${d} Teilen gefärbt">${Array.from({length:d},(_,i)=>`<span class="${i<n?'filled':''}"></span>`).join('')}</div>`; }
  function updateOutput(el){ const out = $('#'+el.id+'Out', el.closest('.control')); if(out) out.textContent = el.value; }

  function buildLab(root){
    const topic=root.dataset.topic;
    const controls=$('.controls',root), board=$('.visual-board',root), expl=$('.helper',root);
    const V={};
    const makeControl=(id,label,min,max,val)=>`<div class="control"><label for="${id}">${label} <output id="${id}Out">${val}</output></label><input id="${id}" type="range" min="${min}" max="${max}" value="${val}"></div>`;
    let render=()=>{};

    if(topic==='brueche'){
      controls.innerHTML=makeControl('d','Wie viele gleich große Stücke hat das Ganze?',2,12,8)+makeControl('n','Wie viele Stücke sind gemeint?',0,12,3);
      render=()=>{
        V.d=clamp($('#d',root).value,2,12); $('#n',root).max=V.d; V.n=clamp($('#n',root).value,0,V.d); $('#n',root).value=V.n;
        board.innerHTML=bar(V.n,V.d)+`<p class="big-math">${frac(V.n,V.d)} = ${V.n} von ${V.d} gleich großen Teilen</p><div class="eq">Denkbild: Erst in <strong>${V.d}</strong> gleiche Stücke teilen, dann <strong>${V.n}</strong> Stücke nehmen.</div>`;
        expl.textContent='Je größer der Nenner, desto kleiner wird jedes einzelne Stück.';
      };
    }
    if(topic==='gleichwertig'){
      controls.innerHTML=makeControl('n','Zähler',1,6,2)+makeControl('d','Nenner',2,8,3)+makeControl('k','Mit welcher Zahl vergrößern?',1,5,2);
      render=()=>{
        V.d=clamp($('#d',root).value,2,8); $('#n',root).max=V.d; V.n=clamp($('#n',root).value,1,V.d); $('#n',root).value=V.n; V.k=clamp($('#k',root).value,1,5);
        board.innerHTML=`<div class="model-pair"><div class="model-card">${bar(V.n,V.d)}<p class="big-math">${frac(V.n,V.d)}</p></div><div class="model-card">${bar(V.n*V.k,V.d*V.k)}<p class="big-math">${frac(V.n*V.k,V.d*V.k)}</p></div></div><div class="eq">Erweitern: ${frac(V.n,V.d)} · ${V.k}/${V.k} = ${frac(V.n*V.k,V.d*V.k)}</div>`;
        expl.textContent='Die Einteilung wird feiner, aber die gefärbte Fläche bleibt gleich groß.';
      };
    }
    if(topic==='gemischt'){
      controls.innerHTML=makeControl('n','Wie viele Bruchstücke hast du insgesamt?',1,24,11)+makeControl('d','Wie viele Stücke ergeben ein Ganzes?',2,8,4);
      render=()=>{
        V.n=clamp($('#n',root).value,1,24); V.d=clamp($('#d',root).value,2,8);
        const whole=Math.floor(V.n/V.d), rest=V.n%V.d, rows=[];
        for(let i=0;i<Math.ceil(V.n/V.d);i++){ rows.push(bar(Math.max(0,Math.min(V.d,V.n-i*V.d)),V.d)); }
        board.innerHTML=`<div class="stack">${rows.join('')}</div><p class="big-math">${frac(V.n,V.d)} = ${whole}${rest?` und ${frac(rest,V.d)}`:''}</p><div class="eq">${V.n} : ${V.d} = ${whole} Rest ${rest}. Der Rest bleibt als Bruch stehen.</div>`;
        expl.textContent='Volle Gruppen werden zu Ganzen. Übrig gebliebene Stücke bilden den Restbruch.';
      };
    }
    if(topic==='vergleichen'){
      controls.innerHTML=makeControl('a','Links: Zähler',1,10,3)+makeControl('b','Links: Nenner',2,10,4)+makeControl('c','Rechts: Zähler',1,10,2)+makeControl('d','Rechts: Nenner',2,10,3);
      render=()=>{
        V.b=clamp($('#b',root).value,2,10); $('#a',root).max=V.b; V.a=clamp($('#a',root).value,1,V.b); $('#a',root).value=V.a;
        V.d=clamp($('#d',root).value,2,10); $('#c',root).max=V.d; V.c=clamp($('#c',root).value,1,V.d); $('#c',root).value=V.c;
        const left=V.a/V.b,right=V.c/V.d; const sign = left===right ? '=' : (left>right?'>' : '<');
        board.innerHTML=`<div class="model-pair"><div class="model-card">${bar(V.a,V.b)}<p class="big-math">${frac(V.a,V.b)}</p></div><div class="model-card">${bar(V.c,V.d)}<p class="big-math">${frac(V.c,V.d)}</p></div></div><div class="eq">${frac(V.a,V.b)} ${sign} ${frac(V.c,V.d)}</div>`;
        expl.textContent='Wenn die Bilder nicht reichen, kannst du beide Brüche auch auf einen gemeinsamen Nenner bringen.';
      };
    }
    if(topic==='zahlenstrahl'){
      controls.innerHTML=makeControl('d','Wie fein ist die Einteilung?',2,10,4)+makeControl('n','Wie viele Bruchschritte nach rechts?',0,12,5);
      render=()=>{
        V.d=clamp($('#d',root).value,2,10); V.n=clamp($('#n',root).value,0,12); const value=V.n/V.d; const min=0,max=3, pos=Math.min(100,(value/max)*100);
        const ticks=[]; for(let i=0;i<=max;i++){ ticks.push(`<span class="tick" style="left:${i/max*100}%"></span><span class="tick-label" style="left:${i/max*100}%">${i}</span>`); }
        board.innerHTML=`<div class="number-line"><div class="number-line-track">${ticks.join('')}<span class="pointer" style="left:${pos}%"><i></i><b>${value%1===0?value:value.toFixed(2).replace('.',',')}</b></span></div></div><p class="big-math">Markierung: ${frac(V.n,V.d)}${value>=1?` = ${Math.floor(value)}${value%1?` und ${frac(V.n%V.d,V.d)}`:''}`:''}</p>`;
        expl.textContent='Suche immer zuerst den Abschnitt zwischen zwei ganzen Zahlen und teile ihn dann gleichmäßig.';
      };
    }
    if(topic==='dezimal'){
      controls.innerHTML=makeControl('z','Zehntel',0,9,3)+makeControl('h','Hundertstel',0,9,5);
      render=()=>{
        V.z=clamp($('#z',root).value,0,9); V.h=clamp($('#h',root).value,0,9); const n=V.z*10+V.h;
        board.innerHTML=`<div class="hundred-grid" role="img" aria-label="${n} von 100 Kästchen gefärbt">${Array.from({length:100},(_,i)=>`<i class="${i<n?'filled':''}"></i>`).join('')}</div><p class="big-math">0,${V.z}${V.h} = ${frac(n,100)}</p><div class="eq">${V.z} Zehntel und ${V.h} Hundertstel zusammen ergeben ${n} Hundertstel.</div>`;
        expl.textContent='Eine volle Zeile im Hunderterfeld sind 10 Kästchen, also ein Zehntel.';
      };
    }

    all('input[type="range"]',root).forEach(inp=> inp.addEventListener('input',()=>{ all('input[type="range"]',root).forEach(updateOutput); render(); }));
    all('input[type="range"]',root).forEach(updateOutput); render();
  }

  function buildChecks(root){
    const data=JSON.parse(root.dataset.questions);
    let index=0, chosen=null;
    const q=$('.q',root), choices=$('.choices',root), fb=$('.feedback',root), hintBtn=$('.hint-btn',root), nextBtn=$('.next-btn',root);
    function paint(){
      const item=data[index]; chosen=null; fb.className='feedback'; fb.innerHTML='';
      q.innerHTML=`<div class="eyebrow">Denk-Check ${index+1} von ${data.length}</div><h3>${item.q}</h3>`;
      choices.innerHTML=item.a.map((ans,i)=>`<button type="button" class="choice" data-i="${i}">${ans}</button>`).join('');
      hintBtn.textContent='Ich brauche einen Hinweis'; nextBtn.textContent=index===data.length-1?'Nochmal von vorn':'Nächste Aufgabe';
      all('.choice',choices).forEach(btn=>btn.addEventListener('click',()=>{
        chosen=Number(btn.dataset.i); all('.choice',choices).forEach(b=>b.disabled=true);
        const correct=item.correct; all('.choice',choices).forEach((b,i)=>{ b.classList.add(i===correct?'correct':(i===chosen?'wrong':'')); });
        fb.className='feedback show'; fb.innerHTML=`<strong>${chosen===correct?'Richtig gedacht.':'Noch nicht ganz.'}</strong><p>${item.explain}</p>`;
      }));
    }
    hintBtn.addEventListener('click',()=>{ const item=data[index]; fb.className='feedback show'; fb.innerHTML=`<strong>Hinweis:</strong><p>${item.hint}</p>`; });
    nextBtn.addEventListener('click',()=>{ index=(index+1)%data.length; paint(); });
    paint();
  }

  all('[data-lab]').forEach(buildLab);
  all('[data-questions]').forEach(buildChecks);
})();
