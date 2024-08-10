import {articles} from "./articles.js";
const blogContainer = document.querySelector('section')

/**
 *
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
 * @param {{id: number, title: string, summary: string}}article
 * @return {HTMLElement}
 */
function ajoutArticle(article) {
    const articleElement = document.createElement('article')

    const articleTitle = ajoutElemAvecTexte('h2', article.title)
    const articleSummary = ajoutElemAvecTexte('p', article.summary)

    articleElement.append(articleTitle, articleSummary)

    return articleElement
}

for (const article of articles) {
    blogContainer.append(ajoutArticle(article))
}
