import { initContact } from "./pages/contact.js";
import { initDashboard } from "./pages/dashboard.js";
import { initEvents } from "./pages/events.js";
import { initFilters } from "./components/cards.js";
import { initGallery } from "./pages/gallery.js";
import { initRegister } from "./pages/register.js";
import { layout } from "./components/layout.js";
import { projects } from "./data/projects.js";
import { tips } from "./data/tips.js";

document.addEventListener('DOMContentLoaded', () => {
    layout();

    if (document.querySelector('#tips-list')) {
        initFilters('.tip-filter', '#tips-list', tips, 'tip');
    }

    if (document.querySelector('#projects-list-page')) {
        initFilters('.project-filter', '#projects-list-page', projects, 'project');
    }

    initGallery();
    initEvents();
    initContact();
    initRegister();
    initDashboard();
});