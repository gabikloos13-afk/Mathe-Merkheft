'use strict';
/* Individuell geprüfte Entscheidungsfragen je Lernschritt. */
window.MerkheftEntscheidungen = {
  "brueche": {
    "1": {
      "1": {
        "question": "Welche Zahl wird der Nenner?",
        "choices": [
          {
            "label": "Alle neun gleich großen Felder",
            "correct": true,
            "why": "Der Nenner zählt alle gleich großen Teile des Ganzen."
          },
          {
            "label": "Nur die vier bunten Felder",
            "correct": false,
            "why": "Das wäre der Zähler; das Ganze enthält auch die weißen Felder."
          }
        ]
      },
      "2": {
        "question": "Welche Zahl wird der Zähler?",
        "choices": [
          {
            "label": "Die vier gefärbten Felder",
            "correct": true,
            "why": "Der Zähler zählt die ausgewählten gleich großen Teile."
          },
          {
            "label": "Alle neun Felder",
            "correct": false,
            "why": "Die neun beschreiben das Ganze und gehören in den Nenner."
          }
        ]
      },
      "3": {
        "question": "Wie liest du den gefärbten Anteil?",
        "choices": [
          {
            "label": "Vier Neuntel",
            "correct": true,
            "why": "Vier von insgesamt neun gleich großen Feldern sind gefärbt."
          },
          {
            "label": "Neun Viertel",
            "correct": false,
            "why": "Dann wären Zähler und Nenner vertauscht und der Wert größer als eins."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "Welche Menge ist das Ganze?",
        "choices": [
          {
            "label": "Alle 60 Birnen",
            "correct": true,
            "why": "Die 60 Birnen sind der Ausgangsbestand, von dem zwei Drittel gesucht sind."
          },
          {
            "label": "Die zwei Drittel sind das Ganze",
            "correct": false,
            "why": "Zwei Drittel sind nur der gesuchte Anteil; das Ganze sind alle Birnen."
          }
        ]
      },
      "2": {
        "question": "Wie groß ist ein Drittel von 60 Birnen?",
        "choices": [
          {
            "label": "60 : 3",
            "correct": true,
            "why": "Der Nenner 3 teilt das Ganze in drei gleich große Gruppen."
          },
          {
            "label": "60 : 2",
            "correct": false,
            "why": "Die 2 ist der Zähler und zählt erst danach die benötigten Gruppen."
          }
        ]
      },
      "3": {
        "question": "Wie kommst du vom Drittel zu zwei Dritteln?",
        "choices": [
          {
            "label": "Ein Drittel mal 2",
            "correct": true,
            "why": "Der Zähler 2 sagt, dass zwei gleich große Drittelgruppen gebraucht werden."
          },
          {
            "label": "Ein Drittel mal 3",
            "correct": false,
            "why": "Drei Drittel wären das ganze Obst, nicht der gesuchte Anteil."
          }
        ]
      }
    },
    "3": {
      "1": {
        "question": "Wofür stehen die 21 Kinder?",
        "choices": [
          {
            "label": "Für drei Viertel der Klasse",
            "correct": true,
            "why": "Das passt: Die Aufgabe sagt ausdrücklich, dass drei Viertel 21 Kinder sind. Ein Viertel fehlt noch."
          },
          {
            "label": "Für die ganze Klasse",
            "correct": false,
            "why": "Das passt nicht: 21 Kinder sind nur drei von vier gleich großen Teilen, nicht alle vier."
          }
        ]
      },
      "2": {
        "question": "Welche Division findet zunächst ein Viertel?",
        "choices": [
          {
            "label": "21 : 3",
            "correct": true,
            "why": "Das passt: Die 21 Kinder gehören zu drei bekannten Vierteln. Durch 3 erhältst du eines davon."
          },
          {
            "label": "21 : 4",
            "correct": false,
            "why": "Das passt hier nicht: Durch 4 würdest du so rechnen, als wären die 21 Kinder bereits die ganze Klasse."
          }
        ]
      },
      "3": {
        "question": "Wie kommst du vom einen Viertel zur ganzen Klasse?",
        "choices": [
          {
            "label": "7 · 4",
            "correct": true,
            "why": "Das passt: Das Ganze besteht aus vier Vierteln mit jeweils sieben Kindern."
          },
          {
            "label": "7 · 3",
            "correct": false,
            "why": "Das reicht nicht: Damit würdest du nur die drei schon bekannten Viertel zusammensetzen."
          }
        ]
      }
    },
    "8": {
      "1": {
        "question": "Was ist bei dieser Aufgabe das Ganze?",
        "choices": [
          {
            "label": "Alle 18 Kästchen",
            "correct": true,
            "why": "Die 18 Kästchen bilden die gesamte Fläche, aus der ein Anteil gefärbt werden soll."
          },
          {
            "label": "Die fünf gefärbten Kästchen",
            "correct": false,
            "why": "Die fünf sind der Zähler und geben die Zahl der Sechstelgruppen an, nicht das Ganze."
          }
        ]
      },
      "2": {
        "question": "Wie viele Kästchen enthält ein Sechstel?",
        "choices": [
          {
            "label": "18 : 6",
            "correct": true,
            "why": "Sechs gleich große Gruppen bilden die gesamte Fläche."
          },
          {
            "label": "18 : 5",
            "correct": false,
            "why": "Fünf Gruppen werden später genommen, aber die Einteilung erfolgt in sechs Teile."
          }
        ]
      },
      "3": {
        "question": "Wie viele Kästchen gehören zu fünf Sechsteln?",
        "choices": [
          {
            "label": "Ein Sechstel mal 5",
            "correct": true,
            "why": "Der Zähler fünf zählt fünf gleich große Sechstelgruppen."
          },
          {
            "label": "Ein Sechstel mal 6",
            "correct": false,
            "why": "Sechs Sechstel wären das ganze Rechteck, nicht der gesuchte Anteil."
          }
        ]
      }
    }
  },
  "gleichwertig": {
    "1": {
      "1": {
        "question": "Was darfst du beim Erweitern verändern?",
        "choices": [
          {
            "label": "Zähler und Nenner mit derselben Zahl multiplizieren",
            "correct": true,
            "why": "Das passt: Jedes Stück wird feiner geteilt, aber der gefärbte Anteil bleibt gleich."
          },
          {
            "label": "Nur den Zähler verdoppeln",
            "correct": false,
            "why": "Das passt nicht: Dann werden mehr Teile gezählt, ohne die Teile zu verkleinern. Der Wert ändert sich."
          }
        ]
      },
      "2": {
        "question": "Welche Malzahl gehört zum Zähler?",
        "choices": [
          {
            "label": "Die gleiche Malzahl wie beim Nenner",
            "correct": true,
            "why": "Das passt, weil beim Erweitern oben und unten derselbe Faktor gilt."
          },
          {
            "label": "Eine beliebige andere Zahl",
            "correct": false,
            "why": "Das passt nicht: Zwei verschiedene Faktoren würden den Bruchwert verändern."
          }
        ]
      },
      "3": {
        "question": "Was muss beim Nenner passieren?",
        "choices": [
          {
            "label": "Ebenfalls mal 2 rechnen",
            "correct": true,
            "why": "Das passt: Die drei ursprünglichen Stücke werden jeweils in zwei kleinere Teile geteilt."
          },
          {
            "label": "Den Nenner unverändert lassen",
            "correct": false,
            "why": "Das passt nicht: Vier gefärbte Stücke bei nur drei Gesamtstücken bilden nicht denselben Anteil."
          }
        ]
      },
      "4": {
        "question": "Woran erkennst du, ob das Erweitern richtig war?",
        "choices": [
          {
            "label": "Beide Brüche zeigen denselben Anteil am selben Ganzen",
            "correct": true,
            "why": "Genau: Die Stückzahl ändert sich, die gefärbte Menge bleibt gleich."
          },
          {
            "label": "Der neue Zähler ist größer, also ist auch der Anteil größer",
            "correct": false,
            "why": "Nicht passend: Größere Zahlen oben und unten bedeuten nicht automatisch eine größere Menge."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "Welcher Teiler kürzt 12/16 in einem Schritt vollständig?",
        "choices": [
          {
            "label": "4",
            "correct": true,
            "why": "12 und 16 sind durch 4 teilbar; 3/4 kann nicht weiter gekürzt werden."
          },
          {
            "label": "3",
            "correct": false,
            "why": "16 ist nicht durch 3 teilbar. Kürzen erfordert denselben ganzzahligen Teiler oben und unten."
          }
        ]
      },
      "2": {
        "question": "Was geschieht beim Kürzen mit dem Zähler?",
        "choices": [
          {
            "label": "12 : 4",
            "correct": true,
            "why": "Zähler und Nenner müssen mit derselben Kürzungszahl geteilt werden."
          },
          {
            "label": "12 − 4",
            "correct": false,
            "why": "Subtrahieren verändert den Bruchwert und ist kein Kürzen."
          }
        ]
      },
      "3": {
        "question": "Wie wird der Nenner gekürzt?",
        "choices": [
          {
            "label": "16 : 4",
            "correct": true,
            "why": "Die 4 ist dieselbe Kürzungszahl wie oben; nur so bleibt der Wert gleich."
          },
          {
            "label": "16 : 2",
            "correct": false,
            "why": "Das wäre ein anderer Faktor als beim Zähler und verändert den Wert."
          }
        ]
      },
      "4": {
        "question": "Woran erkennst du vollständig gekürzt?",
        "choices": [
          {
            "label": "3 und 4 haben keinen gemeinsamen Teiler größer als 1",
            "correct": true,
            "why": "Darum kann der neue Bruch nicht weiter mit ganzen Zahlen gekürzt werden."
          },
          {
            "label": "Der Zähler ist kleiner als der Nenner",
            "correct": false,
            "why": "Auch echte Brüche können noch kürzbar sein, etwa 2/4."
          }
        ]
      }
    }
  },
  "gemischt": {
    "1": {
      "1": {
        "question": "Wie viele Viertel bilden ein Ganzes?",
        "choices": [
          {
            "label": "Vier Viertel",
            "correct": true,
            "why": "Das passt: Ein Ganzes ist bei Nenner 4 in vier gleich große Viertel geteilt."
          },
          {
            "label": "Elf Viertel",
            "correct": false,
            "why": "Das ist die gesamte gegebene Zahl an Vierteln, nicht die Größe eines einzelnen Ganzen."
          }
        ]
      },
      "2": {
        "question": "Wie entscheidest du, wie viele ganze Vierergruppen in 11 passen?",
        "choices": [
          {
            "label": "Zwei Gruppen mit je vier Vierteln",
            "correct": true,
            "why": "Das passt: Zwei Vierergruppen brauchen acht Viertel; eine dritte würde zwölf benötigen."
          },
          {
            "label": "Drei Gruppen mit je vier Vierteln",
            "correct": false,
            "why": "Das passt nicht: Für drei Ganze bräuchtest du zwölf Viertel, aber nur elf sind vorhanden."
          }
        ]
      },
      "3": {
        "question": "Was wird nach den zwei vollen Gruppen gesucht?",
        "choices": [
          {
            "label": "Die übrig gebliebenen Viertel",
            "correct": true,
            "why": "Das passt: Von den elf Vierteln sind acht in den Ganzen enthalten. Der Rest gehört in den Bruchteil."
          },
          {
            "label": "Ein neuer Nenner",
            "correct": false,
            "why": "Das passt nicht: Die Stücke bleiben Viertel. Der Nenner beschreibt weiterhin die Größe eines Stücks."
          }
        ]
      },
      "4": {
        "question": "Wo steht der Rest in der gemischten Zahl?",
        "choices": [
          {
            "label": "Als Zähler des Restbruchs",
            "correct": true,
            "why": "Das passt: Nach den Ganzen schreibst du die übrigen Viertel; der Nenner bleibt vier."
          },
          {
            "label": "Als Nenner des Restbruchs",
            "correct": false,
            "why": "Das passt nicht: Dadurch würdest du die Stückgröße ändern, obwohl weiterhin Viertel vorliegen."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "Wie viele Fünftel bilden ein Ganzes?",
        "choices": [
          {
            "label": "5/5",
            "correct": true,
            "why": "Bei Nenner fünf enthält jedes Ganze genau fünf Fünftel."
          },
          {
            "label": "1/5",
            "correct": false,
            "why": "Ein Fünftel ist nur ein Teil eines Ganzen."
          }
        ]
      },
      "2": {
        "question": "Wie viele Fünftel stecken in drei Ganzen?",
        "choices": [
          {
            "label": "3 · 5",
            "correct": true,
            "why": "Jedes der drei Ganzen besteht aus fünf Fünfteln."
          },
          {
            "label": "3 + 5",
            "correct": false,
            "why": "Die Addition zählt nicht fünf Teile für jedes der drei Ganzen."
          }
        ]
      },
      "3": {
        "question": "Was kommt zu den Fünfteln der Ganzen hinzu?",
        "choices": [
          {
            "label": "Die zwei zusätzlichen Fünftel",
            "correct": true,
            "why": "Sie stehen als Bruchteil in der ursprünglichen gemischten Zahl."
          },
          {
            "label": "Noch zwei Ganze",
            "correct": false,
            "why": "Die 2 ist Zähler des Restbruchs und zählt Fünftel, keine Ganzen."
          }
        ]
      },
      "4": {
        "question": "Was bleibt beim unechten Bruch unverändert?",
        "choices": [
          {
            "label": "Der Nenner 5",
            "correct": true,
            "why": "Die Stückgröße bleibt Fünftel, nur die Gesamtzahl der Fünftel steht oben."
          },
          {
            "label": "Der Zähler 2",
            "correct": false,
            "why": "Der Zähler muss jetzt alle Fünftel aus den Ganzen und dem Rest zählen."
          }
        ]
      }
    },
    "101": {
      "1": {
        "question": "Wie viel ist ein ganzer Streifen bei Dritteln?",
        "choices": [
          {
            "label": "Drei Drittel",
            "correct": true,
            "why": "Ein Ganzes besteht aus drei gleich großen Drittelteilen."
          },
          {
            "label": "Ein Drittel",
            "correct": false,
            "why": "Das ist nur ein Drittel eines Streifens."
          }
        ]
      },
      "2": {
        "question": "Was zeigen die zwei Drittel neben dem Ganzen?",
        "choices": [
          {
            "label": "Zwei von drei Teilen eines zweiten Streifens",
            "correct": true,
            "why": "Der Bruchteil gehört zu einem weiteren, gleich großen Streifen."
          },
          {
            "label": "Zwei zusätzliche ganze Streifen",
            "correct": false,
            "why": "Die zwei ist der Zähler des Bruchteils und zählt keine Ganzen."
          }
        ]
      },
      "3": {
        "question": "Wie liest du die gemischte Zahl 1 2/3?",
        "choices": [
          {
            "label": "Ein Ganzes plus zwei Drittel",
            "correct": true,
            "why": "Die ganze Zahl und der Bruchteil werden addiert."
          },
          {
            "label": "Ein Ganzes mal zwei Drittel",
            "correct": false,
            "why": "Bei einer gemischten Zahl ist kein Malzeichen zwischen Ganzem und Bruchteil gemeint."
          }
        ]
      }
    }
  },
  "zahlenstrahl": {
    "1": {
      "1": {
        "question": "Zwischen welchen ganzen Zahlen liegt der gegebene Punkt P?",
        "choices": [
          {
            "label": "Zwischen 0 und 1",
            "correct": true,
            "why": "P liegt sichtbar auf der Strecke zwischen diesen benachbarten ganzen Zahlen."
          },
          {
            "label": "Zwischen 1 und 2",
            "correct": false,
            "why": "Der markierte Punkt liegt links von der 1."
          }
        ]
      },
      "2": {
        "question": "Was zählt der Nenner beim Ablesen?",
        "choices": [
          {
            "label": "Die sechs gleich langen Lücken von 0 bis 1",
            "correct": true,
            "why": "Die Anzahl der Lücken beschreibt die Teilung einer Einheit."
          },
          {
            "label": "Die sieben Teilstriche",
            "correct": false,
            "why": "Die beiden Randstriche begrenzen zusammen mit den inneren Strichen nur sechs Lücken."
          }
        ]
      },
      "3": {
        "question": "Wie groß ist eine einzelne Lücke?",
        "choices": [
          {
            "label": "Ein Sechstel der Einheit",
            "correct": true,
            "why": "Die ganze Einheit wird in sechs gleiche Abschnitte geteilt."
          },
          {
            "label": "Ein Siebtel",
            "correct": false,
            "why": "Sieben Striche bedeuten hier nicht sieben Lücken."
          }
        ]
      },
      "4": {
        "question": "Wie bestimmst du den Zähler des Punkts?",
        "choices": [
          {
            "label": "Vier Lücken von 0 bis P zählen",
            "correct": true,
            "why": "Der Zähler zählt die Sechstellücken bis zum gegebenen Punkt."
          },
          {
            "label": "Alle sechs Lücken zählen",
            "correct": false,
            "why": "Sechs Lücken führen bis zur 1, nicht bis P."
          }
        ]
      },
      "5": {
        "question": "Welche Zahl darfst du zum Kürzen verwenden?",
        "choices": [
          {
            "label": "2 für Zähler und Nenner",
            "correct": true,
            "why": "Sowohl 4 als auch 6 sind durch 2 teilbar; der Bruchwert bleibt gleich."
          },
          {
            "label": "3 für Zähler und Nenner",
            "correct": false,
            "why": "4 ist nicht durch 3 ohne Rest teilbar."
          }
        ]
      },
      "6": {
        "question": "Warum bleibt der Punkt nach dem Kürzen an derselben Stelle?",
        "choices": [
          {
            "label": "4/6 und 2/3 sind gleich viel wert",
            "correct": true,
            "why": "Oben und unten durch denselben Teiler zu teilen verändert den Wert nicht."
          },
          {
            "label": "Der Punkt rückt nach links, weil der Zähler kleiner wird",
            "correct": false,
            "why": "Der kleinere Zähler zählt jetzt größere Drittel; die Lage bleibt unverändert."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "In welchem Bereich liegt drei Viertel?",
        "choices": [
          {
            "label": "Zwischen 0 und 1",
            "correct": true,
            "why": "Drei Viertel sind kleiner als vier Viertel, also kleiner als ein Ganzes."
          },
          {
            "label": "Rechts von 1",
            "correct": false,
            "why": "Dafür müsste der Bruch größer als eins sein."
          }
        ]
      },
      "2": {
        "question": "Welche Strecke wird für den Nenner geteilt?",
        "choices": [
          {
            "label": "Die Einheit von 0 bis 1",
            "correct": true,
            "why": "Diese beiden benachbarten ganzen Zahlen begrenzen ein Ganzes."
          },
          {
            "label": "Die gesamte sichtbare Linie",
            "correct": false,
            "why": "Sie kann mehrere Einheiten enthalten."
          }
        ]
      },
      "3": {
        "question": "Wie viele Lücken brauchst du bei Nenner vier?",
        "choices": [
          {
            "label": "Vier gleich lange Lücken",
            "correct": true,
            "why": "Der Nenner vier legt die Einteilung fest."
          },
          {
            "label": "Drei Lücken",
            "correct": false,
            "why": "Drei ist der Zähler, nicht die Anzahl der Teile einer Einheit."
          }
        ]
      },
      "4": {
        "question": "Wie groß ist eine der vier Lücken?",
        "choices": [
          {
            "label": "Ein Viertel",
            "correct": true,
            "why": "Vier gleich lange Viertel ergeben die ganze Einheit."
          },
          {
            "label": "Ein Drittel",
            "correct": false,
            "why": "Ein Drittel würde die Einheit in drei statt vier Teile teilen."
          }
        ]
      },
      "5": {
        "question": "Wie weit gehst du von null aus?",
        "choices": [
          {
            "label": "Drei Viertellücken nach rechts",
            "correct": true,
            "why": "Der Zähler drei zählt drei der vier gleich großen Lücken."
          },
          {
            "label": "Vier Viertellücken nach rechts",
            "correct": false,
            "why": "Das führt zur 1, nicht zu drei Vierteln."
          }
        ]
      },
      "6": {
        "question": "Wo wird P eingetragen?",
        "choices": [
          {
            "label": "Am Ende des dritten Viertelschritts",
            "correct": true,
            "why": "Bis zur 1 bleibt dann genau ein Viertel übrig."
          },
          {
            "label": "Am dritten Strich einschließlich 0",
            "correct": false,
            "why": "Wer den Nullstrich mitzählt, setzt P eine Lücke zu früh."
          }
        ]
      }
    },
    "101": {
      "1": {
        "question": "Welche Strecke ist genau eine ganze Einheit?",
        "choices": [
          {
            "label": "Von 0 bis 1",
            "correct": true,
            "why": "Die benachbarten ganzen Zahlen begrenzen eine Einheit."
          },
          {
            "label": "Der gesamte sichtbare Zahlenstrahl",
            "correct": false,
            "why": "Die gezeichnete Linie kann über eine Einheit hinausreichen."
          }
        ]
      },
      "2": {
        "question": "Wie teilst du die Einheit in vier gleiche Lücken?",
        "choices": [
          {
            "label": "Drei innere Striche zwischen den Randpunkten",
            "correct": true,
            "why": "Zusammen mit den Randstrichen entstehen vier gleich lange Zwischenräume."
          },
          {
            "label": "Vier neue Striche zwischen den Randpunkten",
            "correct": false,
            "why": "Dann entstehen fünf Lücken, nicht vier."
          }
        ]
      },
      "3": {
        "question": "Wie groß ist eine der vier Lücken?",
        "choices": [
          {
            "label": "1 : 4",
            "correct": true,
            "why": "Eine Einheit wird in vier gleich große Strecken geteilt."
          },
          {
            "label": "4 : 1",
            "correct": false,
            "why": "Das ergäbe vier Ganze, nicht eine Viertelstrecke."
          }
        ]
      },
      "4": {
        "question": "Warum ergeben vier Viertel genau eins?",
        "choices": [
          {
            "label": "Viermal ein Viertel füllt die Einheit",
            "correct": true,
            "why": "Jeder Viertelschritt hat dieselbe Länge; zusammen sind es vier Viertel."
          },
          {
            "label": "Weil fünf Striche zu sehen sind",
            "correct": false,
            "why": "Die Anzahl der Striche ist nicht die Anzahl der Teilstrecken."
          }
        ]
      },
      "5": {
        "question": "Was zählt beim Nenner der Einteilung?",
        "choices": [
          {
            "label": "Die vier Lücken",
            "correct": true,
            "why": "Der Nenner beschreibt die gleich langen Teilstrecken einer Einheit."
          },
          {
            "label": "Die fünf Striche",
            "correct": false,
            "why": "Zwei Randstriche und drei innere Striche begrenzen nur vier Lücken."
          }
        ]
      }
    },
    "104": {
      "1": {
        "question": "Zwischen welchen ganzen Zahlen liegt minus drei Viertel?",
        "choices": [
          {
            "label": "Zwischen minus eins und null",
            "correct": true,
            "why": "Das passt: Ein Betrag kleiner als eins mit Minus liegt links von null, aber rechts von minus eins."
          },
          {
            "label": "Zwischen null und eins",
            "correct": false,
            "why": "Dort liegen positive Brüche. Das Minus zeigt die andere Seite der null."
          }
        ]
      },
      "2": {
        "question": "Wie viele Lücken bilden eine ganze Einheit?",
        "choices": [
          {
            "label": "Vier gleich große Lücken",
            "correct": true,
            "why": "Der Nenner vier beschreibt vier gleiche Teilstrecken der Einheit."
          },
          {
            "label": "Drei gleich große Lücken",
            "correct": false,
            "why": "Die drei gehören zum Zähler: Sie sagen, wie viele Viertelschritte wir später gehen."
          }
        ]
      },
      "3": {
        "question": "Was beschreibt eine einzelne Lücke?",
        "choices": [
          {
            "label": "Ein Viertel der ganzen Einheit",
            "correct": true,
            "why": "Eine von vier gleich langen Lücken ist ein Viertel. Der Abstand selbst ist positiv."
          },
          {
            "label": "Minus ein Viertel als Lückenlänge",
            "correct": false,
            "why": "Eine Strecke hat keinen negativen Abstand. Erst die Richtung macht den späteren Punkt negativ."
          }
        ]
      },
      "4": {
        "question": "Wo beginnst du bei einem negativen Bruch und wohin gehst du?",
        "choices": [
          {
            "label": "Bei null nach links",
            "correct": true,
            "why": "Das passt: Minus bestimmt die Richtung, nicht den Startwert minus eins."
          },
          {
            "label": "Bei minus eins nach rechts",
            "correct": false,
            "why": "Das passt nicht: Von minus eins nach rechts würdest du eine andere Punktlage erhalten."
          }
        ]
      },
      "5": {
        "question": "Was zeigt der erste Viertelschritt?",
        "choices": [
          {
            "label": "Eine Lücke links von null",
            "correct": true,
            "why": "Das passt: Der erste Schritt beginnt bei null und endet am ersten Teilstrich links."
          },
          {
            "label": "Schon den endgültigen Punkt minus drei Viertel",
            "correct": false,
            "why": "Das wäre zu früh: Es fehlen noch zwei weitere Viertelschritte."
          }
        ]
      },
      "6": {
        "question": "Wie weit musst du insgesamt von null nach links gehen?",
        "choices": [
          {
            "label": "Drei Viertellücken",
            "correct": true,
            "why": "Das passt: Die drei im Zähler gibt die Anzahl der gleich langen Viertelschritte an."
          },
          {
            "label": "Vier Viertellücken",
            "correct": false,
            "why": "Dann wärst du bei minus eins. Gesucht sind nur drei Viertel."
          }
        ]
      },
      "7": {
        "question": "Wo liegt der Punkt nach dem dritten Schritt?",
        "choices": [
          {
            "label": "Bei minus drei Vierteln",
            "correct": true,
            "why": "Das passt: Drei Viertellücken links von null sind minus drei Viertel."
          },
          {
            "label": "Bei plus drei Vierteln",
            "correct": false,
            "why": "Die Entfernung wäre zwar gleich groß, aber die Richtung falsch."
          }
        ]
      }
    }
  },
  "quotienten": {
    "1": {
      "1": {
        "question": "Wie wird 18 : 12 als Bruch geschrieben?",
        "choices": [
          {
            "label": "18/12",
            "correct": true,
            "why": "Der Dividend steht oben und der Divisor unten."
          },
          {
            "label": "12/18",
            "correct": false,
            "why": "Die Reihenfolge zu vertauschen verändert den Wert."
          }
        ]
      },
      "2": {
        "question": "Welcher gemeinsame Teiler führt sofort zum vollständig gekürzten Bruch?",
        "choices": [
          {
            "label": "6",
            "correct": true,
            "why": "18 : 6 = 3 und 12 : 6 = 2. Beide Zahlen sind ohne Rest teilbar."
          },
          {
            "label": "12",
            "correct": false,
            "why": "18 ist nicht durch 12 ohne Rest teilbar."
          }
        ]
      },
      "3": {
        "question": "Was muss beim Kürzen gleich sein?",
        "choices": [
          {
            "label": "Der Teiler oben und unten",
            "correct": true,
            "why": "Nur so bleibt der Wert des Bruchs erhalten."
          },
          {
            "label": "Das Ergebnis oben und unten",
            "correct": false,
            "why": "Zähler und Nenner dürfen unterschiedliche Ergebnisse haben."
          }
        ]
      },
      "4": {
        "question": "Wie viele ganze Zweiergruppen stecken in drei Halben?",
        "choices": [
          {
            "label": "Eine ganze Zweiergruppe mit einem Halb Rest",
            "correct": true,
            "why": "Zwei Halbe ergeben ein Ganzes; ein Halb bleibt."
          },
          {
            "label": "Zwei Ganze",
            "correct": false,
            "why": "Für zwei Ganze bräuchtest du vier Halbe."
          }
        ]
      },
      "5": {
        "question": "Wie werden die drei Halben als gemischte Zahl geschrieben?",
        "choices": [
          {
            "label": "Ein Ganzes und ein Halb",
            "correct": true,
            "why": "Zwei Halbe sind ein Ganzes; das dritte Halb bleibt."
          },
          {
            "label": "Drei Ganze und zwei Halbe",
            "correct": false,
            "why": "Das wäre viel mehr als die ursprünglichen drei Halbe."
          }
        ]
      }
    },
    "101": {
      "1": {
        "question": "Welche beiden Angaben gehören zur Geteilt-Aufgabe?",
        "choices": [
          {
            "label": "Drei Tafeln geteilt durch vier Kinder",
            "correct": true,
            "why": "Das passt: Die Menge wird gerecht auf die vier Empfänger verteilt."
          },
          {
            "label": "Vier Kinder geteilt durch drei Tafeln",
            "correct": false,
            "why": "Das vertauscht die Rollen: Gesucht ist die Tafelmenge pro Kind, nicht Kinder pro Tafel."
          }
        ]
      },
      "2": {
        "question": "Wie teilst du jede Tafel fair auf?",
        "choices": [
          {
            "label": "In vier gleich große Stücke",
            "correct": true,
            "why": "Das passt: Jedes der vier Kinder soll von jeder Tafel ein gleich großes Stück erhalten."
          },
          {
            "label": "In drei gleich große Stücke",
            "correct": false,
            "why": "Drei Teile reichen für vier Kinder nicht aus, wenn jedes Kind gleich viel von jeder Tafel bekommen soll."
          }
        ]
      },
      "3": {
        "question": "Wie erhält jedes Kind seinen Anteil aus allen drei Tafeln?",
        "choices": [
          {
            "label": "Je ein Viertel von jeder Tafel",
            "correct": true,
            "why": "Das passt: Alle vier Kinder erhalten von jeder der drei Tafeln den gleichen Anteil."
          },
          {
            "label": "Eine ganze Tafel und die anderen nichts",
            "correct": false,
            "why": "Das passt nicht: Dann bekämen die Kinder unterschiedlich viel."
          }
        ]
      },
      "4": {
        "question": "Wie schreibst du die gerechte Verteilung als Bruch?",
        "choices": [
          {
            "label": "Gesamtmenge oben, Kinderzahl unten",
            "correct": true,
            "why": "Das passt: Die drei Tafeln werden durch vier Empfänger geteilt, also drei Viertel pro Kind."
          },
          {
            "label": "Kinderzahl oben, Gesamtmenge unten",
            "correct": false,
            "why": "Das passt nicht: Der Bruchstrich ersetzt das Geteiltzeichen, ohne die Reihenfolge zu vertauschen."
          }
        ]
      }
    },
    "103": {
      "1": {
        "question": "Welche Zahl steht am Anfang der Division für 7/5?",
        "choices": [
          {
            "label": "Die 7 aus dem Zähler",
            "correct": true,
            "why": "Der Zähler steht beim Bruchstrich als Dividend vor dem Geteiltzeichen."
          },
          {
            "label": "Die 5 aus dem Nenner",
            "correct": false,
            "why": "Die 5 ist der Divisor und steht nach dem Geteiltzeichen."
          }
        ]
      },
      "2": {
        "question": "Welche Zahl steht nach dem Geteiltzeichen?",
        "choices": [
          {
            "label": "Die 5 aus dem Nenner",
            "correct": true,
            "why": "Der Nenner bezeichnet die Anzahl der gleich großen Teile bzw. Empfänger."
          },
          {
            "label": "Die 7",
            "correct": false,
            "why": "Die 7 wird verteilt und steht vor dem Geteiltzeichen."
          }
        ]
      },
      "3": {
        "question": "Welche Geteilt-Aufgabe bedeutet 7/5?",
        "choices": [
          {
            "label": "7 : 5",
            "correct": true,
            "why": "Sieben Ganze werden auf fünf Empfänger gleichmäßig verteilt."
          },
          {
            "label": "5 : 7",
            "correct": false,
            "why": "Vertauschen verändert den Bruchwert."
          }
        ]
      }
    },
    "104": {
      "1": {
        "question": "Welches Vorzeichen hat (−6) : 8?",
        "choices": [
          {
            "label": "Minus",
            "correct": true,
            "why": "Negative Zahl durch positive Zahl ergibt eine negative Zahl."
          },
          {
            "label": "Plus",
            "correct": false,
            "why": "Ein positives Ergebnis entsteht hier nicht, weil die Vorzeichen verschieden sind."
          }
        ]
      },
      "2": {
        "question": "Wie schreibst du (−6) : 8 als Bruch?",
        "choices": [
          {
            "label": "−6/8",
            "correct": true,
            "why": "Die 6 steht als Dividend oben, die 8 als Divisor unten; das Minus gilt für den Bruch."
          },
          {
            "label": "6/8",
            "correct": false,
            "why": "Ohne das Minus wäre das Ergebnis positiv und nicht mehr dieselbe Zahl."
          }
        ]
      },
      "3": {
        "question": "Welche Kürzungszahl passt für 6 und 8?",
        "choices": [
          {
            "label": "2",
            "correct": true,
            "why": "Beide Zahlen lassen sich durch zwei teilen; das Minus bleibt stehen."
          },
          {
            "label": "3",
            "correct": false,
            "why": "Acht lässt sich nicht ohne Rest durch drei teilen."
          }
        ]
      },
      "4": {
        "question": "Wann ist das Ergebnis vollständig gekürzt?",
        "choices": [
          {
            "label": "Bei −3/4",
            "correct": true,
            "why": "Drei und vier haben keinen gemeinsamen Teiler größer als eins."
          },
          {
            "label": "Bei −6/8",
            "correct": false,
            "why": "Zähler und Nenner haben noch den gemeinsamen Teiler zwei."
          }
        ]
      }
    }
  },
  "vergleichen": {
    "1": {
      "1": {
        "question": "Was entscheidet bei 2/9 und 7/9?",
        "choices": [
          {
            "label": "Die Zähler 2 und 7",
            "correct": true,
            "why": "Beide Brüche zählen gleich große Neuntel; sieben davon sind mehr als zwei."
          },
          {
            "label": "Der Nenner 9",
            "correct": false,
            "why": "Der Nenner ist gleich und kann deshalb den Größenunterschied nicht erklären."
          }
        ]
      },
      "2": {
        "question": "Welches Zeichen passt zwischen 2/9 und 7/9?",
        "choices": [
          {
            "label": "<",
            "correct": true,
            "why": "Zwei Neuntel sind weniger als sieben Neuntel."
          },
          {
            "label": " >",
            "correct": false,
            "why": "Die linke Zahl hat weniger gleich große Stücke, sie ist nicht größer."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "Welches Teilstück ist größer, wenn das Ganze gleich groß bleibt?",
        "choices": [
          {
            "label": "Ein Drittel ist größer als ein Sechstel",
            "correct": true,
            "why": "Weniger Teilstücke pro Ganzem bedeutet größere Einzelstücke."
          },
          {
            "label": "Ein Sechstel ist größer",
            "correct": false,
            "why": "Sechs Teile eines Ganzen sind kleiner als drei Teile desselben Ganzen."
          }
        ]
      },
      "2": {
        "question": "Welcher Anteil ist bei jeweils zwei Stücken größer?",
        "choices": [
          {
            "label": "Zwei Drittel",
            "correct": true,
            "why": "Zwei größere Drittelstücke sind mehr als zwei kleinere Sechstelstücke."
          },
          {
            "label": "Zwei Sechstel",
            "correct": false,
            "why": "Die Anzahl der Stücke ist gleich; die Größe der Stücke entscheidet."
          }
        ]
      }
    },
    "3": {
      "1": {
        "question": "Wie vergleichst du zunächst Halbe und Drittel?",
        "choices": [
          {
            "label": "Eine gemeinsame Stückgröße finden",
            "correct": true,
            "why": "Das passt: Verschiedene Nenner bedeuten zunächst verschieden große Teilstücke."
          },
          {
            "label": "Sofort nur die Zähler vergleichen",
            "correct": false,
            "why": "Das passt nicht: Ein Halbes und ein Drittel sind unterschiedlich große Stücke."
          }
        ]
      },
      "2": {
        "question": "Welche Zahl hilft, aus Halben Sechstel zu machen?",
        "choices": [
          {
            "label": "Oben und unten mit 3 multiplizieren",
            "correct": true,
            "why": "Das passt, weil aus zwei Halben sechs gleich große Sechstel werden."
          },
          {
            "label": "Nur den Nenner mit 3 multiplizieren",
            "correct": false,
            "why": "Das passt nicht: Dadurch würde die ursprüngliche Menge kleiner, statt gleichwertig zu bleiben."
          }
        ]
      },
      "3": {
        "question": "Wie werden Drittel zu Sechsteln?",
        "choices": [
          {
            "label": "Oben und unten mit 2 multiplizieren",
            "correct": true,
            "why": "Das passt: Jedes Drittel wird in zwei Sechstel zerlegt, ohne den Wert zu ändern."
          },
          {
            "label": "Nur den Zähler verdoppeln",
            "correct": false,
            "why": "Das passt nicht: Ohne gleichzeitige Teilung der Stückgröße ändert sich der Bruchwert."
          }
        ]
      },
      "4": {
        "question": "Was darfst du nun direkt vergleichen?",
        "choices": [
          {
            "label": "Die Zähler bei gleichem Nenner",
            "correct": true,
            "why": "Das passt, weil beide Angaben jetzt gleich große Sechstel zählen."
          },
          {
            "label": "Die Nenner, obwohl sie jetzt gleich sind",
            "correct": false,
            "why": "Das entscheidet nichts: Die Nenner sind gleich, maßgeblich sind nun die unterschiedlich vielen Sechstel."
          }
        ]
      },
      "5": {
        "question": "Warum gilt das Vergleichszeichen auch für die ursprünglichen Brüche?",
        "choices": [
          {
            "label": "Erweitern erhält den Wert",
            "correct": true,
            "why": "Das passt: Die Brüche wurden nur anders geschrieben, nicht größer oder kleiner gemacht."
          },
          {
            "label": "Erweitern vergrößert den Bruchwert",
            "correct": false,
            "why": "Das passt nicht: Ein korrekt erweiteter Bruch ist genau gleich viel wert wie zuvor."
          }
        ]
      }
    },
    "4": {
      "1": {
        "question": "Wie wird aus dem Nenner fünf der Nenner zehn?",
        "choices": [
          {
            "label": "Mal zwei",
            "correct": true,
            "why": "Fünf Teile werden jeweils in zwei kleinere Teile zerlegt."
          },
          {
            "label": "Plus fünf nur im Nenner",
            "correct": false,
            "why": "Nur den Nenner zu verändern ändert den Bruchwert."
          }
        ]
      },
      "2": {
        "question": "Wie bleibt drei Fünftel gleich viel wert?",
        "choices": [
          {
            "label": "Zähler und Nenner mal zwei",
            "correct": true,
            "why": "Aus drei Fünfteln werden sechs Zehntel, die gleich viel wert sind."
          },
          {
            "label": "Nur den Zähler verdoppeln",
            "correct": false,
            "why": "Dann wäre der Anteil größer als vorher."
          }
        ]
      },
      "3": {
        "question": "Welches Zeichen passt zwischen 3/5 und 6/10?",
        "choices": [
          {
            "label": "=",
            "correct": true,
            "why": "Beide Brüche beschreiben dieselbe Menge desselben Ganzen."
          },
          {
            "label": "<",
            "correct": false,
            "why": "Drei Fünftel sind nicht kleiner als sechs Zehntel, sondern gleich groß."
          }
        ]
      }
    }
  },
  "dezimal": {
    "1": {
      "1": {
        "question": "An welcher Stelle stehen neun Hundertstel?",
        "choices": [
          {
            "label": "An der zweiten Stelle nach dem Komma",
            "correct": true,
            "why": "Die erste Nachkommastelle zählt Zehntel, die zweite Hundertstel."
          },
          {
            "label": "An der ersten Stelle nach dem Komma",
            "correct": false,
            "why": "Das wären neun Zehntel und damit zehnmal so viel."
          }
        ]
      },
      "2": {
        "question": "Wie schreibst du 9/100 als Kommazahl?",
        "choices": [
          {
            "label": "0,09",
            "correct": true,
            "why": "Es gibt null Zehntel und neun Hundertstel."
          },
          {
            "label": "0,9",
            "correct": false,
            "why": "Das sind neun Zehntel, also neunzig Hundertstel."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "Welche Stückgröße kann bei Fünfteln helfen?",
        "choices": [
          {
            "label": "Zehntel, weil 5 mal 2 gleich 10 ist",
            "correct": true,
            "why": "Das passt: Jeder der fünf Teile wird in zwei Zehntel zerlegt."
          },
          {
            "label": "Nur den Zähler verändern",
            "correct": false,
            "why": "Das passt nicht: Beim Erweitern müssen Zähler und Nenner mit demselben Faktor geändert werden."
          }
        ]
      },
      "2": {
        "question": "Wie bleibt der neue Bruch gleich viel wert?",
        "choices": [
          {
            "label": "Oben und unten mal 2",
            "correct": true,
            "why": "Das passt: Zwei Fünftel werden so zu vier Zehnteln."
          },
          {
            "label": "Nur unten mal 2",
            "correct": false,
            "why": "Das passt nicht: Das würde den Wert halbieren, statt ihn nur anders zu schreiben."
          }
        ]
      },
      "3": {
        "question": "Was bedeutet der Nenner 10 in der Kommaschreibweise?",
        "choices": [
          {
            "label": "Eine Stelle nach dem Komma zeigt Zehntel",
            "correct": true,
            "why": "Das passt: Vier Zehntel kannst du als null Komma vier schreiben."
          },
          {
            "label": "Zwei Stellen nach dem Komma sind zwingend",
            "correct": false,
            "why": "Das passt nicht: Zwei Stellen sind typisch für Hundertstel; hier sind Zehntel gegeben."
          }
        ]
      }
    },
    "4": {
      "1": {
        "question": "Was bedeutet die eine Nachkommastelle bei 0,6?",
        "choices": [
          {
            "label": "Sechs Zehntel",
            "correct": true,
            "why": "Die erste Stelle nach dem Komma zählt Zehntel."
          },
          {
            "label": "Sechs Hundertstel",
            "correct": false,
            "why": "Hundertstel stehen an der zweiten Nachkommastelle."
          }
        ]
      },
      "2": {
        "question": "Wie schreibst du 0,6 als Bruch?",
        "choices": [
          {
            "label": "6/10",
            "correct": true,
            "why": "Die sechs Zehntel werden als Zähler sechs und Nenner zehn geschrieben."
          },
          {
            "label": "6/100",
            "correct": false,
            "why": "Das wären sechs Hundertstel, also 0,06."
          }
        ]
      },
      "3": {
        "question": "Wie kürzt du 6/10 vollständig?",
        "choices": [
          {
            "label": "Zähler und Nenner durch 2",
            "correct": true,
            "why": "Aus 6/10 wird 3/5; drei und fünf haben keinen gemeinsamen Teiler größer als eins."
          },
          {
            "label": "Nur den Nenner durch 2",
            "correct": false,
            "why": "Das würde den Wert verdoppeln statt ihn gleichwertig zu schreiben."
          }
        ]
      }
    },
    "6": {
      "1": {
        "question": "Wie schreibst du ein Ganzes in Zehnteln?",
        "choices": [
          {
            "label": "10/10",
            "correct": true,
            "why": "Zehn Zehntel ergeben genau eins."
          },
          {
            "label": "1/10",
            "correct": false,
            "why": "Ein Zehntel ist kleiner als eins."
          }
        ]
      },
      "2": {
        "question": "Wie viele Zehntel sind ein Ganzes und vier Zehntel?",
        "choices": [
          {
            "label": "Zehn Zehntel plus vier Zehntel",
            "correct": true,
            "why": "Beide Mengen zählen gleich große Zehntelstücke."
          },
          {
            "label": "Ein Ganzes plus vier Ganze",
            "correct": false,
            "why": "Die vier hinter dem Komma sind Zehntel, keine Ganzen."
          }
        ]
      },
      "3": {
        "question": "Wie kürzt du 14/10 vollständig?",
        "choices": [
          {
            "label": "Oben und unten durch 2",
            "correct": true,
            "why": "Das ergibt 7/5 und erhält den Wert 1,4."
          },
          {
            "label": "Nur oben durch 2",
            "correct": false,
            "why": "Das verändert den Wert des Bruchs."
          }
        ]
      }
    }
  },
  "dezimalvergleich": {
    "1": {
      "1": {
        "question": "Darfst du an 0,56 eine Null anhängen?",
        "choices": [
          {
            "label": "Ja, eine Endnull verändert den Wert nicht",
            "correct": true,
            "why": "Das passt: 0,56 und 0,560 liegen auf derselben Stelle."
          },
          {
            "label": "Nein, dadurch wird die Zahl zehnmal größer",
            "correct": false,
            "why": "Das passt nicht: Die Null rechts hinter den Nachkommastellen fügt keinen Wert hinzu."
          }
        ]
      },
      "2": {
        "question": "Welche Stelle entscheidet zuerst bei 0,560 und 0,527?",
        "choices": [
          {
            "label": "Die Hundertstel nach gleichen Zehnteln",
            "correct": true,
            "why": "Das passt: Beide haben fünf Zehntel; sechs Hundertstel sind mehr als zwei."
          },
          {
            "label": "Die Tausendstel vor den Hundertsteln",
            "correct": false,
            "why": "Das passt nicht: Vergleiche Stellenwerte von links nach rechts. Die Hundertstel unterscheiden sich bereits."
          }
        ]
      },
      "3": {
        "question": "Welche Begründung für das Vergleichszeichen ist richtig?",
        "choices": [
          {
            "label": "Der erste unterschiedliche Stellenwert entscheidet",
            "correct": true,
            "why": "Das passt: Bei gleichen Zehnteln sind die Hundertstel ausschlaggebend."
          },
          {
            "label": "Die Zahl mit mehr Nachkommastellen ist größer",
            "correct": false,
            "why": "Das passt nicht: Die Anzahl der Nachkommastellen allein verrät den Wert nicht."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "Was ist 0,7 als Bruch?",
        "choices": [
          {
            "label": "7/10",
            "correct": true,
            "why": "Die sieben steht an der Zehntelstelle."
          },
          {
            "label": "7/100",
            "correct": false,
            "why": "Das wären sieben Hundertstel, also 0,07."
          }
        ]
      },
      "2": {
        "question": "Was bedeutet 0,700?",
        "choices": [
          {
            "label": "700/1000",
            "correct": true,
            "why": "Drei Nachkommastellen entsprechen Tausendsteln; die Endnullen ändern den Wert nicht."
          },
          {
            "label": "700/100",
            "correct": false,
            "why": "Das wären sieben Ganze statt sieben Zehntel."
          }
        ]
      },
      "3": {
        "question": "Wie vergleichst du 0,7 und 0,700?",
        "choices": [
          {
            "label": "Mit dem Gleichheitszeichen",
            "correct": true,
            "why": "Beide Zahlen sind sieben Zehntel und liegen am selben Ort."
          },
          {
            "label": "0,700 ist größer",
            "correct": false,
            "why": "Mehr geschriebene Nachkommastellen machen den Wert nicht größer."
          }
        ]
      }
    },
    "6": {
      "1": {
        "question": "Wie kannst du zwischen 0,7 und 0,8 feinere Stellen nutzen?",
        "choices": [
          {
            "label": "0,70 und 0,80 vergleichen",
            "correct": true,
            "why": "Die Endnullen verändern die Werte nicht, erlauben aber Hundertstel dazwischen."
          },
          {
            "label": "0,7 und 0,8 sind benachbart ohne Zwischenzahl",
            "correct": false,
            "why": "Zwischen verschiedenen Dezimalzahlen gibt es weitere Werte."
          }
        ]
      },
      "2": {
        "question": "Welche Zahl liegt streng zwischen den Grenzen?",
        "choices": [
          {
            "label": "0,75",
            "correct": true,
            "why": "75 Hundertstel liegen über 70 und unter 80 Hundertsteln."
          },
          {
            "label": "0,80",
            "correct": false,
            "why": "Das ist die obere Grenze und liegt nicht streng dazwischen."
          }
        ]
      },
      "3": {
        "question": "Wie kontrollierst du die gewählte Zwischenzahl?",
        "choices": [
          {
            "label": "0,70 < 0,75 < 0,80",
            "correct": true,
            "why": "Beide strengen Ungleichungen müssen gelten."
          },
          {
            "label": "0,75 = 0,80",
            "correct": false,
            "why": "Die gewählte Zahl ist kleiner als die obere Grenze."
          }
        ]
      }
    },
    "7": {
      "1": {
        "question": "Warum darfst du 0,74 als 0,740 schreiben?",
        "choices": [
          {
            "label": "Die zusätzliche Endnull ändert den Wert nicht",
            "correct": true,
            "why": "Sie ergänzt nur eine weitere Nachkommastelle mit Wert null."
          },
          {
            "label": "Weil 0,740 größer als 0,74 ist",
            "correct": false,
            "why": "Eine Endnull verändert keine Zahl."
          }
        ]
      },
      "2": {
        "question": "Welche Zahl ist kleiner: 0,700 oder 0,704?",
        "choices": [
          {
            "label": "0,700",
            "correct": true,
            "why": "Zehntel und Hundertstel sind gleich; null Tausendstel sind weniger als vier."
          },
          {
            "label": "0,704",
            "correct": false,
            "why": "Vier Tausendstel sind mehr als null Tausendstel."
          }
        ]
      },
      "3": {
        "question": "Welche der drei Zahlen ist am größten?",
        "choices": [
          {
            "label": "0,740",
            "correct": true,
            "why": "Vier Hundertstel sind mehr als null Hundertstel der beiden anderen Zahlen."
          },
          {
            "label": "0,704",
            "correct": false,
            "why": "Vier Tausendstel sind kleiner als vier Hundertstel."
          }
        ]
      },
      "4": {
        "question": "Was passiert, wenn du die ergänzten Endnullen wieder weglässt?",
        "choices": [
          {
            "label": "Die Reihenfolge bleibt gleich",
            "correct": true,
            "why": "Endnullen verändern keinen Stellenwert und damit auch keinen Vergleich."
          },
          {
            "label": "Die Reihenfolge kehrt sich um",
            "correct": false,
            "why": "Durch Weglassen von Endnullen ändern sich die Zahlenwerte nicht."
          }
        ]
      }
    }
  },
  "groessen": {
    "1": {
      "1": {
        "question": "Was passiert mit der Maßzahl, wenn du Meter in Zentimeter umrechnest?",
        "choices": [
          {
            "label": "Sie wird größer, weil Zentimeter kleinere Einheiten sind",
            "correct": true,
            "why": "Das passt: Dieselbe Strecke braucht mehr Zentimeter als Meter."
          },
          {
            "label": "Sie wird kleiner, weil Zentimeter kleiner sind",
            "correct": false,
            "why": "Das passt nicht: Je kleiner die Einheit, desto mehr Einheiten brauchst du für dieselbe Strecke."
          }
        ]
      },
      "2": {
        "question": "Welcher Umrechnungsfaktor gilt von Meter zu Zentimeter?",
        "choices": [
          {
            "label": "100",
            "correct": true,
            "why": "Das passt: Ein Meter besteht aus hundert Zentimetern."
          },
          {
            "label": "10",
            "correct": false,
            "why": "Das wäre nur ein Schritt zu Dezimetern. Von Metern zu Zentimetern sind es zwei Zehnerschritte."
          }
        ]
      },
      "3": {
        "question": "Welche Einheit gehört zum Ergebnis?",
        "choices": [
          {
            "label": "cm",
            "correct": true,
            "why": "Das passt: Genau diese Zieleinheit war gefragt; die Länge bleibt unverändert."
          },
          {
            "label": "m",
            "correct": false,
            "why": "Das passt nicht: Die Aufgabe verlangt eine Angabe in Zentimetern, nicht erneut in Metern."
          }
        ]
      }
    },
    "2": {
      "1": {
        "question": "Wie viele Gramm sind ein Kilogramm?",
        "choices": [
          {
            "label": "1000 g",
            "correct": true,
            "why": "Ein Kilogramm besteht aus tausend Gramm."
          },
          {
            "label": "100 g",
            "correct": false,
            "why": "Hundert Gramm sind nur ein Zehntel Kilogramm."
          }
        ]
      },
      "2": {
        "question": "Wie rechnest du 0,32 kg in Gramm um?",
        "choices": [
          {
            "label": "0,32 · 1000",
            "correct": true,
            "why": "Gramm sind kleinere Einheiten; für dieselbe Masse wird die Maßzahl tausendmal so groß."
          },
          {
            "label": "0,32 : 1000",
            "correct": false,
            "why": "Dann würde die Maßzahl kleiner, obwohl die Zieleinheit kleiner ist."
          }
        ]
      },
      "3": {
        "question": "Welche Einheit gehört zu 320?",
        "choices": [
          {
            "label": "Gramm",
            "correct": true,
            "why": "Die Aufgabe verlangt die Masse in Gramm."
          },
          {
            "label": "Kilogramm",
            "correct": false,
            "why": "320 kg wären eine tausendmal größere Masse."
          }
        ]
      }
    },
    "12": {
      "1": {
        "question": "Wie viele Minuten enthält eine Stunde?",
        "choices": [
          {
            "label": "60 Minuten",
            "correct": true,
            "why": "Die Zeitumrechnung beginnt mit der festen Beziehung 1 h = 60 min."
          },
          {
            "label": "100 Minuten",
            "correct": false,
            "why": "Stunden werden in 60 Minuten geteilt, nicht in 100."
          }
        ]
      },
      "2": {
        "question": "Wie berechnest du 0,25 Stunden in Minuten?",
        "choices": [
          {
            "label": "60 : 4",
            "correct": true,
            "why": "0,25 bedeutet ein Viertel einer Stunde; ein Viertel von 60 Minuten ergibt die Minutenanzahl."
          },
          {
            "label": "25 Minuten",
            "correct": false,
            "why": "0,25 ist ein Viertel, nicht die Anzahl der Minuten."
          }
        ]
      },
      "3": {
        "question": "Wie berechnest du die gesamte Zeit in Minuten?",
        "choices": [
          {
            "label": "60 Minuten plus das berechnete Viertel",
            "correct": true,
            "why": "1,25 h besteht aus einer ganzen Stunde und einem Viertel."
          },
          {
            "label": "Nur das Viertel",
            "correct": false,
            "why": "Dann fehlt die ganze Stunde."
          }
        ]
      },
      "4": {
        "question": "Wie viele Sekunden sind ein Viertel einer Minute?",
        "choices": [
          {
            "label": "60 : 4",
            "correct": true,
            "why": "Eine Minute hat 60 Sekunden; durch vier erhältst du ein Viertel."
          },
          {
            "label": "60 : 3",
            "correct": false,
            "why": "Das wäre ein Drittel, nicht ein Viertel."
          }
        ]
      },
      "5": {
        "question": "Wie berechnest du drei Viertel einer Minute?",
        "choices": [
          {
            "label": "Ein Viertel mal 3",
            "correct": true,
            "why": "Der Zähler drei zählt drei gleich große Viertel."
          },
          {
            "label": "Ein Viertel mal 4",
            "correct": false,
            "why": "Vier Viertel wären die ganze Minute."
          }
        ]
      }
    },
    "13": {
      "1": {
        "question": "Was machst du mit zwei halben Kästchen?",
        "choices": [
          {
            "label": "Zu einem ganzen Kästchen zusammensetzen",
            "correct": true,
            "why": "Zwei Hälften derselben Kästchengröße ergeben ein ganzes Kästchen."
          },
          {
            "label": "Als zwei ganze Kästchen zählen",
            "correct": false,
            "why": "Jede Hälfte ist nur halb so groß wie ein Kästchen."
          }
        ]
      },
      "2": {
        "question": "Wie viele ganze Kästchen ergeben vier ganze und zwei halbe?",
        "choices": [
          {
            "label": "Fünf",
            "correct": true,
            "why": "Die zwei Hälften ergeben ein weiteres Ganzes zu den vier ganzen."
          },
          {
            "label": "Sechs",
            "correct": false,
            "why": "Das würde die zwei Hälften als zwei Ganze mitzählen."
          }
        ]
      },
      "3": {
        "question": "Wie berechnest du die Fläche eines 0,5 cm mal 0,5 cm Kästchens?",
        "choices": [
          {
            "label": "0,5 · 0,5 cm²",
            "correct": true,
            "why": "Eine Fläche ist Länge mal Breite, nicht die Summe der Seiten."
          },
          {
            "label": "0,5 cm²",
            "correct": false,
            "why": "Das wäre die Seitenlänge als Fläche missverstanden."
          }
        ]
      },
      "4": {
        "question": "Wie berechnest du die gesamte Figurfläche?",
        "choices": [
          {
            "label": "Fünfmal die Fläche eines Kästchens",
            "correct": true,
            "why": "Alle fünf Kästchen sind gleich groß und werden addiert."
          },
          {
            "label": "Fünfmal die Seitenlänge",
            "correct": false,
            "why": "Eine Länge in cm ist keine Fläche in cm²."
          }
        ]
      }
    },
    "14": {
      "1": {
        "question": "Welche Rechnung gibt den Rauminhalt des Quaders?",
        "choices": [
          {
            "label": "Länge · Breite · Höhe",
            "correct": true,
            "why": "Drei Kantenlängen bestimmen den dreidimensionalen Inhalt in cm³."
          },
          {
            "label": "Nur Länge · Breite",
            "correct": false,
            "why": "Das berechnet eine Fläche in cm², nicht den Rauminhalt."
          }
        ]
      },
      "2": {
        "question": "Warum rechnest du die Vorderfläche doppelt?",
        "choices": [
          {
            "label": "Weil die Rückseite gleich groß ist",
            "correct": true,
            "why": "Ein Quader hat gegenüberliegende gleich große Flächen."
          },
          {
            "label": "Weil jede Seite drei Kanten hat",
            "correct": false,
            "why": "Die Anzahl der Kanten bestimmt nicht die Anzahl gleich großer Flächen."
          }
        ]
      },
      "3": {
        "question": "Welche beiden Flächen bilden das zweite Paar?",
        "choices": [
          {
            "label": "Links und rechts",
            "correct": true,
            "why": "Sie sind gegenüberliegend und haben jeweils Breite mal Höhe."
          },
          {
            "label": "Vorne und oben",
            "correct": false,
            "why": "Diese Flächen haben im Allgemeinen unterschiedliche Maße."
          }
        ]
      },
      "4": {
        "question": "Wie berechnest du oben und unten zusammen?",
        "choices": [
          {
            "label": "Zweimal Länge mal Breite",
            "correct": true,
            "why": "Die Deckfläche und die Grundfläche sind gleich groß."
          },
          {
            "label": "Einmal Länge mal Breite",
            "correct": false,
            "why": "Dann würde die gegenüberliegende Fläche fehlen."
          }
        ]
      },
      "5": {
        "question": "Was addierst du für die gesamte Oberfläche?",
        "choices": [
          {
            "label": "Alle drei Flächenpaare in cm²",
            "correct": true,
            "why": "Die Oberfläche ist die Summe aller sechs Außenflächen."
          },
          {
            "label": "Rauminhalt und zwei Flächen",
            "correct": false,
            "why": "cm³ und cm² lassen sich nicht addieren; es sind verschiedene Größenarten."
          }
        ]
      }
    }
  }
};
