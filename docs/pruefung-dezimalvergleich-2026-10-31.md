# Detailprüfung und Überarbeitung: Kommazahlen vergleichen

Stand: 31. Oktober 2026 · Projekt: HTML | Mathe Merkheft

## Gegenstand
Überarbeitet wurde ausschließlich das Kapitel **Kommazahlen vergleichen** (`dezimalvergleich.html`). Das zuvor überarbeitete Kapitel **Brüche und Kommazahlen** (`dezimal.html`) bleibt inhaltlich unverändert. Alle 13 Musterbeispieltypen wurden beibehalten.

## 1. Grundlagen und Beispiele getrennt
Die vier Grundlagenwege nutzen jetzt eigene Zahlen, getrennte Aufgabenformulierungen und eigene Lösungswege:

| Lernweg | Neue Lernaufgabe | Bestehendes Musterbeispiel |
|---|---|---|
| Nullen am Ende | 0,7 gegenüber 0,700 | 0,6 gegenüber 0,600 |
| Stellenwerte vergleichen | 0,56 gegenüber 0,527 | 0,43 gegenüber 0,418 |
| Drei Zahlen ordnen | 0,704; 0,74; 0,7 | 0,506; 0,56; 0,5 |
| Eine Zahl dazwischen | zwischen 0,7 und 0,8 | zwischen 0,4 und 0,5 |

Der Lernweg wurde von früher 6 auf nun **13 kurze Schritte** umgestellt (3 + 3 + 4 + 3). Zu Beginn steht die Fragestellung; in jedem Schritt folgen Bild, Rechnung und eine kurze Erklärung. Vor dem Weiterklicken steht ein konkreter Denkauftrag. Die abschließende Lösung und Kontrolle erscheinen erst nach Durchlauf.

Insbesondere wurde das Vorwegnehmen einer sortierten Zahlenfolge in der *ersten* Bild-/Lernphase vermieden. Bei „Zahlen ordnen“ bleibt die Liste zunächst unsortiert. Die vier Lernwege haben eine eigene kompakte Abschlussrechnung.

## 2. Bildfehler und Schwachstellen korrigiert
Das neue Modul `dezimalvergleich-bilder.js` wird nur für das Kapitel „Kommazahlen vergleichen“ verwendet. Es zeigt nach der Art der Aufgabe passende Grafiken statt nur eines generischen Zahlenstrahls mit dem ersten Zahlenpaar.

- **Gleiche Ziffern und Endnullen:** optische Veranschaulichung gleich großer Anteile und markierte entscheidende Stelle in einer Stellenwerttafel.
- **Vergleich 0,43 und 0,418:** Darstellung als 0,430 und 0,418 mit Hervorhebung der Hundertstel.
- **Negative Zahlen:** Zahlenstrahl mit korrekter Reihenfolge −0,70 vor −0,65 und erst danach dem Vergleichszeichen.
- **Bruch mit Kommazahl:** 3/5 wird in 60/100 und 0,60 umgewandelt, erst danach wird mit 0,58 verglichen.
- **Fehlende Ziffern:** alle passenden Werte in 0,4□ und 0,□9 werden am passenden Schritt erklärt, nicht schon in der Vorschau.
- **Drei Zahlen ordnen:** alle drei Werte werden betrachtet; die Reihenfolge wird erst beim Vergleich ausgegeben.
- **Genau zwei Nachkommastellen:** zwischen 0,95 und 1,05 erscheinen genau neun zulässige Punkte, die Grenzpunkte bleiben ausgeschlossen.
- **Mitte zwischen −0,41 und −0,40:** erst Abstand, dann Halbierung, erst zuletzt der Mittelpunkt −0,405.
- **Vier Ziffernkarten:** 8,540 und 0,458 erscheinen erst im jeweiligen Lösungsschritt.
- **Tabellenmuster:** die zwei Zahlenfolgen für Zeile und Spalte werden unabhängig gezeigt; erst zuletzt wird der gesuchte Wert 32,243 gebildet.

## 3. Fachliche und technische Korrekturen
- Der Nachschlagebereich enthält sechs kompakte Karten einschließlich **Bruch und Kommazahl vergleichen** und **negative Kommazahlen**.
- Die Beispielrechnungen wurden anhand ihrer mathematischen Werte geprüft, darunter die 45 m Unterschied bei der Laufstrecke, die neun Hundertstel-Zahlen und die Zifferngrenze bei 13/20.
- Im Tabellenbeispiel werden ausdrücklich zwei getrennte Ziffernfolgen beschrieben, nicht irreführend die gesamte Dezimalzahl mit 3 multipliziert.
- Die vier Lernwege haben individuell abgestimmte Fragen und Hilfen. Die zentrale Kursnavigation führt nach dem letzten Lernweg nun zum **ersten** der 13 Musterbeispiele.
- Die erforderlichen Ergänzungen der zentralen `course.js`- und `rechenbilder.js`-Logik werden ausschließlich bei `dezimalvergleich` aktiv. Alle anderen Kapitel nutzen weiterhin ihre bisherigen Bilddaten und fachlichen Inhalte.
- Das gemeinsame Layout `course.css` wird unverändert genutzt.
- Cacheversion der veröffentlichten Seite: `20261031r28`.

## 4. Tests
Die neue Datei `tests/dezimalvergleich-kapitel.test.cjs` überprüft:

- alle vier eigenständigen Lernaufgaben, **13 Lernschritte** und sechs Nachschlagekarten;
- **40 Beispielbilder** (13 Vorschauen plus 27 Rechenschrittbilder) und **13 Lernschrittbilder**, insgesamt **53** Bilder;
- fehlende vorgezogene Lösungen im Einstiegsbild;
- vollständige Darstellungen bei mehreren Zahlen, negativen Zahlen, gemischten Bruch-/Dezimalaufgaben, Lücken und Zahlenmuster;
- exakte Bruch- und Dezimalwerte sowie die Vergleichszeichen;
- Dateieinbindung und Rücksprung in die Musterbeispiele.

Die alte globale `tests/course.test.cjs` wurde an die neue Anzahl der Lernschritte angepasst. Die bestehende Dezimal-Kapiteltestdatei prüft die gemeinsam genutzte Navigation jetzt mit beiden Kapiteln, ohne den Inhalt des vorherigen Kapitels zu ändern.

**Prüfstatus:** Die Kapitelsuite ist bestanden. Die übrigen Regressionssuiten wurden in einer JavaScript-Kompatibilitätsumgebung ausgeführt; keine native Node.js-Laufzeit und keine vollständige visuelle Browserprüfung. Diese Einschränkung ist wichtig: programmatisch gültiges SVG belegt noch nicht optimale Lesbarkeit bei 375 Pixeln Breite. Für die finale visuelle Freigabe muss das Kapitel zusätzlich im Browser mit Maus/Tastatur und Smartphone-Breite durchgeklickt werden.

## 5. Integration und Umfang
Bearbeitet/neu angelegt wurden:

- `course-data.js`: Kapitelinhalte, eigenständige Lernaufgaben, Nachschlagen;
- `dezimalvergleich-bilder.js`: neue kapiteleigene Bilder;
- `rechenbilder.js`: Einbindung der neuen Bilder für dieses Kapitel;
- `course.js`: Denkimpulse und volle Beispielnavigation;
- `dezimalvergleich.html`: neue Bilddatei und aktuelle Cacheversion;
- `tests/dezimalvergleich-kapitel.test.cjs`: neue Kapitelsuite;
- `tests/course.test.cjs` und `tests/dezimal-kapitel.test.cjs`: angepasste gemeinsame Testannahmen.

**Nicht geändert:** die fachlichen Aufgaben, Regeln und Zahlen der übrigen Kapitel, insbesondere `dezimal.html`. Sie sind im Regressionstest enthalten.

**Endfreigabe:** fachlich und programmatisch überarbeitet; Browser-/Mobilabnahme weiterhin offen.
