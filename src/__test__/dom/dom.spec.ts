import { addClass, qs, qsa } from '../../helpers/dom/dom';

/**
 * @see https://noriste.github.io/reactjsday-2019-testing-course/book/intro-to-react-testing/jest-dom.html
 */
describe("DOM helpers test kmacoders", () => {
  test("Test qsa", () => {
    document.body.innerHTML = `
      <div class="xo-swiper-container">
        <div data-test="1" class="xo-item">kmacoders</div>
        <div class="xo-item2"></div>
      </div>
    `;

    const output = 1;
    const dataTestValue = qsa('.xo-item')[0].getAttribute('data-test');

    expect(qsa('.xo-item').length).toBe(1);
    expect(dataTestValue).toEqual('1');
    expect(qsa('.xo-item2')[0]).toBeEmptyDOMElement;
  });

  test("test qs", () => {
    document.body.innerHTML = `
      <div class="xo-swiper-container">
        <div class="xo-item">kmacoders</div>
      </div>
    `;

    const output = true;
    const vanillaDOM = document.querySelector('.xo-item');
    expect(qs('.xo-item') === vanillaDOM).toBe(output);
  });

  test("test addClass", () => {
    document.body.innerHTML = `
      <div class="xo-swiper-container">
        <div class="xo-item">kmacoders</div>
      </div>
    `;

    const output = true;
    const xoItem = document.querySelector('.xo-item') as HTMLElement;
    addClass(xoItem, 'new-class');

    expect(xoItem.classList.contains('new-class')).toBe(output);
  });
  test("Test qsa", () => {
    document.body.innerHTML = `
      <div class="xo-swiper-container">
        <div data-test="1" class="xo-item">kmacoders</div>
        <div class="xo-item2"></div>
      </div>
    `;

    const output = 1;
    const dataTestValue = qsa('.xo-item')[0].getAttribute('data-test');

    expect(qsa('.xo-item').length).toBe(1);
    expect(dataTestValue).toEqual('1');
    expect(qsa('.xo-item2')[0]).toBeEmptyDOMElement;
  });

  test("test qs", () => {
    document.body.innerHTML = `
      <div class="xo-swiper-container">
        <div class="xo-item">kmacoders</div>
      </div>
    `;

    const output = true;
    const vanillaDOM = document.querySelector('.xo-item');
    expect(qs('.xo-item') === vanillaDOM).toBe(output);
  });

  test("test addClass", () => {
    document.body.innerHTML = `
      <div class="xo-swiper-container">
        <div class="xo-item">kmacoders</div>
      </div>
    `;

    const output = true;
    const xoItem = document.querySelector('.xo-item') as HTMLElement;
    addClass(xoItem, 'new-class');

    expect(xoItem.classList.contains('new-class')).toBe(output);
  });
});
