interface SignUpElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  passwordOne: HTMLInputElement;
  passwordTwo: HTMLInputElement;
}

interface SignInElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export { SignUpElements, SignInElements };
