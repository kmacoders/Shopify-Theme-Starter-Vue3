import { qs, qsa } from 'Helpers/dom/dom';

class LoginForm {
  loginForm: HTMLElement;

  loginForgot: NodeListOf<HTMLElement>;

  constructor() {
    this.loginForm = qs('.login-container') as HTMLElement;

    this.loginForgot = qsa('.login-form__forgot') as NodeListOf<HTMLElement>;
  }

  init(): void {
    this.handleSelectCollection();
  }

  handleSelectCollection(): void {
    this.loginForgot.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        this.loginForm.classList.toggle('login-form--active');
      });
    });
  }
}

const loginForm = new LoginForm();
loginForm.init();
