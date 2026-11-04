# Vertiefung der Lernwege zu den Schulblättern S. 18 und 19

## Umfang

Die veröffentlichten Musterbeispiele bleiben erhalten. Im Register **Lernen** der Kapitel „Mit Größen rechnen“, „Kommazahlen vergleichen“ und „Brüche und Kommazahlen“ steht zusätzlich jeweils der wiederverwendbare Grundlagenweg **Schritt für Schritt selbst herleiten**. Keine Übungsserie: Ein Weg pro Aufgabenfamilie; vorhandene Blattwerte oder eigene Werte können eingesetzt werden.

Sieben Aufgabenfamilien:

1. Eine gegebene Größe in eine vorgegebene Einheit umrechnen.
2. Eine kleinere Einheit finden, mit der die Maßzahl ganz wird.
3. Stunden/Minuten/Sekunden mit 60 bzw. 3600 umrechnen; insbesondere 90 min → 1 h + 30 min → 1 h + 0,5 h → 1,5 h.
4. Positive/negative Dezimalzahlen, ganze Zahlen und Brüche vergleichen; gemischte Zahlen werden umgeschrieben. Nicht endliche Brüche werden exakt über gemeinsame Nenner verglichen.
5. Alle zehn möglichen Ziffern einer Lücke einzeln prüfen; echte Ungleichheit und Gleichheit unterscheiden; negative Zahlen berücksichtigen.
6. Bruch → endliche Dezimalzahl: Zähler/Nenner lesen, Zehnernenner finden, oben und unten erweitern, Stellenwerttafel lesen.
7. Dezimalzahl → Bruch: Nachkommastellen zählen, Nenner bestimmen, schrittweise durch 2 oder 5 kürzen und jede Teilbarkeit begründen.

## Darstellung und Bedienung

- Immer nur eine Denkfrage. Ein Gedanke wird bewusst aufgedeckt; danach erscheint erst die nächste Frage.
- Frage, Bild, Begründung und ein konkret begründeter falscher Weg gehören zusammen. Freie Gedanken werden nicht automatisch bewertet.
- Stellenwerttafeln zeigen bei Zehnerfaktoren jede einzelne Veränderung mit 10; leere Stellen werden durch Nullen dargestellt. Ganze Zahlen und negative Vorzeichen bleiben sichtbar.
- Einheitenreihe mit Start/Ziel und Faktoren, 100-Kästchen-Bild für Flächen, zehn Schichten mit je 100 Plätzen für Rauminhalte, Zahlenstrahl für Vergleich und eine visuelle Ziffernübersicht.
- Zurück, Neustart ohne Ergebnis und Änderung der Eingabe; nach einer Änderung wird der alte Rechenweg verborgen.
- Die Tabellen haben einen beschrifteten, per Tastatur erreichbaren Scrollbereich. Die Seite selbst soll bei 320 px nicht horizontal überlaufen.
- Größen werden intern als exakte Brüche berechnet. Keine gerundeten binären Gleitkommazahlen als Rechenergebnisse.

## Fachlicher Abgleich

`tests/basiswege.test.cjs` prüft unabhängig vorgegebene Ergebnisse aller 27 Teilaufgaben auf Arbeitsheft S. 19 Nr. 1–3. Dazu kommen die gezeigten Vergleichsarten und Ziffernlücken von S. 18 sowie beide Umwandlungsrichtungen mit Vorzeichen und ergänzten Nullen. Der Heftansatz 250 cm → m und das Schulbeispiel 0,00073 m³ → dm³ sind ebenfalls enthalten.

Die Zahlen des Blatts sind Eingabemöglichkeiten, keine zusätzlichen Musteraufgaben im Aufgaben-Navigator. Die bisherigen 34 Lernansichten/111 Musterbeispiele/523 Phasen werden damit nicht als vermeintlich neu einzeln geprüfte Fälle umgezählt.

## Prüfung und Grenzen

Alle 14 lokalen Fach-/Modell-Testdateien bestanden. Ein eigener Browser-Test prüft sieben Familien bei 320, 375 und 1280 px, den ganzen Aufdeckweg, Bildvorhandensein, Rückweg, Neustart, ungültige Eingaben und das Wechseln der Größenart. Ein tatsächlicher Browserdurchlauf bestätigte insbesondere die vollständige Herleitung von 90 Minuten in Stunden.

Die 14 bisherigen Rücksetzfehler des Browserlaufs 41910548668 entstanden durch den Vergleich von `innerText` (mit CSS-Großschreibung) mit dem standardmäßig verwendeten `textContent`. Die Prüfung verwendet jetzt auf beiden Seiten die tatsächlich sichtbare Textansicht. Das ist eine Korrektur des Testvergleichs; der vollständige Reset wird weiterhin geprüft.

Keine Garantie für ein bestimmtes Lernergebnis: Hannas selbstständige Anwendung muss praktisch erprobt werden. Multiplikation und Division mit größeren Zahlen, die schriftliche Division periodischer Brüche sowie das Lesen der Aufgaben bleiben eigene Lernvoraussetzungen. Nicht endliche Dezimaldarstellungen werden in der Bruch-Umwandlung benannt und auf den vorhandenen Perioden-Lernweg verwiesen; es wird kein Näherungswert als exakte Lösung ausgegeben.
