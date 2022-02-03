<template>
  <footer
    class="mt-4 text-blue-600 text-lg font-sans leading-normal flex flex-wrap justify-between mx-auto max-w-3xl px-6 sm:px-12"
  >
    <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
      <p>Content &copy; Steve Shupe 2020</p>
      <p>
        <a
          href="https://github.com/cossssmin/gridsome-starter-bleda"
          class="border-b border-transparent hover:border-gray-400 transition-colors duration-300"
          >Theme: Bleda</a
        >
        by
        <a
          href="https://twitter.com/cossssmin"
          class="border-b border-transparent hover:border-gray-400 transition-colors duration-300"
          >@cossssmin</a
        >
      </p>
      <p>
        Built with
        <a
          href="https://gridsome.org"
          class="border-b border-transparent hover:border-gray-400 transition-colors duration-300"
          >Gridsome</a
        >
        &amp;
        <a
          href="https://tailwindcss.com/"
          class="border-b border-transparent hover:border-gray-400 transition-colors duration-300"
          >Tailwind CSS</a
        >
      </p>
    </div>
    <div class="w-full sm:w-1/2">
      <nav>
        <ul class="flex sm:justify-end -mx-2">
          <li class="px-2">
            <g-link
              to="/"
              class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
              >Home</g-link
            >
          </li>
          <li class="px-2">
            <g-link
              to="/about/"
              class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
              >About</g-link
            >
          </li>
          <li class="px-2">
            <a
              href="/photos"
              class="border-b border-transparent hover:border-gray-400 transition-colors duration-300"
              >Photos</a
            >
          </li>
          <li class="px-2">
            <a
              href="/feed.xml"
              class="border-b border-transparent hover:border-gray-400 transition-colors duration-300"
              >RSS Feed</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="border border-blue-400 text-lg w-full mt-4 mb-4 sm:mb-0 flex-row text-blue-600"
    >
      <center>
        <p>
          SSS Links:&nbsp;
          <a
            href="https://flickr.com/photos/ssshupe"
            class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
            >Flickr</a
          >&nbsp;&bull;
          <a
            href="https://facebook.com/steve.shupe"
            class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
            >Facebook</a
          >&nbsp;&bull;
          <a
            href="https://twitter.com/ssshupe"
            class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
            >Twitter</a
          >
          &nbsp;&bull;
          <a
            href="https://instagram.com/ssshupe"
            class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
            >Instagram</a
          >&nbsp;&bull;
          <a
            href="https://ssshupe.com"
            class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
            >Wordpress</a
          >&nbsp;&bull;
          <a
            href="https://linkedin.com/in/ssshupe"
            class="border-b border-transparent hover:border-blue-400 transition-colors duration-300"
            >LinkedIn</a
          >
        </p>
      </center>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
