'use strict';
(()=>{
if(document.body.dataset.topic!=='zahlenstrahl')return;
const F=(n,d)=>`<span class="fraction" aria-label="${n} durch ${d}"><span>${n}</span><span>${d}</span></span>`;
const M=(w,n,d)=>`${w} ${F(n,d)}`;
const V=p=>Array.isArray(p)?p[0]/p[1]:p;
const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const label=p=>Array.isArray(p)?F(p[0],p[1]):String(p).replace('-','−');
const point=(v,name='',value=false)=>({v,name,value});
const pic=(min,max,den,points=[],more={})=>({min,max,den,points,...more});
const st=(title,html,explain,hint,picture)=>({title,html,explain,hint:[hint],picture});
const entry=(id,title,question,recognize,startHint,steps,answer,check,trap,preview,principle)=>({id,title,question,recognize,intro:[startHint],startHint,steps,learnSteps:steps,answer,check,trap,preview,principle,givenPairs:[],givenTokens:[],questionPlain:question.join(' ').replace(/<[^>]*>/g,' '),notebookHtml:steps.map(s=>`<div class="school-calculation">${s.html}</div>`).join('')});
const cases={};
cases[101]=entry(101,'Ein Ganzes und seine Bruchlücken',['Teile die Strecke von 0 bis 1 in vier gleich lange Lücken.'],'Eine Einheit wird in gleich große Teile geteilt.','Suche zuerst die Strecke von 0 bis 1.',[
 st('1 · Eine ganze Einheit finden','1 − 0 = 1',['Die Strecke von 0 bis 1 ist eine ganze Einheit.','Auch von 1 bis 2 ist es eine ganze Einheit.'],'Suche zwei benachbarte ganze Zahlen.',pic(0,2,1,[],{segment:[0,1]})),
 st('2 · Die Einheit gleichmäßig teilen','4 gleich lange Lücken',['Teile nur die Strecke von 0 bis 1 in vier gleiche Lücken.','Die Randstriche gehören zur Strecke.'],'Zeichne zwischen 0 und 1 drei zusätzliche Striche.',pic(0,1,4,[],{countTo:1})),
 st('3 · Den Wert einer Lücke bestimmen',`1 : 4 = ${F(1,4)}`,['Vier Viertel ergeben eine ganze Einheit.','Jede Lücke ist ein Viertel der Einheit.'],'Teile die ganze Einheit durch die Anzahl ihrer Lücken.',pic(0,1,4,[],{segment:[0,[1,4]],caption:`Eine Lücke: ${F(1,4)}`})),
 st('4 · Lücken und Striche unterscheiden','4 Lücken · 5 Striche',['Zwischen fünf Strichen liegen vier Lücken.','Der Nenner richtet sich nach den Lücken einer Einheit.'],'Fahre von Strich zu Strich. Zähle jede Strecke einmal.',pic(0,1,4,[],{countTo:1}))
],['Vier gleich lange Lücken zwischen 0 und 1 bedeuten Viertel.'],[`4 · ${F(1,4)} = 1. Vier Lücken füllen die ganze Einheit.`],['<b>Denkfalle:</b> Fünf Striche bedeuten hier nicht Fünftel.','Zähle die vier Lücken dazwischen.'],pic(0,1,1),['Eine Einheit ist der Abstand zwischen zwei benachbarten ganzen Zahlen.','Auf derselben Linie sind alle ganzen Einheiten gleich lang.']);
cases[1]=entry(1,'Einen Punkt zwischen 0 und 1 ablesen',['Lies die Zahl des Punktes P ab.','Schreibe den Bruch und kürze ihn vollständig.'],'Der Punkt ist gegeben. Gesucht ist seine Zahl.','Zähle zuerst die Lücken zwischen 0 und 1.',[
 st('1 · Die Einteilung erkennen','6 gleich lange Lücken zwischen 0 und 1',['Die ganze Einheit ist in sechs Lücken geteilt.','Der Nenner ist deshalb 6.'],'Zähle Strecken zwischen den Strichen, nicht die Striche.',pic(0,1,6,[point([4,6],'P')],{countTo:1})),
 st('2 · Den Wert einer Lücke bestimmen',`1 : 6 = ${F(1,6)}`,['Jede Lücke hat den Wert ein Sechstel.'],'Teile eine ganze Einheit durch 6.',pic(0,1,6,[point([4,6],'P')],{segment:[0,[1,6]],caption:`Eine Lücke: ${F(1,6)}`})),
 st('3 · Von 0 bis zum Punkt zählen',`4 · ${F(1,6)} = ${F(4,6)}`,['P liegt vier Lücken rechts von 0.','Vier Sechstel bedeuten Zähler 4 und Nenner 6.'],'Starte bei 0. Der erste Strich danach ist ein Schritt.',pic(0,1,6,[point([4,6],'P')],{countTo:[4,6]})),
 st('4 · Eine Kürzungszahl finden','4 : 2 = 2; &nbsp; 6 : 2 = 3',['4 und 6 sind beide durch 2 ohne Rest teilbar.','Die 2 passt deshalb als Kürzungszahl.'],'Prüfe eine kleine Zahl bei 4 und bei 6.',pic(0,1,6,[point([4,6],'P',true)])),
 st('5 · Den gekürzten Bruch aufschreiben',`${F(4,6)} = ${F('4 : 2','6 : 2')} = ${F(2,3)}`,['Zähler und Nenner werden durch dieselbe Zahl geteilt.','Der Wert bleibt gleich. P bleibt am selben Ort.'],'Die neue Schreibweise verändert die Lage des Punktes nicht.',pic(0,1,3,[point([2,3],'P',true)]))
],[`P = ${F(4,6)} = ${F(2,3)}`],[`Der Punkt liegt zwischen 0 und 1.`,`Rückrechnung: ${F(2,3)} = ${F(4,6)}. Das sind vier der sechs Lücken.`],['<b>Denkfalle:</b> Beginne nicht beim Nullstrich mit 1.','Der erste Schritt endet am ersten Strich rechts von 0.'],pic(0,1,6,[point([4,6],'P')]),['Nenner: Anzahl gleich großer Lücken in einer Einheit.','Zähler: Anzahl dieser Lücken von 0 bis zum Punkt.']);
cases[2]=entry(2,'Einen gegebenen Bruch eintragen',[`Trage ${F(3,4)} auf dem Zahlenstrahl ein.`],'Die Zahl ist gegeben. Gesucht ist die Stelle ihres Punktes.','Die 4 unten bestimmt die Einteilung einer ganzen Einheit.',[
 st('1 · Die richtige Strecke wählen','0 bis 1: eine ganze Einheit',['Drei Viertel sind weniger als ein Ganzes.','Der Punkt liegt deshalb zwischen 0 und 1.'],'Vergleiche den Zähler 3 mit dem Nenner 4.',pic(0,1,1)),
 st('2 · Vier gleiche Lücken zeichnen',`1 : 4 = ${F(1,4)}`,['Teile die Strecke von 0 bis 1 in vier gleich lange Lücken.','Eine Lücke ist ein Viertel.'],'Zeichne drei innere Striche zwischen 0 und 1.',pic(0,1,4,[],{countTo:1})),
 st('3 · Drei Lücken nach rechts zählen',`${F(1,4)} + ${F(1,4)} + ${F(1,4)} = ${F(3,4)}`,['Die 3 oben sagt: Gehe drei Lücken.','Beginne bei 0 und gehe nach rechts.'],'Zähle drei Strecken, nicht drei Striche.',pic(0,1,4,[],{countTo:[3,4]})),
 st('4 · Den Punkt setzen',`P = ${F(3,4)}`,['Setze den Punkt am Ende der dritten Lücke.','Beschrifte ihn mit drei Vierteln.'],'Der Punkt liegt am dritten Strich rechts von 0.',pic(0,1,4,[point([3,4],'P',true)]))
],[`Der Punkt liegt bei ${F(3,4)}.`],[`Bis 1 fehlt noch ${F(1,4)}.`,`Drei Lücken bis P und eine weitere bis 1 ergeben vier Lücken.`],['<b>Denkfalle:</b> Vier Lücken müssen gleich lang sein.','Der Nenner teilt die Einheit, nicht die ganze sichtbare Linie.'],pic(0,1,1),['Der Nenner bestimmt die Größe eines Schrittes.','Der Zähler bestimmt die Anzahl der Schritte von 0.']);
cases[104]=entry(104,'Einen negativen Bruch eintragen',[`Trage −${F(3,4)} ein.`],'Das Minus bestimmt die Richtung von 0 aus.','Bestimme zuerst die Größe einer Viertellücke.',[
 st('1 · Viertel auf beiden Seiten einteilen',`1 : 4 = ${F(1,4)}`,['Teile jede ganze Einheit in vier gleiche Lücken.','Links und rechts von 0 gilt dieselbe Einteilung.'],'Auch von −1 bis 0 liegen vier Viertellücken.',pic(-1,1,4)),
 st('2 · Die Richtung bestimmen',`−${F(3,4)} < 0`,['Die Zahl ist negativ.','Beginne bei 0 und gehe nach links.'],'Das Minus bedeutet: links von 0.',pic(-1,1,4,[],{segment:[0,[-1,4]]})),
 st('3 · Drei Viertellücken nach links gehen',`0 − ${F(3,4)} = −${F(3,4)}`,['Gehe von 0 drei gleich große Viertellücken nach links.','Der Abstand zu 0 beträgt drei Viertel.'],'Zähle nach links: ein Viertel, zwei Viertel, drei Viertel.',pic(-1,1,4,[],{countFrom:0,countTo:[-3,4]})),
 st('4 · Den Punkt beschriften',`P = −${F(3,4)}`,['Der Punkt liegt zwischen −1 und 0.','Das Minus gehört zur gesamten Zahl.'],'Prüfe zuerst die Seite von 0, dann den Abstand.',pic(-1,1,4,[point([-3,4],'P',true)]))
],[`P liegt bei −${F(3,4)}.`],[`Von P führen drei Viertellücken nach rechts zurück zur 0.`,`−${F(3,4)} + ${F(3,4)} = 0.`],['<b>Denkfalle:</b> Eine negative Zahl liegt nicht rechts von 0.','Nach rechts werden Zahlen größer. Das gilt auch links von 0.'],pic(-1,1,1),['Positive Zahlen liegen rechts von 0. Negative Zahlen liegen links von 0.','Der Abstand zu 0 wird ohne Minus angegeben.']);
cases[3]=entry(3,'Ein Bruch liegt rechts von 1',[`Trage ${F(11,4)} ein. Schreibe auch die gemischte Zahl.`],'Mehrere Ganze sind im Bruch enthalten.','Finde zuerst, wie viele volle Vierergruppen in 11 passen.',[
 st('1 · Die Ganzen finden','2 · 4 = 8; &nbsp; 3 · 4 = 12',['Zwei Ganze brauchen 8 Viertel.','Drei Ganze brauchen 12 Viertel. Das ist mehr als 11.'],'Vergleiche 11 mit der 4er-Reihe.',pic(0,3,1)),
 st('2 · Den Rest berechnen','11 − 8 = 3',['Für die zwei Ganzen sind 8 Viertel verbraucht.','Es bleiben 3 Viertel.'],'Ziehe die Viertel der Ganzen von 11 ab.',pic(2,3,4)),
 st('3 · Beide Schreibweisen verbinden',`${F(11,4)} = ${M(2,3,4)}`,['Der Punkt liegt zwischen 2 und 3.','Teile diese Einheit in vier gleich lange Lücken.'],'Die Stückgröße bleibt ein Viertel.',pic(2,3,4)),
 st('4 · Vom ganzen Teil weitergehen',`2 + ${F(3,4)} = ${F(11,4)}`,['Gehe von 2 noch drei Viertellücken nach rechts.','Setze dort den Punkt.'],'Beginne hier bei 2, weil die zwei Ganzen schon erreicht sind.',pic(2,3,4,[point([11,4],'P',true)],{countFrom:2,countTo:[11,4]}))
],[`P = ${F(11,4)} = ${M(2,3,4)}`],['2 · 4 + 3 = 11.','P liegt zwischen 2 und 3.'],['<b>Denkfalle:</b> Teile nicht die gesamte Strecke von 0 bis 3 in vier Lücken.','Jede einzelne ganze Einheit enthält vier Viertellücken.'],pic(0,3,1));
cases[4]=entry(4,'Ein negativer Bruch links von −1',[`Trage −${F(7,3)} ein.`],'Der Bruch enthält Ganze und einen Rest mit Minus.','Finde Ganze und Rest zunächst ohne Minus.',[
 st('1 · Ganze und Rest bestimmen','2 · 3 = 6; &nbsp; 7 − 6 = 1',['Zwei Ganze enthalten 6 Drittel.','Ein Drittel bleibt übrig.'],'Drei Ganze bräuchten 9 Drittel. Das ist zu viel.',pic(-3,0,1)),
 st('2 · Das Minus auf die ganze Zahl beziehen',`−${F(7,3)} = −(${M(2,1,3)})`,['Die gesamte Zahl ist negativ.','Zwei Ganze und ein Drittel führen von 0 nach links.'],'Das Minus gilt für die Ganzen und den Rest zusammen.',pic(-3,0,3,[],{segment:[0,-2]})),
 st('3 · Die passende Einheit einteilen','Von −3 bis −2: 3 gleich lange Lücken',['Der Punkt liegt zwischen −3 und −2.','Teile diese Einheit in Drittel.'],'Zwei Ganze nach links führen bis −2.',pic(-3,-2,3)),
 st('4 · Den Rest nach links gehen',`−2 − ${F(1,3)} = −${F(7,3)}`,['Gehe von −2 noch ein Drittel nach links.','Setze dort den Punkt.'],'Ein Drittel links von −2 ist kleiner als −2.',pic(-3,-2,3,[point([-7,3],'P',true)],{countFrom:-2,countTo:[-7,3]}))
],[`P = −${F(7,3)} = −${M(2,1,3)}`],[`−${F(7,3)} + ${F(1,3)} = −2.`,`P liegt links von −2 und rechts von −3.`],['<b>Denkfalle:</b> Gehe von −2 nicht nach rechts weiter.',`−${M(2,1,3)} bedeutet −2 − ${F(1,3)}.`],pic(-3,0,1));
cases[7]=entry(7,'Die Schrittweite ohne sichtbare 0 bestimmen',[`Links steht ${F(1,2)}, rechts ${F(3,2)}. Dazwischen liegen vier gleiche Lücken.`,`Lies den Punkt P am ersten inneren Strich ab.`],'Die Randzahlen sind keine benachbarten ganzen Zahlen.','Bestimme zuerst ihren Zahlenabstand.',[
 st('1 · Den ganzen sichtbaren Abstand berechnen',`${F(3,2)} − ${F(1,2)} = ${F(2,2)} = 1`,['Zwischen den beiden Randzahlen liegt der Zahlenabstand 1.','Diese 1 wird auf vier Lücken verteilt.'],'Ziehe die linke Zahl von der rechten ab.',pic([1,2],[3,2],4,[point([3,4],'P')],{ends:true,segment:[[1,2],[3,2]]})),
 st('2 · Den Abstand auf die Lücken verteilen',`1 : 4 = ${F(1,4)}`,['Eine Lücke hat den Wert ein Viertel.','Die Anzahl der sichtbaren Lücken allein bestimmt nicht immer den Nenner.'],'Teile den bekannten Zahlenabstand durch vier.',pic([1,2],[3,2],4,[point([3,4],'P')],{ends:true,segment:[[1,2],[3,4]],caption:`Eine Lücke: ${F(1,4)}`})),
 st('3 · Die linke Zahl in Vierteln schreiben',`${F(1,2)} = ${F('1 · 2','2 · 2')} = ${F(2,4)}`,['Ein Halb sind zwei Viertel.','So kannst du ein weiteres Viertel dazuzählen.'],'Erweitere Zähler und Nenner mit 2.',pic([1,2],[3,2],4,[point([3,4],'P')],{ends:true})),
 st('4 · Eine Lücke weitergehen',`${F(2,4)} + ${F(1,4)} = ${F(3,4)}`,['Beginne am linken Rand bei einem Halb.','Gehe eine Viertellücke nach rechts.'],'Beginne nicht bei 0. Links steht bereits ein Halb.',pic([1,2],[3,2],4,[point([3,4],'P',true)],{ends:true,countFrom:[1,2],countTo:[3,4]}))
],[`P = ${F(3,4)}`],[`${F(1,2)} + 4 · ${F(1,4)} = ${F(3,2)}. Vier Schritte erreichen den rechten Rand.`],['<b>Denkfalle:</b> Der linke Rand ist nicht automatisch 0.','Lies zuerst die beschrifteten Zahlen.'],pic([1,2],[3,2],4,[point([3,4],'P')],{ends:true}));
cases[11]=entry(11,'Mehrere Punkte A, B und C ablesen',['Lies A, B und C ab.','Schreibe jeden Wert als vollständig gekürzten Bruch.'],'Mehrere Punkte gehören zu derselben Einteilung.','Bestimme die Einteilung nur einmal.',[
 st('1 · Die gemeinsame Schrittweite finden',`1 : 4 = ${F(1,4)}`,['Zwischen 0 und 1 liegen vier gleiche Lücken.','Überall auf dieser Linie ist eine Lücke ein Viertel.'],'Die Einteilung setzt sich links und rechts gleichmäßig fort.',pic(-1,2,4,[point([-1,2],'A'),point([3,4],'B'),point([5,4],'C')],{segment:[0,1]})),
 st('2 · A links von 0 ablesen',`A = −${F(2,4)} = −${F(1,2)}`,['A liegt zwei Viertellücken links von 0.','Kürze 2 und 4 durch 2. Das Minus bleibt.'],'Zähle von 0 zwei Lücken nach links.',pic(-1,2,4,[point([-1,2],'A',true),point([3,4],'B'),point([5,4],'C')])),
 st('3 · B rechts von 0 ablesen',`B = ${F(3,4)}`,['B liegt drei Viertellücken rechts von 0.','3 und 4 haben keinen gemeinsamen Teiler größer als 1.'],'Zähle für B wieder vom Nullpunkt aus.',pic(-1,2,4,[point([-1,2],'A',true),point([3,4],'B',true),point([5,4],'C')])),
 st('4 · C rechts von 1 ablesen',`C = 1 + ${F(1,4)} = ${F(5,4)}`,['Bis 1 sind es vier Viertellücken.','Eine weitere Lücke führt zu fünf Vierteln.'],'Zähle die vier Viertel bis 1 mit.',pic(-1,2,4,[point([-1,2],'A',true),point([3,4],'B',true),point([5,4],'C',true)]))
],[`A = −${F(1,2)}; B = ${F(3,4)}; C = ${F(5,4)}.`],[`−${F(1,2)} < 0 < ${F(3,4)} < 1 < ${F(5,4)}.`,`Die Reihenfolge passt zur Lage der Punkte.`],['<b>Denkfalle:</b> Beginne nicht beim ersten sichtbaren Strich mit 0.','Nutze die tatsächlich eingezeichnete 0.'],pic(-1,2,4,[point([-1,2],'A'),point([3,4],'B'),point([5,4],'C')]));
const metricTable=(rows)=>`<div class="zs-table-wrap"><table class="zs-table"><thead><tr><th>Punkt / Zahl</th><th>Gleiche Einteilung</th><th>Abstand von A</th></tr></thead><tbody>${rows.map(x=>`<tr>${x.map((y,i)=>`<td>${i?'<span class="zs-cell-label">'+(i===1?'Rechnung':'Abstand von A')+': </span>':''}${y}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
cases[5]=entry(5,'Mit dem Lineal: zwei ganze Einheiten',['A gehört zu 2. E gehört zu 4. AE ist 12 cm lang.',`Trage ${F(13,6)}, ${F(7,3)}, ${F(18,6)}, ${F(10,3)} und ${F(23,6)} ein.`],'Die gezeichnete Länge umfasst mehrere ganze Einheiten.','Berechne zuerst, wie viele ganze Einheiten zwischen 2 und 4 liegen.',[
 st('1 · Die Anzahl ganzer Einheiten bestimmen','4 − 2 = 2',['Von 2 bis 4 sind es zwei ganze Einheiten.','Die 12 cm gehören zu diesen zwei Einheiten.'],'Zähle die Schritte von 2 zu 3 und von 3 zu 4.',pic(2,4,1,[],{segment:[2,4],caption:'AE = 12 cm · Zeichnung am Bildschirm nicht maßstabsgetreu'})),
 st('2 · Die Länge einer Einheit berechnen','12 cm : 2 = 6 cm',['Eine ganze Einheit ist auf deinem Papier 6 cm lang.'],'Verteile 12 cm gleichmäßig auf die zwei Einheiten.',pic(2,4,1,[],{segment:[2,3],caption:'Eine ganze Einheit: 6 cm'})),
 st('3 · Die Länge eines Sechstels berechnen','6 cm : 6 = 1 cm',['Teile jede Einheit in sechs gleiche Lücken.','Ein Sechstel entspricht auf deinem Papier 1 cm.'],'Der Nenner 6 teilt die 6 cm einer Einheit.',pic(2,4,6,[],{segment:[2,[13,6]],caption:`Eine Sechstellücke: 1 cm`})),
 st('4 · Den ersten Bruch von A aus eintragen',`${F(13,6)} = ${M(2,1,6)}`,['12 Sechstel sind 2 Ganze. Ein Sechstel bleibt.','Miss 1 cm rechts von A und setze P.'],'A steht schon bei 2. Nur das übrige Sechstel wird abgemessen.',pic(2,4,6,[point([13,6],'P',true)])),
 st('5 · Die weiteren Zahlen in derselben Einteilung markieren',metricTable([
 [`P: ${F(13,6)}`,`${F(13,6)} − ${F(12,6)} = ${F(1,6)}`,'1 · 1 cm = 1 cm'],
 [`Q: ${F(7,3)}`,`${F(14,6)} − ${F(12,6)} = ${F(2,6)}`,'2 · 1 cm = 2 cm'],
 [`R: ${F(18,6)}`,`${F(18,6)} − ${F(12,6)} = ${F(6,6)}`,'6 · 1 cm = 6 cm'],
 [`S: ${F(10,3)}`,`${F(20,6)} − ${F(12,6)} = ${F(8,6)}`,'8 · 1 cm = 8 cm'],
 [`T: ${F(23,6)}`,`${F(23,6)} − ${F(12,6)} = ${F(11,6)}`,'11 · 1 cm = 11 cm']
 ]),['Schreibe Drittel als Sechstel: oben und unten mal 2.','Ziehe den Startwert 2 = 12 Sechstel ab.','Jede verbleibende Sechstellücke entspricht 1 cm.'],'Miss alle Entfernungen vom selben Startpunkt A aus.',pic(2,4,6,[point([13,6],'P'),point([7,3],'Q'),point(3,'R'),point([10,3],'S'),point([23,6],'T')]))
],['Ab A nach rechts: P 1 cm; Q 2 cm; R 6 cm; S 8 cm; T 11 cm.'],['E liegt 12 cm rechts von A. Alle gesuchten Punkte liegen davor.','R gehört zu 3 und liegt genau in der Mitte von AE.'],['<b>Denkfalle:</b> 12 cm sind hier nicht die Länge eines Ganzen.','Sie gehören zu zwei ganzen Einheiten.'],pic(2,4,1,[],{caption:'A = 2 · E = 4 · AE = 12 cm · Bildschirmbild nicht maßstabsgetreu'}));
cases[14]=entry(14,'Mit dem Lineal: Brüche passend erweitern',['A gehört zu 0. E gehört zu 1. AE ist 5 cm lang.','Zeichne den Ausschnitt von −1 bis 1. Teile jede Einheit in zehn gleiche Lücken.',`Trage ${F(2,5)} ein.`],'Die vorgegebene Einteilung ist feiner als der Nenner des Bruchs.','Zähle zuerst die ganzen Einheiten von −1 bis 1.',[
 st('1 · Die gesamte Zeichenstrecke bestimmen','2 · 5 cm = 10 cm',['Von −1 bis 1 liegen zwei ganze Einheiten.','Jede Einheit ist 5 cm lang. Die ganze Strecke ist 10 cm lang.'],'Zähle die beiden Einheiten von −1 bis 0 und von 0 bis 1.',pic(-1,1,1,[],{caption:'Zwei Einheiten: 10 cm auf deinem Papier'})),
 st('2 · Die Länge eines kleinen Schrittes berechnen','5 cm : 10 = 0,5 cm',['Die Einheit von 0 bis 1 ist 5 cm lang.','Jede der zehn Lücken ist 0,5 cm lang.'],'Verteile 5 cm gleichmäßig auf zehn Lücken.',pic(0,1,10,[],{caption:'Eine Zehntellücke: 0,5 cm auf deinem Papier'})),
 st('3 · Den Bruch zur Einteilung passend schreiben',`${F(2,5)} = ${F('2 · 2','5 · 2')} = ${F(4,10)}`,['Zehntel passen zu den zehn vorgegebenen Lücken.','Der Nenner 5 wird mit 2 zur 10.','Multipliziere den Zähler ebenfalls mit 2.'],'Rechne 10 : 5. Das ergibt die Malzahl 2.',pic(0,1,10)),
 st('4 · Die Entfernung von A berechnen','4 · 0,5 cm = 2 cm',['Vier Zehntel bedeuten vier kleine Lücken.','Vier Lücken zu je 0,5 cm sind 2 cm.'],'Verwende die vier Schritte aus dem Zähler 4.',pic(0,1,10,[],{countTo:[4,10]})),
 st('5 · Den Punkt eintragen',`P = ${F(2,5)} = ${F(4,10)}`,['Miss von A aus 2 cm nach rechts.','Setze dort den Punkt.'],'A gehört zu 0. Von hier beginnt die Messung.',pic(0,1,10,[point([2,5],'P',true)]))
],['P liegt 2 cm rechts von A.'],['Es bleiben 3 cm bis E.','2 cm + 3 cm = 5 cm.'],['<b>Denkfalle:</b> Zwei Fünftel bedeuten nicht zwei Zehntellücken.','Erweitere zuerst auf den vorgegebenen Nenner 10.'],pic(0,1,1,[],{caption:'AE = 5 cm · Bildschirmbild nicht maßstabsgetreu'}));
cases[13]=entry(13,'Mit dem Lineal: negativer Ausschnitt',['A gehört zu −2. E gehört zu −1. AE ist 8 cm lang.',`Trage −${F(15,8)}, −${F(7,4)}, −${F(6,4)} und −${F(9,8)} ein.`],'Die 0 ist nicht sichtbar. Die Randzahlen legen die Einteilung fest.','Bestimme den Zahlenabstand von −2 bis −1.',[
 st('1 · Eine ganze Einheit erkennen','−1 − (−2) = 1',['Von −2 bis −1 ist es eine ganze Einheit.','Diese Einheit ist auf dem Papier 8 cm lang.'],'−2 und −1 sind benachbarte ganze Zahlen.',pic(-2,-1,1,[],{segment:[-2,-1],caption:'AE = 8 cm · Bildschirmbild nicht maßstabsgetreu'})),
 st('2 · Achtel einteilen','8 cm : 8 = 1 cm',['Eine Achtellücke ist auf dem Papier 1 cm lang.','Teile die Strecke in acht gleiche Lücken.'],'Eine ganze Einheit besteht aus acht Achteln.',pic(-2,-1,8)),
 st('3 · Die Randzahlen in Achteln schreiben',`−2 = −${F(16,8)}; &nbsp; −1 = −${F(8,8)}`,['Jedes Ganze enthält acht Achtel.','Zwei Ganze enthalten 16 Achtel. Das Minus bleibt.'],'Rechne 2 · 8 und 1 · 8.',pic(-2,-1,8)),
 st('4 · Den ersten Punkt finden',`−${F(16,8)} + ${F(1,8)} = −${F(15,8)}`,['Gehe von A eine Achtellücke nach rechts.','Miss dafür 1 cm. Setze P.'],'Nach rechts wird die Zahl größer: von −16 Achteln zu −15 Achteln.',pic(-2,-1,8,[point([-15,8],'P',true)])),
 st('5 · Die weiteren Punkte bestimmen',metricTable([
 [`P: −${F(15,8)}`,`−${F(16,8)} + ${F(1,8)}`,'1 cm rechts von A'],
 [`Q: −${F(7,4)}`,`−${F(14,8)} = −${F(16,8)} + ${F(2,8)}`,'2 cm rechts von A'],
 [`R: −${F(6,4)}`,`−${F(12,8)} = −${F(16,8)} + ${F(4,8)}`,'4 cm rechts von A'],
 [`S: −${F(9,8)}`,`−${F(16,8)} + ${F(7,8)}`,'7 cm rechts von A']
 ]),['Erweitere die Viertel mit 2 zu Achteln.','Zähle die Achtellücken rechts von −16 Achteln.','Jede Lücke entspricht 1 cm.'],'Nutze A = −16 Achtel als festen Startpunkt.',pic(-2,-1,8,[point([-15,8],'P'),point([-7,4],'Q'),point([-6,4],'R'),point([-9,8],'S')]))
],['Ab A nach rechts: P 1 cm; Q 2 cm; R 4 cm; S 7 cm.'],[`R liegt bei −${M(1,1,2)}, genau in der Mitte der Strecke.`,'Alle Punkte liegen zwischen −2 und −1.'],['<b>Denkfalle:</b> Bei negativen Zahlen wird es nach rechts ebenfalls größer.','Die Achtelzahl steigt von −16 auf −15, −14 und weiter bis −8.'],pic(-2,-1,1,[],{caption:'A = −2 · E = −1 · AE = 8 cm · Bildschirmbild nicht maßstabsgetreu'}));
cases[6]=entry(6,'Die genaue Mitte zwischen zwei Brüchen',[`Finde die Mitte zwischen ${F(1,3)} und ${F(2,3)}.`],'Die gesuchte Zahl muss zu beiden Randzahlen denselben Abstand haben.','Teile den Abstand zwischen den beiden Randzahlen in zwei gleiche Teile.',[
 st('1 · Die vorhandene Lücke erkennen',`${F(2,3)} − ${F(1,3)} = ${F(1,3)}`,['Zwischen einem Drittel und zwei Dritteln liegt eine Drittellücke.','Die Mitte halbiert diese Lücke.'],'Suche die Strecke zwischen den beiden gegebenen Punkten.',pic([1,3],[2,3],3,[],{ends:true,segment:[[1,3],[2,3]]})),
 st('2 · Beide Randzahlen feiner einteilen',`${F(1,3)} = ${F(2,6)}; &nbsp; ${F(2,3)} = ${F(4,6)}`,['Halbiere jede Drittellücke. So entstehen Sechstel.','Erweitere beide Brüche oben und unten mit 2.'],'Die gleiche Einteilung muss bei beiden Brüchen gelten.',pic([1,3],[2,3],6,[],{ends:true})),
 st('3 · Die Mitte ablesen',`2 + 1 = 3; &nbsp; M = ${F(3,6)}`,['Von zwei Sechsteln führt eine Sechstellücke zu drei Sechsteln.','Eine weitere Sechstellücke führt zu vier Sechsteln.'],'Welche ganze Zahl liegt genau zwischen 2 und 4?',pic([1,3],[2,3],6,[point([3,6],'M',true)],{ends:true})),
 st('4 · Den Bruch kürzen',`${F(3,6)} = ${F('3 : 3','6 : 3')} = ${F(1,2)}`,['Teile Zähler und Nenner durch 3.','Die Lage von M bleibt gleich.'],'Prüfe die Teilbarkeit von 3 und 6 durch 3.',pic([1,3],[2,3],6,[point([1,2],'M',true)],{ends:true}))
],[`Die Mitte ist ${F(1,2)}.`],[`${F(3,6)} − ${F(2,6)} = ${F(1,6)}.`,`${F(4,6)} − ${F(3,6)} = ${F(1,6)}. Beide Abstände sind gleich.`],['<b>Denkfalle:</b> Eine Zahl zwischen den Grenzen ist nicht automatisch die Mitte.','Prüfe die beiden Abstände.'],pic([1,3],[2,3],3,[],{ends:true}));
cases[12]=entry(12,'Die Mitte bei direkt benachbarten Zählern',[`Finde die Mitte zwischen ${F(18,17)} und ${F(19,17)}.`],'Bei Nenner 17 liegt kein ganzer Zähler zwischen 18 und 19.','Teile die Lücke zwischen den beiden gegebenen Brüchen in zwei Hälften.',[
 st('1 · Die Lücke bestimmen',`${F(19,17)} − ${F(18,17)} = ${F(1,17)}`,['Die beiden Werte sind eine Siebzehntellücke voneinander entfernt.','Ihre Mitte halbiert genau diese Lücke.'],'Subtrahiere bei gleichem Nenner die Zähler.',pic([18,17],[19,17],17,[],{ends:true})),
 st('2 · Beide Brüche mit 2 erweitern',`${F(18,17)} = ${F(36,34)}; &nbsp; ${F(19,17)} = ${F(38,34)}`,['18 · 2 = 36 und 19 · 2 = 38.','17 · 2 = 34. Der neue Nenner ist 34.'],'Multipliziere oben und unten jeweils mit 2.',pic([18,17],[19,17],34,[],{ends:true})),
 st('3 · Den mittleren Zähler finden','36 + 1 = 37; &nbsp; 37 + 1 = 38',['37 liegt genau einen Schritt von 36 und von 38 entfernt.','Der Nenner bleibt 34.'],'Welche ganze Zahl liegt zwischen 36 und 38?',pic([18,17],[19,17],34,[],{ends:true,countFrom:[36,34],countTo:[37,34]})),
 st('4 · Die Mitte aufschreiben',`M = ${F(37,34)}`,['37 und 34 haben keinen gemeinsamen Teiler größer als 1.','Der Bruch ist vollständig gekürzt.'],'Beide halben Lücken haben den Wert ein Vierunddreißigstel.',pic([18,17],[19,17],34,[point([37,34],'M',true)],{ends:true}))
],[`M = ${F(37,34)}`],[`${F(37,34)} − ${F(36,34)} = ${F(1,34)}.`,`${F(38,34)} − ${F(37,34)} = ${F(1,34)}.`],['<b>Denkfalle:</b> Zwischen zwei Brüchen liegt immer noch eine Zahl.','Bei Bedarf kannst du die Einteilung weiter verfeinern.'],pic([18,17],[19,17],17,[],{ends:true}));
cases[8]=entry(8,'Betrag und Gegenzahl unterscheiden',[`Bestimme Betrag und Gegenzahl von −${F(3,4)}.`,`Vergleiche danach mit +${F(3,4)}.`],'Betrag fragt nach dem Abstand. Gegenzahl fragt nach einem anderen Punkt.','Suche zuerst die 0 und den gegebenen Punkt.',[
 st('1 · Den Betrag der negativen Zahl bestimmen',`|−${F(3,4)}| = ${F(3,4)}`,['Der Betrag ist der Abstand zur 0.','Ein Abstand ist nie negativ.'],'Zähle die drei Viertellücken zwischen dem Punkt und 0.',pic(-1,1,4,[point([-3,4],'P',true)],{segment:[[-3,4],0],caption:`Abstand: ${F(3,4)}`})),
 st('2 · Die Gegenzahl finden',`Gegenzahl von −${F(3,4)}: +${F(3,4)}`,['Spiegele den Punkt an der 0.','Die Gegenzahl hat denselben Abstand auf der anderen Seite.'],'Gehe von 0 drei Viertellücken nach rechts.',pic(-1,1,4,[point([-3,4],'P',true),point([3,4],'G',true)])),
 st('3 · Den Betrag der positiven Zahl bestimmen',`|+${F(3,4)}| = ${F(3,4)}`,['Auch dieser Punkt ist drei Viertel von 0 entfernt.','Sein Betrag ist ebenfalls positiv.'],'Ein Abstand hängt nicht davon ab, auf welcher Seite der Punkt liegt.',pic(-1,1,4,[point([3,4],'P',true)],{segment:[0,[3,4]]})),
 st('4 · Die Gegenzahl der positiven Zahl bestimmen',`Gegenzahl von +${F(3,4)}: −${F(3,4)}`,['Die Gegenzahl des positiven Werts liegt links von 0.','Hier sind Betrag und Gegenzahl verschiedene Werte.'],'Wechsle die Seite von 0, behalte den Abstand bei.',pic(-1,1,4,[point([3,4],'P',true),point([-3,4],'G',true)]))
],[`Betrag beider Zahlen: ${F(3,4)}.`,`Gegenzahl von −${F(3,4)}: +${F(3,4)}; Gegenzahl von +${F(3,4)}: −${F(3,4)}.`],[`−${F(3,4)} + ${F(3,4)} = 0. Gegenzahlen ergeben zusammen 0.`],['<b>Denkfalle:</b> Betrag und Gegenzahl sind nicht immer gleich.','Bei 0 sind beide 0.'],pic(-1,1,4,[point([-3,4],'P',true)]));
cases[9]=entry(9,'Alle Brüche mit festem Nenner zählen',['Finde alle Brüche mit Nenner 3, deren Wert zwischen 132 und 134 liegt.','Die Grenzen zählen nicht mit. Wie viele Brüche sind es?'],'Der Nenner ist fest vorgegeben. Gesucht sind ganze Zähler.','Schreibe zuerst beide Grenzen als Drittel.',[
 st('1 · Die linke Grenze umwandeln',`132 · 3 = 396; &nbsp; 132 = ${F(396,3)}`,['Jedes der 132 Ganzen enthält drei Drittel.','132 Ganze enthalten deshalb 396 Drittel.'],'Multipliziere die ganze Zahl mit 3.',pic(132,134,3)),
 st('2 · Die rechte Grenze umwandeln',`134 · 3 = 402; &nbsp; 134 = ${F(402,3)}`,['Auch die rechte Grenze wird in Dritteln geschrieben.'],'Verwende auf beiden Seiten denselben Nenner.',pic(132,134,3)),
 st('3 · Die inneren Zähler aufzählen',[397,398,399,400,401].map(n=>F(n,3)).join('; &nbsp; '),['Die ganzen Zähler 397 bis 401 liegen zwischen 396 und 402.','Die Randzähler 396 und 402 zählen nicht mit.'],'Beginne bei 397 und höre vor 402 auf.',pic(132,134,3,[397,398,399,400,401].map((n,i)=>point([n,3],String.fromCharCode(65+i))),{caption:[397,398,399,400,401].map((n,i)=>`${String.fromCharCode(65+i)} = ${F(n,3)}`).join(' · ')})),
 st('4 · Die Anzahl bestimmen','402 − 396 − 1 = 5',['Zwischen sechs Drittellücken liegen fünf innere Striche.','Es sind fünf Brüche mit Nenner 3.'],'Zähle die fünf aufgeführten Zähler nach.',pic(132,134,3,[397,398,399,400,401].map((n,i)=>point([n,3],String.fromCharCode(65+i)))))
],['Es gibt fünf passende Brüche.'],[`${F(399,3)} = 133 gehört dazu. Auch eine ganze Zahl kann als Bruch geschrieben werden.`,'Ohne festen Nenner liegen unendlich viele Brüche zwischen den Grenzen.'],['<b>Denkfalle:</b> Zähle 133 nicht aus der Liste heraus.','Gefragt ist nach der Schreibweise mit Nenner 3.'],pic(132,134,1));
cases[10]=entry(10,'Fünf Punkte mit gleich großen Abständen',[`Fünf Punkte liegen gleich weit auseinander.`,`Der linke Punkt gehört zu −${F(3,4)}, der rechte zu +${F(3,4)}.`,`Bestimme die drei inneren Zahlen.`],'Fünf Punkte begrenzen vier gleich lange Lücken.','Bestimme zuerst den gesamten Zahlenabstand.',[
 st('1 · Die Gesamtstrecke berechnen',`${F(3,4)} − (−${F(3,4)}) = ${F(6,4)} = ${F(3,2)}`,['Von links bis 0 sind es drei Viertel.','Von 0 bis rechts sind es nochmals drei Viertel.'],'Addiere die beiden Abstände zur 0.',pic([-3,4],[3,4],4,[],{ends:true,segment:[[-3,4],[3,4]]})),
 st('2 · Die Anzahl der Lücken bestimmen','5 − 1 = 4 Lücken',['Zwischen fünf Punkten liegen vier Lücken.','Der Gesamtabstand wird durch 4 geteilt.'],'Zähle die Zwischenräume zwischen den fünf Punkten.',pic([-3,4],[3,4],8,[],{ends:true,slots:4})),
 st('3 · Den Wert einer Lücke berechnen',`${F(3,2)} : 4 = ${F(3,8)}`,['Halbiere drei Halbe: Das ergibt drei Viertel.','Halbiere noch einmal: Das ergibt drei Achtel.','Zweimal halbieren bedeutet durch 4 teilen.'],'Verteile den Gesamtabstand gleichmäßig auf die vier Lücken.',pic([-3,4],[3,4],8,[],{ends:true,slots:4,segment:[[-3,4],[-3,8]],caption:`Eine Lücke: ${F(3,8)}`})),
 st('4 · Die inneren Zahlen nacheinander finden',`−${F(6,8)} + ${F(3,8)} = −${F(3,8)}<br>−${F(3,8)} + ${F(3,8)} = 0<br>0 + ${F(3,8)} = ${F(3,8)}`,['Beginne links bei minus sechs Achteln.','Addiere für jede Lücke drei Achtel.'],`Schreibe zuerst −${F(3,4)} als −${F(6,8)}.`,pic([-3,4],[3,4],8,[point([-3,8],'B',true),point(0,'C'),point([3,8],'D',true)],{ends:true,slots:4}))
],[`Die inneren Zahlen sind −${F(3,8)}, 0 und +${F(3,8)}.`],[`Ein weiterer Schritt von ${F(3,8)} führt zu ${F(6,8)} = ${F(3,4)}.`,`Alle vier Lücken haben denselben Wert ${F(3,8)}.`],['<b>Denkfalle:</b> Teile nicht durch die Anzahl der Punkte.','Fünf Punkte ergeben vier Lücken.'],pic([-3,4],[3,4],0,[point([-3,4],'A'),point([-3,8],'B'),point(0,'C'),point([3,8],'D'),point([3,4],'E')],{ends:true,slots:4}));
// Exakte Bruchbeschriftungen und aufgabenbezogene Zahlenstrahlen.
function fractionSvg(x,y,p,color='#493b50'){
 if(!Array.isArray(p))return `<text x="${x}" y="${y+7}" text-anchor="middle" fill="${color}" font-size="23">${E(String(p).replace('-','−'))}</text>`;
 const [n,d]=p,w=Math.max(String(n).length,String(d).length)*13+10;
 return `<g fill="${color}" aria-label="${n} durch ${d}"><text x="${x}" y="${y-6}" text-anchor="middle" font-size="22">${E(String(n).replace('-','−'))}</text><path d="M${x-w/2} ${y}h${w}" stroke="${color}" stroke-width="1.5"/><text x="${x}" y="${y+24}" text-anchor="middle" font-size="22">${d}</text></g>`;
}
function figure(s){
 if(!s)return '';
 const min=V(s.min),max=V(s.max),span=max-min,X=v=>40+(V(v)-min)/span*320;
 if(!(span>0))throw Error('Ungültiger Zahlenstrahlausschnitt');
 const ticks=s.slots?Array.from({length:s.slots+1},(_,i)=>min+span*i/s.slots):s.den?Array.from({length:Math.max(0,Math.floor(max*s.den+1e-8)-Math.ceil(min*s.den-1e-8)+1)},(_,i)=>(Math.ceil(min*s.den-1e-8)+i)/s.den):[min,max];
 let content='<path d="M35 92H369m-7-5 7 5-7 5" stroke="#326b82" stroke-width="2" fill="none"/>';
 ticks.forEach(v=>{const whole=Math.abs(v-Math.round(v))<1e-8;content+=`<path data-zs-tick="${v}" d="M${X(v)} ${whole?80:85}v${whole?24:14}" stroke="#326b82" stroke-width="1.5"/>`;if(whole&&!s.ends)content+=fractionSvg(X(v),135,Math.round(v));});
 if(s.ends){content+=fractionSvg(40,135,s.min)+fractionSvg(360,135,s.max);}
 if(s.segment){const a=X(s.segment[0]),b=X(s.segment[1]);content+=`<path d="M${a} 72H${b}" stroke="#a17624" stroke-width="6"/><path d="M${a} 66v12M${b} 66v12" stroke="#a17624" stroke-width="2"/>`;}
 if(s.countTo!==undefined){const from=V(s.countFrom??0),to=V(s.countTo),count=Math.round(Math.abs(to-from)*s.den),dir=to>=from?1:-1;for(let i=0;i<count;i++){const a=from+dir*i/s.den,b=a+dir/s.den;content+=`<path d="M${X(a)} 108Q${X((a+b)/2)} 124 ${X(b)} 108" fill="none" stroke="#97506b" stroke-width="2"/>`;if(count<=8)content+=`<text x="${X((a+b)/2)}" y="129" text-anchor="middle" font-size="17" fill="#783d53">${i+1}</text>`;}}
 const values=[];
 for(const [i,p] of (s.points||[]).entries()){
  const value=V(p.v);if(value<min-1e-8||value>max+1e-8)continue;
  const x=X(value),y=p.value?(i%2?170:32):(i%2?178:55),color=p.value?'#783d53':'#326b82';
  content+=`<circle data-zs-point="${value}" cx="${x}" cy="92" r="6" fill="${color}"/><path d="M${x} ${y<92?y+27:105}V${y<92?83:y-26}" stroke="${color}" stroke-width="1.3"/>`;
  if(p.value){content+=fractionSvg(x,y,p.v,color);if(p.name)content+=`<text x="${x+25}" y="${y+5}" font-size="16" fill="${color}">${E(p.name)}</text>`;}else content+=`<text x="${x}" y="${y+6}" text-anchor="middle" font-size="23" fill="${color}">${E(p.name)}</text>`;
  values.push(p.name+(p.value?' = '+(Array.isArray(p.v)?p.v.join('/'):p.v):''));
 }
 return `<figure class="zs-picture" data-zs-min="${min}" data-zs-max="${max}" data-zs-den="${s.den}"><svg viewBox="0 0 400 218" role="img" aria-label="Zahlenstrahl von ${E(Array.isArray(s.min)?s.min.join('/'):s.min)} bis ${E(Array.isArray(s.max)?s.max.join('/'):s.max)}${values.length?'; '+E(values.join('; ')):''}">${content}</svg>${s.caption?`<figcaption>${s.caption}</figcaption>`:''}</figure>`;
}
const cards=[
 {title:'Eine Einheit und ihre Einteilung',html:`${figure(pic(0,1,4,[],{countTo:1}))}<div class="zs-rule-math">1 : 4 = ${F(1,4)}</div>`,lines:['Eine Einheit liegt zwischen zwei benachbarten ganzen Zahlen.','Vier gleich große Lücken in einer Einheit bedeuten Viertel.','Zähle Lücken, nicht Striche.']},
 {title:'Einen Punkt ablesen',html:`<div class="zs-rule-math">P = ${F(4,6)} = ${F(2,3)}</div>`,lines:['Lies die bekannten Zahlen auf der Linie.','Bestimme den Wert einer Lücke.','Zähle vom passenden bekannten Wert bis zum Punkt.','Schreibe den Bruch auf. Kürze ihn bei Bedarf.']},
 {title:'Einen Bruch eintragen',html:`<div class="zs-rule-math">${F(11,4)} = ${M(2,3,4)}</div>`,lines:['Finde die benachbarten ganzen Zahlen.','Teile eine ganze Einheit passend zum Nenner ein.','Gehe den Bruchteil in der richtigen Richtung.','Setze den Punkt erst am Ende der gezählten Strecke.']},
 {title:'Ausschnitt ohne sichtbare 0',html:`<div class="zs-rule-math">${F(3,2)} − ${F(1,2)} = 1<br>1 : 4 = ${F(1,4)}</div>`,lines:['Die linke Randzahl ist nicht automatisch 0.','Schrittweite = Zahlenabstand der bekannten Werte : Anzahl der Lücken.','Erst wenn der Zahlenabstand 1 ist, ist die Lückenzahl direkt der Nenner.']},
 {title:'Mit Zentimetern zeichnen',html:'<div class="zs-rule-math">12 cm : 2 = 6 cm<br>6 cm : 6 = 1 cm</div>',lines:['Zahlenabstand 2 bis 4: zwei ganze Einheiten.','Eine Einheit entspricht hier 6 cm.','Ein Sechstel entspricht hier 1 cm.','Beachte die Maßangaben der Aufgabe. Ein Bildschirmbild ersetzt kein Lineal.']},
 {title:'Negative Zahlen, Betrag und Gegenzahl',html:`<div class="zs-rule-math">|−${F(3,4)}| = ${F(3,4)}<br>Gegenzahl von +${F(3,4)}: −${F(3,4)}</div>`,lines:['Nach rechts werden Zahlen größer, auch links von 0.','Betrag: Abstand zur 0. Er ist nie negativ.','Gegenzahl: gleiche Entfernung auf der anderen Seite von 0.','Die Gegenzahl von 0 ist 0. Auch ihr Betrag ist 0.']},
 {title:'Die genaue Mitte',html:`<div class="zs-rule-math">${F(1,3)} = ${F(2,6)}; ${F(2,3)} = ${F(4,6)}<br>Mitte: ${F(3,6)} = ${F(1,2)}</div>`,lines:['Die Mitte hat zu beiden Randzahlen denselben Abstand.','Halbiere bei Bedarf die vorhandenen Lücken.','Erweitere dazu beide Brüche mit 2.','Prüfe die beiden Abstände.']},
 {title:'Punkte zählen und Zahlen dazwischen',html:'<div class="zs-rule-math">5 Punkte → 4 Lücken</div>',lines:['Bei gleichem Abstand: Teile den Gesamtabstand durch die Lückenzahl.','Bei festem Nenner suchst du passende ganze Zähler.','Ohne festen Nenner liegen zwischen zwei verschiedenen Brüchen unendlich viele weitere Brüche.','Eine ganze Zahl kann ebenfalls als Bruch geschrieben werden.']}
];

/* Didaktischer Aufbau: Die Aufgabe erkennen, einen Weg wählen, jeden
   Rechenschritt begründen. Bilder und mathematische Ausgangsdaten bleiben erhalten. */
const didaktik={
  101:{
    recognize:'Die Aufgabe verlangt eine Einteilung. Es ist noch kein Punkt gesucht.',
    intro:'Zwischen 0 und 1 liegt eine ganze Einheit. Wir teilen genau diese Strecke.',
    approach:['Welche zwei Zahlen begrenzen eine ganze Einheit?','In wie viele gleich lange Lücken soll diese Strecke geteilt werden?','Welchen Wert hat danach eine einzelne Lücke?'],
    questions:['Welche Strecke ist eine ganze Einheit?','Wie viele zusätzliche Striche brauchst du für vier Lücken?','Wie viel von der ganzen Einheit ist eine Lücke?','Wie viele Striche begrenzen vier Lücken?'],
    explanations:[
      ['Die Zahlen 0 und 1 sind benachbarte ganze Zahlen. Ihr Abstand beträgt genau 1.','Nur diese Strecke wird für die Aufgabe aufgeteilt.'],
      ['Vier gleich lange Lücken entstehen durch drei zusätzliche Striche zwischen 0 und 1.','Die beiden Randstriche bei 0 und 1 bleiben stehen.'],
      ['Die ganze Strecke hat den Wert 1. Teilt man sie in vier gleiche Lücken, hat jede Lücke den Wert ein Viertel.','Vier solcher Viertel ergeben wieder 1.'],
      ['Zwischen den beiden Randstrichen und den drei neuen Strichen liegen vier Lücken.','Für die Einteilung zählt die Anzahl der Lücken, nicht die Anzahl der Striche.']
    ],
    hints:['Suche die benachbarten ganzen Zahlen 0 und 1.','Zähle die freien Zwischenräume. Die Randstriche gehören schon dazu.','Was ist 1 geteilt durch 4?','Fahre von 0 nach 1 und zähle die Strecken dazwischen.']
  },
  1:{
    recognize:'Ein Punkt P ist bereits eingezeichnet. Gesucht ist sein Bruchwert.',
    intro:'Zuerst bestimmst du die Größe einer Lücke. Danach zählst du vom Nullpunkt bis P.',
    approach:['Wie viele gleich lange Lücken liegen zwischen 0 und 1?','Wie viele dieser Lücken sind es von 0 bis P?','Kannst du den gefundenen Bruch noch kürzen?'],
    questions:['Wie viele Lücken liegen zwischen 0 und 1?','Was ist der Wert einer von sechs gleich großen Lücken?','Wie viele dieser Sechstel liegen zwischen 0 und P?','Durch welche Zahl sind Zähler und Nenner teilbar?','Bleibt der Punkt beim Kürzen an derselben Stelle?'],
    explanations:[
      ['Die Strecke von 0 bis 1 ist in sechs gleich lange Lücken geteilt.','Der Nenner ist 6, weil jedes Teilstück ein Sechstel der Einheit ist.'],
      ['Die gesamte Strecke hat den Wert 1. Ein einzelner Schritt ist daher 1 : 6 = ein Sechstel.','Dieser Schrittwert gilt auf dem ganzen Zahlenstrahl.'],
      ['Vom Nullpunkt bis P sind es vier solcher Lücken.','Viermal ein Sechstel ergibt vier Sechstel: Der Zähler ist 4.'],
      ['Die Zahlen 4 und 6 sind beide durch 2 teilbar.','Du kannst den Bruch kürzen, ohne den Punkt zu verschieben.'],
      ['Teile Zähler und Nenner durch 2: Aus 4/6 wird 2/3.','Beide Brüche haben denselben Wert und liegen deshalb am selben Punkt.']
    ],
    hints:['Zähle nur die Lücken von 0 bis 1.','Rechne 1 geteilt durch die sechs Lücken.','Beginne bei 0; zähle bis zum Punkt P.','Welche Zahl teilt 4 und 6 ohne Rest?','Beim Kürzen teilst du oben und unten durch dieselbe Zahl.']
  },
  2:{
    recognize:'Ein Bruch ist vorgegeben. Du musst seinen Punkt erst einzeichnen.',
    intro:'Der Nenner bestimmt die Teilung einer ganzen Einheit. Der Zähler gibt die Anzahl der Schritte an.',
    approach:['Liegt der Bruch zwischen 0 und 1 oder außerhalb dieses Bereichs?','In wie viele gleich lange Lücken teilst du eine ganze Einheit?','Wie viele Lücken gehst du vom Nullpunkt aus?'],
    questions:['Liegt drei Viertel zwischen 0 und 1?','In wie viele Lücken teilst du die Strecke?','Wie viele Viertelschritte brauchst du bis zum Punkt?','Liegt dein Punkt noch vor der 1?'],
    explanations:[
      ['Der Zähler 3 ist kleiner als der Nenner 4. Deshalb ist der Bruch kleiner als 1.','Der Punkt liegt zwischen 0 und 1.'],
      ['Der Nenner 4 gibt die Teilung vor: Die Strecke von 0 bis 1 erhält vier gleich lange Lücken.','Jede Lücke steht für ein Viertel.'],
      ['Der Zähler 3 bedeutet drei Viertelschritte ab 0.','Zähle drei Lücken nach rechts; jede hat denselben Wert.'],
      ['Setze den Punkt am Ende des dritten Schritts und beschrifte ihn mit 3/4.','Bis zur 1 bleibt genau eine Viertellücke frei.']
    ],
    hints:['Vergleiche 3 mit 4.','Drei innere Striche ergeben vier gleich lange Lücken.','Zähle Strecken von 0 aus, nicht die Striche.','Prüfe, ob noch ein Viertel bis 1 fehlt.']
  },
  104:{
    recognize:'Der vorgegebene Bruch hat ein Minuszeichen. Gesucht ist der Punkt links von 0.',
    intro:'Die Viertellücken bleiben links und rechts gleich groß. Das Minus gibt die Richtung an.',
    approach:['Zwischen welchen ganzen Zahlen liegt der Bruch?','Wie groß muss eine Lücke sein?','Wie viele Lücken gehst du von 0 aus nach links?'],
    questions:['Welche Strecke liegt direkt links von 0?','Was ändert das Minuszeichen: den Wert einer Lücke oder die Richtung?','Wie weit gehst du von 0 nach links?','Woran erkennst du, dass dein Punkt richtig liegt?'],
    explanations:[
      ['Von −1 bis 0 liegt eine ganze Einheit. Sie wird wie rechts von 0 in vier gleich lange Lücken geteilt.','Eine einzelne Lücke hat den Abstand ein Viertel.'],
      ['Das Minus bedeutet, dass die Zahl links von 0 liegt.','Die Schrittweite bleibt ein Viertel; nur die Richtung wechselt.'],
      ['Beginne bei 0 und zähle drei Viertellücken nach links.','Der zurückgelegte Abstand beträgt drei Viertel.'],
      ['Setze P am Ende der dritten Lücke. Der Wert ist −3/4.','P muss links von 0 und rechts von −1 liegen.']
    ],
    hints:['Suche −1 und 0. Dazwischen liegt eine Einheit.','Das Minus legt die Richtung fest.','Zähle drei Viertellücken von der 0 aus nach links.','Prüfe: Liegt P zwischen −1 und 0?']
  },
  3:{recognize:'Der Zähler ist größer als der Nenner. Der Bruch enthält mehr als ein Ganzes.',intro:'Zuerst suchst du die ganzen Einheiten. Danach trägst du den Rest ein.',approach:['Wie oft passt der Nenner vollständig in den Zähler?','Zwischen welchen ganzen Zahlen liegt damit der Punkt?','Wie viele Bruchteile bleiben nach den Ganzen übrig?']},
  4:{recognize:'Der Bruch ist negativ und hat einen größeren Zähler als Nenner.',intro:'Zerlege den Betrag erst in Ganze und Rest. Trage anschließend das Minus auf dem Zahlenstrahl ein.',approach:['Wie viele Ganze und welcher Rest stecken in sieben Dritteln?','Zwischen welchen negativen ganzen Zahlen liegt der Punkt?','Wie weit musst du von −2 nach links gehen?']},
  5:{recognize:'Ein Zahlenabstand ist in Zentimetern vorgegeben. Die Linie zeigt mehr als eine ganze Einheit.',intro:'Die gezeichnete Länge muss zuerst auf eine ganze Zahleneinheit umgerechnet werden.',approach:['Wie viele ganze Einheiten liegen zwischen 2 und 4?','Wie viele Zentimeter entspricht eine ganze Einheit und dann ein Sechstel?','Wie weit liegt jeder gesuchte Bruch rechts von A?']},
  6:{recognize:'Gesucht ist nicht irgendein Zwischenwert, sondern die genaue Mitte zweier Brüche.',intro:'Die Mitte muss zu beiden Randzahlen denselben Abstand haben.',approach:['Welchen Abstand haben die beiden Brüche?','Wie kannst du diese Lücke in zwei gleiche Teile teilen?','Welche Zahl liegt nach dem Halbieren genau in der Mitte?']},
  7:{recognize:'Der Zahlenstrahl zeigt zwei beschriftete Randwerte, aber keine 0. Ein innerer Punkt ist gesucht.',intro:'Die Schrittweite ergibt sich aus dem Abstand der Randwerte und der Anzahl der Lücken.',approach:['Wie groß ist der Zahlenunterschied zwischen den Randwerten?','In wie viele Lücken ist dieser Unterschied geteilt?','Welchen Schritt addierst du zur linken Randzahl?']},
  8:{recognize:'Die Aufgabe fragt nach zwei Begriffen: Betrag und Gegenzahl.',intro:'Der Betrag ist ein Abstand zur 0. Die Gegenzahl liegt mit gleichem Abstand auf der anderen Seite.',approach:['Wie weit ist der gegebene Punkt von 0 entfernt?','Wo liegt der Punkt auf der anderen Seite der 0?','Was gilt entsprechend für die positive Zahl?']},
  9:{recognize:'Gesucht sind alle Brüche mit einem festgelegten Nenner zwischen zwei Grenzen.',intro:'Schreibe beide Grenzen mit diesem Nenner. Dann kannst du die Zähler dazwischen abzählen.',approach:['Welche Zähler gehören zu den beiden Grenzwerten?','Welche ganzen Zähler liegen streng dazwischen?','Wie viele sind es, wenn die Grenzen nicht mitzählen?']},
  10:{recognize:'Fünf Punkte sind gegeben, aber die drei inneren Werte fehlen.',intro:'Fünf Punkte erzeugen vier gleiche Lücken. Teile den gesamten Zahlenabstand durch vier.',approach:['Wie groß ist der Abstand vom linken bis zum rechten Punkt?','Wie viele Lücken liegen zwischen fünf Punkten?','Welche Werte erhältst du bei gleich großen Schritten nach rechts?']},
  11:{recognize:'Mehrere Punkte liegen auf derselben eingeteilten Linie.',intro:'Die gemeinsame Schrittweite musst du nur einmal bestimmen.',approach:['Wie groß ist eine Lücke zwischen den ganzen Zahlen?','Wie viele Lücken liegen von 0 aus bis A, B und C?','Welche Brüche kannst du anschließend kürzen?']},
  12:{recognize:'Zwei Brüche haben denselben Nenner und aufeinanderfolgende Zähler. Die genaue Mitte ist gesucht.',intro:'Zwischen den beiden Zählern liegt noch kein ganzer Zähler. Halbiere deshalb die Einteilung.',approach:['Wie groß ist die Lücke zwischen den beiden Brüchen?','Wie erhältst du durch Erweitern kleinere gleich große Teilstücke?','Welcher neue Zähler liegt genau dazwischen?']},
  13:{recognize:'Die gezeichnete Strecke liegt im Negativen und hat eine Länge in Zentimetern.',intro:'Auch bei negativen Zahlen wird nach rechts größer gezählt. Nutze den linken Rand als Start.',approach:['Wie groß ist die Einheit von −2 bis −1 auf dem Papier?','Wie lang ist dann eine Achtellücke?','Welche Achtelwerte liegen wie weit rechts von A?']},
  14:{recognize:'Eine Strecke ist in Zentimetern gegeben. Der Bruch hat einen anderen Nenner als die Zeicheneinteilung.',intro:'Passe den Bruch zuerst an die vorhandenen Zehntellücken an.',approach:['Wie lang ist eine ganze Einheit und wie lang eine Zehntellücke?','Wie schreibst du zwei Fünftel als Zehntel?','Wie viele Zentimeter liegt der Punkt rechts von der 0?']}
};
for(const [key,meta]of Object.entries(didaktik)){
 const r=cases[key];
 if(!r)throw Error('Fehlender Zahlenstrahl-Fall: '+key);
 r.recognize=meta.recognize;
 r.intro=[meta.intro];
 r.approach=meta.approach;
 r.steps.forEach((step,i)=>{
  step.title=step.title.replace(/^\d+\s*·\s*/,'');
  if(meta.questions)step.ask=meta.questions[i]||'';
  if(meta.explanations)step.explain=meta.explanations[i];
  if(meta.hints)step.hint=[meta.hints[i]];
 });
}
// Vertiefende Musterbeispiele: Jede Rechnung bekommt eine nachvollziehbare Herkunft.
const vertiefung={
  3:{0:['Ein Ganzes besteht aus vier Vierteln. Zwei Ganze benötigen daher 8 Viertel.','Drei Ganze wären 12 Viertel und damit mehr als die vorhandenen 11.'],1:['Von den 11 Vierteln gehören 8 zu den zwei ganzen Einheiten.','11 − 8 = 3 Viertel bleiben für den letzten Abschnitt übrig.']},
  4:{0:['Ein Ganzes besteht aus drei Dritteln. Zwei Ganze enthalten 6 Drittel.','Von 7 Dritteln bleibt nach den zwei Ganzen noch ein Drittel übrig.'],2:['Der Bruch ist kleiner als −2, aber größer als −3.','Teile deshalb die Strecke zwischen −3 und −2 in drei gleich lange Lücken.']},
  5:{1:['Die Strecke von 2 bis 4 enthält zwei ganze Einheiten.','12 cm : 2 = 6 cm gelten auf dem Papier für eine Einheit.'],2:['Sechs Zentimeter gehören zu einer ganzen Einheit.','6 cm : 6 = 1 cm ist deshalb die Zeichenlänge eines Sechstels.'],4:['Wandle die Drittel in Sechstel um, damit die Einteilung für alle Punkte gleich bleibt.','Ziehe für jeden Bruch den Startwert 2 = 12/6 ab und zähle die zusätzlichen Sechstel.','Da ein Sechstel 1 cm lang ist, entspricht die Anzahl der Sechstel auch dem Abstand von A in Zentimetern.']},
  6:{0:['Die Grenzen sind 1/3 und 2/3. Ihr Abstand beträgt 1/3.','Für die Mitte brauchst du genau die Hälfte dieser Lücke.'],1:['Erweitere beide Brüche mit 2: Aus 1/3 wird 2/6, aus 2/3 wird 4/6.','So wird die Lücke halbiert, ohne die Randwerte zu verändern.']},
  7:{0:['Links steht 1/2, rechts 3/2. Ziehe den linken Wert vom rechten ab.','3/2 − 1/2 = 1 ist der gesamte Zahlenabstand.'],1:['Zwischen den beiden Randwerten liegen vier gleich lange Lücken.','1 : 4 = 1/4 ist deshalb der Wert einer einzelnen Lücke.'],3:['Starte bei 1/2 = 2/4 am linken Rand.','Eine Lücke nach rechts bedeutet plus 1/4. So erreichst du 3/4.']},
  9:{1:['134 Ganze enthalten jeweils drei Drittel.','134 · 3 = 402. Die obere Grenze entspricht also 402/3.'],3:['Die Zähler 396 und 402 gehören zu den Randwerten und zählen nicht mit.','Dazwischen liegen die fünf ganzen Zähler 397, 398, 399, 400 und 401.']},
  10:{0:['Von −3/4 bis 0 sind es 3/4. Von 0 bis +3/4 kommen weitere 3/4 dazu.','Zusammen beträgt der Abstand 6/4 = 3/2.'],1:['Zwischen fünf markierten Punkten liegen genau vier Lücken.','Deshalb wird der Abstand 3/2 durch 4 geteilt, nicht durch 5.'],2:['3/2 : 4 = 3/8. Jede Lücke ist also drei Achtel lang.','Alle vier Schritte müssen dieselbe Größe haben.'],3:['Schreibe den linken Punkt als −6/8.','Addiere jeweils 3/8. Dadurch erhältst du −3/8, 0 und +3/8.']},
  11:{0:['Eine ganze Einheit ist in vier gleich lange Lücken geteilt.','Jede Lücke zählt daher 1/4, auch links von 0 und rechts von 1.'],3:['Der Punkt C liegt eine Viertellücke rechts von 1.','Ein Ganzes sind 4/4. Mit einem weiteren Viertel ergibt das 5/4.']},
  12:{1:['Erweitere beide Brüche oben und unten mit 2.','So entstehen 36/34 und 38/34. Dazwischen bleibt Platz für genau ein Vierunddreißigstel.'],2:['Zwischen den neuen Zählern 36 und 38 liegt 37.','37/34 hat zu beiden Randwerten den Abstand 1/34.']},
  13:{0:['Die beiden Randzahlen −2 und −1 sind benachbart. Ihr Zahlenabstand ist genau 1.','Diese eine Einheit ist auf dem Papier 8 cm lang.'],3:['Schreibe den linken Rand als −16/8.','Ein Schritt nach rechts addiert 1/8, also erhältst du −15/8. Der Punkt liegt 1 cm rechts von A.']},
  14:{1:['Von 0 bis 1 ist die Strecke 5 cm lang.','Bei zehn gleich großen Lücken ist eine Lücke deshalb 5 cm : 10 = 0,5 cm.'],3:['2/5 sind 4/10. Das entspricht vier der vorgegebenen Lücken.','Vier Lücken zu je 0,5 cm ergeben 2 cm auf dem Papier.']}
};
for(const [id,parts]of Object.entries(vertiefung))
 for(const [i,why]of Object.entries(parts))cases[id].steps[Number(i)].explain=why;

const c=window.MERKHEFT_COURSES.zahlenstrahl;
Object.assign(c,{goal:'Bestimme die Schrittweite, lies Punkte ab und trage Brüche mit einer passenden Einteilung ein.',lessons:[{id:101,label:'Einheit und Lücken'},{id:1,label:'Einen Punkt ablesen'},{id:2,label:'Einen Bruch eintragen'},{id:104,label:'Links von 0'}],groups:[[3,11,7],[5,14,13,6],[4,8,12,9,10]],cases,referenceCards:cards,rules:['Bestimme zuerst den Wert einer Lücke.','Nach rechts werden Zahlen größer.','Die Mitte hat zu beiden Randzahlen denselben Abstand.']});
cards[0].title='Den Zahlenstrahl zuerst verstehen';
cards[0].lines=[
 'Suche zuerst die beschrifteten Zahlen. Welche Strecke ist eine ganze Einheit?',
 'Prüfe den Zahlenabstand und zähle die gleich langen Lücken dazwischen.',
 'Schrittweite = Zahlenabstand : Anzahl der Lücken.',
 'Sind 0 und 1 die Randwerte, beträgt der Zahlenabstand genau 1.'
];
const previous=window.MerkheftPictures;
window.MerkheftPictures={render:(topic,id,index,r)=>topic==='zahlenstrahl'?figure(index<0?r.preview:r.steps[index]?.picture):previous.render(topic,id,index,r),learning:(topic,id,s,r)=>topic==='zahlenstrahl'?figure(s.picture):previous.learning(topic,id,s,r)};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const normalize=([n,d])=>{if(d===0)throw Error('Nenner 0');if(d<0){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const mid=(a,b)=>normalize([a[0]*b[1]+b[0]*a[1],2*a[1]*b[1]]);
const snap=(ratio,start,span,den)=>Math.max(-24,Math.min(24,Math.round((start+Math.max(0,Math.min(1,ratio))*span)*den)));
window.MerkheftNumberline={figure,normalize,mid,snap};
function installTool(){
 const lab=document.querySelector('#werkzeug');if(!lab)return;
 lab.innerHTML=`<h2>Brüche auf der Zahlenlinie bewegen</h2><div id="zs-tool"><div class="zs-instruction">Verschiebe den Punkt um eine Bruchlücke. Beobachte Zahl und Richtung.</div><div class="zs-tool-board"></div><div class="zs-tool-answer" aria-live="polite"></div><div class="zs-move"><button type="button" data-zs-action="left">← Eine Lücke</button><button type="button" data-zs-action="right">Eine Lücke →</button></div><div class="zs-controls"><label for="zs-den">Nenner: Lücken je ganzer Einheit</label><select id="zs-den">${[2,3,4,5,6,8,10,12].map(d=>`<option value="${d}" ${d===4?'selected':''}>${d} Lücken</option>`).join('')}</select><label for="zs-num">Zähler: <output id="zs-num-out">3</output></label><input id="zs-num" type="range" min="-24" max="24" step="1" value="3"></div><div class="zs-view-actions"><button type="button" data-zs-action="pan-left">Ausschnitt nach links</button><button type="button" data-zs-action="pan-right">Ausschnitt nach rechts</button><button type="button" data-zs-action="zoom">Näher heran</button><button type="button" data-zs-action="center">Punkt wiederfinden</button><button type="button" data-zs-action="reset">Zurück zu drei Vierteln</button></div><div class="zs-tool-note"></div></div><details class="zs-magnifier"><summary>Zwischen zwei Brüchen weiter vergrößern</summary><div id="zs-zoom"><div class="zs-zoom-presets" role="group" aria-label="Grenzen wählen"><button type="button" data-zs-pair="0">${F(1,3)} bis ${F(2,3)}</button><button type="button" data-zs-pair="1">${F(18,17)} bis ${F(19,17)}</button><button type="button" data-zs-pair="2">−${F(3,4)} bis −${F(1,2)}</button></div><h3 id="zs-zoom-title"></h3><div class="zs-zoom-board"></div><div class="zs-zoom-actions"><button type="button" id="zs-zoom-back">← Zurück</button><span id="zs-zoom-status" aria-live="polite"></span><button type="button" id="zs-zoom-next">Weiter →</button></div></div></details>`;
 const root=lab.querySelector('#zs-tool'),board=root.querySelector('.zs-tool-board'),answer=root.querySelector('.zs-tool-answer'),note=root.querySelector('.zs-tool-note'),denInput=root.querySelector('#zs-den'),numInput=root.querySelector('#zs-num');
 let n=3,d=4,start=-1,span=3,dragging=false;
 function draw(){
  const value=n/d,visible=value>=start&&value<=start+span,[a,b]=normalize([n,d]);
  const s=pic(start,start+span,d,visible?[point([n,d],'P',true)]:[]);
  board.innerHTML=figure(s);
  if(visible){board.querySelector('svg').setAttribute('role','group');const dot=board.querySelector('[data-zs-point]');dot.dataset.zsHandle='point';dot.setAttribute('role','slider');dot.setAttribute('tabindex','0');dot.setAttribute('aria-label','Bruchpunkt verschieben');dot.setAttribute('aria-valuenow',String(value));dot.setAttribute('aria-valuemin',String(-24/d));dot.setAttribute('aria-valuemax',String(24/d));dot.setAttribute('aria-valuetext',n+' durch '+d);dot.setAttribute('r','10');}
  root.dataset.zsN=n;root.dataset.zsD=d;root.dataset.zsStart=start;root.dataset.zsSpan=span;
  answer.innerHTML=`<b>Punkt: ${F(n,d)}${a===n&&b===d?'':' = '+(b===1?String(a).replace('-','−'):F(a,b))}</b><span>Eine Lücke: ${F(1,d)}</span>`;
  note.innerHTML=`<ul><li>${visible?'Nach rechts: Zähler um 1 erhöhen. Nach links: Zähler um 1 verringern.':'Der Punkt liegt '+(value<start?'links':'rechts')+' außerhalb des Ausschnitts. Wähle „Punkt wiederfinden“.'}</li><li>Beim Verschieben des Ausschnitts bleibt der Bruch gleich.</li><li>Ein anderer Nenner verändert die Schrittgröße und damit den Wert des gewählten Bruchs.</li></ul>`;
  root.querySelector('#zs-num-out').textContent=n;numInput.value=n;denInput.value=d;
  root.querySelector('[data-zs-action="left"]').disabled=n<=-24;root.querySelector('[data-zs-action="right"]').disabled=n>=24;
  root.querySelector('[data-zs-action="zoom"]').textContent=span===3?'Näher heran':'Überblick zeigen';
 }
 root.addEventListener('input',e=>{if(e.target===numInput){n=+numInput.value;draw();}});
 denInput.addEventListener('change',()=>{d=+denInput.value;draw();});
 root.addEventListener('click',e=>{const a=e.target.closest('[data-zs-action]')?.dataset.zsAction;if(!a)return;
  if(a==='left')n=Math.max(-24,n-1);if(a==='right')n=Math.min(24,n+1);
  if(a==='pan-left')start--;if(a==='pan-right')start++;
  if(a==='zoom'){span=span===3?1:3;start=Math.floor(n/d)-(span===3?1:0);}
  if(a==='center')start=Math.floor(n/d)-(span===3?1:0);
  if(a==='reset'){n=3;d=4;start=-1;span=3;}draw();
 });
 function move(e){const svg=board.querySelector('svg'),r=svg.getBoundingClientRect(),ratio=((e.clientX-r.left)/r.width*400-40)/320;n=snap(ratio,start,span,d);draw();}
 board.addEventListener('pointerdown',e=>{e.preventDefault();dragging=true;board.setPointerCapture(e.pointerId);move(e);});
 board.addEventListener('pointermove',e=>{if(dragging)move(e);});
 board.addEventListener('pointerup',e=>{if(dragging){move(e);dragging=false;if(board.hasPointerCapture(e.pointerId))board.releasePointerCapture(e.pointerId);}});
 board.addEventListener('pointercancel',()=>{dragging=false;});
 board.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();n=e.key==='Home'?-24:e.key==='End'?24:Math.max(-24,Math.min(24,n+(e.key==='ArrowRight'?1:-1)));if(n/d<start||n/d>start+span)start=Math.floor(n/d)-(span===3?1:0);draw();board.querySelector('[data-zs-handle]')?.focus();});
 draw();
 const z=lab.querySelector('#zs-zoom'),pairs=[[[1,3],[2,3]],[[18,17],[19,17]],[[-3,4],[-1,2]]];let pair=0,phase=0;
 function zoom(){const [a,b]=pairs[pair],m=mid(a,b),inner=mid(a,m);let images='';
  images=figure(pic(a,b,0,phase>=2?[point(m,'M',true)]:[],{ends:true,slots:phase>=1?2:1,caption:phase===0?'Die beiden gegebenen Grenzen.':phase===1?'Teile ihren Abstand in zwei gleich große Lücken.':`Mitte M = ${label(m)}`}));
  if(phase===3)images+=figure(pic(a,m,0,[point(inner,'N',true)],{ends:true,slots:2,caption:`Vergrößerter linker Abschnitt: ${label(a)} < ${label(inner)} < ${label(m)}`}));
  z.querySelector('.zs-zoom-board').innerHTML=images;
  z.querySelector('#zs-zoom-title').textContent=['Die Grenzen ansehen','Den Abstand halbieren','Die genaue Mitte zeigen','Den linken Abschnitt noch einmal halbieren'][phase];
  z.querySelector('#zs-zoom-status').textContent='Bildschritt '+(phase+1)+' von 4';z.querySelector('#zs-zoom-back').disabled=phase===0;z.querySelector('#zs-zoom-next').textContent=phase===3?'Von vorn ansehen':'Weiter →';
  z.querySelectorAll('[data-zs-pair]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.zsPair===pair)));
 }
 z.addEventListener('click',e=>{const chosen=e.target.closest('[data-zs-pair]');if(chosen){pair=+chosen.dataset.zsPair;phase=0;}else if(e.target.id==='zs-zoom-next')phase=(phase+1)%4;else if(e.target.id==='zs-zoom-back')phase=Math.max(0,phase-1);else return;zoom();});zoom();
}
installTool();
})();
