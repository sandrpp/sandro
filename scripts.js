function showSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'none';
}

let german = true;

function changeLanguage() {

    const navLinks = document.getElementById("links");
    const navLinksTop = document.getElementById("links-t");
    const navLaw = document.getElementById("law");
    const navLawTop = document.getElementById("law-t");
    const langGer = document.getElementById("german");
    const langEng = document.getElementById("english");
    const descr1 = document.getElementById("description1");
    const descr2 = document.getElementById("description2");
    const proHeading = document.getElementById("projects-heading");
    const langSelector = document.getElementById("selector");

    if(german){
        /*
        sprache ändern (englisch)
        */
        navLinks.innerHTML = "Links/Contact";
        navLinksTop.innerHTML = "Links/Contact";
        navLaw.innerHTML = "Legal";
        navLawTop.innerHTML = "Legal";
        langGer.innerHTML = "German";
        document.getElementById("language").style.width = "193px";
        langEng.innerHTML = "English";
        descr1.innerHTML = "Software developer from Germany/NRW.";
        descr2.innerHTML = "16 years old."
        proHeading.innerHTML = "Projects";

        langSelector.style.marginLeft = "-80px"
        langSelector.innerHTML = "UUUUU";

        german = false;
    }else{
        /*
        sprache ändern (deutsch)
        */
        navLinks.innerHTML = "Links/Kontakt"
        navLinksTop.innerHTML ="Links/Kontakt"
        navLaw.innerHTML = "Rechtliches"
        navLawTop.innerHTML = "Rechtliches"
        langGer.innerHTML = "Deutsch"
        document.getElementById("language").style.width = "205px";
        langEng.innerHTML = "Englisch";
        descr1.innerHTML = "Software Entwickler aus Deutschland/NRW.";
        descr2.innerHTML = "16 Jahre alt."
        proHeading.innerHTML ="Projekte";

        langSelector.style.marginLeft = "-190px"
        langSelector.innerHTML = "UUUUUII";

        german = true;
    }
}