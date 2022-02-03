<template>
  <Layout>
    <main>
      <header class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto text-center px-6 pt-24">
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mb-1">The "About" Page</h1>
        <p class="text-grey-dark text-lg sm:text-3xl">Currently Under Construction</p>
      </header>
      <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
        <g-link
          to="/"
          class="border-blue-800 text-normal border opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity duration-300 font-sans text-blue-600"
        >&larr; Home</g-link>
      </nav>
      <article
        class="font-serif max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto px-6 sm:px-12 pt-16 border-b border-gray-300 pb-10 mb-16"
      >
        <div class="markdown text-lg leading-normal text-gray-800">
          <center>
            <p>Vous devez attendre un peu</p>
          </center>
        </div>
      </article>
      <site-footer class="pb-8 sm:pb-10" />
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import SiteFooter from "@/components/Footer";

export default {
  components: {
    SiteFooter
  },
  metaInfo() {
    return {
      title: "About",
      meta: [
        {
          key: "description",
          name: "description",
          content: this.ogDescription
        },

        {
          property: "og:type",
          content: "article"
        },
        {
          property: "og:title",
          content: "About"
        },
        {
          property: "og:description",
          content: this.ogDescription
        },
        {
          property: "og:url",
          content: `${this.config.siteUrl}/about/`
        },
        {
          property: "og:image",
          content: this.ogImageUrl
        },

        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: "About"
        },
        {
          name: "twitter:description",
          content: this.ogDescription
        },
        {
          name: "twitter:site",
          content: "@ssshupe"
        },
        {
          name: "twitter:creator",
          content: "@ssshupe"
        },
        {
          name: "twitter:image",
          content: this.ogImageUrl
        }
      ]
    };
  },
  computed: {
    config() {
      return config;
    },
    ogDescription() {
      return "About SSS";
    },
    ogImageUrl() {
      return `${this.config.siteUrl}/images/Steve Shupe.png`;
    }
  }
};
</script>