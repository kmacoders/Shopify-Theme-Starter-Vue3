/**
 * Add new event to element
 *
 * #### Example
 *
 * ```
 * const btn = byId('submit');
 * const handler = (e) => { ... }
 * events.on(btn, 'click', handler);
 * ```
 *
 */
const $on = <T extends Element>(target: Document | T, type: string, handler: EventListener): void => {
  target.addEventListener(type, handler);
};

/**
 * turn off event from element
 * #### Example
 *
 * ```
 * const btn = byId('submit');
 * const handler = (e) => { ... }
 * events.on(btn, 'click', handler);
 * events.off(btn, 'click', handler);
 * ```
 *
 */

const $off = (target: Document, type: string, handler: EventListener): void => {
  target.removeEventListener(type, handler);
};

export {
  $on,
  $off,
};
