// js/popup-loader.js
document.addEventListener('DOMContentLoaded', () => {
    // 1) Injektáljuk a popup és az overlay markup-ot
    const popupHtml = `<div id="overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:998;"></div>`;
    document.body.insertAdjacentHTML('beforeend', popupHtml);
  
    const form       = document.getElementById('messageForm');
  const formError  = document.getElementById('formError');
  const overlay    = document.getElementById('overlay');
  const popup      = document.getElementById('popupForm');

  // 1) Definiáljuk a szabályokat mező-szerint
  const rules = [
    { id: 'lastname',   test: v => v.trim().length >= 10,         msg: 'Vezetéknév legalább 10 karakter.' },
    { id: 'firstname',  test: v => v.trim().length >= 10,         msg: 'Keresztnév legalább 10 karakter.' },
    { id: 'subject',    test: v => v.trim().length >= 10,         msg: 'Üzenet tárgya legalább 10 karakter.' },
    { id: 'message',    test: v => v.trim().length >= 10,         msg: 'Üzenet szövege legalább 10 karakter.' },
    { id: 'email',      test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Érvényes email címet adj meg.' },
    { id: 'birthdate',  test: v => v.trim() !== '',               msg: 'A születési dátum megadása kötelező.' },
  ];

  // 2) blur-ra validáljuk az egyes mezőket
  rules.forEach(({id, test, msg}) => {
    const inp = document.getElementById(id);
    inp.addEventListener('blur', () => {
      formError.textContent = '';
      if (!test(inp.value)) {
        formError.textContent = msg;
      }
    });
    inp.addEventListener('focus', () => {
      // amikor fókuszba kerül, töröljük az előző hibaüzenetet
      formError.textContent = '';
    });
  });

  // 3) A submit eseménynél is lefuttatjuk a validációt, és ha hibás mező van,
  //    megakadályozzuk a beküldést
  form.addEventListener('submit', e => {
    formError.textContent = '';
    let hasError = false;

    rules.forEach(({id, test, msg}) => {
      const inp = document.getElementById(id);
      if (!test(inp.value)) {
        formError.textContent = msg;
        hasError = true;
      }
    });

    if (hasError) {
      e.preventDefault();
    } else {
         // --- IDE JÖN A KÜLDÖTT ADATOK KIÍRÁSA ---
    const data = {
        Vezetéknév:  document.getElementById('lastname').value.trim(),
        Keresztnév:  document.getElementById('firstname').value.trim(),
        'Születési dátum': document.getElementById('birthdate').value,
        'Email cím':  document.getElementById('email').value.trim(),
        'Üzenet tárgya':  document.getElementById('subject').value.trim(),
        'Üzenet szövege': document.getElementById('message').value.trim(),
      };
  
      let msg = 'Üzenet sikeresen elküldve!\n\n';
      for (const [key, val] of Object.entries(data)) {
        msg += `${key}: ${val}\n`;
      }
      alert(msg);
      closePopup();
    }
  });

  // ——————————————————————————————————————————
  // Az open/close funkcióid (ha már megvannak)
  document.querySelectorAll('.open-popup').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      popup.style.display   = 'block';
      overlay.style.display = 'block';
    });
  });
  overlay.addEventListener('click', closePopup);
  window.closePopup = closePopup;
  function closePopup() {
    form.reset();
    formError.textContent = '';
    popup.style.display   = 'none';
    overlay.style.display = 'none';
  }
  });
  
  
  document.body.addEventListener('click', e => {
    if (e.target.matches('.open-popup')) {
      e.preventDefault();
      document.getElementById('popupForm').style.display   = 'block';
      document.getElementById('overlay').style.display     = 'block';
    }
    if (e.target.matches('.close-popup') || e.target === document.getElementById('overlay')) {
      closePopup();
    }
  });
  
  function closePopup() {
    document.getElementById('popupForm').style.display   = 'none';
    document.getElementById('overlay').style.display     = 'none';
    document.getElementById('messageForm').reset();
    document.getElementById('formError').textContent     = '';
  }
  