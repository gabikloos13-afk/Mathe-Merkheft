# Mathe-Merkheft · Klasse 6

Interaktives Merkheft zu Brüchen, rationalen Zahlen und Dezimalzahlen. Neun Kapitel, 96 unterschiedliche Musterwege und neun Bildwerkzeuge. Keine separate Übungseinheit, keine Punkte und keine Antwortbewertung.

Einstieg: `index.html`. Veröffentlichung über das bestehende GitHub Pages auf `main`.

## Aufbau

- Grundidee in kurzen, strukturierten Aussagen
- Bildwerkzeug zum Verändern, Vergleichen, Bündeln und Vergrößern
- Suchbarer Navigator für unterschiedliche Aufgabenstellungen
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
