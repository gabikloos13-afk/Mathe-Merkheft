# Prüfung und Überarbeitung: Mit Größen rechnen

**Datum:** 31. Oktober 2026 · **Projekt:** HTML | Mathe Merkheft · **Kapitel:** `groessen.html`

## 1. Ausgangsbefund

Das Kapitel enthielt fünf Lernwege, aber deren Rechnungen und Aufgaben waren identisch mit den entsprechenden Musterbeispielen. Der Lernbereich und die Beispielsammlung erfüllten damit die vereinbarte Aufgabentrennung noch nicht. Der Nachschlagebereich bot nur zwei kurze Regeln und vier Wörter.

Die Bilder von Längen- und Massebeispielen blieben über mehrere Rechenschritte identisch und erklärten nur die allgemeine Einheit statt der konkreten gegebenen Zahl. Bei Flächen und Rauminhalten wurde der Umrechnungsfaktor mehrfach gezeigt, aber das konkrete Ergebnis erst im Text. In mehreren Beispieleinträgen waren die für Bilder hinterlegten Einheiten beschädigt: `ha` erschien als `h`, `ml` als `m`, `min` als `m`, `µg/µm` nur als Ziffernfolge. Mehrere Bildzustände waren reine Textkarten oder leere Platzhalter.

## 2. Eigenständige Lernwege

| Lernweg | Neue Lernaufgabe | Bestehendes Musterbeispiel |
|---|---|---|
| Längen | 2,4 m = 240 cm | 1,25 m = 125 cm |
| Gewichte | 0,32 kg = 320 g | 0,075 kg = 75 g |
| Zeit | 1,25 h = 75 min und 3/4 min = 45 s | 1,05 h = 63 min und 5/6 min = 50 s |
| Flächen | 4 ganze und 2 halbe Kästchen zu je 0,5 cm Seitenlänge = 1,25 cm² | 6 ganze und 4 halbe Kästchen = 2 cm² |
| Körper | Quader 3 × 2 × 1 cm: V = 6 cm³, O = 22 cm² | Quader 2 × 1,5 × 1 cm: V = 3 cm³, O = 13 cm² |

Alle fünf Lernaufträge haben eine eigene Fragestellung, Ausgangsdaten, Denkhinweise, kurze Einzelschritte, individuelle Rechnungen, Kontrolle und Denkfalle. Die insgesamt **20 Lernschritte** umfassen 3 + 3 + 5 + 4 + 5. Vor dem nächsten Schritt erscheint jeweils eine kurze konkrete Denkfrage; das Ergebnis ist am Anfang noch nicht zu sehen.

Die **17 Musterbeispiele** mit ihren ursprünglichen Aufgabentypen bleiben unverändert verfügbar, und nach dem letzten Lernweg führt die Navigation zum ersten Musterbeispiel.

## 3. Schrittbilder und Bildwerkzeug

Ein neues, ausschließlich für das Größenthema verwendetes Modul `groessen-bilder.js` erzeugt die kapiteleigenen Abbildungen:

- Länge, Masse und ihre Umrechnungsrichtung: separate Einheitenbeziehung, Maßzahlrechnung und vollständiges Ergebnis.
- Fläche: Hundert quadratische Teilfelder zur zweidimensionalen Umrechnung (Faktor 100 je Stufe) sowie zugehörige Rechenwerte.
- Rauminhalt: ein modellhafter Kubus verdeutlicht die drei Richtungen mit dem Faktor 1000 je Stufe.
- Geld: anschauliche Cent-Einteilung mit Umwandlung vor der Addition.
- Streckenvergleich: beide Strecken zunächst in Meter und danach der Vergleich.
- Skala: acht tatsächliche Lücken von 0 bis 2 kg statt einer bloßen Zahlentafel.
- Ar, Hektar und Quadratkilometer: sämtliche Einheiten sind ausgeschrieben und die beiden Umrechnungswege getrennt.
- Liter und Kubikmaße: Milliliter, Kubikzentimeter und Kubikdezimeter mit korrekten Einheiten dargestellt.
- Zeit: Stunde/Minute mit dem Faktor 60; der Bruch einer Minute wird in gleichen Teilen dargestellt.
- Kästchenflächen: ganze und halb gefärbte Kästchen; die Zahl der Kästchen entspricht der jeweiligen Lern- oder Musteraufgabe.
- Quader: Rauminhalt und drei Paare von Außenflächen mit unterschiedlichen Einheiten und passenden Ergebnissen.
- Zwei Ansichten, Mikro-Einheiten, rechteckiger Rahmen und Dreieck: jeweils eigene mehrstufige Darstellungen.

Die vorhandenen interaktiven Bildwerkzeuge in `bildlabor.js` und `anfasslabor.js` bleiben funktionsfähig und unverändert. Die gemeinsame Grafiksteuerung `rechenbilder.js` nutzt die neue Bilddatei nur bei `topic==='groessen'`.

## 4. Nachschlagen

Der Nachschlagebereich enthält sechs kurze Karten: Umrechnungsrichtung; Längen, Masse und Geld; Zeit; Flächen; Rauminhalt und Oberfläche; weitere Einheiten einschließlich Ar, Hektar, Mikro und Milli. Die Unterschiede zwischen `cm`, `cm²`, `cm³` werden ausdrücklich behandelt.

## 5. Fachliche und technische Qualitätssicherung

Die neue Datei `tests/groessen-kapitel.test.cjs` prüft:

- fünf unterschiedliche Lernaufträge und deren 20 Bildschritte;
- alle 17 Musterbeispiele mit zusammen 83 Bildzuständen (17 Einstiegsbilder und 66 Beispielschritte);
- **insgesamt 103 erzeugte Bildzustände** auf SVG-Ausgabe, Alternativtexte und fehlende ungültige Rechenwerte;
- korrekte Einheiten in Datensätzen und konkreten SVG-Beschreibungen;
- keine vorgezogenen Ergebniswerte in den Einstiegsbildern;
- mathematische Werte in den Bereichen Umrechnung, Zeit, Flächen, Volumen, Oberfläche, Geld und Mikro;
- vollständige Navigation zu allen Beispielen und richtige Script-Ladereihenfolge.

Neben diesem Kapiteltest wurden die Regressionstests der übrigen Kapitel und die gemeinsamen Kurs-, Bild- und Navigationstests geprüft. **Zwölf Testdateien bestanden in einer JavaScript-Kompatibilitätsumgebung**. Dies ist **kein nativer Node.js-Testlauf**.

## 6. Veränderte Dateien

- `course-data.js`: Größenkapitel-Lernwege, Regeln, Nachschlagekarten und vollständige Einheitenbeschriftung.
- `groessen-bilder.js`: neues, kapitelspezifisches Bildmodul.
- `rechenbilder.js`: Bildmodul ausschließlich für dieses Thema eingebunden.
- `course.js`: Denkfragen und erster Einstieg in die vollständigen 17 Musterbeispiele.
- `groessen.html`: neues Script und Cachekennung `20261031r29`.
- `tests/groessen-kapitel.test.cjs`: neue Kapitelsuite.
- `tests/dezimal-kapitel.test.cjs` und `tests/dezimalvergleich-kapitel.test.cjs`: Prüfung der erweiterten gemeinsamen Navigation aktualisiert. Die Lerninhalte dieser Kapitel sind unverändert.

## 7. Freigabegrenze

Die programmatische Fach- und Integrationsprüfung ist bestanden. Es wurde **kein vollständiger echter Browserdurchlauf** auf Desktop, Mobilgeräten oder bei einer Breite von 375 Pixeln vorgenommen. Die tatsächliche visuelle Lesbarkeit, die Tabbedienung per Tastatur, die Bildwerkzeug-Interaktion und die Gestaltung aller SVG-Stufen müssen für eine endgültige Browserfreigabe noch am Bildschirm geprüft werden.

**Ergebnis:** Fachlich und technisch überarbeitet, auf GitHub veröffentlicht, **visuelle Endabnahme weiterhin offen**.
