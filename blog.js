//import {articles} from "./articles.js";
/**
 * @typedef {body: string, id: number, title: string} Article
 *
 */

const blogContainer = document.querySelector('section')

const bouton = document.createElement('button')
bouton.innerText = "3 derniers articles"
document.querySelector('h1').after(bouton)




/**
 * Créé un Element HTML spécifié par le paramètre tagName auquel on ajoute
 * un contenu spécifié par content
 * @param {string}tagName
 * @param {string}content
 * @return {HTMLAnchorElement | HTMLElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLObjectElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement}
 */
function ajoutElemAvecTexte(tagName, content) {
  const element = document.createElement(tagName)
  element.textContent = content
  return element
}

/**
 * @typedef {Article, date: string}  ArticleDate
 */

/**
 * Créé un HTMLElement représentant un article avec son titre en h2
 * et son résumé dans un p
 * @param {ArticleDate} article
 * @return {HTMLElement}
 */
function ajoutArticle(article) {
  const articleElement = document.createElement('article')
  const articleTitle = ajoutElemAvecTexte('h2', article.title + " - " + article.date)
  const articleSummary = ajoutElemAvecTexte('p', article.body)

  articleElement.append(articleTitle, articleSummary)

  articleElement.addEventListener('mouseover', () => {
    articleElement.classList.add('hover')
  })

  articleElement.addEventListener('mouseout', () => {
    articleElement.classList.remove('hover')
  })

  return articleElement
}


/**
 * Formate une date en aaaa/mm/jj
 * @param {Date} uneDate
 * @return {string}
 */
function dateFormatee(uneDate) {
  const annee = uneDate.getFullYear()
  const mois = String(uneDate.getMonth() + 1).padStart(2, '0')
  const jour = String(uneDate.getDate()).padStart(2, '0')

  return `${annee}/${mois}/${jour}`
}

/**
 * Génère une date aléatoire entre maintenant et nbJourMax
 * @param {number} [nbJourMax=31]
 * @return {Date}
 */
function dateAleatoire(nbJourMax = 31) {
  const nbJours = Math.floor(Math.random() * nbJourMax)
  const dateRetour = new Date()
  dateRetour.setDate(dateRetour.getDate() - nbJours)

  return dateRetour
}

const endPoint = 'http://localhost:3000/api/posts/';
const urls = [
  endPoint + 5,
  endPoint + 6,
  endPoint + 7,
  endPoint + 8,
  endPoint + 9,
]

const requests = urls.map(url => fetch(url));

Promise.all(requests)
  .then(responses => responses.forEach((response) => {
    response.json()
      .then((data) => {
        const joursAvant = dateAleatoire()
        data.date = dateFormatee(joursAvant)
        blogContainer.append(ajoutArticle(data))
      })
  }))

/*
const idArticlesTrie = articles*/
