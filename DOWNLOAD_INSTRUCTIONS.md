
# Navodila za prenos in uporabo spletne strani AllWillRetire

## Prenos projekta

### Možnost 1: Neposredni prenos
1. Če ste že prenesli ZIP datoteko, jo razširite v želeno mapo na vašem računalniku.
2. Sledite navodilom za zagon spodaj.

### Možnost 2: GitHub
1. Če ste projekt izvozili v GitHub repozitorij, ga klonirajte z naslednjim ukazom:
   ```
   git clone [URL-VAŠEGA-REPOZITORIJA]
   ```
2. Navigirajte v projektno mapo:
   ```
   cd [IME-PROJEKTNE-MAPE]
   ```

## Namestitev in zagon

### Namestitev odvisnosti
Najprej morate namestiti vse potrebne knjižnice in odvisnosti:

```
npm install
```

### Razvojni način
Za lokalni razvoj in testiranje:

```
npm run dev
```

Spletna stran bo dostopna na naslovu: `http://localhost:8080`

### Produkcijska gradnja
Za izgradnjo produkcijske različice:

```
npm run build
```

To bo ustvarilo optimizirane datoteke v mapi `dist`.

### Predogled produkcijske različice
Za predogled produkcijske različice:

```
npm run preview
```

## Objava spletne strani

### Možnost 1: Netify
1. Ustvarite račun na [Netlify](https://www.netlify.com/).
2. Sledite njihovim navodilom za uvoz projekta (lahko direktno iz GitHub-a).
3. Določite ukaz za gradnjo `npm run build` in mapo `dist` kot izhodiščno mapo.

### Možnost 2: Vercel
1. Ustvarite račun na [Vercel](https://vercel.com/).
2. Povežite svoj GitHub račun in izberite repozitorij s projektom.
3. Vercel bo avtomatsko prepoznal, da gre za React+Vite projekt in nastavil ustrezne nastavitve.

### Možnost 3: Ročna namestitev
1. Prenesite vsebino mape `dist` na vaš spletni strežnik.
2. Poskrbite, da vse zahteve za neplatitvene datoteke preusmerjate nazaj na `index.html` za pravilno delovanje React Router.

## Vzdrževanje in posodobitve

Ko želite posodobiti vsebino spletne strani:
1. Spremenite ustrezne datoteke v mapi `src`.
2. Ponovno zgradite projekt z `npm run build`.
3. Naložite nove datoteke iz mape `dist` na vaš strežnik.

## Tehnična pomoč

Če naletite na težave, preverite:
1. Ali imate nameščen Node.js (priporočljiva različica 16 ali novejša)
2. Ali so vse odvisnosti pravilno nameščene (`npm install`)
3. Konzolo brskalnika za morebitne napake

Za več informacij o uporabljenih tehnologijah si oglejte datoteko README.md.
