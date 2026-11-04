# Gesamtumbau aller neun Themen – umgesetzter Stand

Stand: 04.11.2026. Entwicklungszweig `gesamtumbau-erklaerstandard-2026-11-04`. **Auf ausdrücklichen Wunsch in main übernommen und veröffentlicht. Die fachliche Gesamtfreigabe bleibt offen.**

## Tatsächlich umgesetzt

- Ein kanonischer Fachdatensatz in `course-data.js`; drei Kapitelprogramme enthalten nur noch Bild- und Werkzeuglogik. Ihre früheren überschreibenden Fachdatensätze und sechs separate Dialogdateien sind aufgelöst.
- 34 Lernwege und 111 Musterbeispiele; 523 Phasen statt zuvor 522. Die zusätzliche Phase behandelt den im Original geforderten Nenner 100.
- Jede Phase hat eine eigene konkrete Denkfrage und einen begründeten Gegenweg. 320 Phasen verwenden kuratierte Auswahlwege; 203 offene Fragen mit bewusster Aufdeckung. Freie Antworten werden nicht automatisch bewertet.
- Vier eigene Grundlagenaufgaben im Anteilskapitel mit anderen Zahlen und eigenen Bildern: sechs Felder/zwei gefärbt; drei Viertel von 32 Birnen; zwei Drittel entsprechen 18 Kindern; drei Viertel von zwölf Kästchen.
- Gemeinsame Lesereihenfolge Bild → Denkfrage/Entscheidung → Erklärung → Rechenzeile. Vorherige Rechnung bei Bedarf über „Bisheriger Weg“, vollständige Rechnung erst am Schluss.
- Aufgabenstart und Abschluss werden nicht als Rechenschritte gezählt. Neue stabile Phasenkennungen und neuer Speicherbereich verhindern die Übernahme veralteter Lösungssichten.
- Einstieg mit Fachbildern in allen Fällen; eigene Modelle für die vier geänderten Anteilslernwege. Zurücksetzen der Färbeaufgabe entfernt die Musterfärbung. Alle gemeinsamen Bildwerkzeuge besitzen außerdem einen vollständigen Neustart zum Ausgangsbild; die zwei eigenen Werkzeuge behalten ihre vorhandenen Reset-Funktionen.
- Alle Kapitel mit denselben Nachschlagebereichen: Kurz merken, So entscheide ich, Rechenmuster finden, Typische Fehler, vertiefende Regeln. Kompakter Druckkern.
- Browser-Zurück berücksichtigt Register- und Aufgabenwechsel; alte themeninterne Fallnummern bleiben erhalten.
- Zahlenstrahl: fünf Punkte der Linealaufgabe S. 14 Nr. 4a; zusätzlich 199 Hundertstelbrüche zu S. 15 Nr. 11.
- Quotienten: natürliche Zahlen einschließlich null nach S. 16; schulischer Rechenweg zu S. 17 Beispiel 2.
- Größen: Aufgabenfamilie „passende kleinere Einheit ohne Komma wählen“ anhand des neuen Arbeitsheftblatts in B2. Die gesonderte Grundlagenaufgabe zur Masse bleibt erhalten. Auch andere mathematisch korrekte Einheiten werden anerkannt.
- Ein automatischer Prüfablauf pro Code-Push statt drei parallel ausgelöster Abläufe. Die älteren Namen sind nur noch manuelle Aufrufe desselben Prüfprogramms.

Zusätzlich stehen sieben kleinschrittige, visuell erklärte Grundlagenwege zu Größen, Dezimalvergleichen und Bruch-/Dezimalumwandlung bereit. Siehe [Vertiefungsprotokoll](LERNWEGE-SCHULBLAETTER-2026-11-04.md).

## Schulquellen – tatsächlich erneuter Abgleich

Alle 28 Buchfotos S. 6–33 wurden erneut geöffnet. S. 23 ist links durch einen grauen Bereich verdeckt; dort werden ausschließlich sichtbare Angaben als Originalbeleg verwendet. Die fünf neuen Fotos vom 04.11. wurden im vorherigen Arbeitsgang gelesen. Heftfotos werden, sofern nicht erneut geöffnet, ausdrücklich als historische Methodenbelege geführt. Originalfotos und private Datei-IDs werden nicht veröffentlicht.

Jeder Lern-/Beispielfall hat jetzt einen Quellenverweis direkt im Fachdatensatz: Dateiname, Seite, Stelle, Belegart und Abgrenzung. **Originalwerte** bedeutet Werte-/Anforderungsbezug, nicht eine wortgleiche Abschrift oder eine unabhängige Abnahme jedes Bildpixels. Eigene Zahlen und Ergänzungen sind ausdrücklich gekennzeichnet.

## Bisher tatsächlich ausgeführte Prüfungen

- Alle 14 Fach-/Modell-Testdateien bestanden lokal und im GitHub-Lauf. Die früheren Prüfungen auf bestimmte veraltete Reader-Codezeichenfolgen sind durch den aktuellen Phasenvertrag und Browser-Verhaltenstests ersetzt; mathematische Prüfungen bleiben erhalten.
- 145 Lern-/Beispielansichten und 668 Ausgangs-/Phasenbilder mit allen neun Fachrenderern erzeugt; keine fehlenden Bilder, NaN-/Infinity-/undefined-Werte oder negativen SVG-Breiten/-Höhen. Dies ist keine visuelle Freigabe.
- Der erste Lernschritt aller neun Kapitel wurde in der tatsächlichen Browser-Vorschau aufgedeckt und sichtbar kontrolliert. Alle neun Werkzeuge wurden außerdem geöffnet und zurückgesetzt. Die neue vollständige Reset-Funktion wird im Browser zusätzlich gegen den ursprünglichen Rechnungstext geprüft.
- Neuer vollständiger Browserlauf: alle Lernwege, Beispiele und Phasen bei 320, 375, 768 und 1280 px. Zusätzliche Navigation-/Verlaufstests und Eingabegrenzen-/Varianten-/Tastaturtests aller neun Werkzeuge. Ergebnis: **675/675 bestanden**, einschließlich 22 zusätzlicher Tests der sieben Grundlagenfamilien. [Erfolgreicher Lauf](https://github.com/gabikloos13-afk/Mathe-Merkheft/actions/runs/41919011731).

## Offene Freigabegrenzen

- Die vollständige visuelle Einzelabnahme aller 668 Bilder ist noch nicht erbracht. Ein technisch gültiges SVG allein beweist weder verständliche Bildstaffelung noch inhaltlich maßhaltige Darstellung.
- B5 im Anteilskapitel (verschieden große Pizzen) ist eine eigene Ergänzung. Das Flächenverhältnis vier bei doppeltem Durchmesser hat jetzt eine eigene Darstellung mit maßgleichen Kreisen, zwei Skalierungsrichtungen und explizit benannten Flächeneinheiten. Die visuelle und kindliche Verständlichkeitsabnahme dieses Zusatzfalls bleibt offen; kein exakter Schulquellenbeleg behauptet.
- Einige Aufgabentypen enthalten mehrere berechtigte Darstellungen. Die Familienzuordnung ersetzt nicht die individuelle Prüfung, ob wirklich jede Variante didaktisch nötig ist. Es wurden keine neuen Übungsserien hinzugefügt.
- Vollständiges Drag-/Touch-Verhalten jedes Werkzeugs, jede Screenreader-Sicht, echte Smartphone-Hardware und Hannas Verständlichkeitsprobe sind nicht durch automatisierte Bildschirmgrößen belegt.
- Die fachliche Gesamtfreigabe bleibt offen, solange diese Punkte offen sind. Der Arbeitsauftrag wird nicht allein aufgrund grüner Browserläufe als vollständig abgenommen bezeichnet.

## Fallweiser Quellen- und Phasenindex

| Fall | Aufgabe | Phasen | Belegart | Quelle | Abgrenzung |
|---|---|---:|---|---|---|
| brueche:learn:1 | Welcher Bruch ist gefärbt? | 3 | Eigenes Lernbeispiel | Buch 7, Aufgabe 1 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| brueche:learn:8 | Wie viele Kästchen färbst du? | 3 | Eigenes Lernbeispiel | Buch 7, Aufgabe 3d | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| brueche:learn:2 | Wie viele Birnen sind das? | 3 | Eigenes Lernbeispiel | Buch 8, Aufgabe 5b | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| brueche:learn:3 | Wie viele Kinder hat die Klasse? | 3 | Eigenes Lernbeispiel | Buch 9, Aufgabe 16 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| brueche:examples:1 | Welcher Bruch ist gefärbt? | 3 | adaptiert | Buch 7, Aufgabe 1 | Eigene Neunerfigur; Erkennen und Benennen gefärbter gleich großer Teile. |
| brueche:examples:7 | Welcher Teil ist gefärbt? | 3 | adaptiert | Buch 8, Aufgabe 9a | Die zwei gefärbten halben Kästchen werden als zwei von acht gleich großen Dreiecken gezählt. |
| brueche:examples:14 | Wie viele Würfel sind gefärbt? | 3 | Originalwerte | Buch 7, Beispiel 1c und Aufgabe 2d | Sieben gefärbte von zehn Würfeln; zusätzlich der komplementäre Anteil. |
| brueche:examples:8 | Wie viele Kästchen färbst du? | 3 | adaptiert | Buch 7, Aufgabe 3d | Gleiche 18 Kästchen und fünf Sechstel; Anzeige als 6×3 statt Zeichenvorgabe 2×9. |
| brueche:examples:2 | Wie viele Birnen sind das? | 3 | Originalwerte | Buch 8, Aufgabe 5b | Zwei Drittel von sechzig Birnen. |
| brueche:examples:6 | Wie viele Minuten sind das? | 3 | Originalwerte | Buch 7, Beispiel 2b | Fünf Sechstel einer Stunde, erst Stunde in Minuten, dann ein Sechstel. |
| brueche:examples:13 | Wie viele Liter sind im Tank? | 3 | adaptiert | Buch 8, Aufgabe 11 | Tank mit achtzig Litern; drei Viertel sind in der Merkheft-Aufgabe ausdrücklich vorgegeben. Keine Behauptung einer maßgleichen Originalanzeige. |
| brueche:examples:3 | Wie viele Kinder hat die Klasse? | 3 | Schulverfahren | Buch 9, Aufgabe 16 | Rückwärtsrechnen über einen Anteil; konkrete Klassenwerte zusätzlich im früher indexierten Heftblatt 20261022_232137.jpg belegt, in diesem Durchgang nicht erneut geöffnet. |
| brueche:examples:9 | Wie groß ist die ganze Figur? | 3 | adaptiert | Buch 9, Aufgabe 16a | Bekannter Anteil einer Figur; zwölf Kästchen als eigene Zahlenwahl. |
| brueche:examples:4 | Wie viele Fische bleiben übrig? | 5 | Ergänzung | Buch 9, Aufgaben 13 und 14 | Eigene Fischgeschichte: mehrere Anteile derselben Grundmenge bestimmen und den Rest berechnen. |
| brueche:examples:10 | Wie schwer war der Teig vorher? | 4 | Originalwerte | Buch 9, Aufgabe 21 | Etwa ein Fünftel Backverlust, 320 g Endgewicht; Ausgangsgewicht nur näherungsweise. |
| brueche:examples:16 | Wie viel Zucker und wie viele Eier? | 5 | Ergänzung | Buch 8, Aufgaben 5 und 7 | Eigene kombinierte Mengenaufgabe; Zucker erst in Gramm, Eier als unteilbare Anzahl. |
| brueche:examples:11 | Ein anderer Teil derselben Zahl | 5 | Originalwerte | Buch 9, Aufgabe 20 | Zwei Drittel sind 450, gesucht zwei Fünftel derselben ganzen Zahl. |
| brueche:examples:12 | Wie teilen Nina und ihre Mutter den Gewinn? | 4 | Originalwerte | Buch 9, Aufgabe 15 | Nina 2 Euro, Mutter 10 Euro, Gewinn 300 Euro. Proportionale Verteilung ausdrücklich als angenommene Regel. |
| brueche:examples:5 | Welches Pizzastück ist größer? | 5 | Ergänzung | Buch 6, Grundbegriff Anteil vom Ganzen | Vergleich verschiedener großer Pizzen mit Durchmessern 16 und 32 cm ist keine nachgewiesene Originalaufgabe. Flächenverhältnis muss gesondert visuell belegt werden; offene Fachabnahme. |
| brueche:examples:15 | Ein Stück mehr oder weniger | 6 | Ergänzung | Buch 9, Aufgabe 14 | Eigener Transfer mit wechselnder Bezugsmenge: ein Viertel mehr, danach ein Fünftel der neuen Sprungweite weniger. |
| gleichwertig:learn:1 | Erweitern: Welche Zahl nehme ich? | 4 | Eigenes Lernbeispiel | Buch 11, Beispiel 1a und Aufgabe 1 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| gleichwertig:learn:2 | Kürzen: oben und unten teilen | 4 | Eigenes Lernbeispiel | Buch 10, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| gleichwertig:examples:1 | Mit einer bestimmten Zahl erweitern | 4 | adaptiert | Buch 11, Beispiel 1a und Aufgabe 1 | Erweitern mit vorgegebenem Faktor, eigene Zahlen drei Fünftel mal zwei. |
| gleichwertig:examples:9 | Welche Malzahl wurde verwendet? | 4 | adaptiert | Buch 11, Aufgabe 5 | Faktor aus zwei wertgleichen Brüchen ermitteln, eigene Zahlen zwei Sechstel und zwölf Sechsunddreißigstel. |
| gleichwertig:examples:3 | Noch einmal kürzen | 8 | adaptiert | Buch 11, Beispiel 2 | Schrittweise vollständig kürzen; eigene Zahlen achtzehn Vierundzwanzigstel. |
| gleichwertig:examples:8 | Durch welche Zahlen kannst du teilen? | 4 | adaptiert | Buch 12, Aufgabe 9 | Mehrere gemeinsame Teiler; eigene Zahlen achtzehn Dreißigstel. |
| gleichwertig:examples:4 | Welche Zahl fehlt oben? | 4 | adaptiert | Buch 11, Aufgabe 6 | Zählerlücke bei vorgegebenem Zielnenner, eigene Zahlen zwei Fünftel und Zwanzigstel. |
| gleichwertig:examples:5 | Welche Zahl fehlt unten? | 4 | adaptiert | Buch 11, Aufgabe 6 | Nennerlücke bei vorgegebenem Zielzähler, eigene Zahlen drei Viertel und fünfzehn. |
| gleichwertig:examples:10 | Lücke im ersten Bruch | 4 | adaptiert | Buch 11, Aufgabe 6 | Lücke im vorderen Bruch; gleiche Faktoren und Umkehrprüfung. |
| gleichwertig:examples:6 | Sind beide Brüche gleich viel? | 4 | Originalwerte | Buch 10, Erweiterungsdarstellung | Drei Viertel sind sechs Achtel, derselbe Anteil desselben Ganzen. |
| gleichwertig:examples:11 | Gemeinsamen Nenner finden | 8 | adaptiert | Buch 19, Gemeinsamer Nenner | Zwei Drittel und drei Viertel; Faktoren vier und drei zum Nenner zwölf. |
| gleichwertig:examples:7 | Unten soll 30 stehen | 12 | Originalwerte | Buch 33, Runde 1, Aufgabe 1b | Zwölf Achtzehntel und minus vier Sechstel auf Nenner dreißig bringen. |
| gemischt:learn:101 | Was bedeutet eine gemischte Zahl? | 3 | Eigenes Lernbeispiel | Buch 13, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| gemischt:learn:1 | Bruch → gemischte Zahl | 4 | Eigenes Lernbeispiel | Buch 13, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| gemischt:learn:2 | Gemischte Zahl → Bruch | 4 | Eigenes Lernbeispiel | Buch 13, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| gemischt:examples:10 | Aus dem Bild die gemischte Zahl ablesen | 4 | Schulverfahren | Buch 13, Gemischte Schreibweise | Ganze und Rest als Streifenbild; konkrete Streifenblätter zusätzlich im Fotoindex 20261022_232206.jpg und 20261022_232210.jpg, nicht erneut gelesen. |
| gemischt:examples:3 | Ohne Rest: eine ganze Zahl | 3 | adaptiert | Buch 18, Aufgabe 10 | Unechter Bruch ohne Rest; eigene Zahlen zwölf Viertel. |
| gemischt:examples:5 | Lücke vor dem Bruch | 3 | Ergänzung | Buch 14, Beispiel 2 | Eigene Umkehrfrage zur ganzen Zahl bei siebzehn Fünfteln; derselbe Umwandlungsweg. |
| gemischt:examples:6 | Lücke im Zähler des Restbruchs | 3 | Ergänzung | Buch 14, Beispiel 2 | Eigene Zählerlücke bei neunzehn Sechsteln; drei Ganze enthalten achtzehn Sechstel. |
| gemischt:examples:7 | Lücke im Nenner | 3 | Ergänzung | Buch 13, Gemischte Schreibweise | Eigene Nennerlücke; die angegebene Stückgröße Viertel muss erhalten bleiben. |
| gemischt:examples:8 | Den Restbruch noch kürzen | 4 | adaptiert | Buch 18, Aufgabe 10 | Umwandeln mit zusätzlichem Kürzen des Restbruchs, eigene Zahlen vierzehn Sechstel. |
| gemischt:examples:4 | Negativen Bruch umwandeln | 3 | adaptiert | Buch 18, Aufgabe 11 | Negativer unechter Bruch, eigene Zahlen minus elf Viertel. |
| gemischt:examples:9 | Negative gemischte Zahl → Bruch | 3 | adaptiert | Buch 18, Aufgabe 11 | Negative gemischte Zahl als Bruch; eigene Zahl minus ein Ganzes und zwei Drittel. |
| zahlenstrahl:learn:101 | Ein Ganzes und seine Bruchlücken | 5 | Eigenes Lernbeispiel | Buch 13, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| zahlenstrahl:learn:1 | Einen Punkt zwischen 0 und 1 ablesen | 6 | Eigenes Lernbeispiel | Buch 13, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| zahlenstrahl:learn:2 | Einen gegebenen Bruch eintragen | 6 | Eigenes Lernbeispiel | Buch 13, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| zahlenstrahl:learn:104 | Einen negativen Bruch eintragen | 7 | Eigenes Lernbeispiel | Buch 13, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| zahlenstrahl:examples:3 | Ein Bruch liegt rechts von 1 | 4 | adaptiert | Buch 13, Gemischte Schreibweise | Elf Viertel statt neun Viertel; zwei Ganze plus Bruchrest. |
| zahlenstrahl:examples:11 | Mehrere Punkte A, B und C ablesen | 4 | adaptiert | Buch 14, Aufgaben 1 und 3 | Eigene Punkte in einer gemeinsamen Viertelskala einschließlich links von null und rechts von eins. |
| zahlenstrahl:examples:7 | Die Schrittweite ohne sichtbare 0 bestimmen | 4 | adaptiert | Buch 14, Aufgabe 2 | Eigener Ausschnitt ohne null; Abstand der Randwerte zuerst bestimmen. |
| zahlenstrahl:examples:5 | Mit dem Lineal: zwei ganze Einheiten | 5 | Originalwerte | Buch 14, Aufgabe 4b | Randwerte zwei und vier, zwölf Zentimeter; Brüche in Sechstel umformen. |
| zahlenstrahl:examples:14 | Mit dem Lineal: Brüche passend erweitern | 5 | Originalwerte | Buch 14, Aufgabe 4a | A = 0, E = 1, AE = 5 cm. Alle fünf geforderten Brüche werden im letzten Zustand gezeigt. |
| zahlenstrahl:examples:13 | Mit dem Lineal: negativer Ausschnitt | 5 | Originalwerte | Buch 14, Aufgabe 4c | A = minus zwei, E = minus eins, AE = acht Zentimeter; vier negative Brüche. |
| zahlenstrahl:examples:6 | Die genaue Mitte zwischen zwei Brüchen | 4 | Ergänzung | Buch 19, Zahlengerade als Vergleichsmodell | Eigene Mitte zwischen einem Drittel und zwei Dritteln; Halbieren eines Abstands. Nicht als identische Buchaufgabe behauptet. |
| zahlenstrahl:examples:4 | Ein negativer Bruch links von −1 | 4 | adaptiert | Buch 13, Negative Brüche | Eigener Wert minus sieben Drittel; der Bruchrest führt links von minus zwei. |
| zahlenstrahl:examples:8 | Betrag und Gegenzahl unterscheiden | 4 | adaptiert | Buch 15, Aufgabe 9 | Betrag und Gegenzahl mit eigenem Wert drei Viertel. |
| zahlenstrahl:examples:12 | Die Mitte bei direkt benachbarten Zählern | 4 | Ergänzung | Buch 20, Zwischen rationalen Zahlen | Eigene Mitte zwischen achtzehn Siebzehnteln und neunzehn Siebzehnteln; feinere Einteilung durch Erweitern. |
| zahlenstrahl:examples:9 | Alle Brüche mit festem Nenner zählen | 5 | Originalwerte | Buch 15, Aufgabe 11 | Grenzen 132 und 134; fünf Drittelwerte und jetzt auch 199 Hundertstelwerte. |
| zahlenstrahl:examples:10 | Fünf Punkte mit gleich großen Abständen | 4 | adaptiert | Buch 15, Aufgabe 12 | Gleiche Abstände zwischen fünf Werten; eigene symmetrische Randwerte minus und plus drei Viertel. |
| quotienten:learn:101 | Gerecht verteilen: Was bedeutet drei geteilt durch vier? | 4 | Eigenes Lernbeispiel | Buch 16, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| quotienten:learn:1 | Eine Geteilt-Aufgabe als Bruch schreiben | 5 | Eigenes Lernbeispiel | Buch 16, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| quotienten:learn:103 | Einen Bruch als Geteilt-Aufgabe lesen | 3 | Eigenes Lernbeispiel | Buch 16, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| quotienten:learn:104 | Ein negatives Ergebnis berechnen | 4 | Eigenes Lernbeispiel | Buch 16, Grundregel und Einführung | Eigenständige Grundlagenaufgabe mit eigenen Zahlen; kein unveränderter Originalfall. |
| quotienten:examples:2 | Viele Pizzen gerecht verteilen | 5 | Originalwerte | Buch 17, Aufgabe 6a | Acht Pizzen gerecht auf zwölf Kinder verteilen; zwei Drittel pro Kind. |
| quotienten:examples:7 | Die Verteilung ergibt ganze Einheiten | 3 | Originalwerte | Buch 16, Division natürlicher Zahlen | Sechs durch drei ergibt zwei; im Merkheft als Verteilung von Tafeln dargestellt. |
| quotienten:examples:8 | Null wird verteilt | 3 | Ergänzung | Buch 16, Division und Nullregel | Null als Gesamtmenge ist zulässig; eigene fünf Empfänger. |
| quotienten:examples:13 | Warum die Reihenfolge wichtig ist | 3 | Ergänzung | Buch 16, Division als Bruch | Eigenes Gegenbeispiel zur Vertauschbarkeit mit drei Vierteln und vier Dritteln. |
| quotienten:examples:5 | Eine Strecke teilen und die Einheit umrechnen | 5 | Originalwerte | Buch 17, Beispiel 2 | Sechs Kilometer durch zwanzig; jetzt schulischer Weg erst sechs Zwanzigstel, kürzen zu drei Zehnteln, danach Meter. |
| quotienten:examples:10 | Die zu verteilende Menge fehlt | 4 | Ergänzung | Buch 17, Aufgabe 6 | Eigene Umkehrfrage: Gesamtmenge aus sechs Empfängern mit je fünf Sechsteln ermitteln. |
| quotienten:examples:11 | Die Anzahl der Empfänger fehlt | 3 | Ergänzung | Buch 16, Division natürlicher Zahlen | Eigene Umkehrfrage: zwölf Einheiten bei drei Einheiten pro Empfänger. |
| quotienten:examples:12 | Ganze Gegenstände oder teilbare Mengen | 5 | Ergänzung | Buch 17, Aufgabe 6 | Unteilbare Spielsteine gegenüber teilbarer Schokolade; eigene sieben Gegenstände für drei Kinder. |
| quotienten:examples:3 | Verschiedene und gleiche Vorzeichen | 8 | adaptiert | Buch 17, Beispiel 1b und Aufgabe 4 | Erster Teil identisch 15 : (−12); zweiter Teil mit gleichen Beträgen und zwei Minuszeichen ist eine gezielte Ergänzung. |
| quotienten:examples:4 | Ein Minus oben, unten oder vor dem Bruch | 4 | adaptiert | Buch 17, Aufgabe 2 | Minus im Zähler, Nenner oder vor dem Bruch; Klammergegenzahl zusätzlich durch S. 18 Nr. 15 gestützt. |
| quotienten:examples:9 | Warum Teilen durch null nicht definiert ist | 4 | Ergänzung | Buch 16, Randregel Division durch null | Begründung der Buchregel über die Multiplikationsprobe, einschließlich nicht eindeutigem 0 : 0. |
| quotienten:examples:6 | Bruchwerte den Zahlenmengen zuordnen | 7 | Originalwerte | Buch 18, Aufgabe 13 | Vier ausgewählte Angaben der Originaltabelle; die weitere Angabe minus zehn Fünftel wird nicht als bearbeitet behauptet. Definition ℕ einschließlich null nach S. 16. |
| vergleichen:learn:1 | Gleiche Nenner: Wie viele Stücke? | 2 | Eigenes Lernbeispiel | Buch 19, Brüche mit gleichem Nenner | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| vergleichen:learn:2 | Gleiche Zähler: Wie groß sind die Stücke? | 2 | Eigenes Lernbeispiel | Buch 19, Brüche mit gleichem Zähler | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| vergleichen:learn:3 | Verschiedene Nenner: gleich große Stücke herstellen | 5 | Eigenes Lernbeispiel | Buch 19, Brüche mit verschiedenen Nennern | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| vergleichen:learn:4 | Gleichwertigkeit: Ist es gleich viel? | 3 | Eigenes Lernbeispiel | Buch 20, Aufgabe 1d | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| vergleichen:examples:1 | Unten steht dieselbe Zahl | 2 | adaptiert | Buch 19, Brüche mit gleichem Nenner | Eigene Zahlen drei Siebtel und fünf Siebtel. |
| vergleichen:examples:2 | Oben steht dieselbe Zahl | 1 | adaptiert | Buch 19, Brüche mit gleichem Zähler | Eigene Zahlen drei Viertel und drei Achtel. |
| vergleichen:examples:3 | Oben und unten stehen andere Zahlen | 4 | adaptiert | Buch 19, Brüche mit verschiedenen Nennern | Eigene Zahlen zwei Drittel und drei Viertel, gemeinsamer Nenner zwölf. |
| vergleichen:examples:4 | Sehen anders aus – sind sie gleich viel? | 2 | adaptiert | Buch 20, Aufgabe 1d | Wertgleichheit durch Kürzen; eigene zweite Form vier Sechstel statt sechs Neuntel. |
| vergleichen:examples:9 | Mit der Zahl 2 vergleichen | 3 | Originalwerte | Buch 19, Vergleich mit einer anderen Zahl | Elf Sechstel und fünfzehn Siebtel an der Vergleichszahl zwei einordnen. |
| vergleichen:examples:7 | Welche Zahl passt dazwischen? | 2 | Ergänzung | Buch 21, Aufgabe 11 | Eigene streng eingeschlossene Zählerlücke zwischen zwei Fünfteln und vier Fünfteln. |
| vergleichen:examples:8 | Bei welchen Losen ist der Gewinnanteil größer? | 4 | Originalwerte | Buch 20, Beispiel 2 | Vier von sechzehn Losen gegen drei von zehn Losen; rechts ist der Anteil größer. |
| vergleichen:examples:5 | Brüche mit Minus vergleichen | 1 | Originalwerte | Buch 19, Negative Brüche | Minus zwei Drittel gegen minus ein Drittel. |
| vergleichen:examples:11 | Zwei Brüche mit Minus | 4 | Originalwerte | Buch 21, Aufgabe 6b | Minus vier Drittel gegen minus fünf Viertel. |
| vergleichen:examples:6 | Mit der kleinsten Zahl beginnen | 1 | adaptiert | Buch 21, Aufgaben 9 und 13a | Eigene Dreierliste: negativer Bruch, echter Bruch, positive gemischte Zahl. |
| vergleichen:examples:10 | Drei Zahlen dazwischen finden | 3 | adaptiert | Buch 21, Aufgabe 12 | Drei eigene Zwischenwerte zwischen drei Fünfteln und vier Fünfteln; Buch verlangt Varianten mit einer, zwei und zehn Angaben. |
| vergleichen:examples:12 | Welche Zahlen passen oben? | 4 | adaptiert | Buch 21, Aufgabe 11c | Im Merkheft steht die Lücke direkt im Zähler. Im Original steht zusätzlich ein Minus davor; deshalb sind die Lückenzahlen verschieden. |
| dezimal:learn:1 | Hundertstel als Kommazahl lesen | 2 | Eigenes Lernbeispiel | Buch 22, Stellenwertregel | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimal:learn:2 | Brüche in Zehntel umwandeln | 3 | Eigenes Lernbeispiel | Buch 31, Aufgabe 4a | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimal:learn:4 | Eine Kommazahl als Bruch schreiben | 3 | Eigenes Lernbeispiel | Buch 24, Aufgabe 7e | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimal:learn:6 | Mehr als ein Ganzes umwandeln | 3 | Eigenes Lernbeispiel | Buch 22, Stellenwertregel für Zahlen größer als eins | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimal:examples:1 | Ein Bruch wird eine Kommazahl | 1 | adaptiert | Buch 22, Stellenwertregel | Eigener Bruch sieben Hundertstel. |
| dezimal:examples:2 | Erst erweitern, dann als Kommazahl schreiben | 2 | Originalwerte | Buch 31, Aufgabe 4a | Drei Viertel als Kommazahl. |
| dezimal:examples:4 | Eine Kommazahl wird ein Bruch | 2 | adaptiert | Buch 24, Aufgabe 7e | 0,45 statt 0,4500; derselbe Wert und derselbe Umwandlungsweg mit vollständig gekürztem Bruch. |
| dezimal:examples:6 | Kommazahl größer als 1 | 2 | adaptiert | Buch 22, Stellenwertregel für Zahlen größer als eins | Eigener Wert 1,2; ein Ganzes muss in Zehnteln mitgezählt werden. |
| dezimal:examples:3 | Erst kürzen, dann als Kommazahl schreiben | 2 | adaptiert | Buch 23, Aufgabe 5j, sichtbarer Teil | 800/2000 statt im Original 600/2000. Nur der sichtbare Aufgabenbereich wurde als Typbeleg genutzt; linke Fotohälfte ist verdeckt. |
| dezimal:examples:8 | Welche Zahl fehlt? | 3 | Ergänzung | Buch 22, Dezimal- und Bruchschreibweise | Eigene Zählerlücke □/20 = 0,35; Umwandlung plus Nenneranpassung. |
| dezimal:examples:9 | Welche Zahlen sind gleich viel? | 2 | Originalwerte | Buch 24, Aufgabe 10, ausgewählte Karten | 0,75, 3/4, 6/8 und 0,750 stimmen überein; 3/8 gehört zur anderen Wertgruppe. |
| dezimal:examples:5 | Kommazahl mit Minus | 2 | adaptiert | Buch 22, Negative Dezimalzahl als Bruch | Eigener Wert minus 0,15; Vorzeichen bleibt beim Kürzen erhalten. |
| dezimal:examples:7 | Hören die Ziffern nach dem Komma auf? | 2 | Ergänzung | Buch 24, Aufgabe 15 | Ein Drittel als Gegenbeispiel zu endlicher Dezimalschreibweise; keine exakte endliche Näherung behaupten. |
| dezimal:examples:10 | Bei welchen Brüchen hören die Ziffern auf? | 3 | adaptiert | Buch 24, Aufgabe 15 | Drei Zwölftel, ein Sechstel und sieben Vierzigstel als eigene Auswahl zur Endlichkeit. |
| dezimal:examples:11 | Wo sind beide gestartet? | 2 | Originalwerte | Buch 24, Aufgabe 12, dritte Tabellenzeile | Je zehn Sprünge in entgegengesetzte Richtungen, Ziele minus zwei und minus eins; Start minus 1,5, Sprung 0,05. |
| dezimalvergleich:learn:2 | Endnullen erkennen | 3 | Eigenes Lernbeispiel | Buch 22, Endnullregel | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimalvergleich:learn:1 | Die entscheidende Stelle finden | 3 | Eigenes Lernbeispiel | Buch 25, Erklärung Stellenvergleich | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimalvergleich:learn:7 | Drei Kommazahlen ordnen | 4 | Eigenes Lernbeispiel | Buch 25, Einstiegsaufgabe Ordnen | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimalvergleich:learn:6 | Eine Kommazahl dazwischen finden | 3 | Eigenes Lernbeispiel | Buch 26, Aufgabe 8 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| dezimalvergleich:examples:2 | Nullen am Ende nach dem Komma | 1 | adaptiert | Buch 22, Endnullregel | Eigene Werte 0,6 und 0,600. |
| dezimalvergleich:examples:1 | Ziffer für Ziffer vergleichen | 2 | Originalwerte | Buch 25, Erklärung Stellenvergleich | 0,43 und 0,418; erste verschiedene Stelle sind die Hundertstel. |
| dezimalvergleich:examples:7 | Mit der kleinsten Zahl beginnen | 2 | adaptiert | Buch 25, Einstiegsaufgabe Ordnen | Eigene Werte 0,506, 0,56 und 0,5. |
| dezimalvergleich:examples:4 | Einen Bruch mit einer Kommazahl vergleichen | 3 | adaptiert | Buch 26, Beispiel 3 | Eigene Werte drei Fünftel und 0,58. |
| dezimalvergleich:examples:5 | Welche Ziffer fehlt? | 4 | adaptiert | Buch 26, Aufgabe 5 | Eigene Hundertstellücke 0,4□ < 0,43. |
| dezimalvergleich:examples:6 | Eine Zahl dazwischen finden | 1 | adaptiert | Buch 26, Aufgabe 8 | Eigene Grenzen 0,4 und 0,5 und ein möglicher Zwischenwert. |
| dezimalvergleich:examples:8 | Wer läuft weiter? | 1 | Ergänzung | Buch 25, Stellenvergleich | Eigene Laufstrecken mit derselben Einheit; Sachkontext, keine Originalgeschichte. |
| dezimalvergleich:examples:3 | Kommazahlen mit Minus | 2 | adaptiert | Buch 25, Beispiel 2 | Eigene negative Werte minus 0,7 und minus 0,65. |
| dezimalvergleich:examples:9 | Alle Zahlen dazwischen finden | 1 | Originalwerte | Buch 27, Aufgabe 14a | Alle Hundertstelwerte streng zwischen 0,95 und 1,05. |
| dezimalvergleich:examples:10 | Welche Zahl liegt in der Mitte? | 3 | Originalwerte | Buch 27, Aufgabe 12c | Mitte zwischen minus 0,41 und minus 0,40. |
| dezimalvergleich:examples:11 | Zahlen aus Ziffernkarten legen | 2 | Originalwerte | Buch 33, Runde 2, Aufgabe 5 | Ziffernkarten acht, null, fünf, vier; höchstens eine Ziffer vor dem Komma. |
| dezimalvergleich:examples:12 | Welche Ziffer passt? | 2 | Originalwerte | Buch 33, Runde 2, Aufgabe 6b | 0,□9 < 13/20. |
| dezimalvergleich:examples:13 | Das Muster in der Tabelle finden | 3 | Originalwerte | Buch 27, Aufgabe 15a | Gesuchte Eintragung in Zeile fünf und Spalte fünf des vorgegebenen Musters. |
| groessen:learn:1 | Längen: Meter zu Zentimeter | 3 | Eigenes Lernbeispiel | Buch 29, Aufgabe 2 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| groessen:learn:2 | Gewichte: Kilogramm zu Gramm | 3 | Eigenes Lernbeispiel | Buch 29, Aufgabe 5 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| groessen:learn:12 | Zeit: Stunden und Minuten | 5 | Eigenes Lernbeispiel | Buch 30, Aufgabe 18b; zusätzlich S. 8 Nr. 10b | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| groessen:learn:13 | Flächen: ganze und halbe Kästchen | 4 | Eigenes Lernbeispiel | Buch 30, Aufgabe 12 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| groessen:learn:14 | Körper: Rauminhalt und Oberfläche | 5 | Eigenes Lernbeispiel | Buch 30, Aufgabe 15 | Eigene Zahlen zum selben belegten Grundprinzip; von der Beispielaufgabe getrennt. |
| groessen:examples:1 | Meter in Zentimeter | 3 | adaptiert | Buch 29, Aufgabe 2 | Eigene Umrechnung 1,25 m in cm, Faktor hundert. |
| groessen:examples:2 | Eine passende Einheit ohne Komma finden | 3 | Originalwerte | Arbeitsheft 19, Arbeitsheft, Aufgabe 2a | Arbeitsheftseite, nicht Schulbuchseite 19. Eine geeignete kleinere Einheit wird selbst gewählt. |
| groessen:examples:3 | Gramm in Kilogramm | 3 | adaptiert | Buch 29, Aufgabe 5a | 250 g statt 30 g in kg; Richtung zur größeren Einheit. |
| groessen:examples:6 | Welche Einheit fehlt? | 2 | adaptiert | Buch 30, Aufgaben 11 und 14 | Eigene Einheitenlücke bei vorgegebener Maßzahl. |
| groessen:examples:7 | Euro und Cent zusammenrechnen | 2 | Ergänzung | Buch 22, Euro und Cent | Eigene Addition verschiedener Geldeinheiten nach dem Vereinheitlichen. |
| groessen:examples:8 | Welche Strecke ist länger? | 2 | Ergänzung | Buch 28, Einheitenwechsel | Eigener Vergleich 0,7 km und 650 m nach Umrechnung auf dieselbe Einheit. |
| groessen:examples:9 | Wie viel zeigt ein Abschnitt? | 3 | Ergänzung | Buch 13, Einstieg Messskala | Eigene Gewichtsskala mit acht gleichen Lücken auf zwei Kilogramm. |
| groessen:examples:12 | Stunden, Minuten und Sekunden | 5 | Originalwerte | Buch 30, Aufgabe 18b; zusätzlich S. 8 Nr. 10b | 1,05 Stunden in Minuten sowie fünf Sechstel Minute in Sekunden; zwei schulische Angaben in einem Zeitbeispiel zusammengeführt. |
| groessen:examples:13 | Ganze und halbe Kästchen zählen | 4 | adaptiert | Buch 30, Aufgabe 12 | Eigene Anzahl von ganzen und halben Kästchen; Maßstab ein halber Zentimeter je Kästchenseite. |
| groessen:examples:4 | Quadratmeter in Quadratzentimeter | 4 | adaptiert | Buch 30, Aufgabe 10 | Eigene Fläche 1,2 m² in cm²; zwei Flächenschritte mit je Faktor hundert. |
| groessen:examples:14 | Wie viel passt hinein? Wie groß sind die Seiten? | 5 | adaptiert | Buch 30, Aufgabe 15 | Eigene Quadermaße zwei, 1,5 und ein Zentimeter; Rauminhalt und Oberfläche ausdrücklich getrennt. |
| groessen:examples:5 | Kubikmeter in Kubikzentimeter | 4 | adaptiert | Buch 30, Aufgaben 13 und 14 | Eigener Wert 0,003 m³ in cm³; drei Richtungen und zwei Volumenschritte. |
| groessen:examples:11 | Liter und Würfelmaße | 6 | Originalwerte | Buch 30, Aufgabe 13a und d | Ein halber Kubikmeter in Liter sowie 77,3 Milliliter in Kubikdezimeter. |
| groessen:examples:10 | Flächen umrechnen | 6 | Originalwerte | Buch 30, Aufgabe 10e; zusätzlich S. 33 Runde 2 Nr. 4b | 0,005 km² in Ar und 7,1 m² in Ar; beide Originalangaben in einem Flächenbeispiel. |
| groessen:examples:15 | Zwei Ansichten desselben Körpers | 4 | Originalwerte | Buch 30, Aufgabe 17 | Grundriss achtzig mal fünfzig Zentimeter, Aufriss ein Meter Höhe. |
| groessen:examples:16 | Sehr kleine Längen und Gewichte | 6 | Originalwerte | Buch 24, Aufgabe 14, Erklärung und b | Sechs Mikrogramm in Gramm und vier Mikrometer in Meter. |
| groessen:examples:17 | Rahmen und Dreieck berechnen | 4 | adaptiert | Buch 30, Aufgabe 12, Figuren 3 und 4 | Eigene Maßangaben zu Rechteckrahmen und halber Rechtecksfläche; keine Übernahme ungemessener Bildlängen. |
