# MATHE-MERKHEFT – VERBINDLICHE GESAMTBAUVORLAGE

**Version:** 1.0 · **Stand:** 04.11.2026  
**Geltungsbereich:** alle neun Kapitel der Klasse 6; Lernen, Beispiele, Bildwerkzeug und Nachschlagen.  
**Status:** verbindliche Arbeits- und Abnahmegrundlage für den geplanten Gesamtumbau. **Keine** Änderung der Lernseiten durch dieses Dokument.  
**Quellenstand:** der am 04.11.2026 gelesene Hauptzweig des Repositories gabikloos13-afk/Mathe-Merkheft. Frühere Prüfprotokolle wurden als historische Angaben behandelt; maßgeblich sind die aktuell geladenen Quelldateien.

## 0. Das Ziel in einem Satz

Das Mathe-Merkheft soll einer etwa zwölfjährigen Schülerin ermöglichen, **die Aufgabenart zu erkennen, eine passende Vorgehensweise selbst zu wählen, den mathematischen Zusammenhang im Bild wirklich zu verstehen, den Rechenweg nachzuvollziehen und das Ergebnis eigenständig zu prüfen**. Es ist ein strukturiertes Lern- und Nachschlagewerk, **kein Quiz-, Punkte- oder Übungsportal**.

**Nicht zulässig:** rein dekorative Bilder, Scheinrechnungen, fertig verratene Lösungen, unnötig schwierige Begriffe, mehrere neue Denkideen in einer Phase, unkontrollierte Änderungen anderer Kapitel oder technische „Freigaben“ ohne echte Prüfungen.

---

# TEIL A – VOLLSTÄNDIGE BESTANDSAUFNAHME

## A1. Prüfgrundlage und Grenzen

Untersucht wurden der aktuelle gemeinsame Datenstand (course-data.js), alle neun Themenseiten, die gemeinsame Steuerung (course.js), das Bildsystem (rechenbilder.js, bildlabor.js, anfasslabor.js), die kapiteleigenen Module für Gemischte Zahlen, Zahlenstrahl und Quotienten, die Bildmodule für Dezimalzahlen, Dezimalvergleich und Größen, die gemeinsamen und themenspezifischen CSS-Dateien, das Inhaltsverzeichnis, die vorhandenen 13 Testdateien sowie buchabgleich.md und die bisherigen Prüfprotokolle.

**Wichtig:** Gemischte Zahlen, Zahlenstrahl und Quotienten überschreiben beim Laden ihre Ausgangsdaten aus course-data.js durch eigene Kapitelmodule. Eine Prüfung nur der großen Datendatei liefert für diese drei Kapitel falsche Zahlen und veraltete Lernwege. In dieser Analyse werden deshalb die **tatsächlich angezeigten** Kapitelmodule berücksichtigt.

Die folgenden Angaben beruhen auf Quellcode-, Daten- und Bildzustandsanalyse. Das ist **keine erneute echte Browser-, Touch- und Bildschirmprüfung aller Seiten** und kein unabhängiger Abgleich jedes Rechenwegs mit den Originalbuchfotos.

## A2. Tatsächlicher Kapitelbestand

| Nr. | Kapitel | Lernwege | Musterbeispiele | Nachschlagekarten | Befund / Hauptauftrag |
|---|---|---:|---:|---:|---|
| 01 | Brüche und Anteile | 4 | 16 | 0 gesonderte Karten | Lernwege wiederholen vier Beispielaufgaben; Bild und Anteil müssen vom selben Ganzen ausgehen; eigenes Nachschlageformat fehlt |
| 02 | Kürzen und Erweitern | 2 | 10 | 7 | Technik und Inhalt vorhanden; Teilbarkeit, Faktor und Wertgleichheit müssen konsequent durch eine visuelle Entscheidung geführt werden |
| 03 | Gemischte Zahlen | 3 | 8 | 6 | Eigenes Kapitelmodul, häufig gute Teilbilder; einheitliche Denkfragen und klare Übergänge vom Ganzen zum Rest fehlen |
| 04 | Brüche am Zahlenstrahl | 4 | 12 | 8 | Eigene Regeln und Bilder; negative Richtung, Schrittweite, Lücken und Zielpunkt müssen sichtbar **nacheinander** entstehen |
| 05 | Brüche als Geteilt-Aufgabe | 4 | 12 | 8 | Anspruchsvolle eigenständige Verteilungsbilder; inhaltlich viel Stoff, aber teils passive Schrittführung und zahlreiche Sonderfälle |
| 06 | Brüche vergleichen | 4 | 12 | 6 | Lernaufgaben getrennt; die Wahl der Vergleichsstrategie und fortschreitende Bildmarkierung sind noch nicht überall eindeutig |
| 07 | Brüche und Kommazahlen | 4 | 11 | 6 | Eigenständige Lernwege und kapiteleigene Bilder; Stellenwertentscheidungen müssen vor dem sichtbaren Ergebnis stehen |
| 08 | Kommazahlen vergleichen | 4 | 13 | 6 | Eigenständige Lernwege; Stelle für Stelle vergleichen, negative Werte, Lückenziffern und Zwischenzahlen bedürfen einer eindeutigen Bildreihenfolge |
| 09 | Mit Größen rechnen | 5 | 17 | 6 | Eigenständige Lernwege und Bilder; Rechenrichtung, Einheit, Größenart und geometrische Dimension müssen einheitlich geführt werden |
| **Summe** | **9 Themen** | **34** | **111** | **53** | Eine gemeinsame verbindliche Bauweise fehlt noch |

Hinweis: Die 53 Nachschlagekarten zählen die vorhandenen kapiteleigenen Karten. „Brüche und Anteile“ verwendet stattdessen eine allgemeine Regeln-/Begriffsansicht. Diese ist nicht leer, aber strukturell nicht gleichwertig.

## A3. Übergreifende Schwachstellen – nach Priorität

### P0 – Didaktik und Lösungslogik

**P0.1: Eine Seite kann mathematisch richtig und didaktisch trotzdem unklar sein.** Aktuell stehen in der gemeinsamen Anzeige mehrere frühere Rechenzeilen gleichzeitig. Der Code baut beim Weiterklicken die Zeilen aller zurückliegenden Schritte auf. Das erschwert den Blick auf die neue Denkhandlung. Neue Regel: **Nur der aktuelle Schritt ist im Lernbereich offen sichtbar**. Frühere Schritte bleiben bei Bedarf über „Bisheriger Weg“ ausklappbar; die vollständige Rechnung steht erst in der Schlussansicht.

**P0.2: Uneinheitliche Entscheidung vor der Lösung.** In den vier Lernwegen „Brüche und Anteile“ fehlen eigenständige Aufgaben, weil sie zugleich Musterbeispiele sind. In anderen Themen gibt es zwar getrennte Zahlen, aber oft ausschließlich erklärte Rechenzeilen. Die aktuelle Datenprüfung findet explizite Denkfragen vor einem nächsten Lernschritt nur bei Zahlenstrahl, Brüche/Kommazahlen, Kommazahlen vergleichen und Größen. Neue Regel: Jede entscheidungsrelevante Phase braucht eine **Frage vor der Aufdeckung** und eine begründete Rückmeldung danach.

**P0.3: Bildfolge und Denkfolge sind nicht gekoppelt.** Im aktuellen Code liefern mehrere aufeinanderfolgende Beispielphasen **identische Bildausgaben**. Solche Wiederholungen sind nicht automatisch mathematisch falsch; sie belegen aber, dass die Bilder die neue Entscheidung nicht immer nachvollziehbar zeigen. Neue Regel: Für jeden Schritt muss dokumentiert sein, **welche sichtbare Veränderung** den aktuellen Gedanken vermittelt. Gibt es keinen neuen mathematischen Bildgedanken, darf kein künstlicher zusätzlicher Bildschritt eingefügt werden.

**P0.4: Es werden zum Teil Antworten oder mehrere Zwischenergebnisse gezeigt, bevor sie gedanklich hergeleitet sind.** Lösungsverrat betrifft nicht nur sichtbare Beschriftungen, sondern auch Bildunterschriften, Alternativtexte, Hilfen und interaktive Ausgangszustände. Jede Vorwegnahme ist ein Abnahmefehler.

### P1 – Einheitliches Lernerlebnis

**P1.1: Unterschiedliche Schrittzählung und Abschnittsüberschriften.** Der gemeinsame Reader zählt bei mehreren Kapiteln Aufgabenstart und Abschluss wie Rechenschritte. Der Zahlenstrahl wurde separat korrigiert; das muss für **alle neun** gelten. Bezeichnungen wie „Rechenweg wie im Heft“ dürfen nicht über reinen Beobachtungs- oder Entscheidungsschritten erscheinen.

**P1.2: Uneinheitliche Reihenfolge.** Teilweise erscheint erst die Rechnung und danach das Bild, anderswo steht das Bild oben. Künftig gilt in allen Kapiteln dieselbe Lesereihenfolge: **Aufgabe → großes Bild → Denkfrage → eigene Entscheidung → Erklärung → gegebenenfalls eine Rechenzeile**.

**P1.3: Unterschiedliches Nachschlagen.** Ein Kapitel nutzt nur eine ältere Regeln-/Wörteransicht, acht haben eigene Karten. Künftig bekommt jedes Thema dieselbe innere Struktur und einen druckfähigen kompakten Kern.

**P1.4: Die ersten Anweisungen unterscheiden sich sprachlich erheblich.** Manche sind sachlich klar, andere zu technisch („Schrittweite bestimmen“, „Nenner gibt die Teilung vor“) oder redundant. Fachbegriffe bleiben, werden aber unmittelbar an einem konkreten Bild erklärt.

### P1 – Architektur und Wartbarkeit

**P1.5: Mehrere Datenwahrheiten.** Drei Kapitelmodule setzen eigene Daten über den zentralen Ausgangsbestand. Auch Bildlogik liegt in mehreren thematischen Modulen, während die allgemeine Bedienung zahlreiche Themenausnahmen kennt. Ein globaler Umbau darf dieses Problem nicht durch weitere Ausnahmen in course.js vergrößern.

**P1.6: Ausgabebilder haben unterschiedliche technische Formen.** Gemischte Zahlen und Quotienten verwenden auch HTML/CSS-Figuren; Zahlenstrahl und andere Module SVG. Eine gemeinsame Prüfung darf deshalb nicht fälschlich „enthält kein SVG“ als Fehler werten. Maßgeblich sind **gültige sichtbare Figur, mathematische Aussage, korrekte Alternativbeschreibung und passende Bildphase**.

**P1.7: Schulmaterial ist nicht vollständig im Repository hinterlegt.** buchabgleich.md dokumentiert 25 frühere Buchfotos, jedoch fehlen in dieser Fotoserie Buchseiten 11–13; später wurden einzelne Heftnotizen ergänzt. Der Abgleich ist eine brauchbare Vorarbeit, ersetzt aber keine erneute Freigabe des genauen Schulstoffs. Alte Dokumente mit 96 oder 98 Musterwegen sind als Umfangszahlen inzwischen überholt.

### P2 – Prüfung und Veröffentlichung

**P2.1:** 13 Testdateien sind vorhanden; sie konzentrieren sich auf mathematische Werte, Modellausgaben und Einbindung. Ein durchgängiges modernes Browser-End-to-End-Testpaket und eine für alle neun Themen belegte, nach dem jeweils letzten Umbau durchgeführte Mobilabnahme sind aus dem Repository nicht ersichtlich.

**P2.2:** Einzelne positive Testläufe oder frühere Chrome-Prüfungen dürfen nicht als visuelle Freigabe einer späteren Version ausgegeben werden. Für jeden Release müssen **gespeicherte HTML-, CSS- und JavaScript-Dateien** zusammen mit dem tatsächlich ausgelieferten Stand geprüft werden.

## A4. Was zwingend erhalten bleibt

Alle derzeit belegten Aufgabentypen, bisher korrekte Mathematik, die vier Register **Lernen · Beispiele · Bildwerkzeug · Nachschlagen**, das direkte Ansteuern per Themen-/Beispiel-Link, die brauchbaren interaktiven Werkzeuge und die schulisch relevanten Begrifflichkeiten. Keine radikalen Kürzungen nur für eine schönere Oberfläche. Zusätzliche Informationen werden im Nachschlagen vertieft, nicht im ersten Lernbild überladen.

---

# TEIL B – EIN VERBINDLICHER BAUSTANDARD FÜR ALLE THEMEN

## B1. Der eine Denkweg

Jeder Lernweg und jedes Musterbeispiel folgt **derselben logischen Reihenfolge**, auch wenn die Zahl der Schritte unterschiedlich ist:

1. **Was ist gegeben, was ist gesucht?** – Aufgabe und bekanntes Ganzes / bekannte Einheiten eindeutig zeigen.
2. **Woran erkenne ich die Aufgabenart?** – ein sachlicher Erkennungshinweis.
3. **Welche Entscheidung muss ich treffen?** – etwa teilen, zählen, erweitern, vergleichen, umwandeln oder rückwärtsrechnen.
4. **Was verändert sich im Bild?** – eine mathematisch relevante Teilung, Markierung, Bewegung oder Gruppierung.
5. **Welche Rechnung folgt daraus?** – höchstens eine neue Rechenidee gleichzeitig; ohne unnötige Scheinrechnung.
6. **Warum stimmt das?** – kurze Begründung mit genau den Zahlen und Größen aus der Aufgabe.
7. **Wie kontrolliere ich es?** – Gegenprobe, Plausibilität, gleiche Fläche, Lage am Zahlenstrahl oder Rückumwandlung.

Das ist **kein starres Sieben-Seiten-Schema**. Manche Aufgaben brauchen drei echte Denkhandlungen, andere acht. Ein Schritt ist nur dann berechtigt, wenn Hanna etwas **Neues erkennen, entscheiden oder nachvollziehen** kann.

## B2. Grundlegendes Lerndrehbuch – verpflichtende Felder

Pro Lernweg und Musterbeispiel wird vor der Implementierung ein Drehbuch erstellt:

- **Kennung und Titel:** stabiler Themen- und Aufgaben-ID; kindgerechter, eindeutiger Titel.
- **Buchbezug / Lernziel / Vorwissen:** welche schulische Anforderung und welche bekannte Regel?
- **Aufgabenstellung:** gegebene Daten, gesuchte Größe und erwartete Antwortform.
- **Typ-Erkennung:** „Daran erkennst du, dass …“ in einem Satz.
- **Vorgehensplan:** zwei bis vier konkrete Leitentscheidungen; keine bereits fertig gerechnete Lösung.
- **Phasen:** pro Phase ein eigenes Bilddrehbuch (siehe B3), eine konkrete Frage, optional ein Tipp, eine Erklärung und höchstens **eine neue Rechenidee**.
- **Abschluss:** vollständige schulische Rechnung, Antwort mit Einheit / Vorzeichen, Plausibilitäts- oder Gegenprobe.
- **Denkfalle:** genau der naheliegende Fehler für diese Aufgabenart und **warum** er falsch ist.
- **Anschluss:** kurzer Bezug zur passenden anderen Aufgabenart, ohne eine zusätzliche Lernstrecke aufzuzwingen.

**Pflichtunterschied:** Eine Lernaufgabe erklärt ein Grundprinzip mit eigenen Zahlen; ein Musterbeispiel zeigt danach eine Anwendung **mit anderen Zahlen oder einer klar anderen Aufgabenform**. Keine stille Doppelung.

## B3. Bilddrehbuch für **jede** Phase

Eine Bildphase muss dokumentieren:

1. **Startzustand:** Was darf Hanna schon sehen? Nur bekannte Angaben und bereits hergeleitete Ergebnisse.
2. **Gleichbleibendes Modell:** Was ist das Ganze? Wie groß sind die Einheiten? Welcher Maßstab bleibt erhalten?
3. **Neue Sichtbarkeit:** Was erscheint jetzt erstmals – Teilstriche, ein Teil, Pfeil, Gruppe, Stellenwert, Umrechnungsfaktor, Punkt?
4. **Hervorhebung:** Was soll das Auge zuerst erkennen? Ein primärer Fokus, nicht vier konkurrierende Farben.
5. **Noch verborgen:** Welche Zahlen, Zielpunkte, Vergleichszeichen oder Ergebnisse dürfen **noch nicht** erscheinen?
6. **Denkfrage:** Welche Beobachtung oder Entscheidung soll Hanna vor der Aufdeckung selbst treffen?
7. **Erklärung:** Was beweist das Bild? Zwei kurze Sätze reichen oft.
8. **Rechenzeile:** Nur wenn dieser Bildzustand wirklich eine Rechenhandlung trägt.
9. **Barrierefreiheit:** Bildbeschreibung beschreibt den **aktuellen**, nicht den späteren Zustand. Kein Lösungsverrat im Alternativtext.
10. **Prüfkriterium:** Welche konkreten Zahlen, Flächenanteile, Lücken, Punkte oder Maße müssen automatisch überprüfbar sein?

**Unverhandelbar:** Das Ganze bleibt während der Aufgabe vergleichbar. Maßstäbe, Feldgrößen und Bezugsmengen ändern sich nicht heimlich. Bei einem beabsichtigten Wechsel muss der Grund ausdrücklich gezeigt werden.

**Bildtypen sind keine Deko:** echte gleich große Flächen, Stücke, Gruppen, Stellenwertfelder, Zehner-/Hundertergitter, maßhaltige Zahlenstrahlabschnitte, Zeitkreise, Quadrat-/Kubikeinheiten und Quaderansichten. Fotografie ist nur dann sinnvoll, wenn sie fachlich dieselbe Aufgabe exakt zeigt; sie ersetzt kein veränderbares mathematisches Modell.

## B4. Verbindliche Reihenfolge auf dem Bildschirm

**Einstieg (ohne Lösung)**

1. Titel und konkrete Aufgabe.
2. Großes ruhiges Ausgangsbild, passend zur Aufgabe.
3. „Das erkennst du“: genau eine zentrale Beobachtung.
4. „So gehe ich vor“: kurze, verständliche Leitfragen.
5. Button: „Ersten Schritt ansehen“.

**Aktueller Lernschritt**

1. „Schritt 2 von 5“ – **nur die tatsächlichen Lernschritte zählen**.
2. Einfache Überschrift: „Eine Lücke erkennen“, „Zwei Teile zusammenfassen“, „Die Größe umrechnen“.
3. Großes Bild mit **nur der neuen Änderung**.
4. Eine konkrete Denkfrage; bei einer echten Entscheidung erst überlegen / auswählen, **danach** aufdecken.
5. Kurze Erklärung und höchstens eine neue Rechenzeile.
6. „Tipp“ nur bei Bedarf.
7. „Zurück“ / „Weiter“.

**Schlussbild**

- Ganze Rechnung in schulnaher Schreibweise.
- Deutliches Ergebnis und eine Kontrolle.
- Eine wichtigste Denkfalle; falls sinnvoll ein kurzer Bezug zu einer anderen Aufgabenart.
- Button „Noch einmal ansehen“ bzw. „Weitere Beispiele“.
- Frühere Schritte bei Bedarf über „Bisheriger Weg“ erreichbar, **nicht permanent gestapelt**.

**Nicht:** Aufgabenstart als „Schritt 1 von 7“ ausgeben, wenn es tatsächlich fünf Rechenschritte gibt; kein wiederkehrender Titel „Rechenweg wie im Heft“ über reinen Bildschritten.

## B5. Sprachstandard Klasse 6

- Kurze, vollständige Sätze. **Ein Gedanke pro Satz**.
- Direkte, sachliche Anweisungen: „Zähle die vier Lücken.“ / „Suche den Nullpunkt.“ / „Prüfe die Einheit.“
- Fachbegriff beim ersten Auftreten **am Bild erklären**: „Der Nenner 4 bedeutet: Wir teilen eine ganze Einheit in vier gleich große Teile.“
- Keine Kindersprache, Übermotivation, leere Lobesfloskeln oder Computerbegriffe.
- Nicht „einfach“ / „natürlich“ / „du siehst doch“, wenn gerade eine schwierige Stelle erklärt wird.
- Jede Zahl im Text muss aus Aufgabe oder vorherigem Schritt stammen.
- Kein „mal 100“, solange Größenart und Umrechnungsrichtung nicht geklärt sind.
- Unterschied zwischen **streng falsch** und nur anderer korrekter Schreibweise bewahren.
- Rechenerklärungen müssen in der vom Schulbuch verlangten fachlichen Tiefe bleiben, nicht künstlich alle möglichen Sonderfälle aufnehmen.

**Schreibbeispiel:**
Nicht: „Nun bestimmen wir anhand der Skalenparameter die Schrittweite.“
Sondern: „Von 0 bis 1 liegen vier gleich lange Lücken. Eine Lücke ist deshalb ein Viertel.“

## B6. Visuelle Designsprache

- Ein gemeinsames ruhiges Seitengerüst, großzügiger Weißraum, gut lesbare Standardschrift.
- Farbbedeutungen **über alle Themen konsistent**: Blau = bekannte neutrale Angaben; Violett/Beere = der gerade hervorgehobene Denkgedanke; Grün = begründet geprüftes Ergebnis; warmes Gelb = Vorsicht / Denkfalle. Rot nur für echte Fehler bzw. negative Kennzeichnung, nicht beliebig dekorativ.
- Farbcodierung darf nie die einzige Information sein; Pfeile, Muster, Beschriftungen und Formen helfen mit.
- Maximal ein hervorgehobener Hauptgedanke je Schritt.
- Bruchstrich waagerecht; Minuszeichen, gemischte Zahlen und Exponenten sauber setzen.
- Formeln lesbar und nicht zwischen zu vielen Symbolen eingequetscht.
- Bilder groß, aber nicht mit riesigen leeren SVG-Rändern. Auf 375 px dürfen relevante Details nicht zu klein werden.
- Buttons mindestens gut mit dem Finger bedienbar; sichtbarer Tastaturfokus.
- Bildschirmreihenfolge und Screenreader-Lesereihenfolge stimmen überein.
- Rücksicht auf reduzierte Bewegung; keine unnötigen Animationen.

## B7. Nachschlagen – einheitliche Innenstruktur

Jedes der neun Themen erhält:

1. **Kurz merken:** Kernregel, wichtigste Form, eine Denkfalle und ein Mini-Beispiel.
2. **So entscheide ich:** Aufgabentypen anhand der gegebenen Zahlen und gesuchten Größe unterscheiden.
3. **Rechenmuster:** schulnahe vollständige Standardrechnung je wesentlichem Typ.
4. **Typische Fehler:** falsch / richtig / Grund, ohne beschämende Bewertung.
5. **Sonderfälle und Verbindungen:** nachrangig, bei Bedarf aufgeklappt.
6. **Spickzettel-Druckkern:** nur Kurzregel, Standardmuster, Hauptdenkfalle und ein Beispiel; keine langen Interaktionen oder Werkzeugbilder.

Der Reiter bleibt vollständig als Nachschlagewerk, ohne beim ersten Öffnen alle Details auf einmal zeigen zu müssen.

## B8. Bildwerkzeuge

Die neun bestehenden Werkzeuge werden **erhalten**, aber anhand derselben Fragen geprüft:

- Welchen einzigen Zusammenhang soll das Werkzeug erklären?
- Welche Eingaben darf Hanna verändern?
- Wie verändert sich das Bild, und wie wird der unveränderte mathematische Wert bzw. die neue Größe nachgewiesen?
- Was bedeutet ein Schritt nach links/rechts, ein neuer Nenner, ein neues Ganzes oder eine neue Einheit?
- Gibt es einen erkennbaren Startzustand, Rücksetzen und einen sinnvollen Endzustand?
- Sind Maus, Touch, Tastatur und Screenreader sinnvoll bedienbar?
- Verrät das Werkzeug in einer Aufgabe etwas, das erst der spätere Lernschritt herleiten soll?

Keine doppelten Tools nur zur Abwechslung. Wenn eine neue Animation keinen zusätzlichen Denkgewinn bringt, entfällt sie.

---

# TEIL C – DIE NEUN FACHLICHEN BAUPLÄNE

## C1. Brüche und Anteile

**Kernentscheidungen:** Was ist das Ganze? Sind alle Teile gleich groß? Suche ich den Anteil oder das Ganze? Muss ich vorwärts oder rückwärts rechnen?

**Pflichtmodelle:** Streifen, Rechteckfelder, reale Mengen und geeignete Teilbilder (Tank, Figur, Würfel). Dasselbe Ganze muss innerhalb eines Vergleichs gleich bleiben.

**Lernpfade:** (1) Zähler/Nenner aus gleich großen Teilen ablesen, (2) Teilmenge färben bzw. darstellen, (3) Anteil aus bekanntem Ganzen ermitteln, (4) Ganzes aus bekanntem Anteil zurückrechnen.

**Entscheidender Umbau:** Vier Lernaufgaben erhalten **eigene Zahlen und Bilder**, die nicht zugleich in der Beispielsammlung stehen. Die derzeitige Doppelung der Grundfälle muss verschwinden. Keine „Antwortsorte“ ohne Erklärung der Bezugsmenge.

**Bildabnahme:** Eine Gruppe wird zuerst abgegrenzt, dann ein Teil gezeigt, erst anschließend die verlangte Anzahl gewählt. Bei Rückwärtsrechnung sichtbar erst einen Teil, dann alle Teile zusammensetzen. Ein Kreis/Polygon darf nicht bloß optisch ähnlich große Stücke vortäuschen.

**Nachschlagen:** eigene Karten für Zähler/Nenner, Anteil gesucht, Ganzes gesucht, Rest/Anteilwechsel, typische Bezugsfehler.

## C2. Kürzen und Erweitern

**Kernentscheidungen:** Wird multipliziert oder geteilt? Ist eine Malzahl bzw. ein Zielnenner vorgegeben? Ist die Kürzungszahl für beide Zahlen erlaubt? Bleibt der Wert gleich?

**Pflichtmodelle:** dieselbe gefärbte Fläche mit feinerer/groberer Teilung; Zähler und Nenner **sichtbar mit demselben Faktor** verändert.

**Lernpfade:** Erweitern; Kürzen. Das eigenständige Kürzen bleibt erhalten, ebenso freie Erweiterung, vorgegebene Malzahl, Zielnenner und mehrstufige Fälle bei den Beispielen.

**Entscheidender Umbau:** Den Faktor **vor der neuen Bruchzahl** finden lassen; beim Kürzen zuerst prüfen, ob beide Zahlen ohne Rest teilbar sind. Die Frage „Kann ich noch kürzen?“ braucht eine anschauliche Schlusskontrolle.

**Bildabnahme:** Ausgangsfläche und Zielfläche exakt gleich groß, kein vorzeitiger neuer Zähler, keine unbegründete freie Faktorwahl als einzige richtige Möglichkeit.

## C3. Gemischte Zahlen

**Kernentscheidungen:** Wie viele vollständige Ganze? Welcher Rest? Gibt es überhaupt einen Rest? In welche Richtung wird umgewandelt? Wie wirkt ein Minuszeichen?

**Pflichtmodelle:** gleich große Bruchteilstreifen; vollständige Ganze werden erkennbar **gebündelt**, Reststücke bleiben sichtbar.

**Lernpfade:** Ganze und Rest erkennen, unechten Bruch in gemischte Zahl, gemischte Zahl in Bruch. Beispiele: Nullrest, Lücken, Kürzen des Rests, negatives Vorzeichen.

**Entscheidender Umbau:** Vollständige Bündel erst sichtbar sammeln, dann zählen, dann Rest benennen; negative gemischte Zahl nicht missverständlich als Summe aus negativer ganzer Zahl und positivem Rest deuten.

**Bildabnahme:** Ganze immer derselben Größe, Rest kleiner als ein Ganzes, korrektes Vorzeichen, keine falsche Darstellung bei mehr als zwei Ganzen.

## C4. Brüche am Zahlenstrahl

**Kernentscheidungen:** Wo liegt die ganze Einheit? Wie groß ist ein Abschnitt? Wie viele **Lücken**, nicht Striche, sind gegeben? Von welchem bekannten Wert gehe ich los? In welche Richtung? Wo steht der Zielpunkt?

**Pflichtmodelle:** maßhaltiger Zahlenstrahl mit festem Maßstab; hervorgehobene Einheit, einzelne Lücke, sichtbare Schritte, erst danach Zielpunkt und Beschriftung.

**Lernpfade:** Einheit teilen, Punkt ablesen, Bruch eintragen, negative Brüche. Die übrigen zwölf Musterbeispiele einschließlich Maßzeichnungen, ohne sichtbare 0, Mitte, Betrag/Gegenzahl und festem Nenner bleiben.

**Verbindliches Referenzdrehbuch für −3/4:**

| Phase | Neues sichtbares Element | Noch verborgen |
|---|---|---|
| 1 | 0 und −1, die ganze Strecke hervorgehoben | Teilstriche, Punkt, Lösung |
| 2 | Strecke in vier gleich lange Lücken | Zielpunkt |
| 3 | genau **eine** Viertellücke hervorgehoben | drei Schritte, Zielpunkt |
| 4 | Pfeil **ab 0 nach links** | Punkt und Ergebnis |
| 5 | erste Lücke ab 0 markiert: 1. Schritt | weitere Schritte |
| 6 | zweite und dritte Viertellücke einzeln dazuschalten | Endbeschriftung |
| 7 | Punkt am Ende der dritten Lücke, danach −3/4 | nichts Relevantes |

Bei Schritt 7 prüfen: Punkt liegt rechts von −1 und links von 0; von 0 bis P sind es genau drei Viertellücken. **Kein fertiger Punkt vor der Handlung**, keine irreführende Rechnung 1 − 0 = 1 als erste „Erkenntnis“, kein unnötig weiter Ausschnitt bis 2. Die Zahl der sichtbaren Bildphasen darf technisch 8 sein, wenn die beiden markierten Zwischenlücken getrennt gezeigt werden müssen; entscheidend ist der Denknutzen.

**Bildabnahme:** Gleiche Einheit bei jedem Schritt; negative Zahlen korrekt sortiert; Lückenwert als tatsächlicher Abstand; bei Maßaufgaben Maßeinheit cm ausdrücklich als Zeichenlänge kennzeichnen, nicht mit Zahlenwert verwechseln.

## C5. Brüche als Geteilt-Aufgabe

**Kernentscheidungen:** Was wird verteilt? Auf wie viele? Sind Gegenstände teilbar? Wo stehen Dividend und Divisor im Bruch? Welche Bedeutung hat ein Minus oder die 0?

**Pflichtmodelle:** Quelle mit ganzen Gegenständen / Größen, deutlich getrennte Empfänger, danach sichtbare gleich große Anteile. Keine Verwechslung von Stückzahl und Anteil pro Person.

**Lernpfade:** gerecht verteilen; Division als Bruch; Bruch als Division; Vorzeichen. Beispieltypen mit fehlender Menge, fehlenden Empfängern, 0, negativen Zahlen, teilbaren/ungeteilten Gegenständen und Zahlenmengen bleiben.

**Entscheidender Umbau:** Erst die Verteilung zeigen, dann den Bruchstrich als „geteilt durch“ erklären. Vorzeichenregel erst nach einem positiven Grundmodell und einer klaren Richtungsentscheidung. Durch 0 nicht mit einer bloßen Merkregel abhandeln.

**Bildabnahme:** Jede Person erhält denselben Wert, die Gesamtmenge bleibt erhalten, nicht teilbare Objekte werden nicht unrealistisch in Teile geschnitten. Sonderfälle werden im Beispiel-/Nachschlagebereich vertieft.

## C6. Brüche vergleichen

**Kernentscheidungen:** Gleicher Nenner? Gleicher Zähler? Wertgleich? Unterschiedliche Nenner? Negativ? Welche Vergleichsstrategie passt **zuerst**?

**Pflichtmodelle:** gleich große Ganze mit markierten Bruchteilen; zwei parallele Streifen oder ein gemeinsamer Zahlenstrahl, gleiche Skala.

**Lernpfade:** gleicher Nenner, gleicher Zähler, gemeinsamer Nenner, gleichwertige Brüche. Zusätzliche Beispiele: negatives Vergleichen, Ordnen, Zwischenzahlen, alltagsnahe Anteile.

**Entscheidender Umbau:** Die Strategieauswahl **vor** der Rechnung darstellen. Bei gleichem Zähler die Stückgröße sichtbar machen; beim gemeinsamen Nenner beide Brüche schrittweise umformen; negative Werte nicht versehentlich mit der positiven Regel behandeln.

**Bildabnahme:** Ausgangsgrößen vergleichbar, Vergleichszeichen erst nach der entscheidenden Beobachtung, kein Tauschen des Ganzen zwischen zwei Bilderhälften.

## C7. Brüche und Kommazahlen

**Kernentscheidungen:** Wie viele Zehntel/Hundertstel/Tausendstel? Muss erweitert/gekürzt werden? Gehört eine ganze Zahl dazu? Endet die Dezimaldarstellung oder wiederholen sich Ziffern?

**Pflichtmodelle:** Zehner- und Hundertergitter mit exakt markierten Teilen; Stellenwerttafel; bei periodischen Zahlen eine sichtbare wiederkehrende Division / ein wiederkehrender Rest.

**Lernpfade:** Hundertstel lesen; Bruch über 10/100 in Kommazahl; Kommazahl als Bruch; Zahlen größer als 1.

**Entscheidender Umbau:** Stellenwert **vor** Ziffernfolge zeigen. Eine Endnull nicht mit einer Null mitten in der Zahl verwechseln. Bei endloser Periode niemals unbemerkt aus einer Näherung eine Gleichheit machen.

**Bildabnahme:** Markierte Flächen entsprechen dem Zahlenwert; ein Ganzes ist wirklich vollständig sichtbar; periodische Ziffern als wiederkehrend statt als willkürlich gefärbter Anteil dargestellt.

## C8. Kommazahlen vergleichen

**Kernentscheidungen:** Gleiche Einer? Erste unterschiedliche Nachkommastelle? Endnull ohne Wertänderung? Negative Zahlen? Mehrere Zahlen ordnen? Wert dazwischen?

**Pflichtmodelle:** Stellenwerttafel mit Hervorhebung **nur der ersten entscheidenden Stelle**, Zahlenstrahl für negative Werte und Intervalle, deutliche Grenzpunkte.

**Lernpfade:** Endnullen, Stellenvergleich, drei Zahlen ordnen, Zwischenzahl finden. Beispiele: Bruch und Kommazahl, Lückenziffern, Mitte, Zahlkarten und Tabellenmuster.

**Entscheidender Umbau:** Ziffern von links vergleichen, danach stoppen. Bei mehreren Zahlen zunächst **alle** Werte zeigen, dann erst sortieren. Lösungen einer Lückenziffer erst nach Prüfung der Grenzfälle anzeigen.

**Bildabnahme:** Keine pauschale Regel „mehr Nachkommastellen ist mehr“; Endnullen nicht in der Mitte löschen; Grenzen als enthalten bzw. ausgeschlossen korrekt markieren.

## C9. Mit Größen rechnen

**Kernentscheidungen:** Welche Größenart? Welche Ausgangs- und Zieleinheit? Ist die Einheit größer oder kleiner? Gilt ein Faktor 10/100/1000 oder 60? Sind Länge, Fläche und Rauminhalt klar getrennt?

**Pflichtmodelle:** Maßeinheiten als dieselbe reale Strecke/Masse, 10×10-Flächengitter, Kubus mit drei Richtungen, Zeitkreis, zusammengesetzte Kästchen, Quader mit Flächenpaaren.

**Lernpfade:** Länge, Masse, Zeit, Fläche, Quader. Alle 17 Beispieltypen einschließlich Liter, Ar/Hektar, Mikro, Geld, Rahmen/Dreieck und zwei Ansichten bleiben.

**Entscheidender Umbau:** Nicht erst „Komma verschieben“, sondern **Einheit und Umrechnungsrichtung erkennen**. Bei Zeit gilt 60; Fläche und Volumen brauchen Quadrat- und Kubikfaktoren. Quaderrauminhalt und Oberfläche als **zwei unterschiedliche gesuchte Größen** bearbeiten.

**Bildabnahme:** Jede Zahl trägt die korrekte Einheit; cm, cm² und cm³ werden weder optisch noch rechnerisch vermischt; Flächenpaare an den entsprechenden Quaderseiten sichtbar; kein dekorativer Würfel ohne Maßbezug.

---

# TEIL D – TECHNISCHER ZIELVERTRAG

## D1. Ein einziger verbindlicher Datenstand je Thema

Ziel: ein klarer **kanonischer Fachdatensatz je Themen-ID** mit Lernwegen, Musterbeispielen, Bilddrehbüchern und Nachschlagewissen. Kapiteleigene Renderer dürfen bestehen, aber Fachinhalte müssen an **einer eindeutig dokumentierten Stelle** definiert sein. Nicht mehr zuerst in course-data.js eine ältere Fallversion pflegen und sie später still durch ein anderes Modul ersetzen.

Jeder Eintrag erhält stabile IDs für Thema, Lernweg, Musterbeispiel und Phase. Änderungen dieser IDs müssen alte Direktlinks zuordnen. Keine anonymen Rechenschritt-Indices als einzige fachliche Identifikation.

**Zieldaten je Phase:**

| Feld | Inhalt |
|---|---|
| phaseId / title | stabile Kennung / kurze Überschrift |
| cognitiveAction | die genau eine neue Denkhandlung, etwa Teilen, Zählen, Vergleichen |
| givenKnown | bisher gegebene oder bereits hergeleitete Angaben |
| pictureModel | Streifen / Gitter / Zahlenstrahl / Stellenwert / Quader / Verteilung usw. |
| visualState | Maße, Teilungen, Markierungen, Pfeile, Beschriftungen und verborgene Ergebnisse |
| thinkQuestion | vor der Aufdeckung sichtbare, beantwortbare Frage |
| revealCondition | Entscheidung, bewusste Aufdeckung oder reiner Erklärschritt |
| explanation | maximal zwei kurze Sätze, bei echten Sonderfällen begründet mehr |
| mathLine | optional genau die neu hergeleitete Rechenzeile |
| hint | gestufter, lösungsfreier Tipp |
| verification | automatische mathematische und bildliche Sollwerte |

Die Bilddarstellung wird aus **numerischen Eingabedaten** erzeugt; nicht durch willkürlich zusammengefügte Textbeschriftungen, die vom Rechenwert abweichen können.

## D2. Eine gemeinsame Zustands- und Anzeigelogik

Der neue gemeinsame Reader muss für alle Themen identisch beherrschen:

- Einstieg → Phase 1 … N → Abschluss.
- Aufgabenbild und aktuelle Bildphase; die nächsten Ergebnisse bleiben verborgen.
- Denkfrage und Aufdeckung passend zur Phase; nicht nachträglich ein Hinweis, der die vorherige Entscheidung bereits verrät.
- Tatsächliche Zählung „Schritt i von N“, ohne Einstieg/Abschluss mitzuzählen.
- Nur die aktuelle Rechenzeile sichtbar; früherer Weg optional einklappbar.
- Zurück/Weiter, Themenwechsel, Neu beginnen, vollständige Rechnung am Ende.
- Direkte Themen- und Beispiel-Links weiterhin funktionsfähig.
- Der Registerwechsel darf nicht unbemerkt den gerade gezeigten Schritt in einem anderen Thema verändern.
- Alle Sonderfälle werden über erklärbare Fachfelder oder definierte Renderer gelöst, nicht über immer neue verstreute if-Abfragen im gemeinsamen Reader.

**Keine zusätzliche Feature-Inflation:** Kein Punktesystem, keine Zufallsübungen, keine künstlichen Spiele. Speicherung über Seitenreload ist eine getrennt zu prüfende Anforderung, nicht automatisch Teil dieses Umbauauftrags.

## D3. Rechen- und Bildlogik getrennt prüfen

Mathematik muss von der Darstellung unabhängig überprüft werden. Gültige Brüche, Gleichwertigkeit, Größen und Punkte werden aus exakten Zahlenbeziehungen abgeleitet; Dezimalarithmetik muss Rundungsfehler bei wichtigen schulischen Gleichheiten vermeiden.

Bei SVG: gültige Koordinaten, sichtbarer Ausschnitt, stabile Skala, kein Überlauf, keine versehentlichen Ergebnislabels. Bei HTML/CSS-Bildern: korrekte Anzahl von Elementen und markierten Teilen, passende Rollen und Alternativtexte, gleiche Modellgrößen.

CSS verwendet nach Möglichkeit gemeinsame Klassen/Designvariablen; kapiteleigene CSS-Dateien enthalten nur wirklich fachspezifische Darstellungen. Keine unübersichtliche Kette von späten !important-Flickstellen.

---

# TEIL E – UMSETZUNG, QUALITÄT UND FREIGABE

## E1. Ein Gesamtumbau – aber technisch kontrolliert

**Schritt A: Bestandsstand sichern.** Aktuellen main-Stand als Ausgangsversion markieren, die neun Kapitel, Bildwerkzeuge und vorhandenen Testfälle als unveränderliche Referenz festhalten. Entwicklungszweig für den Gesamtumbau verwenden; nicht ungetestete Zwischenversionen einzeln auf main veröffentlichen.

**Schritt B: Schulstoff-Matrix verifizieren.** Buchabgleich, vorhandene Heftnotizen und Originalfotos je Aufgabenfamilie gegen die 34 Lernwege und 111 Beispiele prüfen. Fehlende Seiten 11–13 und eventuelle spätere Lehrkraftvorgaben als **offene Quellen**, nicht als bestätigte Inhalte behandeln. Keine stillen Zusatzthemen.

**Schritt C: Eine kleine repräsentative Musterfamilie vollständig abnehmen.** Nicht nur −3/4, sondern je ein Muster aus drei unterschiedlichen Denk- und Bildfamilien: (1) Anteile / gleich große Flächen, (2) Bruchzahlen auf dem Zahlenstrahl einschließlich Minus, (3) Größen mit Einheit und Umrechnungsrichtung. Diese Muster definieren **den gemeinsamen Qualitätsstandard**, nicht neun verschiedene Designs.

**Schritt D: Für alle neun Kapitel die Phase-für-Phase-Drehbücher erstellen.** Die 34 Lernwege vollständig; für 111 Musterbeispiele zumindest fachliche Entscheidungsfolge und alle sichtbaren Bildzustände. Freigabefähig erst, wenn kein Schritt ohne klaren Bildauftrag und kein Ergebnis ohne Herkunft bleibt.

**Schritt E: Gemeinsamen Reader und Bildverträge bauen.** Zentrale Reihenfolge, phasengenaue Anzeige, Zustände und Nachschlagen einmal robust umsetzen. Dann kapitelweise Fachrenderer migrieren. Alles bleibt auf dem Gesamtumbau-Zweig.

**Schritt F: Kapiteldaten integrieren und sämtliche Verweise prüfen.** Keine alten Schattenvarianten an derselben Stelle; fachliche Beispiele, Bilder, Links, Werkzeuge und Texte müssen zum neuesten Datenstand gehören.

**Schritt G: Gesamtabnahme und eine gemeinsame Freigabe.** Nicht neun halbgeprüfte Releases. Erst nach bestandener fachlicher, technischer, visueller und didaktischer Abnahme wird der neue Stand zusammengeführt.

## E2. Verbindliche automatische Prüfungen

**Für alle neun Kapitel:**

- Alle **34 Lernwege** und **111 Musterbeispiele** sind per ID erreichbar; keine Doppelungen, fehlenden Ziele oder kaputten Direktlinks.
- Jede fachliche Phase besitzt eine begründete Denkhandlung, eine verständliche Frage oder einen bewusst als Erklärung gekennzeichneten Schritt.
- Jede Rechenzeile stimmt mit den Aufgabendaten überein; Bruchwerte, Vorzeichen, Einheiten und Rundungen sind fachlich korrekt.
- Jede Bildphase entspricht genau den bereits erarbeiteten Informationen. **Keine Antwort vor der Aufdeckung**, auch nicht in Alternativtext, Tooltip, ausgeblendeter Beschriftung oder Startzustand des Werkzeugs.
- Bilder behalten das richtige Ganze, die richtige Maßstabsteilung, Anzahl markierter Teile und die richtigen Koordinaten.
- Die erste Phase und die nächste Phase sind nur dann bildidentisch, wenn die nichtbildliche Denkhandlung fachlich begründet und der Bildzustand unverändert richtig ist. Solche Fälle werden bewusst dokumentiert.
- Jeder Fall hat vollständige Antwort, Kontrolle und Denkfalle.
- Keine ungültigen SVG-Werte, negativen Breiten, fehlenden Einheiten, ungültigen Textbezüge oder fehlenden Bildern.
- Die bestehenden 13 Testskripte bleiben grün; neue Tests decken den gemeinsamen Reader und alle kapiteleigenen Bildphasen zusätzlich ab.

**Hinweis:** Der heutige Testbestand und frühere erfolgreiche Prüfprotokolle sind ein Ausgangspunkt, **kein Freibrief** für die neue Gesamtversion.

## E3. Verbindliche reale Browser- und Mobilprüfung

Mindestens Chromium am Desktop und Mobilbreiten **320, 360/375, 768 und 1280 Pixel**. Falls möglich zusätzlich Firefox oder WebKit. Auf allen neun Seiten prüfen:

- Ersten und letzten Lernweg; alle Zwischen- und Schlusszustände.
- Alle Musterbeispiele mindestens auf Einstieg, mathematisch kritische Phase und Abschluss; mehrteilige Muster komplett durchlaufen.
- Alle neun Bildwerkzeuge: Maus, Touch, Tastatur, Grenzen, Zurücksetzen, ungewöhnliche Werte.
- Klare Lesereihenfolge, sichtbare Zahlen und Bruchstriche, Bildausschnitte ohne abgeschnittene Einheiten.
- Kein horizontaler Überlauf, keine zu kleinen oder überdeckten Touchziele; lesbare Ausrichtung bei gedrehtem Bildschirm.
- Zurück, Weiter, Registerwechsel, Linkhash, Browser-Zurück, Tastaturfokus, reduzierte Bewegung und Druckansicht.
- Die eigentlichen ausgelieferten Dateien und deren Cacheversion testen, **nicht eine lokal andere Zwischenversion**.
- Screenshotbelege für die drei Referenzmuster und für alle festgestellten, anschließend behobenen Mängel.

## E4. Didaktische Endabnahme

Jeder Lernweg muss ohne zusätzliche mündliche Hilfe folgende vier Fragen beantworten:

1. **Was muss ich jetzt erkennen?**
2. **Warum ist genau dieser nächste Schritt richtig?**
3. **Was im Bild zeigt mir den Zusammenhang?**
4. **Wie kann ich mein Ergebnis selbst überprüfen?**

Ein Bild ohne Denknutzen, eine zu früh sichtbare Lösung, eine sachlich unklare Zahl oder ein nicht nachvollziehbarer Übergang ist ein **Abnahmefehler**, auch wenn sämtliche automatischen Tests bestehen.

Eine kurze reale Verständlichkeitsprobe mit Hanna an den drei Referenzmustern ist sehr wertvoll. Sie dient nicht als Ersatz für den fachlichen Test, sondern als Plausibilitätscheck gegen den „Erwachsene verstehen es, Kind nicht“-Fehler.

## E5. Stop-Kriterien

**Nicht als „fertig“, „final“ oder „vollständig geprüft“ kennzeichnen**, wenn eines davon noch fehlt:

- Buch-/Schulbezug wichtiger neuer Inhalte offen.
- Eine mathematische Zahl oder ein Bild widerspricht der Aufgabe.
- Lösung wird vor der vorgesehenen Denkhandlung sichtbar.
- In einer Phase fehlen Denkschritt, Bildauftrag oder verständliche Erklärung.
- Eine Aufgabe / ein Beispiel ist verloren gegangen.
- Ein anderes Kapitel oder ein vorhandenes Werkzeug ist beschädigt.
- Browser-/Mobilprüfung nach der **letzten** relevanten Änderung fehlt.
- Die gespeicherte Repository-Version unterscheidet sich vom geprüften Stand.

**Bei Abweichung:** Fehler protokollieren, im Gesamtumbau-Zweig gezielt beheben, betroffene Tests und Regression erneut durchführen, erst danach freigeben.

## E6. Welche Entscheidungen bereits feststehen

- **Ein Gesamtmerkheft**, nicht neun voneinander abweichende Kleinprojekte.
- **Klasse 6**, schulnah und verständlich; ohne Inhalt außerhalb belegter Schulanforderungen.
- **Vollständigkeit im Nachschlagen**, übersichtlicher und aktiver Lernpfad vorn.
- **34 Lernwege, 111 Musterbeispiele** als heutige zu bewahrende fachliche Ausgangsbasis; Änderungen nur bei begründeter Korrektur.
- **Ein Bildgedanke pro Phase; erst denken, dann Aufdeckung und Rechnung.**
- **Vier Register bleiben erhalten.**
- **Ein Qualitätsmaßstab** für Text, Bild, Navigation, Fachlichkeit und Mobilansicht.
- **Keine Veröffentlichung neuer halbfertiger Einzelstände.**

**Noch tatsächlich offen:** Originalquellen der früheren Buchfotoreihe vollständig wieder verfügbar machen (insbesondere nicht belegte Seiten), eventuell neuere Unterrichtsvorgaben und die echte visuelle Abnahme des späteren Gesamtreleases. Diese Punkte verhindern nicht die Vorplanung, müssen aber vor einer fachlich endgültigen Gesamtabnahme geklärt sein.

---

# VERBINDLICHE ABNAHMEKARTE PRO KAPITEL

| Bereich | Muss erfüllt sein |
|---|---|
| Inhalt | Alle relevanten Aufgabenfamilien vorhanden, Schulniveau passend, keine unbegründete Erweiterung |
| Lernweg | eigene Aufgabe, passende erkennbare Strategie, nur notwendige Schritte, keine Lösung vor eigener Denkhandlung |
| Bild | mathematisch korrekt, phasegenau, deutlich, geeignet für 375 px, korrekter Text und Alternativtext |
| Rechenweg | Herkunft aller Zahlen und Zeichen erklärt, höchstens eine neue Idee je Schritt, Antwort plausibel geprüft |
| Sprache | verständlich Klasse 6, kurze vollständige Sätze, Fachbegriffe erklärt, einheitlicher Stil |
| Beispiele | eigenständig, vollständig, korrekt, fachlich unterschiedliche Typen nachvollziehbar |
| Nachschlagen | einheitliche Kartenstruktur, vollständige Regeln, kompakter druckbarer Kern |
| Werkzeug | Sinn und Funktion überprüft, kein Lösungsverrat, Eingabe und Rücksetzung bedienbar |
| Technik | alle Tests, Navigation, mobile Ansicht, Fokus, kein ungewollter Eingriff in andere Kapitel |
| Freigabe | aktueller gespeicherter Stand geprüft und dokumentiert, keine offenen P0/P1-Abnahmefehler |

**Diese Datei ist die einzige maßgebliche Gesamtbauvorlage.** Frühere kapitelbezogene Prüfprotokolle dienen als Quellen und Fehlerhistorie. Bei widersprüchlichen älteren Festlegungen gilt dieser fachliche und technische Qualitätsstandard; schulische Originalanforderungen und explizite neue Nutzerentscheidungen haben Vorrang.
