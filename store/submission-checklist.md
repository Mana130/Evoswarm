# Checklist de soumission

## Avant de soumettre
- [ ] `appId` unique dans `capacitor.config.json` (ton domaine inversé) et cohérent partout.
- [ ] Numéro de version + build incrémentés (Xcode / build.gradle).
- [ ] `EVOSWARM_SERVER` pointant vers un serveur **HTTPS** de prod (mode en ligne) — ou laissé vide si tu publies SOLO d'abord.
- [ ] Icône (1024²) et splash générés (`npm run assets`).
- [ ] Captures d'écran aux bonnes tailles (voir app-store-metadata.md).
- [ ] Politique de confidentialité **hébergée en ligne** + URL renseignée.
- [ ] Privacy Nutrition Labels (Apple) / Data Safety (Google) remplis.
- [ ] Questionnaire de classification d'âge (IARC) rempli.
- [ ] Produits IAP créés et "Ready to Submit" (App Store Connect / Play Console).
- [ ] (Si pubs) SDK AdMob configuré + ATT/CMP de consentement intégré.
- [ ] Testé sur appareil réel (pas seulement simulateur).

## iOS (Xcode + App Store Connect)
- [ ] Signing & Capabilities : équipe + certificat de distribution.
- [ ] Product ▸ Archive ▸ Distribute App ▸ App Store Connect.
- [ ] Fiche app remplie (nom, sous-titre, description, mots-clés, captures, support URL).
- [ ] TestFlight (recommandé) avant la prod.
- [ ] Soumettre pour revue.

## Android (Android Studio + Play Console)
- [ ] Keystore de signature créé et **sauvegardé** (le perdre = ne plus pouvoir mettre à jour).
- [ ] Generate Signed Bundle (.aab).
- [ ] Fiche Play (description, captures, icône 512², bannière).
- [ ] Piste interne/fermée d'abord, puis production.

## Après publication
- [ ] Surveiller crashs (Xcode Organizer / Play Console / Crashlytics).
- [ ] Suivre rétention J1/J7/J30 et conversion (analytics).
- [ ] Itérer via remote config sans republier.
