import DefaultLayout from "~/layouts/Default.vue";
// import "prismjs/themes/prism.css";
// import VueDisqus from "vue-disqus";
import VueSocialSharing from "vue-social-sharing";
import chance from "chance";

export default function(Vue, { head }) {
    Vue.component("Layout", DefaultLayout);
    //Vue.use(VueDisqus);
    Vue.use(VueSocialSharing);

    head.htmlAttrs = { lang: "en", class: "h-full" };
    head.bodyAttrs = { class: "antialiased font-serif" };

    head.link.push({
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Fira+Sans:400,700%7CCardo"
    }, {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alegreya&family=Alegreya+Sans&family=Merriweather&family=Merriweather+Sans&family=Nunito&family=Nunito+Sans&family=Quattrocento&family=Quattrocento+Sans&family=Roboto&family=Roboto+Mono&family=Roboto+Slab&display=swap"
    });
}