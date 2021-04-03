import { qs } from '../dom/dom';

/**
 * Run script callback when a section is selected
 * @param {string} className: Root classname section
 * @param {Function} cb: Callback when this section is selected
 */
export const onSectionSelected = (className: string, cb: () => void): void => {
  qs(className) && cb();
};

/**
 * Debounce function
 * @param {Function} func : Function want to delay
 * @param {number} waitFor : Time to delay
 * @returns {Function}
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const debounce = <F extends (...args: any) => any>(func: F, waitFor: number) => {
  let timeout = 0;

  const debounced = (...args: any): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
