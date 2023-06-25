export default function isElementVisible(el) {
  try {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

    if (isVisible) return true;
  } catch (error) {}
}
