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
    background: var(--color-background);
    border-radius: var(--border-radius);
    padding: var(--spacing-large);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow);
  }

  .modal h2 {
    margin-top: 0;
    color: var(--color-text);
  }

  .modal button {
    margin: var(--spacing-small) var(--spacing-small) 0 0;
    padding: var(--spacing-small) var(--spacing-medium);
    border: 1px solid var(--color-border);
    background: var(--color-background);
    color: var(--color-text);
    border-radius: var(--border-radius);
    cursor: pointer;
  }

  .modal button:hover {
    background: var(--color-hover);
  }

  .modal button.primary {
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border-color: var(--color-primary);
  }

  .modal button.primary:hover {
    background: var(--color-primary-hover);
  }

  /* Input styles */
  .input-group {
    margin-bottom: var(--spacing-medium);
  }

  .input-group label {
    display: block;
    margin-bottom: var(--spacing-small);
    color: var(--color-text);
    font-weight: 500;
  }

  .input-group input,
  .input-group select,
  .input-group textarea {
    width: 100%;
    padding: var(--spacing-small);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-background);
    color: var(--color-text);
    font-size: var(--font-size-base);
  }

  .input-group input:focus,
  .input-group select:focus,
  .input-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-light);
  }

  /* Button styles */
  .btn {
    display: inline-block;
    padding: var(--spacing-small) var(--spacing-medium);
    border: 1px solid var(--color-border);
    background: var(--color-background);
    color: var(--color-text);
    border-radius: var(--border-radius);
    cursor: pointer;
    text-decoration: none;
    font-size: var(--font-size-base);
    transition: all 0.2s ease;
  }

  .btn:hover {
    background: var(--color-hover);
  }

  .btn.primary {
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border-color: var(--color-primary);
  }

  .btn.primary:hover {
    background: var(--color-primary-hover);
  }

  .btn.danger {
    background: var(--color-danger);
    color: var(--color-text-inverse);
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
    padding: var(--spacing-medium);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .list-item:hover {
    background: var(--color-hover);
  }

  /* Card styles */
  .card {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: var(--spacing-medium);
    box-shadow: var(--shadow);
  }

  /* Form styles */
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-medium);
  }

  .form-row {
    display: flex;
    gap: var(--spacing-medium);
    align-items: end;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-small);
    margin-top: var(--spacing-medium);
  }
`;
