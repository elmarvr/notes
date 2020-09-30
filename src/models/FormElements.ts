interface SignUpElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  passwordRepeat: HTMLInputElement;
}

interface SignInElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface PasswordResetElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}

interface PasswordUpdateElements extends HTMLFormControlsCollection {
  password: HTMLInputElement;
}

export {
  SignUpElements,
  SignInElements,
  PasswordResetElements,
  PasswordUpdateElements,
};
