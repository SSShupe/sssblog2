<template>
  <Layout>
    <main>
      <header class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto text-center px-6 pt-24">
        <h2
          class="text-3xl sm:text-3xl md:text-4xl font-serif font-bold mb-1"
        >My Last 500 Photos on Flickr</h2>
        <p class="text-grey-dark text-lg sm:text-2xl">Click on any Photo to Enlarge</p>
      </header>
      <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
        <g-link
          to="/"
          class="border-blue-800 text-normal border opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity duration-300 font-sans text-blue-600"
        >&larr; Home</g-link>
      </nav>

      <div class="gallery2">
        <div class="gallery-panel2" v-for="edge in $page.photos.edges" :key="edge.node.id">
          <figure>
            <a v-bind:href="edge.node.url_o">
              <img v-bind:src="edge.node.url_m" loading="lazy" />
            </a>
            <figcaption>
              <em>
                <center>{{ edge.node.title }}</center>
              </em>
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  </Layout>
</template
>
<style>
.gallery2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}
.gallery-panel2 img {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
<page-query>
        query { photos: allFlickrPhotos(sortBy: "date") { edges { node {date id title url_o url_m} } } }
      </page-query>
