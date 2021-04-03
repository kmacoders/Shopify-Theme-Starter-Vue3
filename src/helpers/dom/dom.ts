/* eslint-disable no-param-reassign */
// import { toArray } from './utils';
/**
 * Returns a reference to an element by its ID.
 *
 * #### Example:
 *
 * ```
 * import { byId } from 'helpers/dom';
 *
 * const content = byId('main-content');
 * ```
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 */
const byId = (id: string): HTMLElement | null => document.getElementById(id);

/**
 * Returns an array of all child elements which have all of the given class names
 *
 * #### Example:
 *
 * ```
 * import { byClassName } from 'helpers/dom';
 *
 * const listItems = byClassName('list__items');
 * ```
 * @param {Element|Document} [ctx=document] - Root element. `document` by default
 * @return {Array}
 */
const byClassName = (className: string, ctx: Element | Document = document): HTMLCollection => ctx.getElementsByClassName(className);

/**
 * Returns the first element within the document that matches the specified group of selectors
 *
 * #### Example:
 *
 * ```
 * import { qs } from 'helpers/dom';
 *
 * const content = qs('#main-content');
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * @see https://stackoverflow.com/questions/43032004/queryselector-in-typescript
 */
const qs = <T extends Element>(selector: string, ctx: T | Document = document): T | Element | null => ctx.querySelector(selector);

/**
 * Returns a list of the elements within the document that match the specified group of selectors
 *
 * #### Example:
 *
 * ```
 * import { qsa } from 'tsumami';
 *
 * const listItems = qsa('.list .list-items');
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 */
const qsa = <T extends Element>(selector: string, ctx: T | Document = document): NodeListOf<T> => ctx.querySelectorAll(selector);

/**
 * Select a list of matching elements or one element
 * @return NodeList or node
 */
// const $ = (scope: Document, selector: string, typeQuery: 'all' | '' = ''): NodeList | Element | null => {
//   if (typeQuery === 'all') {
//     return scope.querySelectorAll(selector);
//   }
//   return scope.querySelector(selector);
// };

/**
 * Check class is exist on target element
 *
 * #### Example
 *
 * ```
 * import { hasClass, byId } from 'tsumami';
 *
 * const content = byId('content');
 *
 * if (hasClass(content, 'remove-me')) {
 *     //...
 * }
 * ```
 */
const hasClass = (el: HTMLElement, className: string): boolean => {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
};

/**
 * Add class to element if that class is not exist
 *
 * #### Example
 *
 * ```
 * import { addClass, byId } from 'tsumami';
 *
 * const content = byId('content');
 *
 * addClass(content, 'new-class');
 * ```
 *
 */
const addClass = (el: HTMLElement, className: string): void => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += ` ${className}`;
  }
};

/**
 * Remove class from element
 *
 * #### Example
 *
 * ```
 * import { removeClass, byId } from 'tsumami';
 *
 * const content = byId('content');
 *
 * removeClass(content, 'remove-me');
 * ```
 */
const removeClass = (el: HTMLElement, className: string): void => {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    el.className = el.className.replace(reg, ' ');
  }
};

/**
 * Toggle class
 *
 * #### Example
 *
 * ```
 * import { toggleClass, byId } from 'tsumami';
 *
 * // html: <div id="content"></div>
 * const content = byId('content');
 *
 * toggleClass(content, 'random-class')
 * // html: <div id="content" class="random-class"></div>
 *
 * toggleClass(content, 'random-class')
 * // html: <div id="content"></div>
 *
 * toggleClass(content, 'random-class')
 * // html: <div id="content" class="random-class"></div>
 *
 * toggleClass(content, 'random-class', true)
 * // html: <div id="content" class="random-class"></div>
 * ```
 */
const toggleClass = (el: HTMLElement, className: string): void => {
  if (!hasClass(el, className)) {
    addClass(el, className);
  } else {
    removeClass(el, className);
  }
};

export {
  byId,
  byClassName,
  qs,
  qsa,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
};
