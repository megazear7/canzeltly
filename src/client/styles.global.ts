import { css } from "lit";

export const globalStyles = css`
  h1 {
    font-size: var(--font-xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-tight);
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  h2 {
    font-size: var(--font-large);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-tight);
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  h3 {
    font-size: var(--font-medium);
    font-weight: var(--font-weight-semibold);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: var(--font-medium);
    line-height: 1.6;
    margin-bottom: 1rem;
    color: var(--color-primary-text-muted);
  }

  a {
    color: var(--color-2);
    text-decoration: none;
    transition: var(--transition-all);
    display: inline-flex;
    align-items: center;
    font-weight: var(--font-weight-medium);
  }

  a:hover {
    color: var(--color-2-light);
  }

  a.standalone {
    padding: var(--size-small) 0;
    position: relative;
  }

  a.standalone::after {
    content: "";
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-2);
    transition: width var(--time-normal) var(--ease-out);
  }

  a.standalone:hover::after {
    width: 100%;
  }

  main {
    max-width: var(--content-width);
    margin: var(--size-large) auto;
    animation: fadeIn var(--time-normal) var(--ease-out);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  button {
    font-size: var(--font-small);
    font-weight: var(--font-weight-medium);
    padding: var(--size-small) var(--size-large);
    border: none;
    border-radius: var(--border-radius-small);
    background-color: var(--color-secondary-surface);
    color: var(--color-primary-text);
    cursor: pointer;
    transition: var(--transition-all);
    box-shadow: var(--shadow-normal);
    display: inline-flex;
    align-items: center;
    gap: var(--size-small);
    white-space: nowrap;
    user-select: none;
  }

  button.simple {
    background-color: transparent;
    box-shadow: none;
  }

  button.simple:hover {
    background-color: var(--color-secondary-surface-hover);
    box-shadow: none;
  }

  button.primary {
    background-color: var(--color-1);
    box-shadow: var(--shadow-normal), var(--shadow-glow-1);
  }

  button.primary:hover {
    background-color: var(--color-1-light);
    box-shadow: var(--shadow-hover), var(--shadow-glow-1);
    transform: var(--transform-hover);
  }

  button.warning {
    background-color: var(--color-danger);
  }

  button.danger {
    background-color: var(--color-danger);
  }

  button:hover {
    background-color: var(--color-secondary-surface-hover);
    box-shadow: var(--shadow-hover);
    transform: var(--transform-hover);
  }

  button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-normal);
    transition-duration: var(--time-fast);
  }

  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  button:disabled {
    background-color: var(--color-secondary-surface) !important;
    color: var(--color-secondary-text-muted) !important;
    box-shadow: none !important;
    transform: none !important;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .back-button {
    position: fixed;
    top: var(--size-medium);
    left: var(--size-medium);
    z-index: 1000;
    border-radius: var(--border-radius-pill);
    padding: var(--size-small) var(--size-medium);
    backdrop-filter: blur(10px);
    background-color: rgba(39, 43, 49, 0.85);
    border: var(--border-subtle);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: var(--size-medium);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-small);
    color: var(--color-primary-text-muted);
  }

  ::selection {
    background-color: rgba(231, 80, 44, 0.3);
    color: var(--color-primary-text);
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-secondary-surface-hover);
    border-radius: var(--border-radius-pill);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary-text-muted);
  }
`;
