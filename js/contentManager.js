// 🔄 HTML részlet betöltése egy adott elembe
function loadPartial(id, file, callback) {
    fetch(file)
      .then(res => res.text())
      .then(html => {
        document.getElementById(id).innerHTML = html;
  
        // Szintaxiskiemelés frissítése (ha van kód)
        if (typeof hljs !== 'undefined') {
          hljs.highlightAll();
        }
  
        // Menülinkekhez eseménykezelő (csak ha menüt töltünk be)
        if (id === 'menu') {
          addMenuLinkListeners();
          setActiveLink();
        }
  
        if (callback) callback();
      })
      .catch(() => {
        document.getElementById(id).innerHTML = "<p>Nem sikerült betölteni a tartalmat.</p>";
      });
  }
  
  // 🔁 Tartalom betöltése hash alapján
  function loadContentFromHash() {
    const page = location.hash.replace('#', '') || 'home';
    loadPartial('content', `partials/${page}.html`);
    setActiveLink();
  }
  
  // ⭐ Aktív menüpont kiemelése
  function setActiveLink() {
    const currentHash = location.hash || '#home';
    document.querySelectorAll('.menu-link').forEach(link => {
      const parent = link.parentElement;
      if (!parent) return;
      if (link.getAttribute('href') === currentHash) {
        parent.classList.add('active');
      } else {
        parent.classList.remove('active');
      }
    });
  }
  
  // 📎 Menü linkek eseménykezelői (pl. ha nem hash-t használsz, hanem JS betöltést)
  function addMenuLinkListeners() {
    document.querySelectorAll(".menu-link").forEach(link => {
      link.addEventListener("click", function (e) {
        // Csak hash-es linkek esetén
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const hash = this.getAttribute("href");
          location.hash = hash; // ez automatikusan triggereli a loadContentFromHash()-t
        }
      });
    });
  }
  
  // 🚀 Indítás
  document.addEventListener('DOMContentLoaded', () => {
    loadPartial('menu', 'partials/menu.html');
    loadContentFromHash();
    window.addEventListener('hashchange', loadContentFromHash);
  });
  
