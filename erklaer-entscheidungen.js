'use strict';
/* Handgeschriebene Erklärentscheidungen pro fachlichem Lernschritt. */
window.MerkheftEntscheidungen = {
  "brueche": {
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
    }
  },
  "zahlenstrahl": {
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
    }
  },
  "vergleichen": {
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
    }
  },
  "dezimal": {
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
    }
  }
};
