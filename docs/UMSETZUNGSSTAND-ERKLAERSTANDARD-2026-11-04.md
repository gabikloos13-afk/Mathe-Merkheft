# Umsetzungsstand: einheitlicher Erklärstandard (Entwicklungszweig)

**Datum:** 04.11.2026  
**Entwicklungszweig:** `gesamtumbau-erklaerstandard-2026-11-04`  
**Freigabe:** **NICHT** freigegeben. Kein Merge in `main`.

## Tatsächlich programmierte Änderungen

1. **Alle neun Kapitel eingebunden:** `brueche.html`, `gleichwertig.html`, `gemischt.html`, `zahlenstrahl.html`, `quotienten.html`, `vergleichen.html`, `dezimal.html`, `dezimalvergleich.html` und `groessen.html` laden nun den aktualisierten `course.js`, `course.css` und `erklaer-entscheidungen.js`. Cachekennung `20261104e2`.
2. **Gemeinsame Lernsteuerung:** Bei jedem Schritt in den vorhandenen Lernwegen und Mustern zuerst Denkfrage/gedankliche Notiz und bewusstes Aufdecken; die aktuelle Rechnung und die dazugehörige Warum-Erklärung werden erst danach gezeigt. Der „Weiter“-Knopf bleibt bis zum Aufdecken deaktiviert. Bei jedem Schritt erscheint nur die aktuelle Rechenidee, nicht der Stapel aller früheren Zeilen.
3. **Begründung für typische Fehler:** Vorhandene Fall-Denkfallen werden nach Aufdeckung über eine ausklappbare Erklärung erreichbar; am Schluss erscheinen vollständiger Rechenweg, Antwort, Probe und typischer Fehler.
4. **Neun gezielt ausformulierte Lernfälle mit Entscheidungsalternativen:** Je Kapitel mindestens ein kuratiertes Lernmuster. Insgesamt **36** manuell begründete Entscheidungsschritte (jeweils ein passender und ein unpassender Weg mit konkretem Warum). Die anderen Lern- und Beispielschritte verlangen eine freiwillige eigene Überlegung und zeigen anschließend die jeweils schon vorhandene individuelle Warum-Erklärung. Diese offenen Antworten werden **nicht** fälschlich automatisch als richtig oder falsch bewertet.
5. **Vier Zahlenstrahl-Lernwege verfeinert:** Ein Ganzes/Lücken: **5** Schritte; Punkt ablesen: **6**; Bruch eintragen: **6**; minus drei Viertel links von 0: **7**. Minus-Richtungspfeil beginnt bei 0, Zielpunkt erst im letzten Schritt.
6. **Drei gesicherte Startbilder:** Anteilsaufgabe 3/4 der Klasse = 21; Zahlengeraden-Grundlernwege; Größenumrechnung Meter → Zentimeter. Ungeprüfte ursprüngliche Vorschaubilder bleiben vor der ersten Aufdeckung verborgen, weil sie teilweise den Zielpunkt oder die Antwort bereits zeigen.
7. **Lern- und Beispielmodus getrennt:** Kuratierte Entscheidungen für eine Lernaufgabe mit eigenen Zahlen dürfen **nicht** automatisch bei einer gleichnamigen Beispiel-ID mit anderen Zahlen auftauchen.
8. **Bearbeitungsstand lokal:** Phase, geöffnete Schritte, gewählte Wege und freiwillige Notiz bleiben im Browser gespeichert; erneuter lösungsfreier Start ist am Schluss möglich.
9. **Werkzeuge und Originalaufgaben erhalten:** Kein Tool und kein Beispiel wurde gelöscht oder ungefragt ersetzt. Die gemeinsame Bedienung bleibt mit vier Hauptregistern bestehen.

## Aktuell geprüfte Daten und Technik

- Neun tatsächliche Themen einschließlich der überschreibenden Kapitelmodule für Gemischte Zahlen, Zahlenstrahl und Quotienten dynamisch eingelesen.
- **34 Lernwege**, **111 Musterbeispiele**, **522 angezeigte fachliche Phasen** (Lern- und Beispielansicht zusammen) auf vorhandene Rechnung, Warum-Erklärung, Tipp, Antwort, Probe und Denkfalle überprüft: **kein fehlender Pflichtwert gefunden**.
- **36 kuratierte Entscheidungen** auf passende Phasenzuordnung und genau eine korrekte Alternative kontrolliert.
- JavaScript-Syntax von `course.js`, `zahlenstrahl-kapitel.js` und `erklaer-entscheidungen.js` geprüft.
- Start bis Ziel des negativen Bruchs statisch kontrolliert: Vor Schritt 7 kein Zielpunkt in den zugehörigen Bilddaten.
- Alle neun HTML-Dateien laden die neuen Dateien mit einheitlichen Versionskennungen; `zahlenstrahl-kapitel.js` nutzt ebenfalls die neue Kennung.
- Reproduzierbarer Kontrolltest: `tests/erklaerstandard-audit.cjs` (Node.js). Der Test ist geschrieben, aber im verbundenen GitHub-Arbeitslauf nicht über einen regulären Node-Testjob ausgeführt. Zusätzlich wurde der wesentliche Testumfang direkt auf den geladenen Quelldaten geprüft.

## Was ausdrücklich **noch nicht** als fertig gelten darf

1. **Vollständig individuelle Fehleralternativen für sämtliche 522 Lern-/Beispielphasen:** Nur die 36 kuratierten Phasen haben auswählbare fachlich richtige/falsche Wege. Bei allen anderen existieren Denkfrage, freiwillige Notiz, individuelle Erklärung und Fall-Denkfalle. Das ist ein gemeinsamer Qualitätsgewinn, aber noch nicht die verlangte vollständig handgeschriebene Entscheidungstiefe in jedem einzelnen Fall.
2. **Exakter Schulbuch-/Heftabgleich der verbleibenden 99 Musterfälle:** Das Fallregister der übrigen acht Kapitel enthält Themen- und Typzuordnungen, nicht für jeden Fall eine nachgewiesene identische Originalaufgabe. Kein abweichendes Verfahren als „heftgetreu bestätigt“ deklarieren.
3. **Live-Prüfung der neun Werkzeuge:** Code und Einbindung vorhanden, aber nicht alle Interaktionen mit Maus, Tastatur, Touch, Rücksetzen und Screenreader in einem Browser ausgeführt.
4. **Echte Browser-/Smartphone-/Druckprüfung** des Entwicklungszweigs und didaktischer Test mit Hanna: offen.
5. **Mathematische Gesamtabnahme sämtlicher Bilder:** Statische Datenkontrolle bestätigt Vollständigkeit und den negativen Referenzfall; nicht jede SVG-Pixelposition und jede Unterphase wurde automatisch nachgerechnet.
6. **Release:** Kein Merge; `main` bleibt bewusst unverändert, bis die echten Qualitätsprüfungen bestanden sind.

## Entscheidung zum weiteren Vorgehen

**Nicht wieder neue Gesamtpläne schreiben.** Als nächste konkreten Schritte:
1. Schritt-für-Schritt-Fach-/Quellenprüfung der noch nicht wörtlich belegten Aufgaben und der auffälligen Zusatzfälle;
2. fehlende individuell ausformulierte Warum-passt/Warum-nicht-Entscheidungen dort ergänzen, wo sie einen echten mathematischen Unterschied erklären (kein künstliches Quiz pro Klick);
3. echtes Browser-/Mobil-/Tastatur-Screening der drei Referenzmuster und aller neun Tools;
4. alle neun Kapitel hinsichtlich Sichtzuständen, mathematischer Korrektheit und schulnaher Schreibweise abnehmen;
5. erst danach den Entwicklungszweig nach `main` übernehmen.

**Referenzen:** `GESAMTBAUVORLAGE-MATHE-MERKHEFT.md`, `SCHULGRUNDLAGE-MATHE-KLASSE6-2026-11-04.md`, `EINZELABGLEICH-ZAHLENSTRAHL-2026-11-04.md`, `EINZELABGLEICH-ACHT-THEMEN-2026-11-04.md` und `ERKLAERSTANDARD-DREI-REFERENZMUSTER-2026-11-04.md`.
