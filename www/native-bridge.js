/* Pont natif Capacitor. Améliore le jeu web avec des capacités natives.
   Tout est optionnel : en navigateur classique (sans Capacitor), rien ne casse. */
(function () {
  const Cap = window.Capacitor;
  const isNative = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());
  const P = (Cap && Cap.Plugins) || {};

  // --- Haptics : remplace navigator.vibrate par le vrai moteur natif (bien meilleur ressenti) ---
  if (isNative && P.Haptics) {
    const H = P.Haptics;
    // mappe une durée/pattern (ms) vers une impulsion native
    navigator.vibrate = function (pattern) {
      try {
        const total = Array.isArray(pattern) ? pattern.reduce((a, b) => a + b, 0) : pattern;
        if (total >= 60) H.impact({ style: 'HEAVY' });
        else if (total >= 25) H.impact({ style: 'MEDIUM' });
        else H.impact({ style: 'LIGHT' });
      } catch (e) {}
      return true;
    };
  }

  // --- Partage natif (le bouton "Partager le clip") ---
  window.nativeShare = async function (text) {
    if (isNative && P.Share) { try { await P.Share.share({ title: 'EVOSWARM', text }); return true; } catch (e) {} }
    return false;
  };

  // --- État réseau (utile pour le mode en ligne) ---
  window.netStatus = { online: navigator.onLine !== false };
  if (isNative && P.Network) {
    P.Network.getStatus().then(s => { window.netStatus.online = s.connected; }).catch(() => {});
    P.Network.addListener('networkStatusChange', s => { window.netStatus.online = s.connected; });
  }

  // --- Bouton retour Android : ferme les overlays au lieu de quitter ---
  if (isNative && P.App) {
    P.App.addListener('backButton', () => {
      const open = document.querySelector('.layer.on:not(#menu)');
      if (open) { open.classList.remove('on'); const m = document.getElementById('menu'); if (m) m.classList.add('on'); }
      else P.App.exitApp();
    });
  }

  // --- Status bar + masquage du splash quand le jeu est prêt ---
  window.addEventListener('load', () => {
    setTimeout(() => { if (isNative && P.SplashScreen) P.SplashScreen.hide().catch(() => {}); }, 300);
    if (isNative && P.StatusBar) { try { P.StatusBar.setStyle({ style: 'DARK' }); } catch (e) {} }
  });

  window.IS_NATIVE = isNative;
})();
