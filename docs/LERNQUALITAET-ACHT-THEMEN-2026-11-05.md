# Lernqualität der übrigen acht Themen – Prüfung vom 05.11.2026

## Ergebnis und Prüfgrenze

**Die acht Themen erreichen den vereinbarten didaktischen Endstand noch nicht durchgehend.** Gute, teilweise sehr ausführliche Grundlagen stehen neben deutlich knapperen Musterbeispielen. Ein vollständiger Neuaufbau aller Inhalte ist nicht erforderlich. Die vorhandenen guten Lernwege und Bilder sollen erhalten bleiben.

Geprüfter Programmstand: `be5883e59f6178cf3e7a1f8db8e210ecab85aacb` auf `main`. „Größenvergleich von Dezimalzahlen“ ist Gegenstand der gesonderten Abnahme und hier ausgeschlossen.

Diese Prüfung umfasst die Bestandsaufnahme aller 30 Lernwege und 98 Musterbeispiele, die Durchsicht der grundlegenden Lernwege sowie die vertiefte Inhalts- und Codeprüfung kritischer Musterbeispiele und ihrer Bilddarstellung. Sie ist **keine neue unabhängige Einzelabnahme aller 493 Phasen**, kein erneuter vollständiger Abgleich aller Originalfotos und keine neue Bedienprüfung im Browser oder auf echten Geräten. Lernwirksamkeit für Hanna kann erst die selbstständige Bearbeitung einer passenden Schulaufgabe zeigen.

Bewertungsmaßstab: Erklärung und Bedeutung → begründete Regel → Erkennen des Aufgabentyps → eigene Entscheidung → passendes Bild → sichtbare Rechnung → fachliche Probe. Pro unterschiedlichem Aufgabentyp bleibt ein Musterbeispiel; zusätzliche Übungsreihen sind nicht vorgesehen.

## Bestandsaufnahme

| Thema | Lernwege | Lernphasen | Beispiele | Beispielphasen | Beispiele mit höchstens zwei Phasen |
|---|---:|---:|---:|---:|---:|
| Brüche und Anteile | 4 | 12 | 16 | 61 | 0 |
| Kürzen und Erweitern | 2 | 8 | 10 | 56 | 0 |
| Gemischte Zahlen | 3 | 11 | 8 | 26 | 0 |
| Brüche am Zahlenstrahl | 4 | 24 | 12 | 52 | 0 |
| Brüche als Geteilt-Aufgabe | 4 | 16 | 12 | 54 | 0 |
| Brüche vergleichen | 4 | 12 | 12 | 31 | 6 |
| Brüche und Kommazahlen | 4 | 11 | 11 | 23 | 9 |
| Mit Größen rechnen | 5 | 20 | 17 | 66 | 3 |
| **Gesamt** | **30** | **124** | **98** | **369** | **18** |

Eine geringe Phasenzahl ist für sich kein Qualitätsmangel. Entscheidend ist, ob mehrere neue Denkentscheidungen ohne ausreichende Herleitung zusammenfallen.

## Gemeinsame Befunde

1. **Der Einstieg ist noch nicht einheitlich ausreichend.** Den acht Themen fehlt eine vorgeschaltete Einführung mit Bedeutung, Regelbegründung und übersichtlicher Wahl des Vorgehens, wie sie beim Dezimalvergleich ergänzt wurde. Regeln und Worterklärungen stehen überwiegend im Register „Nachschlagen“. Die geführten Eingabewerkzeuge bei Größen und Kommazahlen helfen bei der Anwendung, ersetzen aber keine Einführung.
2. **Gespeicherter Text ist nicht automatisch sichtbarer Unterricht.** `course.js` zeigt im Einstieg nur den ersten Satz von `recognize`; die gespeicherten Absätze aus `intro` werden dort nicht vollständig ausgegeben. Deshalb müssen die tatsächlich sichtbaren Lerninformationen geprüft werden. Zusätze aus `decisionHtml`, `afterHtml` und Auswahlrückmeldungen sind dagegen vorhanden und gehören zur Bewertung dazu.
3. **Grundlagen und Transferfälle haben unterschiedliche Erklärungstiefe.** Besonders beim Bruchvergleich und bei Kommazahlen enthalten spätere Beispiele wieder mehrere Entscheidungen pro Aufdeckung. Die Lernenden brauchen dieselbe Unterstützung bei der Methodenwahl wie bei der ersten Grundaufgabe.
4. **Bilder brauchen eine fachlich passende Aufdeckfolge.** Nicht jedes Bild darf bereits die Einteilung oder Zwischenzahl verraten, über die gerade nachgedacht werden soll. Umgekehrt ist eine vorgegebene Einteilung sinnvoll, wenn gerade das Ablesen gelernt wird. Dies muss je Fall entschieden werden.
5. **Denkfrage und Rückmeldung müssen zusammenpassen.** Ein Klick auf „Bruch aufschreiben“ beantwortet keine Frage nach der Begründung eines Verfahrens. Eine offene Frage ist ausreichend, wenn die anschließende Erklärung genau diese Frage beantwortet; zwei Auswahlantworten sind kein Selbstzweck.

## 1. Brüche und Anteile

**Tragfähig:** Gleiche Teilstücke werden gezählt; der Unterschied zwischen Anteil und Ganzem wird in den Grundfällen nachvollziehbar gerechnet. Bei 3/4 von 32 Birnen führt der Weg über ein Viertel zu 24 Birnen. Bei 2/3 einer Klasse = 18 Kindern führt er über ein Drittel = 9 zum Ganzen = 27. Unterschiedliche Bezugsgrößen und ungefähre Angaben werden in anspruchsvolleren Beispielen bereits berücksichtigt.

**Offen:** Vor diesen Fällen fehlt eine gemeinsame Entscheidungshilfe: Was ist das Ganze? Welche Menge ist bekannt? Ist der Anteil oder das Ganze gesucht? Die Regel „erst durch unten/oben“ darf das Verständnis der einen Teilmenge nicht ersetzen.

**Konkrete Fälle:** Beispiel 12 legt die Gewinnverteilung nach dem Einsatz fest. Der sichtbare Satz „Wie im Buch … nach dem Einsatz“ ist stärker als die im Datensatz dokumentierte eigene Auslegung von „gerecht“. Die gewählte Verteilungsregel muss sichtbar als Annahme erkennbar sein; der nicht eingeblendete `intro`-Text reicht dafür nicht. Beim Pizza-Durchmesservergleich wird zusätzlich Flächenskalierung vorausgesetzt: optional kennzeichnen und den Faktor vier aus dem Bild herleiten. In den Verteilbildern aus `rechenbilder.js` die vorweggenommene Gruppierung mit bereits abgezählten Einzelmengen auf ihre Eignung als Ausgangsbild prüfen.

**Urteil:** Gute Basis; Einstieg, Methodenwahl und ausgewählte Transferfälle nacharbeiten.

## 2. Kürzen und Erweitern

**Tragfähig:** Dieses Kapitel bleibt ein wichtiger Maßstab. Beim Kürzen von 12/16 sind Versuche mit 2, 3 und 4 einschließlich Resten vorhanden. Beim vollständigen Kürzen wird begründet, weshalb bei 3 und 4 kein gemeinsamer Teiler größer als 1 bleibt. Auch wiederholtes Kürzen und die Suche nach einem Zielnenner sind ausführlich dargestellt. Diese Inhalte dürfen nicht durch kürzere Standardsätze ersetzt werden.

**Offen:** Die allgemeine Regel „Ohne Zielzahl: Du darfst zum Beispiel 2, 3 oder 4 wählen“ ausdrücklich dem **Erweitern** zuordnen. Beim Kürzen muss die Zahl beide Zahlen ohne Rest teilen. Vor den Beispielen Bedeutung und Unterschied beider Verfahren erklären; Aufgaben mit Zielzähler oder Zielnenner in einer kurzen Entscheidungshilfe unterscheiden. Einzelne Antwortoptionen stärker auf die gestellte Warum-Frage ausrichten.

**Urteil:** Weit ausgearbeitet; gezielte Präzisierungen und vorgeschaltete Einführung erforderlich.

## 3. Gemischte Zahlen

**Tragfähig:** Die Grundwege bilden vollständige Gruppen, bestimmen den Rest und übersetzen beide Richtungen. Bei 11/4 wird auch erklärt, weshalb drei Ganze zu viel wären. Bei 3 2/5 werden 15 Fünftel und die zusätzlichen zwei Fünftel getrennt erarbeitet. Nullrest und abschließendes Kürzen sind berücksichtigt.

**Offen:** Vorab ausdrücklich erklären, dass 2 1/3 die Summe 2 + 1/3 bedeutet. Bei negativen gemischten Zahlen die Bedeutung −(2 + 1/3) sichtbar machen. Die bereits vorhandene Erklärung des gemeinsamen Minuszeichens durch ein passendes Bild und die Abgrenzung zu −2 + 1/3 stützen. Lückenaufgaben nach gesuchtem Ganzen, Zähler oder Nenner erkennbar ordnen. In anspruchsvolleren Beispielen Gruppenzahl und Rest nicht gleichzeitig als neues Ergebnis aufdecken.

**Urteil:** Gute Grundwege; gezielte Ergänzung bei Schreibweise, Minus und Lückenaufgaben.

## 4. Brüche am Zahlenstrahl

**Tragfähig:** Besonders ausführliche Grundlagen. Eine Einheit, Abstände statt Striche, Schrittweite und Laufrichtung werden erklärt. Vier Lücken gegenüber fünf Begrenzungsstrichen sind ausdrücklich unterschieden. Der negative Lernweg zu −3/4 ist kleinschrittig; verschobene Ausschnitte werden berücksichtigt.

**Offen:** In den Zentimeterfällen werden nach dem ersten Punkt mehrere weitere Punkte gemeinsam in einer Tabelle aufgedeckt. Die Rechnung für einen neuartigen Punkt jeweils nachvollziehbar zeigen und erst danach zusammenfassen. Zahlenabstand und Papierlänge deutlich unterscheiden. Beim Mittelpunktbeispiel 12 fragt die letzte Phase nach der Prüfung gleicher Abstände, erklärt dort aber hauptsächlich vollständiges Kürzen. Die bereits vorhandene Abstandsprobe gehört direkt zur Frage. Beim Zählen von Zwischenzahlen mit geändertem Nenner die neue Einteilung gesondert begründen.

**Urteil:** Starke Grundlage; anspruchsvolle Transferfälle und eine Rückmeldungszuordnung nachschärfen.

## 5. Brüche als Geteilt-Aufgabe

**Tragfähig:** Drei Tafeln für vier Kinder werden sichtbar verteilt und zu 3/4 pro Kind zusammengeführt. Quotient und Bruch werden in beide Richtungen gelesen. Teilerfindung und Kürzen sind ergänzt. Division durch null wird mit der Multiplikationsprobe begründet; auch die Mehrdeutigkeit von 0 : 0 wird angesprochen.

**Offen:** Bedeutung von Gesamtmenge und Empfängerzahl vor der allgemeinen Schreibregel zusammenführen. Bei negativen Quotienten die Vorzeichenregel zusätzlich mit einer Umkehrrechnung begründen. Die Zahlenmengen ℕ, ℤ und ℚ als gesonderte Vertiefung mit erklärten Voraussetzungen einordnen; sie dürfen den Einstieg ins Verteilen nicht unnötig belasten.

**Urteil:** Gute Grundwege; Einstieg, Begründung der Vorzeichen und Abgrenzung der Vertiefung verbessern.

## 6. Brüche vergleichen

**Tragfähig:** Die Lernwege zu gleichen Nennern, gleichen Zählern, gemeinsamen Nennern und Gleichwertigkeit sind sinnvoll. Der gemeinsame Nenner wird im Grundweg über Vielfachenreihen gefunden. Die Regel für gleiche Zähler ist im Regeltext bereits auf positive Brüche beschränkt.

**Offen mit hoher Priorität:** Sechs der zwölf Beispiele haben höchstens zwei Phasen. Bei 3/4 gegenüber 3/8 werden Stückgröße, Anzahl und Urteil in einer Phase zusammengeführt. Auch −2/3 gegenüber −1/3 und das Sortieren von −1/2, 2/3 und 1 1/4 erfolgen jeweils in einer Phase. Gerade Vorzeichen und gemischte Zahlen verlangen eine begründete Methodenwahl.

Vorab eine einfache Entscheidungsfolge anbieten: Vorzeichen prüfen → besondere Lage zu 0 oder 1 nutzen → gleiche Nenner oder positive gleiche Zähler erkennen → gegebenenfalls gleichnamig machen. Beim Erweitern für Zwischenzahlen erklären, weshalb die gewählte feinere Einteilung genügend Möglichkeiten liefert. Negative Vergleiche zusätzlich am Zahlenstrahl prüfen.

**Urteil:** Grundlagen behalten; mehrere Musterbeispiele benötigen eine deutliche didaktische Vertiefung.

## 7. Brüche und Kommazahlen

**Tragfähig:** Vier getrennte Grundwege erklären Stellenwerte, das Erweitern auf einen Zehnernenner, Dezimalzahl als Bruch und Zahlen größer als eins. Der zusätzliche geführte Umrechner hilft bei der Anwendung. Periodenbilder zeigen tatsächlich wiederkehrende Divisionen mit Rest; diese Begründung fehlt also nicht vollständig.

**Offen mit hoher Priorität:** Neun der elf Beispiele haben höchstens zwei Phasen. Bei 3/4 erscheint der Faktor 25 zusammen mit 75/100; bei 800/2000 wird unmittelbar durch 200 gekürzt. Für Anfänger bleibt die Suche nach diesen Zahlen zu wenig angeleitet. Das Zusammenstellen von 0,75, 3/4, 6/8 und 0,750 bündelt mehrere Umwandlungen in einer Aufdeckung.

Stellenwerte zuerst erklären, dann Zielnenner und Faktor begründet finden. Bei Perioden den Übergang vom Rest zur nächsten Nachkommastelle erklären: Warum wird aus Rest 1 wieder eine Rechnung mit 10? Die vorhandene Restdarstellung beibehalten und auf den passenden Schritt verteilen. Schwierige Fälle mit 1/6 und 7/40 auf die gleichen begründeten Verfahren zurückführen. Bestehende Beispiele und neuen Umrechner auf dieselbe Erklärungstiefe bringen.

**Urteil:** Gute Hilfsmittel, aber uneinheitlicher Lernweg; deutliche Überarbeitung der Musterbeispiele erforderlich.

## 8. Mit Größen rechnen

**Tragfähig:** Getrennte Grundwege zu Länge, Masse, Zeit, Fläche und Körpern sind vorhanden. Die neuen geführten Umrechnungen sind besonders hilfreich. Die automatisierten Prüfungen kontrollieren alle 27 Aufgaben von Seite 19, Nummer 1–3. Flächen- und Raumeinheiten werden auch mit Bildern begründet; Zeit wird nicht pauschal wie eine Dezimaleinheit behandelt.

**Offen:** Eine gemeinsame Einführung muss Größe, Maßzahl und Einheit sowie die Wahl des Umrechnungsfaktors verbinden. Der Unterschied zwischen Länge, Fläche, Volumen und der Zeitumrechnung mit 60 muss vor der Anwendung erkennbar sein. Ältere kurze Beispiele an den neuen geführten Ablauf angleichen.

**Konkrete Fälle:** Bei „1,5 m = 150 □“ wird cm bereits im ersten Schritt genannt; die Suche nach der Einheit braucht eine echte Herleitung. Bei halben Kästchen 0,5 cm × 0,5 cm = 0,25 cm² durch ein Viertel des Einheitsquadrats begründen. Beim Quader mit 2 cm, 1,5 cm und 1 cm sind V = 3 cm³ und O = 13 cm² korrekt; die Probe sollte zusätzlich die sechs Flächen und die Zahlen prüfen, nicht nur die Einheiten. Mikroeinheiten, Flächenfiguren und Körperaufgaben als Vertiefungen mit Voraussetzungen klar von den grundlegenden Einheitenumrechnungen trennen.

**Urteil:** Deutliche Fortschritte bei den Umrechnungen; ältere Beispiele vereinheitlichen und geometrische Voraussetzungen erklären.

## Technische Gegenprüfung und nächste Abnahme

Am 05.11.2026 wurden am genannten Programmstand erneut alle **14 Testdateien** mit `node --test tests/*.test.cjs` ausgeführt: 14 bestanden, 0 fehlgeschlagen. Enthalten sind unter anderem strukturelle Kontrollen der neun Themen, 145 Lern-/Beispielansichten, 762 Bildzustände und die Ergebnisprüfungen der 27 Größenaufgaben. Dies belegt die jeweils getesteten Eigenschaften, nicht das selbstständige Verständnis eines Kindes.

Die frühere Browserprüfung mit 682 bestandenen Fällen gehört zum dokumentierten geprüften Basisstand. Sie wurde für diesen Inhaltsprüfbericht nicht erneut ausgeführt. Die Website wurde durch diesen Bericht nicht fachlich verändert.

**Reihenfolge der Nacharbeit:** zuerst Brüche vergleichen und Brüche/Kommazahlen; danach die uneinheitlichen Größenbeispiele; parallel die gemeinsamen Einführungen und anschließend die konkret benannten Transferfälle. Gute bestehende Bilder und detaillierte Rechenwege erhalten. Keine zusätzlichen Übungsserien und keine schematische Verdoppelung aller Antworten.

Für eine endgültige Freigabe muss pro Aufgabentyp nachgewiesen sein: Voraussetzungen erklärt; Vorgehen selbst wählbar; jede neue Entscheidung begründet; Ausgangsbild ohne vorweggenommene Lösung; passendes Folgebild; schulübliche Rechnung; verständliche Fehlererklärung; fachliche Probe. Danach Browser- und Mobilprüfung sowie mindestens eine selbstständig gelöste passende Schulaufgabe durch Hanna. Erst diese letzte Beobachtung kann zeigen, an welcher Stelle sie tatsächlich noch Unterstützung braucht.
