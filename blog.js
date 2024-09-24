import {articles} from "./articles.js";

const blogContainer = document.querySelector('section')

const bouton = document.createElement('button')
bouton.innerText = "3 derniers articles"
document.querySelector('h1').after(bouton)
let statusButton = false

bouton.addEventListener('click', () => {
    if (statusButton) {
        afficheTout();
        bouton.innerText = "3 derniers articles";
    }
    else {
        seulementTrois();
        bouton.innerText = "Tous les articles";
    }
    statusButton = !statusButton
})


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
    const articleSummary = ajoutElemAvecTexte('p', article.summary)

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

articles.forEach((article) => {
    const joursAvant = dateAleatoire()
    article.date = dateFormatee(joursAvant)
    blogContainer.append(ajoutArticle(article))
})


const idArticlesTrie = articles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map(article => article.id)

const blogContent = blogContainer.children

/**
 * Ajoute l'attribut hidden aux anciens articles pour n'en faire
 * apparaitre que trois
 */
function seulementTrois() {
    for (let indice = 0; indice < blogContainer.childElementCount; indice++) {
        if (!idArticlesTrie.includes(indice + 1)) {
            blogContent[indice].setAttribute('hidden', 'true')
        }
        else blogContent[indice].removeAttribute('hidden')
    }
}

/**
 * Supprime l'attribut hidden qui cache les anciens articles
 */
function afficheTout() {
    for (const blogContentElement of blogContent) {
        blogContentElement.removeAttribute('hidden')
    }
}



