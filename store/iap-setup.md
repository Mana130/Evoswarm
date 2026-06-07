# Achats intégrés (IAP) — produits à créer

À créer dans **App Store Connect** (iOS) et **Google Play Console** (Android). Les IDs doivent correspondre à ceux utilisés côté code/serveur.

| Product ID | Type | Prix indicatif | Contenu |
|---|---|---|---|
| `pass_premium` | Non-consommable | 9,99 € | Débloque la piste Premium du Pass de saison |
| `gems_small` | Consommable | 4,99 € | +500 💎 |
| `gems_large` | Consommable | 9,99 € | +1200 💎 |
| `no_ads` (option) | Non-consommable | 2,99 € | Retire les pubs interstitielles (garde les pubs récompensées optionnelles) |

> Les skins légendaires se paient en **gemmes** (monnaie premium), pas en IAP direct → un seul tunnel d'achat (gemmes), plus simple à gérer et conforme.

## Règle d'or (sécurité — déjà câblée côté serveur)
1. Le client achète via le store → reçoit un **reçu/transaction signé**.
2. Le client envoie le reçu au **backend** (`/api/iap/grant` dans le MVP).
3. ⚠️ **En prod, le serveur DOIT valider le reçu** auprès d'Apple (App Store Server API) / Google (Play Developer API) **avant** d'accorder quoi que ce soit. Le endpoint actuel est marqué "DEV only".
4. Gérer **restauration d'achats** (obligatoire Apple) et **révocation** sur remboursement (notifications serveur Apple/Google).

## Plugin recommandé
- `@capacitor-community/in-app-purchases` ou RevenueCat (gère iOS+Android, reçus, restauration — fait gagner beaucoup de temps).

## Pubs récompensées ("pub encaissée")
- SDK : Google AdMob (+ médiation AppLovin MAX pour l'eCPM).
- **Server-Side Verification (SSV)** : AdMob appelle ton serveur pour confirmer la vue → c'est le serveur qui crédite la récompense (revive, doublement). Jamais le client seul.
- Plafonner par jour/partie.
