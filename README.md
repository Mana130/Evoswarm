# EVOSWARM — Application mobile (Capacitor)

Emballe le jeu EVOSWARM (`www/`) en **app native iOS + Android** prête à soumettre sur l'App Store / Google Play. Le jeu solo fonctionne hors-ligne ; le **mode en ligne** se connecte au serveur `evoswarm-server`.

---

## ⚠️ Ce que SEUL toi peux faire (aucun outil ne peut le faire à ta place)
- Un **Mac avec Xcode** (obligatoire pour compiler/soumettre l'app iOS).
- Un **compte Apple Developer** (99 €/an) et un **compte Google Play** (25 € une fois).
- La **signature de code** (certificats/provisioning) dans Xcode / Play Console.
- La **soumission** + la **revue Apple/Google** (1–3 jours en général).

Ce projet te met à ~95 % : il ne reste que ces étapes "compte + signature + envoi".

---

## 0. Prérequis
- Node.js ≥ 18, npm
- iOS : macOS + Xcode + CocoaPods (`sudo gem install cocoapods`)
- Android : Android Studio + JDK 17

## 1. Installer
```bash
npm install
```

## 2. Configurer le mode en ligne (optionnel mais recommandé)
Édite `www/index.html`, ligne :
```html
<script>window.EVOSWARM_SERVER = '';</script>
```
- Vide → **SOLO uniquement** (le bouton EN LIGNE prévient que ce n'est pas configuré).
- Test réseau local : `'http://TON-IP-LOCALE:8080'` (lance d'abord `evoswarm-server`).
- Prod : `'https://api.tondomaine.com'` (serveur déployé en HTTPS — requis par iOS/Android en prod).

## 3. Générer icône + splash (depuis `resources/`)
Les PNG sont déjà fournis (`resources/icon.png` 1024², `resources/splash.png` 2732²).
Pour régénérer toutes les tailles natives :
```bash
npm run assets
```

## 4. Ajouter les plateformes
```bash
npm run add:ios       # crée le projet Xcode (ios/)
npm run add:android   # crée le projet Android Studio (android/)
```

## 5. Lancer / ouvrir
```bash
npm run ios       # sync + ouvre Xcode  -> bouton ▶ pour tester sur simulateur/iPhone
npm run android   # sync + ouvre Android Studio
```
À chaque modif de `www/`, refais `npx cap sync`.

## 6. Soumettre
- **iOS** : dans Xcode → Product ▸ Archive → Distribute App → App Store Connect. Puis remplis la fiche dans App Store Connect (voir `store/`).
- **Android** : dans Android Studio → Build ▸ Generate Signed Bundle (.aab) → upload dans Play Console.

---

## Ce qui est déjà géré (natif)
`www/native-bridge.js` ajoute, quand l'app tourne en natif :
- **Haptics natifs** (remplace `navigator.vibrate` — bien meilleur ressenti)
- **Splash screen** masqué à la fin du chargement
- **Status bar** sombre + safe areas (le jeu utilise déjà `env(safe-area-inset-*)`)
- **Bouton retour Android** (ferme les overlays au lieu de quitter)
- **Partage natif** pour "Partager le clip"
- **État réseau** (utilisé par le mode en ligne)
Tout dégrade proprement en navigateur classique.

## Dossier `store/`
- `app-store-metadata.md` — nom, sous-titre, description, mots-clés, catégories, âge
- `iap-setup.md` — produits d'achat intégré à créer + rappel validation serveur
- `privacy-policy.md` — politique de confidentialité (à héberger en ligne)
- `submission-checklist.md` — checklist complète de soumission
- `review-notes.md` — notes pour le relecteur Apple

## Performance
Pour un jeu 2D canvas, le wrap WebView tient 60 fps sur mobile moderne. Si un jour tu vises plus (effets lourds, 100 joueurs affichés), le doc d'architecture décrit le port moteur (Godot/Unity) — mais ce n'est pas nécessaire pour publier.
