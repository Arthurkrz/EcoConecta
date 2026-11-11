export function showMessage(target, message, error = false) {
    const el = document.querySelector(target);

    if (!el) {
        return;
    }

    el.textContent = message;
    el.className = 'alert-eco' + (error ? ' error' : '');
    el.setAttribute('role', 'status');
}

export function escapeHtml(s) {
    return String(s).replace(
        /[&<>"']/g,
        c => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[c])
    );
}