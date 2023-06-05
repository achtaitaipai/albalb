# [Albalb](https://achtaitaipai.github.io/albalb/)

[Albalb](https://achtaitaipai.github.io/albalb/)  est un langage d'expression qui permet de manipuler des chaînes de caractères.

Il est composé de symboles, de valeurs et de fonctions dont la combinaison permet de retourner une nouvelle chaîne de caractères.

```
'chien' --> chien
'chat' avec 'du chien' --> chatduchien
'chien' sans 'c' --> hien
3 fois 'rien' --> rienrienrien
PARMI('chien','chat','souris') --> chien
```

## Valeurs

Les valeurs peuvent être des nombres entiers ou des chaînes de caractères.

Les chaînes de caractères sont exprimées entre guillemets ou apostrophes et les nombres sont exprimés en chiffres.

Dans l'exemple `3 fois 'rien'` `3`est un nombre entier et `rien`est une chaîne de caractères.

## Opérateurs

Les opérateurs sont des mots qui permettent de combiner plusieurs valeurs entre elles ou de transformer une valeur.

| opérateur |                           Usage                            |
| :-------: | :--------------------------------------------------------: |
|  `sans`   | `'le roi pepin' sans 'r' sans 'o' sans 'pin'`  **le i pe** |
|  `avec`   |            `'tuer' avec 'amour' `**tueramour**             |
|  `fois`   |              `3 fois 'rien'` **rienrienrien**              |
|    `-`    |                       `-bla` **alb**                       |

## Fonctions

Les fonctions permettent de transformer un ensemble de valeurs en une chaîne de caractères. Elles s'écrivent comme ceci : `<NOM DE LA FONCTION>(parametre1, parametre2 et parametre3...)`. Les paramètres peuvent êtres séparés avec des virgules ou avec le mot `et`

| Fonction | Usage                                                        | Fonctionnement                                               |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `CRIER`  | `CRIER('bonjour')` **BONJOUR**                               | Retourne son ou ses paramètres en lettres majuscules.        |
| `PARMI`  | `PARMI(1,2,3,4,5,6)` **trois**                               | Retourne l'un de ses paramètres au hasard.                   |
| `RANGER` | `RANGER('bonour')` **bjnooru** `RANGER('bonour','au revoir')` **aurevoir bonjour** | S'il n'y a qu'un paramètre, il le retourne avec ses lettres dans l'ordre alphabétique. Autrement il retourne tous ses paramètres à la suite, mais dans l'ordre alphabétique. |

