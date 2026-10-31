# Arbeitsprüfung: Brüche vergleichen · 31.10.2026

## Ausgangsstand
- Kapitel `vergleichen.html` ist in die gemeinsame Kursoberfläche mit Lernen, Beispiele, Bildwerkzeug und Nachschlagen eingebunden.
- `course-data.js` enthält vier Lernwege (gleiche Stückgröße, gleiche Stückzahl, gleich groß teilen, gleich viel erkennen) und zwölf Beispieltypen.
- Die Lernwege sind teilweise unmittelbar aus den zugehörigen Beispielschritten abgeleitet (beispielsweise Fall 1: identische Rechenzeilen und Erklärungen in `steps` und `learnSteps`).
- Ein eigenes Prüfprotokoll für dieses Kapitel liegt bislang nicht unter `docs/` vor.

## Maßstab des neuen Standards
Das dokumentierte Kapitel Kürzen und Erweitern trennt Grundlagenwege und zusätzliche Musterbeispiele, vermeidet identische Aufgaben in beiden Bereichen und prüft Bilder, Schritte, Hinweise, Rechenwerkzeug und alte Links. Dieser Standard ist für Vergleichen noch nicht nachgewiesen.

## Nächste Umsetzung
1. Alle vier Lernwege und zwölf Beispiele vollständig auf inhaltliche Dopplungen und verschiedene Aufgabentypen abgleichen.
2. Nur die unverzichtbaren Grundentscheidungen in Lernen belassen: gleiche Nenner, gleiche Zähler, auf gemeinsamen Nenner bringen, Gleichwertigkeit erkennen. Unterschiedliche Beispiele dafür verwenden.
3. Je Schritt eine erkennbare Entscheidung vor der Lösung: Welche Zahl vergleichen? Welche Stückgröße? Welcher gemeinsame Nenner? Welches Vergleichszeichen?
4. Bilder auf korrekte gleich große Ganze, Bruchwerte, Gleichheit und nicht vorweggenommene Ergebnisse prüfen.
5. Bildwerkzeug, Nachschlagen, Navigation, Direktlinks und mobile Ansicht gezielt testen.
6. Erst nach Daten-, Modell- und Browserprüfung als vollständig umgebaut kennzeichnen.

## Abgrenzung
Diese Datei dokumentiert den tatsächlich geprüften Ausgangsstand und die verbindlichen nächsten Schritte. Sie behauptet **keinen** bereits abgeschlossenen Kapitelumbau oder bestandenen Browsertest. Die bestehenden Lerninhalte wurden nicht stillschweigend verändert.

## Umsetzungsschritt · 31.10.2026

Commit `aed02170dbff594269c53e5324d154ed60eb98e6`: Für alle vier Grundlagenwege wurden eigene Lernaufträge, Titel, Einstiegsfragen und passende Einstiegstipps in `learning` ergänzt. Die zwölf Musterbeispiele, ihre Rechnungen und die gemeinsamen Bildwerkzeuge blieben unverändert.

**Noch offen:** Die Lernwege verwenden weiterhin dieselben Rechenzahlen und teils dieselben Rechenschritte wie die Beispielkarten 1–4. Die vollständige Entflechtung, fachliche Detailkontrolle sämtlicher Vergleichsfälle, Bildprüfung und echte Browserprüfung sind noch nicht abgeschlossen. Deshalb ist der neue Standard **nur teilweise** umgesetzt; es liegt keine Gesamtfreigabe vor.


## Umsetzung nach der Detailprüfung · 31.10.2026

Dieser Abschnitt ersetzt den zuvor als „Noch offen“ ausgewiesenen Bearbeitungsstand, soweit konkrete Änderungen unten nachgewiesen sind. Die früheren Prüfbefunde bleiben als Verlauf erhalten.

### 1. Lernen und Beispiele getrennt
- Die vier Grundlagenwege haben eigene Aufgaben: **2/9 und 7/9**, **2/3 und 2/6**, **1/2 und 2/3**, **3/5 und 6/10**.
- Die zwölf Musterbeispiele und deren bestehende Rechenwege bleiben erhalten. Kein Lernweg nutzt mehr dieselbe Aufgabenstellung und dasselbe Zahlenpaar wie das korrespondierende Musterbeispiel.
- Die Lernwege haben nun 2, 2, 5 und 3 eigene Schritte statt der früheren 2, 1, 10 und 8 Schritte. Die schwierigen Denkentscheidungen bleiben erhalten, überflüssige doppelte Kürzungs-/Erweiterungsrunden entfallen.
- Jede Lernaufgabe hat eigene Einleitung, Aufgabe, Starttipp, Schritterklärungen, Abschlussrechnung und Kontrolle.

### 2. Bilder und Bildwerkzeuge
- Beispiel 6: Die gemischte Zahl 1 1/4 wird als dritte Zahl gezeigt. Im Startbild ist die richtige Reihenfolge noch nicht vorgegeben.
- Beispiel 8: Die Gewinnanteile 5/20 und 6/20 erscheinen auch im Abschlussbild statt einer leeren Platzhaltergrafik.
- Beispiel 9: Die ausdrücklich verlangte Vergleichsgrenze **2** ist im Zahlenstrahl sichtbar.
- Beispiel 10: Die Zwischenstufen mit Fünfzigsteln werden auf dem Zahlenstrahl gezeigt, statt fälschlich grobe Bruchstreifen ohne 50 sichtbare Einteilungen zu verwenden.
- Beispiel 11: Beim Gleichnamigmachen negativer Brüche ändern sich die Beschriftungen schrittweise bis zu −16/12 und −15/12.
- Beispiel 12: Die Grenzen −1 und 0 und die später möglichen Zähler werden in einem Zahlenstrahl mit Zehntel-Einteilung gezeigt.
- Die Lernbilder benutzen die jeweiligen neuen Lernzahlen. Bei gleichen Zählern zeigt der erste Denkschritt ausdrücklich einzelne Drittel und Sechstel.
- Das geführte Bildwerkzeug zeigt negative Ausgangswerte samt Minuszeichen und blendet die fertige Umformung nicht schon im Schnittlinien-Suchschritt ein.

### 3. Nachschlagen und Veröffentlichungsstand
- Der Nachschlagebereich enthält sechs kurze Karten; besonders die zuvor fehlende Regel zu gleichen Zählern und die Regel für negative Brüche sind ergänzt.
- Die Cache-Version in `vergleichen.html` wurde von `20261031r21` auf `20261031r22` erhöht.
- Die Änderungen liegen im GitHub-Repository auf `main`. Die Dateien `course-data.js`, `rechenbilder.js`, `bildlabor.js`, `vergleichen.html`, `tests/course.test.cjs` und die neue `tests/vergleichen.test.cjs` wurden geändert beziehungsweise ergänzt.

### 4. Tatsächlich durchgeführte Tests
- Alle 12 Beispieltypen ergeben zusammen 43 erfolgreich erzeugte Beispielbilder; die vier neuen Lernwege ergeben 12 erfolgreich erzeugte Lernbilder.
- Die Bildausgaben wurden auf gültiges SVG, vorhandene Alternativbeschreibung und ungültige Werte (`NaN`, `undefined`, `Infinity`) geprüft.
- Kapiteltests prüfen getrennte Aufgabenpaare, Anzahl der Schritte, vollständige Lernaufträge, die zuvor fehlende gemischte Zahl, Grenzzahl 2, Umformungsbilder bei negativen Brüchen, Abschlussbild für die Losaufgabe, Zehntelgrenzen und Nachschlagekarten.
- Die neun vorhandenen `.cjs`-Testskripte wurden im JavaScript-Kompatibilitätslauf mit bereitgestellten Dateiinhalten ausgeführt; dabei waren alle neun erfolgreich, einschließlich der Tests anderer Kapitel. **Das war kein nativer Node.js-Testlauf und kein Browserlauf.**

### 5. Ausstehende Abnahme
Ein tatsächlicher Browser- und Mobiltest (einschließlich 375-Pixel-Ansicht, Klick-/Tastaturführung und Bildwerkzeug-Bedienung) ist in dieser Bearbeitungsrunde nicht erfolgt. Dafür liegt daher keine Freigabe vor. Die programmatische Prüfung ersetzt keine visuelle Endabnahme im Browser.
