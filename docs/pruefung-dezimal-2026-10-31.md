# Kapitelprüfung: Brüche und Kommazahlen · 31.10.2026

## Gegenstand und Umfang
Dieses Protokoll bezieht sich ausschließlich auf das Kapitel `dezimal.html` (Titel: „Brüche und Kommazahlen“). „Kommazahlen vergleichen“ (`dezimalvergleich.html`) ist ein anderes Kapitel und wurde nicht didaktisch umgebaut.

Geprüft und überarbeitet: vier Grundlagen-Lernwege, elf Musterbeispiele, Nachschlagen, zugehörige Rechenbilder, Hauptbildwerkzeug-Anbindung, direkte Links und gemeinsame technische Regressionstests.

## 1. Getrennte Lernaufgaben
| Lernweg | Neue Lernaufgabe | Bestehendes Musterbeispiel |
|---|---|---|
| Hundertstel lesen | 9/100 → 0,09 | 7/100 → 0,07 |
| Den Bruch umwandeln | 2/5 → 4/10 → 0,4 | 3/4 → 75/100 → 0,75 |
| Zurück zum Bruch | 0,6 → 6/10 → 3/5 | 0,45 → 45/100 → 9/20 |
| Mehr als 1 | 1,4 → 14/10 → 7/5 | 1,2 → 12/10 → 6/5 |

Die Beispiele wurden nicht gelöscht, und die Lernaufgaben benutzen andere Zahlen. Der Lernweg umfasst nun 2 + 3 + 3 + 3 = **11 Schritte** statt der vorherigen 1 + 5 + 5 + 5 = 16. Jeder Weg hat eine eigene Aufgabenstellung, Erklärung, Kontrollfrage, Abschlussrechnung und kurze Denkfrage vor dem nächsten Rechenschritt. Die vollständige Rechnung erscheint erst nach Durchlauf der Schritte.

## 2. Überarbeitung der Bilder
Eine kapiteleigene Bildkomponente `dezimal-bilder.js` erzeugt die neuen Zeichnungen, statt das gemeinsame `rechenbilder.js` unkontrolliert für alle Kapitel zu verändern. Sie wird vor der zentralen Rechenbildsteuerung geladen.

- Hundertstel: tatsächliche 10×10-Raster mit genau der markierten Menge, keine leere Textkarte.
- Zehntel: tatsächliche Streifen mit zehn Abschnitten. **1,2** wird als ein ganzer Streifen und zwei zusätzliche Zehntel dargestellt.
- Unterschiedliche Bruchschreibweisen: gleiche gefärbte Flächen, bei Brüchen größer als eins ein gemeinsamer Punkt auf dem Zahlenstrahl.
- Negative Dezimalzahl: `−0,15` links von 0, mit erhaltenem Minuszeichen bei der Umwandlung.
- Periodische Zahlen: `1/3 = 0,333…` und `1/6 = 0,1666…` mit wiederkehrendem Rest, nicht als fälschlich „gleich viel“ bezeichnete Bruchstreifen.
- Fehlender Zähler: Originalaufgabe `□/20 = 0,35` bleibt vor der Lösung sichtbar; die 7 wird erst am Ende gezeigt.
- Gleichwertige Angaben: die vier gleichen Werte und der abweichende Wert `3/8` werden getrennt dargestellt.
- Sprungaufgabe: Zahlenstrahl von −2 bis −1 mit **20** gleichen Sprüngen. Start −1,5 wird nicht schon vor der Berechnung angezeigt.
- Die Bilder erhalten beschreibende Alternativtexte für die jeweils erreichte Phase.

## 3. Fachliche Korrekturen
- Im Musterbeispiel `3/4` wurden unschulische Schreibweisen „4.0“ und „100.0“ entfernt.
- Beim Beispiel `800/2000` stimmt die Denkfallen-Erklärung jetzt mit dem Rechenweg (Kürzen durch 200) überein.
- Die Ergebniskontrolle der Sprungaufgabe nennt die tatsächlichen zehn Sprünge in beide Richtungen.
- Bruchwerte wurden auf Erhaltung des Wertes beim Kürzen/Erweitern überprüft.
- Nachschlagen enthält sechs kurze Karten zu Stellenwerten, beiden Umwandlungsrichtungen, Ganzen, Minus, endlichen und periodischen Dezimalzahlen.

## 4. Technische Integration
- `course-data.js`: eigenständige Lernaufgaben und Nachschlagekarten.
- `dezimal-bilder.js`: neue ausschließlich dezimalkapitelbezogene Bilder.
- `rechenbilder.js`: Einbindung der Kapiteldarstellungen, unveränderte Grundlogik anderer Themen.
- `course.js` und `course.css`: ruhiger Denkimpuls vor dem nächsten Lernschritt nur für dieses Kapitel.
- `dezimal.html`: neues Bildmodul wird in der erforderlichen Reihenfolge geladen; Asset-Version erhöht.
- `tests/dezimal-kapitel.test.cjs`: neue Kapitelsuite für Doppelungen, Bilder, Rechenerhaltung, fehlende frühzeitige Lösungen, Nachschlagen und Ressourcen-Reihenfolge.
- `tests/course.test.cjs`: globale Prüfziffer für die neue Anzahl der Lernschritte angepasst.

## 5. Prüfung und Grenzen
Die neuen Kapiteltests erfassen **34 Beispielbilder** (elf Vorschauen und 23 Rechenschritte) und **11 Lernbilder**, insgesamt **45 Bildausgaben**. Diese wurden programmatisch auf vorhandene SVGs, Alternativtexte und ungültige Bildwerte geprüft. Ebenso wurde geprüft, ob Startbilder entscheidende Ergebnisse vorwegnehmen und ob die gezeigten Bruchwerte mathematisch zusammenpassen.

Im Anschluss wurden alle **zehn** vorhandenen beziehungsweise neuen Testskripte in einer JavaScript-Kompatibilitätsumgebung ausgeführt; alle bestanden, auch die Tests anderer Themen. Dies war **kein nativer Node.js-Lauf**.

**Offen für die Endfreigabe:** tatsächlicher Browserdurchlauf in Desktop- und Mobilbreite (insbesondere 375 px), Bedienung der vier Reiter, Tastatur, Lauf des Bildwerkzeugs und visuelle Prüfung der SVGs im gerenderten Zustand. Eine Browserfreigabe wird hier ausdrücklich nicht behauptet.

## Letzter Integrationsabgleich
Nach der vierteiligen Lernstrecke führt „Weitere Beispiele“ jetzt zum **ersten** der elf eigenständigen Musterbeispiele. Der zuvor mögliche Einstieg mitten in der Beispielreihe wurde korrigiert. Das Bild für gleichwertige Brüche über 1 zeigt die Werte am gleichen Zahlenstrahlpunkt statt zwei leeren Flächen. Die veröffentlichte Seite verwendet den Asset-Stand `20261031r26`. Diese nachträglichen Anpassungen sind in der Kapitelsuite mitgeprüft.
