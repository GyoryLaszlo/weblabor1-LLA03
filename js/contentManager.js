document.addEventListener("DOMContentLoaded", function () {
    const context = document.getElementById("context");
    document.querySelector('a[href="home.html"]').parentElement.classList.add("active");

    // Alapértelmezett kezdőoldal betöltése
    loadPage("pages/home.html");

    // Menü linkek kezelése
    addMenuLinkListeners(); // Hívjuk meg az eseménykezelőket

    function loadPage(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Hiba történt a betöltésnél");
                return response.text();
            })
            .then(html => {
                context.innerHTML = html;
                hljs.highlightAll();

                // Az új tartalom betöltése után újra hozzáadjuk az eseménykezelőket
                addMenuLinkListeners();
            })
            .catch(err => {
                context.innerHTML = `<div class="alert alert-danger">Hiba a betöltés során: ${err.message}</div>`;
            });
    }

    // Menü linkekhez eseménykezelők hozzárendelése
    function addMenuLinkListeners() {
        document.querySelectorAll(".menu-link").forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();

                const page = this.getAttribute("href");

                // 🔄 ACTIVE reset minden menüpontra
                document.querySelectorAll(".menu-link").forEach(l => {
                    if (l.parentElement) {
                        l.parentElement.classList.remove("active");
                    }
                });

                // 🔄 ACTIVE beállítás az aktuálisra
                if (this.parentElement) {
                    this.parentElement.classList.add("active");
                }

                // 🔄 oldal betöltése
                loadPage("pages/" + page);
            });
        });
    }
});
