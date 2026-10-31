'use strict';
// Das Kapitel hat eigene Daten und Bilder; die anderen Themen bleiben unverändert.
(()=>{
if(document.body.dataset.topic!=='gemischt')return;
const F=(n,d)=>`<span class="fraction" aria-label="${n} durch ${d}"><span>${n}</span><span>${d}</span></span>`;
const M=(w,n,d)=>`${w} ${F(n,d)}`;
const V=(kind,n,d,extra={})=>({kind,n,d,...extra});
const step=(title,html,explain,hint,picture)=>({title,html,explain,hint:[hint],picture});
const entry=(id,title,question,intro,steps,answer,check,trap,preview)=>({id,title,question,intro:intro.slice(1),recognize:intro[0],startHint:intro[1],steps,learnSteps:steps,answer,check,trap,preview,givenPairs:[],givenTokens:[],questionPlain:question.join(' ').replace(/<[^>]*>/g,' '),notebookHtml:steps.map(s=>`<div class="school-calculation">${s.html}</div>`).join('')});
const cases={};
cases[101]=entry(101,'Was bedeutet eine gemischte Zahl?',[
 `Zeige ${M(1,2,3)} mit gleich großen Streifen.`
],['Eine gemischte Zahl besteht aus Ganzen und einem Bruchteil.','Lies zuerst die ganze Zahl. Lies dann den Bruch.'],[
 step('1 · Ein Ganzes erkennen',`${F(3,3)} = 1`,['Die 3 unten bedeutet: Ein Ganzes hat 3 gleich große Teile.','3 Drittel füllen einen ganzen Streifen.'],'Wie viele Drittel brauchst du für einen ganzen Streifen?',V('whole',3,3)),
 step('2 · Den Bruchteil zeigen',F(2,3),['Die 2 oben bedeutet: Nimm 2 Drittel.','Der zweite Streifen ist nur zum Teil gefüllt.'],'Markiere 2 von 3 gleich großen Teilen.',V('groups',5,3)),
 step('3 · Ganze und Bruchteil zusammen lesen',`${M(1,2,3)} = 1 + ${F(2,3)}`,['Die 1 vor dem Bruch zählt die Ganzen.','Daneben stehen die 2 übrigen Drittel.','Zwischen Ganzen und Bruchteil ist ein Plus gemeint.'],'Lies: ein Ganzes und zwei Drittel.',V('groups',5,3,{labels:true}))
],[`${M(1,2,3)} bedeutet 1 Ganzes und 2 Drittel.`],[`1 Ganzes hat 3 Drittel. Dazu kommen 2 Drittel: 3 + 2 = 5 Drittel.`],['<b>Denkfalle:</b> Die Zahl vor dem Bruch ist kein Malzeichen.',`${M(1,2,3)} bedeutet 1 + ${F(2,3)}.`],V('given-mixed',5,3,{whole:1,rest:2}));
cases[101].principle=['Zähler: Die Zahl oben zählt die Bruchteile.','Nenner: Die Zahl unten sagt, wie viele gleich große Teile ein Ganzes hat.','Alle ganzen Streifen sind gleich groß.'];
cases[1]=entry(1,'Bruch → gemischte Zahl',[
 `Schreibe ${F(11,4)} als gemischte Zahl.`
],['Ein Bruch soll als Ganze und Bruchteil geschrieben werden.','Der Nenner 4 sagt: Je 4 Viertel bilden ein Ganzes.'],[
 step('1 · Die Größe eines Ganzen bestimmen',`${F(4,4)} = 1`,['11 oben zählt 11 Viertel.','4 Viertel ergeben ein Ganzes.'],'Wie viele Viertel füllen einen ganzen Streifen?',V('whole',4,4)),
 step('2 · Die Anzahl der Ganzen finden','2 · 4 = 8 &nbsp; und &nbsp; 3 · 4 = 12',['Suche volle Vierergruppen in 11 Vierteln.','2 Gruppen brauchen 8 Viertel. Das passt.','3 Gruppen brauchen 12 Viertel. Das ist mehr als 11.'],'Vergleiche die 4er-Reihe mit 11: 4, 8, 12.',V('full',11,4,{whole:2})),
 step('3 · Den Rest finden','11 − 8 = 3',['Für 2 Ganze hast du 8 Viertel gebraucht.','Ziehe diese 8 von den 11 Vierteln ab.','3 Viertel bleiben übrig.'],'Die 8 kommt aus 2 · 4. Wie viele der 11 Viertel bleiben?',V('groups',11,4)),
 step('4 · Die gemischte Zahl schreiben',`${F(11,4)} = 2 + ${F(3,4)} = ${M(2,3,4)}`,['Schreibe die 2 Ganzen vor den Bruch.','Der Rest 3 wird der neue Zähler.','Der Nenner bleibt 4: Die Stücke bleiben Viertel.'],'Schreibe zuerst die Ganzen, dann die übrigen Viertel.',V('groups',11,4,{labels:true}))
],[`${F(11,4)} = ${M(2,3,4)}`],['Rückrechnung: 2 · 4 + 3 = 8 + 3 = 11.','Der Rest 3 ist kleiner als der Nenner 4.','Kurz gerechnet: 11 : 4 = 2 Rest 3.'],['<b>Denkfalle:</b> Der Rest ist kein neuer Nenner.','Die Stücke bleiben Viertel. Die 4 bleibt unten.'],V('loose',11,4));
cases[1].principle=['Bilde aus den Bruchteilen möglichst viele Ganze.','Was übrig bleibt, schreibst du als Bruchteil dahinter.'];
cases[2]=entry(2,'Gemischte Zahl → Bruch',[
 `Schreibe ${M(3,2,5)} als einen Bruch.`
],['Ganze und Bruchteil sollen als ein Bruch geschrieben werden.','Zähle zuerst die Fünftel in den 3 Ganzen.'],[
 step('1 · Ein Ganzes in Fünftel teilen',`1 = ${F(5,5)}`,['Die 5 unten sagt: Ein Ganzes besteht aus 5 Fünfteln.'],'Wie viele Fünftel bilden ein Ganzes?',V('whole',5,5)),
 step('2 · Die Fünftel in den Ganzen zählen','3 · 5 = 15',['Es gibt 3 Ganze.','Jedes Ganze enthält 5 Fünftel.','Zusammen sind das 15 Fünftel.'],'Nimm für jedes der 3 Ganzen fünf Fünftel.',V('full',17,5,{whole:3})),
 step('3 · Die übrigen Fünftel dazuzählen','15 + 2 = 17',['Die 15 kommt aus 3 · 5.','Die 2 übrigen Fünftel stehen in der Aufgabe.','Zähle sie dazu: Es sind 17 Fünftel.'],'Zu den Fünfteln der Ganzen kommen die 2 Fünftel dazu.',V('groups',17,5)),
 step('4 · Den Bruch schreiben',`${M(3,2,5)} = ${F('3 · 5 + 2',5)} = ${F(17,5)}`,['17 zählt alle Fünftel und steht oben.','5 bleibt unten: Die Stücke bleiben Fünftel.'],'Die Gesamtzahl der Fünftel kommt oben hin.',V('groups',17,5,{labels:true}))
],[`${M(3,2,5)} = ${F(17,5)}`],['Rückrechnung: 17 : 5 = 3 Rest 2.',`Das ergibt wieder ${M(3,2,5)}.`],['<b>Denkfalle:</b> Rechne nicht (3 + 2) : 5.','Wandle zuerst alle Ganzen in Fünftel um.'],V('given-mixed',17,5,{whole:3,rest:2}));
cases[2].principle=['Wandle zuerst die Ganzen in Bruchteile um.','Zähle danach den Bruchteil aus der Aufgabe dazu.'];
cases[3]=entry(3,'Ohne Rest: eine ganze Zahl',[
 `Wandle ${F(12,4)} um.`
],['Der Zähler ist ein Vielfaches des Nenners.','Prüfe die 4er-Reihe bis 12.'],[
 step('1 · Volle Gruppen finden','3 · 4 = 12',['4 Viertel ergeben ein Ganzes.','3 Vierergruppen verbrauchen alle 12 Viertel.'],'Welche Zahl mal 4 ergibt genau 12?',V('full',12,4,{whole:3})),
 step('2 · Den Rest prüfen','12 − 12 = 0',['Alle Viertel gehören zu den 3 Ganzen.','Es bleibt kein Bruchteil übrig.'],'Ziehe die verbrauchten Viertel von 12 ab.',V('groups',12,4)),
 step('3 · Die ganze Zahl schreiben',`${F(12,4)} = 12 : 4 = 3`,['Schreibe nur 3.','Ein Restbruch mit Zähler 0 ist nicht nötig.'],'Bei Rest 0 bleibt nur die Anzahl der Ganzen.',V('groups',12,4,{labels:true}))
],[`${F(12,4)} = 3`],['3 · 4 = 12. Die Rückrechnung stimmt.'],['<b>Denkfalle:</b> Nicht jeder unechte Bruch ergibt einen Bruchteil.','Bei Rest 0 schreibst du eine ganze Zahl.'],V('loose',12,4));
cases[5]=entry(5,'Lücke vor dem Bruch',[
 `□ ${F(2,5)} = ${F(17,5)}`, 'Bestimme die fehlende ganze Zahl.'
],['Die Lücke steht vor dem Bruch. Gesucht sind die Ganzen.','Ziehe zuerst die 2 bekannten Fünftel von den 17 Fünfteln ab.'],[
 step('1 · Bekannte Bruchteile abziehen','17 − 2 = 15',['17 Fünftel sind insgesamt gegeben.','2 Fünftel stehen schon hinter der Lücke.','Die übrigen 15 Fünftel gehören zu den Ganzen.'],'Welche Fünftel bleiben für die Ganzen?',V('separate',17,5,{rest:2})),
 step('2 · Ganze bilden','15 : 5 = 3',['5 Fünftel ergeben ein Ganzes.','15 Fünftel ergeben deshalb 3 Ganze.'],'Bilde aus den 15 Fünfteln Gruppen mit je 5.',V('groups',15,5,{labels:true})),
 step('3 · Die Lücke füllen',`${M(3,2,5)} = ${F(17,5)}`,['Vor dem Bruch fehlt die 3.','Der Bruchteil bleibt unverändert.'],'Setze die Anzahl der Ganzen vor den Bruch.',V('groups',17,5,{labels:true}))
],['Die fehlende ganze Zahl ist 3.'],['Probe: 3 · 5 + 2 = 17.'],['<b>Denkfalle:</b> 15 zählt Fünftel, nicht Ganze.','Teile noch durch 5.'],V('loose',17,5));
cases[6]=entry(6,'Lücke im Zähler des Restbruchs',[
 `${F(19,6)} = 3 ${F('□',6)}`, 'Bestimme den fehlenden Zähler.'
],['Die Ganzen sind bekannt. Gesucht ist der Rest.','Finde zuerst die Sechstel in den 3 Ganzen.'],[
 step('1 · Die Ganzen in Sechstel umwandeln','3 · 6 = 18',['Ein Ganzes enthält 6 Sechstel.','3 Ganze enthalten 18 Sechstel.'],'Wie viele Sechstel gehören zu den 3 Ganzen?',V('full',19,6,{whole:3})),
 step('2 · Die übrigen Sechstel finden','19 − 18 = 1',['19 Sechstel sind insgesamt gegeben.','18 Sechstel stecken in den Ganzen.','1 Sechstel bleibt übrig.'],'Ziehe die schon gebündelten 18 Sechstel von 19 ab.',V('groups',19,6)),
 step('3 · Den Rest eintragen',`${F(19,6)} = ${M(3,1,6)}`,['Der Rest 1 steht oben im Restbruch.','Der Nenner bleibt 6.'],'Wie viele Sechstel sind übrig?',V('groups',19,6,{labels:true}))
],['Der fehlende Zähler ist 1.'],['Probe: 3 · 6 + 1 = 19.','1 ist kleiner als 6: Der Rest enthält kein weiteres Ganzes.'],['<b>Denkfalle:</b> Die 18 ist bereits in den Ganzen enthalten.','Gesucht ist nur der Rest 19 − 18.'],V('loose',19,6));
cases[7]=entry(7,'Lücke im Nenner',[
 `${M(2,1,4)} = ${F(9,'□')}`, 'Bestimme den fehlenden Nenner.'
],['Die gemischte Zahl ist bekannt. Beim Bruch fehlt der Nenner.','Wandle zuerst die gemischte Zahl in Viertel um.'],[
 step('1 · Alle Viertel zählen','2 · 4 + 1 = 8 + 1 = 9',['2 Ganze enthalten 8 Viertel.','Das übrige Viertel kommt dazu.'],'Wie viele Viertel sind 2 Ganze und 1 Viertel zusammen?',V('groups',9,4)),
 step('2 · Den vollständigen Bruch schreiben',`${M(2,1,4)} = ${F(9,4)}`,['9 ist die Anzahl der Viertel.','4 sagt: Es sind Viertel.'],'Welche Stückgröße hast du gerade gezählt?',V('groups',9,4,{labels:true})),
 step('3 · Mit der Lücke vergleichen',`${F(9,'□')} = ${F(9,4)}`,['Der Zähler 9 stimmt bereits.','In die Nennerlücke gehört 4.'],'Vergleiche die beiden Nenner.',V('groups',9,4,{labels:true}))
],['Der fehlende Nenner ist 4.'],['9 : 4 = 2 Rest 1.','Probe: 2 · 4 + 1 = 9.'],['<b>Denkfalle:</b> Die 2 zählt Ganze. Sie ist nicht der Nenner.','Der Nenner beschreibt die Stückgröße.'],V('given-mixed',9,4,{whole:2,rest:1}));
cases[8]=entry(8,'Den Restbruch noch kürzen',[
 `Schreibe ${F(14,6)} als gemischte Zahl. Kürze den Restbruch vollständig.`
],['Nach dem Umwandeln kann der Restbruch noch kürzbar sein.','Finde zuerst Ganze und Rest bei 14 : 6.'],[
 step('1 · Ganze und Rest finden','2 · 6 = 12; &nbsp; 14 − 12 = 2',['2 Sechsergruppen passen in 14 Sechstel.','3 · 6 = 18 wäre zu viel.','2 Sechstel bleiben übrig.'],'Prüfe 2 · 6 und 3 · 6.',V('groups',14,6)),
 step('2 · Die gemischte Zahl schreiben',`${F(14,6)} = ${M(2,2,6)}`,['Die 2 Ganzen stehen vor dem Bruch.','Die übrigen 2 Sechstel stehen dahinter.'],'Der Rest steht oben. Der Nenner bleibt zunächst 6.',V('groups',14,6,{labels:true})),
 step('3 · Eine Kürzungszahl finden','2 : 2 = 1; &nbsp; 6 : 2 = 3',['2 und 6 sind beide durch 2 ohne Rest teilbar.','Teile Zähler und Nenner durch 2.'],'Welche Zahl größer als 1 teilt 2 und 6 ohne Rest?',V('reduce',14,6)),
 step('4 · Vollständig gekürzt schreiben',`${M(2,2,6)} = ${M(2,1,3)}`,['Die 2 Ganzen bleiben gleich.',`Der Restbruch ${F(1,3)} lässt sich nicht weiter kürzen.`],'Ändere nur den Restbruch, nicht die Ganzen.',V('groups',7,3,{labels:true}))
],[`${F(14,6)} = ${M(2,1,3)}`],[`Rückrechnung: ${M(2,1,3)} = ${F(7,3)} = ${F(14,6)}.`,'Der Restbruch hat denselben Wert wie vorher.'],['<b>Denkfalle:</b> Kürze nicht die ganze Zahl mit.','Nur Zähler und Nenner des Restbruchs werden geteilt.'],V('loose',14,6));
cases[4]=entry(4,'Negativen Bruch umwandeln',[
 `Schreibe −${F(11,4)} als gemischte Zahl.`
],['Das Minus gehört zur gesamten Zahl.','Wandle zuerst 11 Viertel ohne Minus um.'],[
 step('1 · Ganze und Rest ohne Minus finden','2 · 4 = 8; &nbsp; 11 − 8 = 3',['2 Vierergruppen passen in 11 Viertel.','3 · 4 = 12 wäre zu viel.','3 Viertel bleiben übrig.'],'Wie viele volle Vierergruppen passen in 11?',V('groups',11,4)),
 step('2 · Den positiven Wert schreiben',`${F(11,4)} = ${M(2,3,4)}`,['11 Viertel sind 2 Ganze und 3 Viertel.'],'Schreibe Ganze und Rest zunächst ohne Minus.',V('groups',11,4,{labels:true})),
 step('3 · Das Minus auf die gesamte Zahl beziehen',`−${F(11,4)} = −(${M(2,3,4)}) = −${M(2,3,4)}`,['Setze das Minus vor die gesamte gemischte Zahl.','Die Klammer zeigt: Ganze und Bruchteil sind zusammen negativ.'],'Das Minus gilt für die 2 Ganzen und die 3 Viertel.',V('negative',11,4))
],[`−${F(11,4)} = −${M(2,3,4)}`],[`−(${M(2,3,4)}) = −${F('2 · 4 + 3',4)} = −${F(11,4)}`,'Der Wert liegt zwischen −3 und −2.'],[`<b>Denkfalle:</b> −2 + ${F(3,4)} wäre ein anderer Wert.`,`−${M(2,3,4)} bedeutet −(2 + ${F(3,4)}).`],V('negative-given',11,4));
cases[9]=entry(9,'Negative gemischte Zahl → Bruch',[
 `Schreibe −${M(1,2,3)} als einen Bruch.`
],['Das Minus gilt für Ganze und Bruchteil zusammen.','Zähle zuerst die Drittel ohne Minus.'],[
 step('1 · Alle Drittel zählen','1 · 3 + 2 = 3 + 2 = 5',['Ein Ganzes enthält 3 Drittel.','2 Drittel kommen dazu.'],'Wandle das Ganze in Drittel um und zähle 2 Drittel dazu.',V('groups',5,3)),
 step('2 · Den positiven Bruch schreiben',`${M(1,2,3)} = ${F(5,3)}`,['Insgesamt sind es 5 Drittel.','3 bleibt unten.'],'Alle Teile bleiben Drittel.',V('groups',5,3,{labels:true})),
 step('3 · Das Minus wieder davorsetzen',`−${M(1,2,3)} = −${F(5,3)}`,['Die gesamte Zahl ist negativ.','Setze das Minus vor den Bruch.'],'Übernimm das Minus für den ganzen Bruch.',V('negative',5,3))
],[`−${M(1,2,3)} = −${F(5,3)}`],['5 : 3 = 1 Rest 2.','Mit Minus ergibt das wieder die gegebene Zahl.'],['<b>Denkfalle:</b> Rechne nicht −1 · 3 + 2.','Wandle zuerst den positiven Wert um. Setze dann das Minus davor.'],V('negative-mixed',5,3,{whole:1,rest:2}));
cases[10]=entry(10,'Aus dem Bild die gemischte Zahl ablesen',[
 'Lies die gefärbte Menge ab.','Schreibe sie als gemischte Zahl und als Bruch.'
],['Jeder Streifen ist ein Ganzes. Alle Streifen sind gleich groß.','Zähle zuerst die vollständig gefärbten Streifen.'],[
 step('1 · Die Ganzen zählen','2 Ganze',['Zwei Streifen sind vollständig gefärbt.'],'Welche Streifen sind ganz gefüllt?',V('full',11,5,{whole:2})),
 step('2 · Die Stückgröße bestimmen',`1 Ganzes = ${F(5,5)}`,['Ein Streifen ist in 5 gleich große Teile geteilt.','Jedes Teil ist ein Fünftel.'],'Zähle alle Teile eines ganzen Streifens.',V('whole',5,5)),
 step('3 · Den Rest ablesen',M(2,1,5),['Im letzten Streifen ist 1 Fünftel gefärbt.','Zusammen sind das 2 Ganze und 1 Fünftel.'],'Zähle nur die gefärbten Teile im letzten Streifen.',V('groups',11,5,{labels:true})),
 step('4 · Alle Fünftel zählen',`${M(2,1,5)} = ${F('2 · 5 + 1',5)} = ${F(11,5)}`,['2 Ganze enthalten 10 Fünftel.','Ein Fünftel kommt dazu: 10 + 1 = 11.'],'Rechne die Fünftel der Ganzen und den Rest zusammen.',V('groups',11,5,{labels:true}))
],[`Die gefärbte Menge ist ${M(2,1,5)} = ${F(11,5)}.`],['11 : 5 = 2 Rest 1. Das passt zum Bild.'],['<b>Denkfalle:</b> Zähle nicht alle Teile aller Streifen als Nenner.','Der Nenner beschreibt die Einteilung eines einzigen Ganzen.'],V('groups',11,5));
const c=window.MERKHEFT_COURSES.gemischt;
Object.assign(c,{goal:'Ganze und Bruchteile erkennen. Beide Schreibweisen Schritt für Schritt umwandeln.',lessons:[{id:101,label:'Ganze und Bruchteil'},{id:1,label:'Bruch → gemischte Zahl'},{id:2,label:'Gemischte Zahl → Bruch'}],groups:[[10,3],[5,6,7,8],[4,9]],cases,
 rules:['Ein Ganzes besteht aus so vielen gleich großen Teilen, wie der Nenner angibt.','Bruch → gemischte Zahl: Finde Ganze und Rest. Der Nenner bleibt gleich.','Gemischte Zahl → Bruch: Ganze · Nenner + Zähler. Der Nenner bleibt gleich.'],
 referenceCards:[
 {title:'Ganze und Bruchteil',html:`<div class="reference-math">${M(2,3,4)} = 2 + ${F(3,4)}</div>`,lines:['2 zählt die Ganzen.','3 zählt die übrigen Viertel.','4 sagt: Ein Ganzes hat 4 gleich große Teile.'],picture:V('groups',11,4,{labels:true})},
 {title:'Bruch → gemischte Zahl',html:`<div class="reference-math">11 : 4 = 2 Rest 3<br>${F(11,4)} = ${M(2,3,4)}</div>`,lines:['Teile den Zähler durch den Nenner.','Die Anzahl voller Gruppen zählt die Ganzen.','Der Rest wird der Zähler des Restbruchs.','Der Nenner bleibt gleich. Der Rest muss kleiner als der Nenner sein.']},
 {title:'Gemischte Zahl → Bruch',html:`<div class="reference-math">${M(3,2,5)} = ${F('3 · 5 + 2',5)} = ${F(17,5)}</div>`,lines:['Ganze · Nenner: So viele Bruchteile stecken in den Ganzen.','Zähler dazu: So viele Bruchteile sind es insgesamt.','Diese Gesamtzahl kommt nach oben. Der Nenner bleibt gleich.']},
 {title:'Kein Rest und gekürzter Rest',html:`<div class="reference-math">${F(12,4)} = 3<br>${F(14,6)} = ${M(2,2,6)} = ${M(2,1,3)}</div>`,lines:['Rest 0: Schreibe nur die ganze Zahl.','Kürzbarer Restbruch: Teile seinen Zähler und Nenner durch dieselbe Zahl.','Die Ganzen bleiben beim Kürzen gleich.']},
 {title:'Negative Zahlen',html:`<div class="reference-math">−${M(2,3,4)} = −(2 + ${F(3,4)}) = −${F(11,4)}</div>`,lines:['Das Minus gilt für die gesamte gemischte Zahl.','Wandle zunächst ohne Minus um. Setze es danach vor das Ergebnis.',`−2 + ${F(3,4)} ist ein anderer Wert.`]},
 {title:'Begriffe und Kontrolle',html:'',lines:[`Echter Bruch: Zähler kleiner als der positive Nenner, zum Beispiel ${F(3,4)}.`,`Unechter Bruch: Zähler mindestens so groß wie der positive Nenner, zum Beispiel ${F(11,4)}.`,`Scheinbruch: Der Zähler ist ein Vielfaches des Nenners, zum Beispiel ${F(12,4)} = 3. Der Wert ist eine ganze Zahl.`,'Probe: Ganze · Nenner + Rest ergibt wieder den ursprünglichen Zähler.','Bei negativen Zahlen prüfst du zusätzlich das Minus.']}
]});
// Aufgabengenaue Bilder ohne vorgezogene Gruppierung in der Vorschau.
const partNames={3:'Drittel',4:'Viertel',5:'Fünftel',6:'Sechstel'};
function strip(n,d,label){return `<div class="mixed-strip-item"><div class="mixed-strip" role="img" aria-label="${n} von ${d} gleichen Teilen gefärbt" style="--parts:${d}">${Array.from({length:d},(_,i)=>`<span class="${i<n?'filled':''}"></span>`).join('')}</div>${label?`<span class="mixed-caption">${label}</span>`:''}</div>`;}
function picture(v){
 if(!v)return '';
 const {kind,n,d}=v,q=Math.floor(n/d),r=n%d,word=partNames[d]||'Bruchteile';
 let html='';
 if(kind==='whole')html=strip(d,d,`${d} ${word} = 1 Ganzes`);
 else if(kind==='loose'||kind==='negative-given')html=`<div class="mixed-loose" role="img" aria-label="${n} einzelne ${word}">${Array.from({length:n},()=>`<span>${F(1,d)}</span>`).join('')}</div><p>${n} ${word}${kind==='negative-given'?' ohne Minus betrachtet':''} · je ${d} bilden ein Ganzes</p>`;
 else if(kind==='negative'||kind==='negative-mixed'){
  if(kind==='negative-mixed')html=Array.from({length:q},()=>strip(d,d,'1 Ganzes')).join('')+strip(r,d,`${r} ${word}`);
  else{
   // Genau der benötigte Ausschnitt; der markierte Punkt ist bereits hergeleitet.
   const left=-(q+1),right=-q,x=35+(1-r/d)*290;
   html=`<svg viewBox="0 0 360 145" role="img" aria-label="Negative Zahl zwischen ${left} und ${right}"><path d="M35 80H325" stroke="#326b82" stroke-width="2"/>${Array.from({length:d+1},(_,i)=>`<path d="M${35+i*290/d} 70v20" stroke="#326b82"/>`).join('')}<text x="35" y="117" text-anchor="middle">${left}</text><text x="325" y="117" text-anchor="middle">${right}</text><circle cx="${x}" cy="80" r="7" fill="#783d53"/></svg><div class="mixed-point-label">Punkt: −${M(q,r,d)}</div>`;
  }
  html=`<div class="mixed-negative"><b>Minus für die gesamte Zahl</b><div class="mixed-strips">${html}</div></div>`;
 }
 else if(kind==='reduce')html=`<div class="mixed-reduce"><div><b>Rest vorher</b>${strip(2,6,'2 Sechstel')}</div><div><b>Je 2 Teile zusammenfassen</b>${strip(1,3,'1 Drittel')}</div></div><p>Der gefärbte Anteil bleibt gleich groß. Die 2 Ganzen bleiben gleich.</p>`;
 else{
  const whole=kind==='full'?v.whole:kind==='given-mixed'?v.whole:q;
  html=Array.from({length:whole},()=>strip(d,d,kind==='full'||v.labels||kind==='given-mixed'?'1 Ganzes':'')).join('');
  if(kind!=='full'&&(r||kind==='given-mixed'))html+=strip(kind==='given-mixed'?v.rest:r,d,v.labels||kind==='given-mixed'?`${kind==='given-mixed'?v.rest:r} ${word}`:'');
  if(kind==='separate')html=Array.from({length:n-v.rest},()=>`<span class="mixed-piece">${F(1,d)}</span>`).join('')+`<div class="mixed-known"><b>Bekannt: ${v.rest} ${word}</b>${Array.from({length:v.rest},()=>`<span class="mixed-piece">${F(1,d)}</span>`).join('')}</div>`;
  html=`<div class="mixed-strips">${html}</div>`;
 }
 return `<figure class="mixed-picture">${html}</figure>`;
}
const legend=document.querySelector(".lab-legend");
if(legend)legend.innerHTML='<span class="part-key">Bruchstücke</span><span class="whole-key">Rahmen für 1 Ganzes</span><span class="unit-key">Übrige Stücke</span>';
const original=window.MerkheftPictures;
window.MerkheftPictures={render:(topic,id,index,r)=>topic==='gemischt'?picture(index<0?r.preview:r.steps[index]?.picture):original.render(topic,id,index,r),learning:(topic,id,s,r)=>topic==='gemischt'?picture(s.picture):original.learning(topic,id,s,r)};
// Bilder im Nachschlagebereich erst nach dessen Aufbau ergänzen.
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('#reference-pane .reference-card').forEach((el,i)=>{if(c.referenceCards[i].picture)el.insertAdjacentHTML('beforeend',picture(c.referenceCards[i].picture));});});
})();
