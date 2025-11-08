if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Реєструємо наш Service Worker
        navigator.serviceWorker
            .register('sw.js')
            .then(registration => {
                console.log('✅ Service Worker зареєстровано успішно:', registration);
            })
            .catch(error => {
                console.log('❌ Помилка реєстрації Service Worker:', error);
            });
    });
}
