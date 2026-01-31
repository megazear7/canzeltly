import { css } from "lit";

export const globalStyles = css`
  h1 {
    font-size: var(--font-xl);
    margin-bottom: 1rem;
  }

  h2 {
    font-size: var(--font-large);
    margin-bottom: 0.75rem;
  }

  p {
    font-size: var(--font-medium);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  a {
    color: var(--color-2);
    text-decoration: none;
    transition: var(--transition-all);
    display: inline-flex;
    align-items: center;
  }

  a:hover {
    color: var(--color-1);
  }

  main {
    max-width: var(--content-width);
    margin: var(--size-large) auto;
  }

  button {
    font-size: var(--font-medium);
    padding: var(--size-small) var(--size-medium);
    border: none;
    border-radius: var(--border-radius-medium);
    background-color: var(--color-secondary-surface);
    color: var(--color-primary-text);
    cursor: pointer;
    transition: var(--transition-all);
    box-shadow: var(--shadow-normal);
  }

  button.simple {
    background-color: transparent;
    box-shadow: none;
  }

  button.primary {
    background-color: var(--color-1);
  }

  button.warning {
    background-color: var(--color-warning);
  }

  button:hover {
    background-color: var(--color-1);
    box-shadow: var(--shadow-hover);
  }

  button:disabled {
    background-color: var(--color-secondary-surface) !important;
    color: var(--color-secondary-text-muted) !important;
    box-shadow: var(--shadow-normal) !important;
  }
`;
