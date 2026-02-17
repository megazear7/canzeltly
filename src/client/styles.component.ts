import { css } from "lit";

export const componentStyles = css`
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--color-secondary-surface);
    border-radius: var(--border-radius-large);
    padding: var(--size-large);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow-elevated);
    border: var(--border-subtle);
  }

  .modal h2 {
    margin-top: 0;
    color: var(--color-primary-text);
  }

  .modal button {
    margin: var(--size-small) var(--size-small) 0 0;
    padding: var(--size-small) var(--size-large);
    border: var(--border-subtle);
    background: var(--color-secondary-surface);
    color: var(--color-primary-text);
    border-radius: var(--border-radius-small);
    cursor: pointer;
  }

  .modal button:hover {
    background: var(--color-secondary-surface-hover);
  }

  .modal button.primary {
    background: var(--color-1);
    color: var(--color-primary-text);
    border-color: var(--color-1);
  }

  .modal button.primary:hover {
    background: var(--color-1-light);
  }

  /* Input styles */
  .input-group {
    margin-bottom: var(--size-medium);
  }

  .input-group label {
    display: block;
    margin-bottom: var(--size-small);
    color: var(--color-primary-text);
    font-weight: var(--font-weight-medium);
  }

  .input-group input,
  .input-group select,
  .input-group textarea {
    width: 100%;
    padding: var(--size-small);
    border: var(--border-subtle);
    border-radius: var(--border-radius-small);
    background: var(--color-secondary-surface);
    color: var(--color-primary-text);
    font-size: var(--font-medium);
  }

  .input-group input:focus,
  .input-group select:focus,
  .input-group textarea:focus {
    outline: none;
    border-color: var(--color-1);
    box-shadow: 0 0 0 2px rgba(231, 80, 44, 0.2);
  }

  /* Button styles */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--size-small);
    padding: var(--size-small) var(--size-large);
    border: var(--border-subtle);
    background: var(--color-secondary-surface);
    color: var(--color-primary-text);
    border-radius: var(--border-radius-small);
    cursor: pointer;
    text-decoration: none;
    font-size: var(--font-medium);
    font-weight: var(--font-weight-medium);
    transition: var(--transition-all);
  }

  .btn:hover {
    background: var(--color-secondary-surface-hover);
  }

  .btn.primary {
    background: var(--color-1);
    color: var(--color-primary-text);
    border-color: var(--color-1);
  }

  .btn.primary:hover {
    background: var(--color-1-light);
  }

  .btn.danger {
    background: var(--color-danger);
    color: var(--color-primary-text);
    border-color: var(--color-danger);
  }

  .btn.danger:hover {
    background: var(--color-danger-hover);
  }

  /* List styles */
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-item {
    padding: var(--size-medium);
    border-bottom: var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: var(--transition-all);
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .list-item:hover {
    background: var(--color-secondary-surface-hover);
  }

  /* Card styles */
  .card {
    background: var(--color-secondary-surface);
    border: var(--border-subtle);
    border-radius: var(--border-radius-medium);
    padding: var(--size-medium);
    box-shadow: var(--shadow-normal);
    transition: var(--transition-all);
  }

  .card:hover {
    box-shadow: var(--shadow-hover);
  }

  /* Form styles */
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--size-medium);
  }

  .form-row {
    display: flex;
    gap: var(--size-medium);
    align-items: end;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--size-small);
    margin-top: var(--size-medium);
  }
`;
