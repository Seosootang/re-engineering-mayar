import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { AnimatePresence } from 'framer-motion';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// resources/js/app.tsx

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // INI PERBAIKANNYA
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            // LANGKAH 2: Bungkus komponen <App /> dengan <AnimatePresence>
            // dan tambahkan key yang unik untuk setiap halaman.
            <AnimatePresence mode="wait">
                <App {...props} key={props.initialPage.url} />
            </AnimatePresence>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
