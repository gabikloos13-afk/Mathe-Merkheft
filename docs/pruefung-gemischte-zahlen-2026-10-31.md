# Gemischte Zahlen · Überarbeitung und Prüfung · 31.10.2026

## Ausgangspunkt und Quellen

Die bisherige Seite hatte die vier passenden Register, korrekte Grundrechnungen, eine Aufdeckung und zwei vorhandene Bildwerkzeuge. Der Lernweg sprang jedoch direkt von der Aufgabenstellung zu Ganzen und Rest. Lernen und Beispiele wiederholten dieselben Aufgaben. Lücken im Restzähler und Nenner sowie das anschließende Kürzen des Restbruchs fehlten. Die geführte Bündelansicht beschriftete auch die unvollständige Gruppe als „Ganzes“.

Grundlage des Schulabgleichs in diesem Durchgang: die bestehende Seite, ihre Aufgaben und `buchabgleich.md` vom 29.10.2026. Dort sind gemischte Zahlen, ganze Ergebnisse und negative Werte ausdrücklich zugeordnet. Die ursprünglichen Schulbuch- und Heftfotos waren in diesem Arbeitskontext nicht direkt einsehbar. Deshalb ist dies KEIN erneuter vollständiger Fotoabgleich und keine Bestätigung der exakten Heftschreibweise für jeden neu ergänzten Fall. Zusätzliche Aufgabenformen sind als didaktische Ergänzungen ausgewählt; eine konkrete Buchseiten-/Aufgabennummer wird dafür nicht behauptet.

## Ergebnis

Drei eigenständige Lernabschnitte: Bedeutung von Ganzen und Bruchteil; Bruch zur gemischten Zahl; gemischte Zahl zum Bruch. Die Herkunft jeder Zahl wird über Stückgröße, volle Gruppen, Rest und Gesamtzahl erklärt. Acht zusätzliche Musterbeispiele: Bild ablesen, kein Rest, Lücke vor dem Bruch, Lücke im Restzähler, Lücke im Nenner, Restbruch kürzen und negative Umwandlung in beide Richtungen. Die beiden Grundumwandlungen werden im Beispielnavigator nicht nochmals als gleiche Aufgabe angeboten.

Alle Rechenschritte haben kurze Erklärpunkte, eigene Tipps und passende Bilder. Ganze Streifen sind gleich groß. Vorschauen mit unbekanntem Ergebnis zeigen einzelne Bruchteile statt fertiger Gruppierungen. Ein gegebenes Bild oder eine bereits gegebene gemischte Zahl darf natürlich ihre bekannten Ganzen zeigen. Vollständige Heftrechnung, Antwort, Denkfalle und aufklappbare Rückrechnung schließen jeden Weg ab. Sechs Nachschlagekarten bündeln die Regeln. Brüche verwenden waagerechte Bruchstriche.

Die Bündelmaschine mit Antippen, Ablegen, Auspacken und Regler bleibt bestehen. Die Zwischenanzeige verwendet kein irreführendes Multiplikationszeichen mehr. Die zusätzliche geführte Bildfolge unterscheidet Ganze und unvollständige Gruppe und erläutert auch Rest 0 korrekt.

Technisch liegen die neuen Kapiteldaten und Bilder in `gemischt-kapitel.js`, mit eigener CSS-Datei. Der gemeinsame Reader ergänzt für dieses Kapitel Schrittüberschriften, kurze Listen, Denkfallen und den Übergang zu den zusätzlichen Beispielen. Andere Kapiteldaten bleiben unverändert.

## Tatsächlich geprüfter Umfang

- Chrome: alle 17 Ansichten der drei Lernwege sowie alle 42 Ansichten der acht Musterbeispiele bei 360 Pixel breitem eingebettetem Dokument; Anfang, jeder Aufdeckschritt und Schlussantwort einschließlich Tipp/Kontrolle durchlaufen. Kein horizontaler Überlauf. Durch die Scrollleiste beträgt der verfügbare Inhaltsbereich teilweise 345 Pixel.
- Sichtprüfung von Rechenschritten und Streifenbildern in schmaler und breiter Ansicht. Das ist eine responsive Browserprüfung, keine Prüfung auf einem physischen Android-Handy.
- Bündelmaschine im Browser für alle vier Nenner 3, 4, 5, 6 und jeweils 1, 11, 24 Stücke: jeden Fall bis zum Ende gebündelt; Stückzahl, volle Gruppen und lose Stücke kontrolliert; kein horizontaler Überlauf. Auswahl, Ablegen und Auspacken zusätzlich mit echten Klicks geprüft; Rücksetzen bedient. Ziehgesten wurden nicht auf einem Touchgerät geprüft.
- Geführte Bildfolge 11/4 mit vier Zuständen und Beispielwechsel; Nachschlagen mit sechs Karten.
- `tests/gemischt-kapitel.test.cjs`: 36 numerische Gleichungen aus den tatsächlichen Rechenzeilen, 48 Aufgaben-/Schrittbilder, Trennung Lernen/Beispiele, keine doppelten Einstiegssätze, unveränderte Daten des Referenzkapitels.
- Bestehende Tests `anfasslabor.test.cjs`, `bildlabor.test.cjs`, `rechenbilder.test.cjs`, `course.test.cjs`, `routes.test.cjs` bestehen. Der Bündelmodelltest umfasst alle 96 Kombinationen aus 1–24 Stücken und Nennern 3–6 einschließlich Zwischenständen. Die bisherigen allgemeinen Kurstests laden die Basisdaten; der neue Kapiteltest prüft ausdrücklich zusätzlich das auf der Seite geladene neue Kapitelmodul.

Eine Freigabe als mathematisch und technisch geprüfte Überarbeitung ist damit begründet. Ob Hanna jeden Abschnitt selbstständig versteht, muss ihre Nutzung zeigen. Ein vollständiger neuer Originalmaterial-Abgleich bleibt offen.

## Nachprüfung der veränderbaren Bildfolge

Beim Ändern des geführten Reglers von 11 auf 24 wurde ein gemeinsamer DOM-Scope-Fehler sichtbar: Die Aktualisierung der Zahlenbeschriftung erfasste auch den separaten Regler der Bündelmaschine, für den kein zugehöriges Output-Feld existiert. Die Aktualisierung wird nun auf die eigenen geführten Steuerelemente begrenzt. Nachprüfung: Anzeige 24, sechs volle Vierergruppen, Rest 0 und Rücksetzen auf die Ausgangsaufgabe.
