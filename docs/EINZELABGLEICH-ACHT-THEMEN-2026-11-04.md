# Fallregister und vorbereitender Einzelabgleich – acht verbleibende Themen

**Stand 04.11.2026. Status: Fallregister mit Codeprüfung, thematischer Schulquellenzuordnung und konkreten Änderungsaufträgen. Kein abgeschlossener Originalbild-Einzelbeweis und keine Freigabe.**

Dieses Dokument ergänzt die verbindliche Gesamtbauvorlage und den bereits erstellten Einzelabgleich für vier Lernwege und zwölf Beispiele von „Brüche am Zahlenstrahl“. Die Lernseiten bleiben unverändert.

## Umfang und Vorgehen

- Aktuelle Themen aus `course-data.js`; bei **Gemischte Zahlen** und **Brüche als Geteilt-Aufgabe** die tatsächlich überschreibenden Kapitelmodule `gemischt-kapitel.js` beziehungsweise `quotienten-kapitel.js` verwendet.
- **30 Lernwege und 99 Beispiele** einzeln mit ID erfasst. Zusammen mit Zahlenstrahl: **34 Lernwege und 111 Beispiele**.
- Als Schulbasis dient `SCHULGRUNDLAGE-MATHE-KLASSE6-2026-11-04.md`: Schulbuch S. 6–33, 25 ergänzende Heft-/Arbeitsblattfotos. Die Seitenangaben in den nachfolgenden Tabellen sind **zunächst Themen-/Aufgabentypzuordnungen**. Ohne direkten Bildabgleich eines Beispiels ist keine exakte Buch-Aufgabennummer behauptet.
- Für jeden Fall erfasst: Aufgabentyp, zugehörige Schulquellenfamilie, fachlicher Prüf-/Ergänzungsbedarf, mögliche Doppelung, konkret notwendige Erklär-/Bildänderung.
- Prüfhinweis: Die früher im Code `course-data.js` stehenden Varianten von Gemischte Zahlen und Quotienten sind **nicht der wirksame Anzeigeinhalt**; das gleiche gilt für Zahlenstrahl.

## Arbeitsdefinitionen

**Schulischer Typ** = Themenbezug durch Buch-/Heftmatrix, aber wort- und zahlengetreue Einzelprüfung noch offen. **Heftbelegt** = Verfahren/Methodik in der Heftquelle nachgewiesen, konkretes Beispiel nicht automatisch identisch. **Zusatz-/Transfertyp** = nicht genügend direkt belegt; vor dem Umbau schulische Notwendigkeit und Niveau klären.

**Kein pauschales Dublettenurteil:** In mehreren Kapiteln nutzen „Lernen“ und „Beispiele“ gleiche Fall-IDs, teilweise aber bereits eigene `learning`-Datensätze. Erst Aufgabenstellung, Lernfunktion, Zahlen und Lösungssichtbarkeit vergleichen.

**Vorbedingung jeder Programmierung:** Eine Originalquelle für Aufgabe/Schreibweise belegen; richtige und ungeeignete Denkwahl begründen; bei jedem echten Denkschritt definieren, was bekannt ist, was sichtbar wird, was verdeckt bleibt und wie Hanna prüft.

---
## Brüche und Anteile

**Schulrahmen:** Buch S. 6–9; ergänzende Heftquellen: 232105, 232109, 232114, 232121–232141. **Fachlicher Grundstandard:** Gleich große Teile und korrektes Ganzes; erst eine Teilmenge, dann gewünschte Teile beziehungsweise bei Rückwärtsaufgaben erst ein Teil und danach das Ganze.


### Lernwege (4)

- **L1 – Welcher Bruch ist gefärbt?**: Ganze Fläche erkennen → gleiche Teile → gefärbte Teile; falsche Stückgröße erkennen. **Quelle:** Themenrahmen S. 6–9. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L8 – Wie viele Kästchen färbst du?**: Selbst färben: Teilzahl → Gruppenwert → fünf von sechs Gruppen; Modell nicht vorab einfärben. **Quelle:** Themenrahmen S. 6–9. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L2 – Wie viele Birnen sind das?**: Ganzes bekannt → ein Teil → gesuchter Anteil; nicht durch Zähler zuerst teilen. **Quelle:** Themenrahmen S. 6–9. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L3 – Wie viele Kinder hat die Klasse?**: Anteil bekannt → ein Teil → alle Teile; bekannten Anteil nicht für Ganzes halten. **Quelle:** Themenrahmen S. 6–9. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (16)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **1** Welcher Bruch ist gefärbt? | S. 6–7; Schulischer Typ, Einzelaufgabe noch prüfen | Bezug auf EIN Ganzes und gleich große Felder vor Zähler/Nenner prüfen. | Lernen 1: anderes Beispiel nur bei eigener Anwendung. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Welcher Teil ist gefärbt? | S. 7; Schulischer Typ, Einzelaufgabe noch prüfen | Zwei halbe Kästchen zu einer ganzen Fläche kombinieren, nicht einfach zwei Kästchen zählen. | B1 gleiche Frage, anderes Flächenmodell. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **14** Wie viele Würfel sind gefärbt? | S. 7; Schulischer Typ, Einzelaufgabe noch prüfen | Würfel als gleich große Einheiten und Rest sichtbar kennzeichnen. | B1 Flächenanteil; 3D-Einheiten gesondert prüfen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Wie viele Kästchen färbst du? | S. 7; Schulischer Typ, Einzelaufgabe noch prüfen | Färben muss vor Musterlösung erfolgen; fünf von sechs Gruppen à drei Kästchen. | Lernen 8: Selbstfärben und Nachsehen auseinanderhalten. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **2** Wie viele Birnen sind das? | S. 7–8; Im Heft als Verfahren belegt; Zahlenvergleich noch prüfen | 60 Birnen zuerst in Drittel teilen, anschließend zwei Teile wählen. | Lernen 2: im Beispiel neue Daten nutzen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Wie viele Minuten sind das? | S. 7–8; Schulischer Typ, Einzelaufgabe noch prüfen | Erst Stunde=60 min und ein Sechstel bestimmen; Einheit durchgehend behalten. | B2 gleicher Anteilsweg, anderes Ganzes/andere Maßeinheit. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **13** Wie viele Liter sind im Tank? | S. 8; Schulischer Typ, Einzelaufgabe noch prüfen | Tankanzeige: volle Tankmenge, Zeigerposition und verbleibenden Inhalt auseinanderhalten. | B2 Anteilsmenge; Skalenbild erklärt zusätzliche Entscheidung. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Wie viele Kinder hat die Klasse? | S. 9; Im Heft als Verfahren belegt; Zahlenvergleich noch prüfen | Gegeben sind 3/4=21 Kinder, nicht die ganze Klasse; erst Viertel, dann alle vier. | Lernen 3: eigenes Zahlenbeispiel abgleichen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Wie groß ist die ganze Figur? | S. 9; Schulischer Typ, Einzelaufgabe noch prüfen | Gefärbte 12 Kästchen sind nur 3/4; fehlendes Ganzes bildlich aus 1/4 ableiten. | B3 Rückwärtsaufgabe, anderes Bild. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Wie viele Fische bleiben übrig? | S. 8–9; Schulischer Typ, Einzelaufgabe noch prüfen | Drei Teilmengen korrekt vom gesamten Fischbestand abziehen; Rest als Bruch. | Mehrere einfache Anteilsrechnungen kombinieren, nicht doppelt erklären. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **10** Wie schwer war der Teig vorher? | S. 9; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | Originalbezug für Brot-/Teig-Verlustanteil prüfen; nach 1/5 Verlust verbleiben 4/5. | B3 Rückwärtsaufgabe mit Restanteil; Differenz begründen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **16** Wie viel Zucker und wie viele Eier? | S. 7–9; Schulischer Typ, Einzelaufgabe noch prüfen | Zucker zuerst in g bringen; 3/20 von 2 kg und 2/5 von 10 Eiern getrennt. | B2 Anteil bestimmen; unterschiedliche Einheiten. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **11** Ein anderer Teil derselben Zahl | S. 9; Im Heft als Verfahren belegt; Zahlenvergleich noch prüfen | 2/3=450 zuerst in 1/3 und ganzes umformen, erst dann 2/5 bestimmen. | B3 erst Ganzes ermitteln, danach anderer Anteil. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **12** Wie teilen Nina und ihre Mutter den Gewinn? | S. 9; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | Proportionaler Gewinn 2 € zu 10 € als Verhältnis zum gesamten Einsatz begründen; Quelle prüfen. | Neue Fairness-/Verhältnisfrage vs Anteil am Ganzen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Welches Pizzastück ist größer? | S. 7–9; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | Pizza-Durchmesser allein erlaubt Vergleich von Flächen nicht durch lineares Halbieren; mögliche Flächenrechnung über Buchniveau prüfen. | B2 Anteil, aber mit Flächenmaß/Geometrie. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **15** Ein Stück mehr oder weniger | S. 8–9; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | Prozent-/Veränderungsdenken vermeiden: zweiter Sprung 1/4 länger, dritter relativ zum zweiten oder ersten? Aufgabenwortlaut prüfen. | B10 Rest/Bezug einer veränderten Menge. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.


## Kürzen und Erweitern

**Schulrahmen:** Buch S. 10–12; ergänzende Heftquellen: 232145, 232156, 232202. **Fachlicher Grundstandard:** Ein und dieselbe Fläche; Zähler und Nenner mit genau demselben Faktor vervielfachen oder teilen; Teilbarkeit prüfen.


### Lernwege (2)

- **L1 – Mit einer bestimmten Zahl erweitern**: Wertgleichheit am selben Ganzen → Faktor bestimmen → oben und unten gleiche Multiplikation. **Quelle:** Themenrahmen S. 10–12. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L2 – Kürzen: oben und unten teilen**: Beide Zahlen auf gemeinsamen Teiler prüfen → vollständig kürzen → gleiche Fläche. **Quelle:** Themenrahmen S. 10–12. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (10)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **1** Mit einer bestimmten Zahl erweitern | S. 10–11; Schulischer Typ, Einzelaufgabe noch prüfen | 3/5 mit 2: gleich großes Ganzes und beide Zahlen mit 2, Ergebnis noch nicht vorher zeigen. | Lernen 1 vorhandene Lern-Override beachten. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Welche Malzahl wurde verwendet? | S. 11; Schulischer Typ, Einzelaufgabe noch prüfen | Faktor aus oben UND unten ableiten; falschen Einzelfaktor sichtbar widerlegen. | B1 Erweitern mit vorgegebenem Faktor; hier Faktor suchen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Noch einmal kürzen | S. 12; Schulischer Typ, Einzelaufgabe noch prüfen | 18/24 vollständig kürzen; mehrere zulässige Zwischenwege erlauben. | Lernen 2: eigenständige Anwendung, kein starrer Musterteiler. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Durch welche Zahlen kannst du teilen? | S. 12; Schulischer Typ, Einzelaufgabe noch prüfen | Alle gemeinsamen Teiler von 18/30 sauber unterscheiden von vollständig gekürzt. | B3 Vollständig kürzen; mehrere Wege zulassen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Welche Zahl fehlt oben? | S. 11; Schulischer Typ, Einzelaufgabe noch prüfen | 2/5=□/20: fehlende Zahl erst nach Faktor 4 aufdecken. | B5 ähnliche Lückenstelle, aber oben gesucht. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Welche Zahl fehlt unten? | S. 11; Schulischer Typ, Einzelaufgabe noch prüfen | 3/4=15/□: unterer Wert folgt aus demselben Faktor 5. | B4 fehlender Zähler, anderer gesuchter Ort. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **10** Lücke im ersten Bruch | S. 11; Schulischer Typ, Einzelaufgabe noch prüfen | Lücke im ersten Bruch: Richtung rückwärts bestimmen, nicht unbemerkt denselben Faktor falsch anwenden. | B4/B5; Schwierigkeit gezielt abgrenzen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Sind beide Brüche gleich viel? | S. 10–11; Schulischer Typ, Einzelaufgabe noch prüfen | 3/4 und 6/8 mit identischer Fläche visualisieren; keine voreilige Ungleichheit wegen anderer Zahlen. | B1/B3 Gleichwertigkeitskontrolle statt nur umformen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **11** Gemeinsamen Nenner finden | S. 11–12; Schulischer Typ, Einzelaufgabe noch prüfen | Gemeinsamen Nenner begründen; nicht als neuen Vergleichstrick vorziehen. | Kapitel Vergleichen: nur nötige Vorarbeit hier. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Unten soll 30 stehen | S. 11–12; Schulischer Typ, Einzelaufgabe noch prüfen | 12/18 und −4/6 mit Nenner 30: zuerst auf 2/3 bzw −2/3 kürzen, dann ×10; Vorzeichen richtig erhalten. | B11 gemeinsamer Nenner, zusätzlicher Kürzungsschritt. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.


## Gemischte Zahlen

**Schulrahmen:** Buch S. 13–15; ergänzende Heftquellen: 232206, 232210, 232212. **Fachlicher Grundstandard:** Ganze Streifen bilden, Rest übrig lassen, gemischte Zahl und unechten Bruch wechselseitig begründen; Minus gilt für den ganzen Wert.


### Lernwege (3)

- **L101 – Was bedeutet eine gemischte Zahl?**: Ganze Streifen und unvollständige Teilstreifen unterscheiden. **Quelle:** Themenrahmen S. 13–15. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L1 – Bruch → gemischte Zahl**: Unechten Bruch in vollständige Gruppen und Rest aufteilen. **Quelle:** Themenrahmen S. 13–15. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L2 – Gemischte Zahl → Bruch**: Jedes Ganze zu n Teilstücken → alle Teilstücke addieren. **Quelle:** Themenrahmen S. 13–15. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (8)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **10** Aus dem Bild die gemischte Zahl ablesen | S. 13–15; Im Heft als Verfahren belegt; Zahlenvergleich noch prüfen | Bild zeigt 2 volle Streifen + 1/5; ein Ganzes als ein Streifen festhalten. | Lernen 101 und B10 gleiches Bildprinzip, verschiedene Zahlen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Ohne Rest: eine ganze Zahl | S. 13; Schulischer Typ, Einzelaufgabe noch prüfen | 12/4 ohne Rest zu ganzer Zahl, nicht künstlich als gemischte Zahl mit Rest 0. | Lernen 1 unecht mit Rest. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Lücke vor dem Bruch | S. 13–15; Schulischer Typ, Einzelaufgabe noch prüfen | Fehlende ganze Zahl aus 17/5 − 2/5 ableiten, danach durch 5. | Lernen 1 Rückwärtsübertragung. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Lücke im Zähler des Restbruchs | S. 13–15; Schulischer Typ, Einzelaufgabe noch prüfen | 19/6=3 □/6: erst 3×6, dann Rest. | B5 andere Lückenposition. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Lücke im Nenner | S. 13–15; Schulischer Typ, Einzelaufgabe noch prüfen | 2 1/4 =9/□: Nenner bleibt die Teilgröße, nicht die ganze Zahl 2. | B6 Lückenprinzip. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Den Restbruch noch kürzen | S. 13–15; Schulischer Typ, Einzelaufgabe noch prüfen | 14/6=2 2/6=2 1/3: nur Restbruch kürzen, ganze Teile unangetastet. | Kapitel Kürzen und Erweitern (Verbindung, nicht doppelte ganze Lehre). | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Negativen Bruch umwandeln | S. 13–15; Im Heft als Verfahren belegt; Zahlenvergleich noch prüfen | Minus gilt für die gesamte gemischte Zahl, nicht nur den ganzen Anteil. | B9 Umkehrung und Kapitel Zahlenstrahl. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Negative gemischte Zahl → Bruch | S. 13–15; Im Heft als Verfahren belegt; Zahlenvergleich noch prüfen | −1 2/3 zunächst positiven Betrag umwandeln, Minus danach davor. | B4 umgekehrte Richtung; behalten. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.


## Brüche als Geteilt-Aufgabe

**Schulrahmen:** Buch S. 16–18; ergänzende Heftquellen: primär Buchseiten 16–18. **Fachlicher Grundstandard:** Dividend/Divisor richtig zuordnen, teilbare Menge und ganze Gegenstände unterscheiden; Division ↔ Bruch mit unvertauschter Reihenfolge.


### Lernwege (4)

- **L101 – Gerecht verteilen: Was bedeutet drei geteilt durch vier?**: Teilbare Gesamtmenge → Empfänger → gleich große Teilstücke → Bruchwert. **Quelle:** Themenrahmen S. 16–18. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L1 – Eine Geteilt-Aufgabe als Bruch schreiben**: Division als Bruch schreiben: erste Zahl nach oben, zweite nach unten. **Quelle:** Themenrahmen S. 16–18. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L103 – Einen Bruch als Geteilt-Aufgabe lesen**: Bruch als Division lesen: Zähler zuerst, Nenner danach. **Quelle:** Themenrahmen S. 16–18. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L104 – Ein negatives Ergebnis berechnen**: Gleiches/verschiedenes Vorzeichen vor dem Rechnen bestimmen. **Quelle:** Themenrahmen S. 16–18. **Abgrenzung:** Eigenständiger Lernweg neben den Musterbeispielen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (12)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **2** Viele Pizzen gerecht verteilen | S. 16; Schulischer Typ, Einzelaufgabe noch prüfen | 8 Pizzen auf 12 Kinder: alle Stücke gleich groß, pro Kind 2/3; keine falsche Reihenfolge. | Lernen 101, andere konkrete Verteilung. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Die Verteilung ergibt ganze Einheiten | S. 16–17; Schulischer Typ, Einzelaufgabe noch prüfen | 6 Tafeln auf 3 Kinder gibt 2 Ganze, keine künstlich verbleibenden Bruchteile. | B2 mit Restbrüchen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Null wird verteilt | S. 16–18; Schulischer Typ, Einzelaufgabe noch prüfen | 0:5=0: Null als Menge und 5 als zulässige Empfängerzahl. | B9 5:0; nicht verwechseln. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **13** Warum die Reihenfolge wichtig ist | S. 16–17; Schulischer Typ, Einzelaufgabe noch prüfen | 3:4 und 4:3 führen zu verschiedenen Ergebnissen; Tauschregel nicht verwenden. | Lernen 1 Bruchzuordnung; Gegenbeispiel. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Eine Strecke teilen und die Einheit umrechnen | S. 17–18; Schulischer Typ, Einzelaufgabe noch prüfen | 6 km durch 20: Kilometer zu Meter und 300 m=0,3 km in Heftschreibweise prüfen. | Kapitel Größen: die Verteilung selbst ist der Grundgedanke. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **10** Die zu verteilende Menge fehlt | S. 17–18; Schulischer Typ, Einzelaufgabe noch prüfen | □:6=5/6 rückwärts lösen; warum 6 Empfänger und 5 Ganze korrekt sind. | B11 unbekannter Divisor, andere Lücke. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **11** Die Anzahl der Empfänger fehlt | S. 17–18; Schulischer Typ, Einzelaufgabe noch prüfen | 12:□=3 Gruppenzahl vier begründen; Rückprobe 4×3=12. | B10 unbekannte Ausgangsmenge. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **12** Ganze Gegenstände oder teilbare Mengen | S. 16–17; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | 7 ganze Spielsteine vs 7 teilbare Tafeln: Rest 1 und 2 1/3 sachgerecht unterscheiden; exakte Quelle prüfen. | B2 Teilbarkeit ist neues Merkmal. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Verschiedene und gleiche Vorzeichen | S. 17; Schulischer Typ, Einzelaufgabe noch prüfen | 15:(−12) und (−15):(−12) zuerst Vorzeichen, danach gleiche Beträge kürzen. | Lernen 104 Vorzeichen, Transfer. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Ein Minus oben, unten oder vor dem Bruch | S. 17; Schulischer Typ, Einzelaufgabe noch prüfen | Ein/einzelnes bzw zwei Minuszeichen und äußeres Klammerminus auseinanderhalten. | B3 Vorzeichen; längere Form. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Warum Teilen durch null nicht definiert ist | S. 18; Schulischer Typ, Einzelaufgabe noch prüfen | 5:0 ohne Ergebnis und 0:0 ohne eindeutiges Ergebnis über Probe erklären. | B8 0:5 als Gegenfall. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Bruchwerte den Zahlenmengen zuordnen | S. 16–18; Schulischer Typ, Einzelaufgabe noch prüfen | −5, 1/8, 6, 10/5 in N, Z, Q korrekt zuordnen; Wert vor Schreibweise. | Eigenständiger Begriffsfall; Buchbeleg Zahlenmengen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.


## Brüche vergleichen

**Schulrahmen:** Buch S. 19–21; ergänzende Heftquellen: 232153, 232216, 232225. **Fachlicher Grundstandard:** Vorher Vergleichsart wählen: gleicher Nenner/Zähler, Erweitern, 0/1/ganze Zahl, Minus; gleiche ganze Bezugsmenge.


### Lernwege (4)

- **L1 – Unten steht dieselbe Zahl**: Gleiche Nenner: gleich große Stücke, höhere Stückzahl gewinnt. **Quelle:** Themenrahmen S. 19–21. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L2 – Oben steht dieselbe Zahl**: Gleiche Zähler: kleinere Teilstücke bei größerem Nenner. **Quelle:** Themenrahmen S. 19–21. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L3 – Oben und unten stehen andere Zahlen**: Unterschiedliche Nenner: Vergleichsstrategie wählen, passende Teilung begründen. **Quelle:** Themenrahmen S. 19–21. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L4 – Sehen anders aus – sind sie gleich viel?**: Wertgleichheit: anderes Aussehen, derselbe Flächenanteil. **Quelle:** Themenrahmen S. 19–21. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (12)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **1** Unten steht dieselbe Zahl | S. 19; Schulischer Typ, Einzelaufgabe noch prüfen | Gleicher Nenner: 3/7 und 5/7 mit gleich großen Siebteln zeigen. | Lernen 1: andere Beispieldaten, nicht identische Aufgabe. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **2** Oben steht dieselbe Zahl | S. 19; Schulischer Typ, Einzelaufgabe noch prüfen | Gleicher Zähler: 3/4 gegen 3/8; bei gleicher Zahl Teile sind Viertel größer. | Lernen 2 mit eigenem Zahlenpaar. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Oben und unten stehen andere Zahlen | S. 19–20; Schulischer Typ, Einzelaufgabe noch prüfen | 2/3 und 3/4 durch gemeinsamen Nenner 12 vergleichen, nicht nur Zähler. | Lernen 3 und Kapitel Erweitern; Vergleichsentscheidung hervorheben. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Sehen anders aus – sind sie gleich viel? | S. 19; Schulischer Typ, Einzelaufgabe noch prüfen | 2/3=4/6 als gleiche Menge begründen, trotz anderer Ziffern. | Lernen 4 und Kapitel Erweitern, eigener Vergleichszweck. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Mit der Zahl 2 vergleichen | S. 19–21; Schulischer Typ, Einzelaufgabe noch prüfen | 11/6 vs 15/7 mit 2 vergleichen; beide liegen unter/über? 11/6&lt;2, 15/7&gt;2. | B3 gleiche Methode? Hier Vergleich mit ganzer Zahl. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Welche Zahl passt dazwischen? | S. 21; Schulischer Typ, Einzelaufgabe noch prüfen | 2/5 &lt;□/5&lt;4/5: nur Zähler 3 möglich; Grenzwerte nicht zählen. | B10 Zwischenzahlen ohne festen Nenner, eigener Typ. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Bei welchen Losen ist der Gewinnanteil größer? | S. 20; Schulischer Typ, Einzelaufgabe noch prüfen | 4/16 gegenüber 3/10 als Losanteile auf gleiche Bezugsgröße bringen. | B3 gemeinsamer Nenner, aber Textaufgabe mit verschiedenen Ganzen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Brüche mit Minus vergleichen | S. 19–21; Schulischer Typ, Einzelaufgabe noch prüfen | −2/3 vs −1/3: links kleiner; Minus nicht einfach ignorieren. | B11 zwei negative unechte Brüche. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **11** Zwei Brüche mit Minus | S. 21; Schulischer Typ, Einzelaufgabe noch prüfen | −4/3 vs −5/4: korrektes Ordnen negativer Werte und Nennerangleichung. | B5 gleiche Vorzeichenfalle, andere Nenner. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Mit der kleinsten Zahl beginnen | S. 21; Schulischer Typ, Einzelaufgabe noch prüfen | 2/3, −1/2, 1 1/4: vom Negativen zum größten, gemischte Zahl lesen. | B5 negative Ordnung, Transfer. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **10** Drei Zahlen dazwischen finden | S. 21; Schulischer Typ, Einzelaufgabe noch prüfen | Drei Zwischenzahlen zwischen 3/5 und 4/5, anschließend Einteilung verfeinern. | B7 fester Nenner; hier viele mögliche Nenner. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **12** Welche Zahlen passen oben? | S. 21; Schulischer Typ, Einzelaufgabe noch prüfen | −1&lt;□/10&lt;0: Zähler −9 bis −1; geschlossene Grenzwerte vermeiden. | B7 Lücken-Zähler mit negativen Zahlen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.


## Brüche und Kommazahlen

**Schulrahmen:** Buch S. 22–24; ergänzende Heftquellen: 232233, 232238, 232243. **Fachlicher Grundstandard:** Stellenwert Zehntel/Hundertstel/Tausendstel vor Kommazahl; gleiche Werte als unterschiedliche Schreibweisen begreifen.


### Lernwege (4)

- **L1 – Ein Bruch wird eine Kommazahl**: Zehntel/Hundertstel/Tausendstel als Stellenwerte sichtbar machen. **Quelle:** Themenrahmen S. 22–24. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L2 – Erst erweitern, dann als Kommazahl schreiben**: Bruch erst auf Zehnerpotenz-Nenner bringen, danach Kommazahl. **Quelle:** Themenrahmen S. 22–24. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L4 – Eine Kommazahl wird ein Bruch**: Kommazahl in Stellenwertbrüche auflösen und gegebenenfalls kürzen. **Quelle:** Themenrahmen S. 22–24. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L6 – Kommazahl größer als 1**: Dezimalzahl über eins korrekt als gemischter/unechter Bruch. **Quelle:** Themenrahmen S. 22–24. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (11)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **1** Ein Bruch wird eine Kommazahl | S. 22–23; Schulischer Typ, Einzelaufgabe noch prüfen | 7/100 als 0,07, Stellenwert und führende 0 begründen. | Lernen 1 andere Zahlen/Stellenwerte. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **2** Erst erweitern, dann als Kommazahl schreiben | S. 23–24; Schulischer Typ, Einzelaufgabe noch prüfen | 3/4 über 75/100 zu 0,75, keine Dezimalzahl ohne Wertgleichheit. | Lernen 2 und Kapitel Kürzen/Erweitern. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Eine Kommazahl wird ein Bruch | S. 23–24; Schulischer Typ, Einzelaufgabe noch prüfen | 0,45=45/100=9/20; gleiches Ganzes beim Kürzen sichtbar. | Lernen 4 umgekehrte Richtung. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Kommazahl größer als 1 | S. 22–23; Schulischer Typ, Einzelaufgabe noch prüfen | 1,2=12/10=6/5 oder 1 1/5; Aufgabenform vor Endform klären. | Lernen 6 größer als 1. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Erst kürzen, dann als Kommazahl schreiben | S. 24; Schulischer Typ, Einzelaufgabe noch prüfen | 800/2000 zunächst kürzen zu 4/10=0,4; plausiblen Wert prüfen. | B2 anderer erlaubter Weg zur Zehnerpotenz. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Welche Zahl fehlt? | S. 23–24; Schulischer Typ, Einzelaufgabe noch prüfen | □/20=0,35: vor Zähler den Zielnenner 100 bestimmen, Ergebnis 7. | Kapitel Kürzen/Erweitern in neuer Darstellungsform. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Welche Zahlen sind gleich viel? | S. 22–24; Schulischer Typ, Einzelaufgabe noch prüfen | 0,75,3/4,6/8,0,750 sind gleich; 3/8 nicht, Endnullen nicht als Wertänderung. | B2 Gleichwertigkeit und Endnullen, sinnvoller Transfer. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Kommazahl mit Minus | S. 23; Schulischer Typ, Einzelaufgabe noch prüfen | −0,15 als −15/100=−3/20; Vorzeichen der gesamten Zahl. | B4 Rückrichtung mit Minus. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Hören die Ziffern nach dem Komma auf? | S. 24; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | 1/3 unendliche periodische Dezimaldarstellung; Buchbezug und Schwierigkeitsgrad prüfen. | B10 Periodizität/Endlichkeit, Zusatzstoffrisiko. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **10** Bei welchen Brüchen hören die Ziffern auf? | S. 24; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | 3/12=0,25; 1/6 periodisch; 7/40=0,175; Regel zu Endlichkeit nur im nachgewiesenen Umfang. | B7 Endlichkeit; mögliches Vertiefungsdoppel. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **11** Wo sind beide gestartet? | S. 23–24; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | Zwei entgegengesetzte Sprungfolgen und gemeinsamen Startwert prüfen: eher Zahlengerade statt Umwandlungsgrundprinzip. | Kapitel Zahlenstrahl; Aufgabenfamilie fachlich einordnen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.


## Kommazahlen vergleichen

**Schulrahmen:** Buch S. 25–27; ergänzende Heftquellen: vorrangig Schulbuch 25–27. **Fachlicher Grundstandard:** Von links nach rechts Stellenwerte vergleichen; Endnullen wertneutral, echte negative Vergleiche und passende Zwischenzahlen.


### Lernwege (4)

- **L2 – Nullen am Ende nach dem Komma**: Endnullen wertneutral: gleiche Markierung trotz mehr Ziffern. **Quelle:** Themenrahmen S. 25–27. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L1 – Ziffer für Ziffer vergleichen**: Ab der ersten unterschiedlichen Stelle begründet vergleichen. **Quelle:** Themenrahmen S. 25–27. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L7 – Mit der kleinsten Zahl beginnen**: Mehrere Werte auf gleiche Stellenanzahl ausrichten, negative Vorzeichen beachten. **Quelle:** Themenrahmen S. 25–27. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L6 – Eine Zahl dazwischen finden**: Zwischenwerte durch feinere Nachkommastellen finden. **Quelle:** Themenrahmen S. 25–27. **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (13)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **2** Nullen am Ende nach dem Komma | S. 25; Schulischer Typ, Einzelaufgabe noch prüfen | 0,6=0,600: Endnullen verändern Wert nicht; Einheiten/Stellenwerte beibehalten. | Lernen 2 eigener Beispielsatz nötig. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **1** Ziffer für Ziffer vergleichen | S. 25; Schulischer Typ, Einzelaufgabe noch prüfen | 0,43 vs 0,418: auf 0,430 vs 0,418 ausrichten, erste unterschiedliche Stelle entscheidet. | Lernen 1 andere Zahlen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Mit der kleinsten Zahl beginnen | S. 25–26; Schulischer Typ, Einzelaufgabe noch prüfen | 0,506; 0,56; 0,5 nach Stellenwert von klein nach groß anordnen. | Lernen 7 nicht nur Ergebnisliste. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Einen Bruch mit einer Kommazahl vergleichen | S. 26; Schulischer Typ, Einzelaufgabe noch prüfen | 3/5=0,6, danach 0,58 vergleichen; Umwandlung vor Vergleich. | Kapitel Bruch/Dezimal, hier nur Vergleichsentscheidung. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Welche Ziffer fehlt? | S. 26; Schulischer Typ, Einzelaufgabe noch prüfen | 0,4□&lt;0,43: Ziffern 0,1,2; 3 ist Gleichheit und unzulässig. | B12 Lückenvergleich, andere Stellenlage. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Eine Zahl dazwischen finden | S. 26–27; Schulischer Typ, Einzelaufgabe noch prüfen | Zwischen 0,4 und 0,5 mehrere Möglichkeiten; erst Zahlenskala feiner teilen. | Lernen 6 andere Werte. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Wer läuft weiter? | S. 25–26; Schulischer Typ, Einzelaufgabe noch prüfen | 1,205 km &lt; 1,25 km; gleiche Einheit und Stellenwert vergleichen. | Kapitel Größen nur als Sachkontext. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Kommazahlen mit Minus | S. 25; Schulischer Typ, Einzelaufgabe noch prüfen | −0,7&lt;−0,65; Richtung links von Null ausdrücklich zeigen. | B10 weitere negative Lage. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Alle Zahlen dazwischen finden | S. 26–27; Schulischer Typ, Einzelaufgabe noch prüfen | Genau zwei Nachkommastellen: 0,96 bis 1,04 (9 Werte); Grenzen ausgeschlossen. | B6 nur eine Zwischenzahl, hier alle im Raster. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **10** Welche Zahl liegt in der Mitte? | S. 27; Schulischer Typ, Einzelaufgabe noch prüfen | Mitte von −0,41 bis −0,40 = −0,405; höhere Dezimalstelle gezielt bilden. | Kapitel Zahlenstrahl-Mitte, eigener Dezimalfall. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **11** Zahlen aus Ziffernkarten legen | S. 27; Schulischer Typ, Einzelaufgabe noch prüfen | Ziffernkarten 8,0,5,4: zulässige Stellenverteilung vor größter/kleinster Zahl prüfen. | B7 ordnen, aber kombinatorischer Fall. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **12** Welche Ziffer passt? | S. 26–27; Schulischer Typ, Einzelaufgabe noch prüfen | 13/20=0,65; 0,□9&lt;0,65, passende Ziffern 0–5; Gegenbeispiele erläutern. | B5 Lücken, hier Bruch gegen Kommazahl. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **13** Das Muster in der Tabelle finden | S. 27; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | Tabellenregel 2,3;2,9;2,27 etc. und fünfte Zeile/Spalte: Originalabbild und Regel genau prüfen. | Eigenständiges Tabellenmuster, keine gewöhnliche Stellenwertvergleichsaufgabe. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.


## Mit Größen rechnen

**Schulrahmen:** Buch S. 28–30 (Training 31); ergänzende Heftquellen: vorrangig Schulbuch 28–30. **Fachlicher Grundstandard:** Größenart/Einheit und Richtung zuerst; Faktoren nur mit richtiger Einheit, Flächen- und Raumeinheiten nicht verwechseln.


### Lernwege (5)

- **L1 – Meter in Zentimeter**: Ausgangs- und Zieleinheit festlegen; bei cm mehr Einheiten. **Quelle:** Themenrahmen S. 28–30 (Training 31). **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L2 – Kilogramm in Gramm**: Umrechnungsrichtung bei Masse durch 1000 begründen. **Quelle:** Themenrahmen S. 28–30 (Training 31). **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L12 – Stunden, Minuten und Sekunden**: Zeit: 60 als Faktor, nicht Dezimalstellen ohne Bedeutung verschieben. **Quelle:** Themenrahmen S. 28–30 (Training 31). **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L13 – Ganze und halbe Kästchen zählen**: Fläche: Quadrate und halbe Kästchen als echte Flächen zählen. **Quelle:** Themenrahmen S. 28–30 (Training 31). **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.

- **L14 – Wie viel passt hinein? Wie groß sind die Seiten?**: Körper: Volumen in Kubikeinheiten, Oberfläche in Quadrateinheiten. **Quelle:** Themenrahmen S. 28–30 (Training 31). **Abgrenzung:** Fall-ID auch in Beispiele: Lern- und Beispielaufgabe getrennt auf wirklich andere Zahlen/Entscheidungen prüfen. **Noch auszuarbeiten:** Vorwissen, typische falsche Wahl, aktives Gegenbeispiel, bildlicher Vorher-/Nachher-Zustand, schulnahe Rechenzeile und Probe.


### Musterbeispiele (17)

| ID / Aufgabentyp im aktuellen Code | Quelle / Belegstufe | Übereinstimmung und offene Aspekte | Doppelung / Abgrenzung | Änderungsauftrag |
|---|---|---|---|---|

| **1** Meter in Zentimeter | S. 28–29; Schulischer Typ, Einzelaufgabe noch prüfen | 1,25 m=125 cm über zwei Einheitenschritte; Maßzahl/Einhaltung erklären. | Lernen Längen, eigene Beispieldaten. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **2** Kilogramm in Gramm | S. 28–29; Schulischer Typ, Einzelaufgabe noch prüfen | 0,075 kg=75 g; Stellenwert und 1000 korrekt. | Lernen Masse. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **3** Gramm in Kilogramm | S. 28–29; Schulischer Typ, Einzelaufgabe noch prüfen | 250 g=0,25 kg; Richtung zur größeren Einheit erklären. | B2 umgekehrte Einheitentransformation. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **6** Welche Einheit fehlt? | S. 29; Schulischer Typ, Einzelaufgabe noch prüfen | 1,5 m=150 cm: Einheit nicht aus der Ziffer allein raten. | B1 ähnlich, hier fehlende Einheit. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **7** Euro und Cent zusammenrechnen | S. 28–31; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | 3,50 €+75 ct mit Einheitenabgleich; Primärbuchseite im Kapitel prüfen. | Maßeinheiten, eigener Geldkontext. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **8** Welche Strecke ist länger? | S. 29; Schulischer Typ, Einzelaufgabe noch prüfen | 0,7 km=700 m &gt;650 m; erst gleiche Einheit herstellen. | B1 Längenumrechnung + Vergleich. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **9** Wie viel zeigt ein Abschnitt? | S. 29; Schulischer Typ, Einzelaufgabe noch prüfen | 2 kg in acht Lücken: 0,25 kg je Abschnitt; 0–2 ist zwei Einheiten. | Kapitel Zahlenstrahl-Skala, hier Massemaß. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **12** Stunden, Minuten und Sekunden | S. 30; Schulischer Typ, Einzelaufgabe noch prüfen | 1,05 h=63 min, 5/6 min=50 s; 60er-Faktor statt 100 für Zeit. | Lernen Zeit, zwei Untertypen getrennt erklären. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **13** Ganze und halbe Kästchen zählen | S. 30; Schulischer Typ, Einzelaufgabe noch prüfen | 0,5 cm Kästchenseite → 0,25 cm² je Kästchen; 6 ganze + 4 halbe = 8 Kästchen = 2 cm². | Lernen Flächen, Fläche ≠ Länge. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **4** Quadratmeter in Quadratzentimeter | S. 28–29; Schulischer Typ, Einzelaufgabe noch prüfen | 1,2 m²=12000 cm²: Quadrate pro Einheitenschritt, nicht ×100 wie bei Längen. | B1 Länge; absichtlich anderer Faktor. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **14** Wie viel passt hinein? Wie groß sind die Seiten? | S. 30; Schulischer Typ, Einzelaufgabe noch prüfen | Quader V und O konsequent unterscheiden: Länge/Breite/Höhe, Kubik- vs Quadrat-Einheiten. | Lernen Körper; bei Tool keine 2D/3D-Verwechslung. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **5** Kubikmeter in Kubikzentimeter | S. 28–30; Schulischer Typ, Einzelaufgabe noch prüfen | 0,003 m³=3000 cm³: 1000000 cm³ je m³, nicht ×100. | B4 Fläche, andere Dimension. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **11** Liter und Würfelmaße | S. 28–30; Schulischer Typ, Einzelaufgabe noch prüfen | 0,5 m³=500 l und 77,3 ml=0,0773 dm³; Größenarten/Verbindungen plausibel. | B5 Rauminhalt vs Flüssigkeitsvolumen. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **10** Flächen umrechnen | S. 28–30; Schulischer Typ, Einzelaufgabe noch prüfen | 0,005 km²=500 a, 7,1 m²=0,071 a; a/ha/Quadratkilometer im Buch prüfen. | B4 weitere Flächeneinheiten. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **15** Zwei Ansichten desselben Körpers | S. 30; Schulischer Typ, Einzelaufgabe noch prüfen | Aus Grund- und Aufriss 0,8 m, 0,5 m, 1 m entnehmen: Volumen 0,4 m³. | B14 Quader, neu ist das Lesen zweier Ansichten. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **16** Sehr kleine Längen und Gewichte | S. 28–30; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | µg und µm = Millionstel; Seiten 28–30 auf Mikro prüfen; potenziell über Anforderung. | B1/B2 einfache Tausender-Faktoren, deutlicher Niveauunterschied. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |

| **17** Rahmen und Dreieck berechnen | S. 30–31; Zusatz-/Transfertyp; Beleg und Schwierigkeitsgrad offen | Rahmenfläche außen minus innen sowie halbes Rechteck: Aufgabenbezug in Training/Buch prüfen. | B13 Kästchenflächen und B14 Geometrie; ggf. Zusatzfall. | Quellenfall + Schreibweise nachprüfen; erst Denkfrage, dann Bild-/Rechenschritt; Lösung nur nach Aufdeckung. |


**Kapitelprüfung vor Freigabe:** Erst Aufgabenfamilien und geschriebene Rechnung am Original vergleichen; identisches Ganzes/Einheit in allen Bildzuständen, Denkfallen als richtige/falsche Wegwahl begründen, vorhandenes Bildwerkzeug auf konkrete Änderung und Lösungsschutz prüfen. Keine reale Browser-/Mobilprüfung in diesem Durchgang.

## Übergreifende Prioritäten aus dem Einzelregister

1. **P0 – Schulmethoden:** Bei Anteilen zuerst ein Teil, dann Ganze/gewünschte Teile; beim Erweitern/Kürzen gleicher Faktor oben und unten; gemischte Zahlen als Ganze+Rest; Division=Bruchstrich mit unvertauschter Reihenfolge; beim Vergleichen zuerst Strategie, bei Dezimalzahlen zuerst Stellenwert, bei Größen zuerst Einheit und Umrechnungsrichtung.
2. **P0 – Keine Lösung vor Denkentscheidung:** Gemeinsame `course.js`-Darstellung und kapiteleigene Bildausgaben prüfen, keine Ergebnisvorwegnahme über Text, Bild, ALT, Titel, Tipp oder Tool.
3. **P1 – Verdachtsfälle (vorerst behalten):** Anteilsaufgaben mit Pizza-Flächen und Veränderungs-/Gewinnverhältnissen; periodische Dezimalentwicklung; Dezimalsprung-Startwert; Tabellenmuster; Mikro-Einheiten; kombinierte Rahmen-/Dreiecksflächen; didaktisch anspruchsvolle Zusatzvarianten im Quotientenkapitel. Diese Fälle benötigen präzisere Original-Belege und eine Abwägung, statt sie still zu erweitern.
4. **P1 – Lernweg vs Beispiel:** In sechs allgemeinen Datenmodulen werden Fall-IDs zum Teil in beiden Bereichen genutzt. Die tatsächlich unterschiedlichen Aufgaben und Lernschritte beachten; exakt identische Aufgaben im Musterbeispiel vermeiden.
5. **P2 – Bildwerkzeuge:** Pro Thema fachlichen Nutzen, korrekte Eingabe-/Bildreaktion, Reset, Vorwissen und Lösungsschutz ermitteln. Funktions-/Browserprüfung folgt gesondert.

## Nächste Freigabegrenzen

**Noch NICHT erledigt:** vollständige bildgenaue und wortgetreue Primärquellenprüfung aller 99 Einzelfälle, komplett ausgearbeitete Phase-für-Phase-Drehbücher, pädagogisch getestete falsche Alternativen, automatische vollständige Mathematiktests, Ausführung der neun Tools auf Desktop/Mobil und Gesamt-Release.

**Erledigt durch dieses Dokument:** aktueller Codebestand pro Fall erfasst, 30 Lernwege / 99 Musterfälle mit vorläufigen Schulquellenfamilien, notwendigen Denken-/Bildänderungen, Doppelungs- und Zusatzstoffhinweisen dokumentiert.

**Verbindliche Referenzen:** `GESAMTBAUVORLAGE-MATHE-MERKHEFT.md`, `SCHULGRUNDLAGE-MATHE-KLASSE6-2026-11-04.md`, `EINZELABGLEICH-ZAHLENSTRAHL-2026-11-04.md`.