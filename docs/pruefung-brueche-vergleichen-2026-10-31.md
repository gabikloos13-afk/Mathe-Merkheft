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
