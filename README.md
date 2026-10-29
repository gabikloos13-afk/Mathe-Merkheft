# Mathe-Merkheft · Klasse 6

Interaktives Merkheft zu Brüchen, rationalen Zahlen und Dezimalzahlen. Neun Kapitel, 96 unterschiedliche Musterwege und neun Bildwerkzeuge. Keine separate Übungseinheit, keine Punkte und keine Antwortbewertung.

Einstieg: `index.html`. Veröffentlichung über das bestehende GitHub Pages auf `main`.

## Aufbau

- Grundidee in kurzen, strukturierten Aussagen
- Bildwerkzeug zum Verändern, Vergleichen, Bündeln und Vergrößern
- Eine sichtbare Aufgabenkarte je Kapitel; Vorheriger/Nächster Musterweg oben und unten
- Geschlossene Auswahl mit Suche und direktem Sprung zu allen Aufgabentypen
- Direkte Links und Browser-Zurück wählen die richtige Karte; geöffnete Schritte bleiben beim Blättern erhalten
- Im Ausdruck bleiben alle Musterwege enthalten
- Je Musterweg: Denkstütze, begründete Einzelschritte, verdeckte Heftrechnung, Kontrolle, Denkfalle, Übertragung
- Gemeinsame Grundgestaltung und Navigation: `merkheft.css` und `merkheft.js`; Bildfolgen und Verknüpfungen: `bildlabor.css` und `bildlabor.js`

Alle aktuellen Kapitel verwenden diese vier gemeinsamen Dateien. `style.css` und `lernwerkzeuge.js` bleiben als nicht eingebundene Altdateien erhalten.

Buchabgleich, Umfang und Grenzen: [buchabgleich.md](buchabgleich.md).

## Prüfung am 29.10.2026

- Alle neun Kapitel im Chromium-Browser geladen; Modelle und Bedienelemente vorhanden.
- 18 Darstellungs-/Auswahlzustände der Werkzeuge durchgeschaltet.
- Suche, Aufgaben-Navigator, einzelne Aufdeckschritte, vollständige Heftrechnung und Zurücksetzen geprüft.
- Viele Ganze: 30 Hälften als 15 vollständige Gruppen ohne Abschneiden dargestellt.
- Größenmodell und Rückumrechnung einschließlich periodischer Zeitwerte geprüft; gerundete Werte mit ≈ gekennzeichnet.
- Alle Kapitel bei 375 CSS-Pixeln Inhaltsbreite ohne horizontalen Überlauf geprüft. Zusätzlich eine geöffnete Erklärung samt Musterweg in der schmalen Vorschau kontrolliert. Kein Test auf einem physischen Smartphone.
- JavaScript-Syntax, lokale Links, eindeutige IDs und Musterwegstruktur geprüft.

Keine externen Bibliotheken, Schriften oder Trackingdienste erforderlich.

## Weiterentwicklung des Bildlabors · 29.10.2026

Die neun Bildwerkzeuge bestehen nun aus steuerbaren Bildfolgen mit vier Schritten, Zurück/Vorwärts und einem Wechsel auf eine verwandte Aufgabenstellung. Animationen laufen ausschließlich bei einem angeforderten Schritt; die Systemeinstellung für reduzierte Bewegung wird berücksichtigt.

- Teil–Ganzes: bekannte Gruppen, ein Teil, fehlende Gruppen ergänzen
- Kürzen/Erweitern: Schnittlinien verändern, gefärbte Fläche beibehalten
- Gemischte Zahlen: Stücke in vollständige Gruppen bewegen, Rest markieren
- Division: gleich große Pizzastücke auf Kinderteller bewegen
- Vergleich: zwei gleich große Skalen gemeinsam unterteilen
- Zahlenstrahl: verbundener Überblick und zwei aufeinanderfolgende Vergrößerungen
- Dezimalzahlen: Hundertstel in Zehnergruppen bündeln, Stellenwerttafel ergänzen
- Dezimalvergleich: erste unterschiedliche Stelle und Lage am Zahlenstrahl verbinden
- Größen: Länge, Fläche und Raum aufbauen; Würfelhülle als Netz auffalten; Menge gesondert von der Bezugseinheit darstellen

Bei dazu passenden Musterwegen wird ein Bild mit den aufgedeckten Rechenschritten weitergeschaltet. Die Bilder verwenden die Zahlen des jeweiligen Beispiels; komplexe Aufgaben ohne passenden dynamischen Modelltyp behalten ihre eigenständige Erklärung. Verwandte Aufgaben sind über ihre gemeinsame mathematische Struktur verlinkt. Alle 96 Musterwege bleiben erhalten. Es entsteht keine eigene Übungseinheit.

Prüfung: Vorwärtsfolgen aller Hauptmodelle im Browser, Zurücksetzen, Aufgabenwechsel und Wiederherstellung, Kopplung einer mehrstufigen Kürzung und einer Rückwärtsaufgabe. Alle neun Kapitel bei 375 CSS-Pixeln Inhaltsbreite ohne horizontalen Überlauf; Würfelnetz und Pizzaverteilung zusätzlich im schmalen Browser geprüft. Kein Test auf einem physischen Smartphone.

Mathematische Modellprüfungen ausführen:

```sh
node tests/bildlabor.test.cjs
```

Die Prüfungen decken u. a. 36 Modellzustände, unveränderte Flächen beim Kürzen/Erweitern, unveränderte Stückzahlen beim Bündeln, 20 Verteilungskombinationen, verschachtelte Vergrößerung und Einheitenumrechnungen ab. Dazu JavaScript-Syntax und lokale Ressourcenverweise geprüft.

## Sprache und Gliederung · 29.10.2026

- Alle 96 Aufgabenstellungen als getrennte Aufgabenzeilen.
- Schwierige Erklärungen in kürzere, begründete Einzelschritte zerlegt.
- Begriffe in jedem Kapitel über „Wörter einfach erklärt“ nachschlagbar.
- Hinweise im Bildlabor, beim Aufgabenwechsel und bei Strukturverweisen als einzelne Punkte.
- Zusätzliche Zwischenschritte beim Kürzen großer Zahlen und beim Finden eines gemeinsamen Nenners.
- Alle 96 Musterwege, Aufdeckschritte und mathematischen Bildfunktionen bleiben erhalten.

Prüfung: Ressourcenverweise, eindeutige IDs, 96 vollständige Musterwege und fehlende Absatzblöcke; bestehende Modelltests erfolgreich. Aufdeckfunktion und Sprache im Browser sowie Aufgabenzeilen und Wörterhilfe bei 375 Pixeln Inhaltsbreite geprüft.

## Umsetzung der acht ursprünglichen Werkzeugideen

Die acht Themen der Vorlage besitzen nun direkt bedienbare Hauptwerkzeuge. Die geführten Bildfolgen bleiben jeweils unter „Ein Beispiel Schritt für Schritt verstehen“ erreichbar. Das zusätzliche Kapitel „Brüche als Division“ behält seine eigene Verteilungs-Bildfolge.

| Werkzeug | Direkte Handlung |
|---|---|
| Bruchbaukasten | Einzelne Kreisteile, Streifenteile oder Felder färben/entfärben; Bild bei gleichem Anteil wechseln |
| Bruch-Werkstatt | Schnittlinien erzeugen, gleich große Teilstücke wieder zusammenfassen; unveränderte Fläche und Umformungsverlauf sehen |
| Bündelmaschine | Bruchstücke tatsächlich in Schachteln ziehen; alternativ auswählen und ablegen; vollständige Ganze und Rest erkennen |
| Gleichnamig-Labor | Beide Brüche unabhängig unterteilen und passende Stückgrößen finden |
| Verschiebbare Zahlenlinie | Punkt direkt ziehen oder mit Pfeiltasten bewegen; Ausschnitt verschieben und vergrößern |
| Stellenwert-Maschine | Hundertstel und Zehntel in Zehner-Bündler ziehen oder antippen; Zehnertausch und erhaltene Gesamtmenge sehen |
| Stellenwert-Lupe | Lupe ziehen oder Spalte antippen; die ausgewählte Ziffer bildlich vergrößern; spätere Stellen von der ersten entscheidenden Stelle unterscheiden |
| Räumliches Einheiten-Labor | Würfel direkt drehen; Füllung und markierte Schicht verändern; Hülle auffalten; Längen- und Flächenstücke direkt markieren |

Bildmodelle und direkte Bedienung: `anfasslabor.js` / `anfasslabor.css`. Die 96 Musterwege und Wörterhilfen bleiben erhalten. Keine Antwortbewertung und keine eigene Übungseinheit.

### Prüfung

```sh
node tests/anfasslabor.test.cjs
node tests/bildlabor.test.cjs
```

- Kürzen/Erweitern: Wertgleichheit für verschiedene Zähler, Nenner und Faktoren.
- Bündeln: Stückerhaltung und volle/teilweise Gruppen.
- Stellenwerte: Zehnertausch für alle Ausgangsmengen von 1 bis 199 Hundertsteln.
- Zahlenlinie: Einrasten auf die gewählte Bruchteilung.
- Würfel: endliche Projektion und sichtbare Eckpunkte für alle einstellbaren Drehwinkel.
- Browser: direkte Farbwahl und Bildwechsel, Unterteilen/Zusammenfassen, echtes Ziehen eines Stücks in eine Schachtel, wiederholtes Füllen, Zehnertausch, unabhängige Vergleichsteilung, Lupenauswahl und Tastaturbewegung.
- Browser: Bruchpunkt mit der Maus verschoben; Würfel mit der Maus gedreht; Füllung und Netz umgeschaltet.
- Alle acht direkten Werkzeuge bei 375 CSS-Pixeln Inhaltsbreite ohne horizontalen Überlauf. Direkte Farbwahl, Flächenwahl und Würfelnetz zusätzlich in der schmalen Vorschau bedient.
- Geführte Bildfolge nach Umbau weiterhin bedienbar.

Für Touch-Bedienung besitzen die Ziehaktionen gleichwertige Auswahl-/Ablege- bzw. Tippaktionen. Kein Test auf einem physischen Android-Gerät.

## Ruhige Aufgabenansicht

- Alle neun Kapitel zeigen im Browser genau einen Musterweg.
- Vorheriger/Nächster Musterweg stehen oberhalb und unterhalb der Karte.
- Die geschlossene Auswahl enthält Suche und direkten Sprung zu jedem Aufgabentyp.
- Suche mit und ohne Treffer, Suchreset, erster/letzter Musterweg und Browser-Zurück geprüft.
- Geöffnete Schritte bleiben beim Blättern erhalten; direkte Fragmentlinks öffnen die richtige Karte.
- Schmale Vorschau mit 375 CSS-Pixeln: Auswahl, Blättern und geöffnete Erklärung ohne horizontalen Überlauf.
- Alle 96 Musterwege und ihre Verlinkungen statisch geprüft; beide bestehenden Mathematiktests bestehen.
- Druckansicht enthält weiterhin alle Musterwege.
