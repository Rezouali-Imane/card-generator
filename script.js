//?nom:Rezouali
//?prenom:Imane
//?groupe:B4
//*3
const selectFiliere = document.getElementById("filiere");

const filieres = [
  { nom: "Mathématiques", code: "mat" },
  { nom: "Informatique", code: "inf" },
  { nom: "Automatique", code: "aut" },
  { nom: "Télécommunications", code: "tel" },
  { nom: "Français", code: "fra" },
  { nom: "Anglais", code: "ang" }
];

function genFilieres() {
  filieres.forEach(filiere => {
    const option = document.createElement("option");
    option.value = filiere.code;
    option.textContent = filiere.nom;
    selectFiliere.appendChild(option);
  });
}

genFilieres();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form").addEventListener("submit", soumettreFormulaire);
  document.getElementById("form").addEventListener("reset", reinitialiserCarte);
});

function soumettreFormulaire(e) {
  e.preventDefault();

  const nom = obtenirValeur("nom");
  const prenom = obtenirValeur("prenom");
  const lieuNaissance = obtenirValeur("lieu-naissance");
  const universite = obtenirValeur("uni");
  const dateNaissance = obtenirValeur("date-naissance");
  const codeFiliere = obtenirValeur("filiere");

  if (!validerNomPrenom(nom, prenom)) return;
  if (!validerAge(dateNaissance)) return;

  const age = calculerAge(dateNaissance);
  const anneeUniv = obtenirAnneeUniv();
  const faculte = deduireFaculte(codeFiliere);
  const grade = obtenirGrade(age);
  const statut = obtenirStatut(lieuNaissance, universite);
  const logo = obtenirLogo(universite);
  const titreCarte = grade === "Enseignant-Chercheur" ? "CARTE ENSEIGNANT" : "CARTE ÉTUDIANT";
  const nomFiliere = obtenirNomFiliere(codeFiliere);

  afficherCarte({
    nom,
    prenom,
    dateNaissance,
    lieuNaissance,
    nomFiliere,
    faculte,
    grade,
    anneeUniv,
    titreCarte,
    logo,
    statut
  });
}

function obtenirValeur(id) {
  return document.getElementById(id).value;
}
//*4
function validerNomPrenom(nom, prenom) {
  const nPvalid = /^[A-Za-zÀ-ÿ]+(-[A-Za-zÀ-ÿ]+)?$/;
  if (nom.length > 24 || prenom.length > 24) {
    alert("Nom et prénom ne doivent pas dépasser 24 caractères.");
    return false;
  }
  if (!nPvalid.test(nom)) {
    alert("Le nom est invalide. Il doit commencer par une lettre !");
    return false;
  }
  if (!nPvalid.test(prenom)) {
    alert("Le prénom est invalide. Il doit commencer par une lettre !");
    return false;
  }
  return true;
}
//*5
function calculerAge(dateNaissance) {
  const dateNais = new Date(dateNaissance);
  const dateActuelle = new Date();
  let age = dateActuelle.getFullYear() - dateNais.getFullYear();
  const anniversairePasse =
    dateActuelle.getMonth() > dateNais.getMonth() ||
    (dateActuelle.getMonth() === dateNais.getMonth() && dateActuelle.getDate() >= dateNais.getDate());
  if (!anniversairePasse) age--;
  return age;
}

function validerAge(dateNaissance) {
  const age = calculerAge(dateNaissance);
  if (age < 18) {
    alert("Vous devez avoir au moins 18 ans pour être étudiant.");
    return false;
  }
  return true;
}
//*6
function obtenirAnneeUniv() {
  const dateActuelle = new Date();
  const annee = dateActuelle.getFullYear();
  const mois = dateActuelle.getMonth();
  return mois >= 8 ? `${annee}/${annee + 1}` : `${annee - 1}/${annee}`;
}
//*7
function deduireFaculte(code) {
  const facs = {
    mat: { nom: "Faculté des Sciences Exactes", code: "se" },
    inf: { nom: "Faculté des Sciences Exactes", code: "se" },
    aut: { nom: "Faculté de Technologie", code: "st" },
    tel: { nom: "Faculté de Technologie", code: "st" },
    fra: { nom: "Faculté des Lettres et des Langues", code: "ll" },
    ang: { nom: "Faculté des Lettres et des Langues", code: "ll" }
  };
  return facs[code] || { nom: "Faculté inconnue", code: "?" };
}
//*8
function obtenirGrade(age) {
  if (age <= 21) return "Licence";
  if (age <= 23) return "Master";
  if (age <= 27) return "Doctorant";
  return "Enseignant-Chercheur";
}
//*9
function obtenirStatut(lieu, uni) {
  const lieuMinuscule = lieu.toLowerCase();
  if ((lieuMinuscule === "bejaia" && uni === "UAMB") || (lieuMinuscule === "tizi ouzou" && uni === "UMMTO")) {
    return "interne";
  }
  return "externe";
}

function obtenirLogo(uni) {
  if (uni === "UAMB") return "/Assets/bejaia.png";
  if (uni === "UMMTO") return "/Assets/tizi.png";
  return "/Assets/default.png";
}

function obtenirNomFiliere(code) {
  const filiere = filieres.find(f => f.code === code);
  return filiere ? filiere.nom : "Filière inconnue";
}
//*11
function afficherCarte({ nom, prenom, dateNaissance, lieuNaissance, nomFiliere, faculte, grade, anneeUniv, titreCarte, logo, statut }) {
  const container = document.getElementById("carte-container");
  container.innerHTML = ""; 

  const section = document.createElement("section");
  section.className = "carte";

  const header = document.createElement("header");
  header.className = "university-header";
  const imgLogo = document.createElement("img");
  imgLogo.src = logo;
  imgLogo.alt = "Logo Université";
  imgLogo.className = "university-logo";
  header.appendChild(imgLogo);

  const bande = document.createElement("div");
  bande.className = "the-black-thing";
  bande.textContent = titreCarte;

  const champs = [
    { label: "Nom", value: nom },
    { label: "Prénom", value: prenom },
    { label: "Date de naissance", value: dateNaissance },
    { label: "Lieu de naissance", value: lieuNaissance },
    { label: "Filière", value: nomFiliere },
    { label: "Faculté", value: faculte.nom },
    { label: "Grade", value: grade },
    { label: "Année universitaire", value: anneeUniv }
  ];

  section.appendChild(header);
  section.appendChild(bande);

  champs.forEach(({ label, value }) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = label + " : ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value));
    section.appendChild(p);
  });

  container.classList.remove("interne", "externe");
  container.classList.add(statut);
  container.appendChild(section);
  container.style.display = "block";
}

function reinitialiserCarte() {
  const carteContainer = document.getElementById("carte-container");
  if (carteContainer) {
    carteContainer.innerHTML = "";
    carteContainer.style.display = "none";
  }
}
document.getElementById("carte-container").addEventListener("click", () => {
  const nom = obtenirValeur("nom");
  const prenom = obtenirValeur("prenom");
  const dateNaissance = obtenirValeur("date-naissance");
  const lieuNaissance = obtenirValeur("lieu-naissance");
  const universite = obtenirValeur("uni");
  const codeFiliere = obtenirValeur("filiere");
  const anneeUniv = obtenirAnneeUniv();
  const faculte = deduireFaculte(codeFiliere);
  const grade = obtenirGrade(calculerAge(dateNaissance));

  const nomHex = Array.from(nom).map(char => char.charCodeAt(0).toString(16)).join("");
  const prenomHex = Array.from(prenom).map(char => char.charCodeAt(0).toString(16)).join("");
  const wilayaNaissance = lieuNaissance.toLowerCase() === "bejaia" ? "06" : lieuNaissance.toLowerCase() === "tizi ouzou" ? "15" : "00";
  const wilayaUniversite = universite === "UAMB" ? "06" : universite === "UMMTO" ? "15" : "00";
  const gradeCode = grade === "Licence" ? "L" : grade === "Master" ? "M" : grade === "Doctorant" ? "D" : "E";

  const identifiant = `${nomHex}-${prenomHex}-${dateNaissance}-${wilayaNaissance}-${wilayaUniversite}-${codeFiliere}-${faculte.code}-${gradeCode}-${anneeUniv}`;
  alert(`Identifiant généré : ${identifiant}`);
});
