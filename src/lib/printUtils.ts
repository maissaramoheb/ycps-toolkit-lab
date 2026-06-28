export function printWithDocumentTitle(title: string) {
  const originalTitle = document.title;
  let restored = false;

  const restoreTitle = () => {
    if (restored) return;
    restored = true;
    document.title = originalTitle;
    window.removeEventListener('afterprint', restoreTitle);
    window.removeEventListener('focus', restoreTitle);
  };

  window.addEventListener('afterprint', restoreTitle, { once: true });
  window.addEventListener('focus', restoreTitle, { once: true });
  document.title = title;
  window.print();
}

export function getPrintContextLabel(context: string) {
  return /carana/i.test(context) ? 'CARANA' : context;
}
