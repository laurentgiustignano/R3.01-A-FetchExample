/**
 * @typedef {body: string, id: number, title: string} Article
 *
 */

const blogContainer = document.querySelector('section');


/**
 * Créé un Element HTML spécifié par le paramètre tagName auquel on ajoute
 * un contenu spécifié par content
 * @param {string}tagName
 * @param {string}content
 * @return {HTMLAnchorElement | HTMLElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLObjectElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement}
 */
function ajoutElemAvecTexte(tagName, content) {
  const element = document.createElement(tagName);
  element.textContent = content;
  return element;
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
  const articleElement = document.createElement('article');
  const apres = instantane();
  const articleTitle = ajoutElemAvecTexte('h2', article.title + " - " + article.id + " - " + apres);
  const articleSummary = ajoutElemAvecTexte('p', article.body);

  articleElement.append(articleTitle, articleSummary);

  articleElement.addEventListener('mouseover', () => {
    articleElement.classList.add('hover');
  })

  articleElement.addEventListener('mouseout', () => {
    articleElement.classList.remove('hover');
  })

  return articleElement;
}

function instantane() {
  const now = new Date();
  const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
  return (`${timestamp}`);
}

const endPoint = 'http://localhost:3000/api/posts/';
const urls = [
  endPoint + 5,
  endPoint + 6,
  endPoint + 7,
  endPoint + 8,
  endPoint + 9,
  endPoint + 10,
  endPoint + 11,
  endPoint + 12,
]

const avant = instantane();
urls.forEach((url) => {
  fetch(url)
    .then((response) => {
      response.json()
        .then((data) => {
          data.avant = avant;
          blogContainer.append(ajoutArticle(data));
        })
    })
})


