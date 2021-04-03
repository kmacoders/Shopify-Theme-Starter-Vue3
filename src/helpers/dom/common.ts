/**
 * @example
 *
 * ```
 * const styleEl = `
 *  <style type="text/css">
 *    .xo-modal-popup {
 *      background-color: ${general.fieldsPopup} !important;
 *    }
 *  </style>
 * `;
 *
 * appendToHead({
 *   type: 'html',
 *   childEl: styleEl,
 * });
 * ```
 * @param config
 */
const appendToHead = (config: {
  type: 'html' | 'element',
  childEl: string | HTMLStyleElement | HTMLScriptElement
}): void => {
  const { type, childEl } = config;
  const headHTML = document.head || document.getElementsByTagName('head')[0];

  type === 'html' && headHTML.insertAdjacentHTML('beforeend', childEl as string);
  type === 'element' && headHTML.insertAdjacentElement('beforeend', childEl as HTMLStyleElement | HTMLScriptElement);
};

/**
 *
 * @example
 * ```
 * const previewElement = document.querySelector('.preview-el');
 *
 * css(previewElement, {
 *   display: 'none',
 *   color: '#f00';
 *   font-size: '2rem';
 * });
 * ```
 *
 * @param el
 * @param styleObj
 */
const css = (el: HTMLElement, styleObj: any): void => {
  Object.keys(styleObj).forEach((key: any) => {
    // eslint-disable-next-line no-param-reassign
    el.style[key] = styleObj[key];
  });
};

/**
 * Active only classname in ctx
 * @example
 *
 * ```
 * const btn = document.getElementById('btn');
 * const wrapper = document.querySelector('.xo-wrapper');
 *
 * btn.addEventListener('click', () => {
 *  activeClass(btn, 'xo--active', wrapper);
 * })
 * ```
 *
 * @param el - Target element
 * @param className - Class to toggle to target element
 * @param ctx - Context document
 */
const activeClassInCtx = <T extends Element>(el: HTMLElement, className: string, ctx: T | Document = document): void => {
  ctx.querySelector(`.${className}`)!.classList.remove(className);
  el.classList.add(className);
};

export {
  css,
  activeClassInCtx,
  appendToHead,
};
