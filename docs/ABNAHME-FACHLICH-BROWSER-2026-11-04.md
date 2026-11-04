# Verbindliche Fach- und Praxistest-Abnahme (laufend)

Stand: 04.11.2026 · Arbeitszweig: `gesamtumbau-erklaerstandard-2026-11-04` · **Keine Freigabe.**

## A. 395 Beispielphasen

Alle 111 Beispielaufgaben und ihre insgesamt 395 Phasen sind in `PHASENPRUEFUNG-522-ERKLAERUNGEN-2026-11-04.md` mit ihrem aktuellen Schritt, Recheninhalt und ihrer bisherigen Warum-Begründung erfasst.

**Offen:** Eigene, fachlich geprüfte Warum-/Warum-nicht-Alternativen je Phase. Die derzeitigen offenen Denkfragen sind keine kuratierten Entscheidungsalternativen. Bis zu einer individuellen mathematischen Prüfung dürfen sie nicht durch schematisch erfundene Falschantworten ersetzt werden. Der Reader bewertet frei formulierte Überlegungen nicht als mathematisch richtig oder falsch.

## B. Originalquellen

Quellenbasis: 28 fotografierte Buchseiten 6–33 und 25 Schulheft-/Arbeitsblattfotos, indexiert in `SCHULGRUNDLAGE-MATHE-KLASSE6-2026-11-04.md`. **Ein Kapitel-Seitenbereich ist kein Beleg für eine exakte Aufgabenidentität.**

Direkt nachprüfbare Fallhinweise aus dem Originalabgleich:
- Buch S. 9 Nr. 15: Nina zahlt 2 €, die Mutter 10 €, Gewinn 300 €. Eine proportionale Verteilung ist eine mögliche faire Auslegung, aber die Aufgabenformulierung schreibt keine eindeutige Verteilungsregel vor. Der Lernweg muss seine Annahme offenlegen.
- Buch S. 9 Nr. 20: Zwei Drittel einer Zahl sind 450; gesucht sind zwei Fünftel derselben Zahl. Zuerst die ganze Zahl zurückrechnen.
- Buch S. 9 Nr. 21: Teig verliert **etwa** ein Fünftel; 320 g Endgewicht führt deshalb zu einem Näherungswert für das Ausgangsgewicht.
- Buch S. 14 Nr. 4a: Die vorhandene Zahlenstrahlaufgabe B14 deckt nicht sämtliche im Buch geforderten Teilwerte ab.
- Buch S. 15 Nr. 11: Die Variante mit Nenner 100 fehlt in B9.

**Noch nicht abgenommen:** Der originale Aufgabenwortlaut, die konkrete Aufgabennummer, alle Werte und sämtliche Bildzustände aller anderen Aufgaben. Didaktische Zusatzaufgaben müssen ausdrücklich von Buchaufgaben unterschieden werden.

## C. Browser, Werkzeuge, mobile Nutzung

**Vorhandene technische Prüfungen:**
- `tests/erklaerstandard-audit.cjs`: Struktur, Mathematik- und Entscheidungsfelder; keine visuelle Abnahme.
- `tests/merkheft-browser.spec.cjs`: neun Kapitel bei 1280, 768, 375 und 320 px, erste Lern-/Beispielphase und je eine Interaktion in jedem der neun Werkzeuge.
- **Neu:** `tests/merkheft-vollstaendig.spec.cjs`: alle 34 Lernwege, 111 Beispiele und alle 522 Phasen bei 1280 und 375 px, einschließlich Richtig-/Falsch-Entscheidungen, Lösungssperre, SVG-Gültigkeit, JS-Fehlern und horizontalem Überlauf.
- **Neu:** `.github/workflows/merkheft-qa.yml`: führt statische Prüfung, vollständige Browser-Phasentests und vorhandene neun Werkzeugtests auf GitHub Actions aus.

**Prüfgrenzen:** Ein erfolgreicher automatisierter Chromium-Test beweist weder eine fachlich richtige Darstellung noch die vollständige Touch-, Tastatur- und Bildschirmleser-Bedienbarkeit. Alle neun Werkzeuge brauchen weiterhin dokumentierte Tests ihrer *gesamten* Eingabebereiche, Grenzwerte, Rücksetzungen und Rechenergebnisse. Ein Screenshot allein beweist keine Interaktion. Mobile Chromium-Simulation ersetzt keinen realen Smartphone-Test.

## D. Freigaberegel

Gesamtstatus bleibt **NICHT BESTANDEN**, solange eine der vier Bedingungen offen ist:
1. 395 Beispielphasen individuell fachlich vertieft.
2. 145 Fälle mit Original- oder eindeutig als Zusatz gekennzeichneter Aufgabenfamilie verknüpft.
3. Neun Bildwerkzeuge vollständig praktisch und fachlich getestet.
4. Neun Seiten auf Desktop und Smartphone in allen relevanten Ansichten geprüft.

Kein Merge auf `main` ohne vier vollständig dokumentierte Abnahmen.
