---
title: "I Made a Photo Page with Gridsome, GraphQL, and the Flickr API"
slug: i-made-a-photo-page
description: "Lots of trial and error but success in the end"
date: 2020-05-05 10:51:13
author: Steve Shupe
tags:
    - Gridsome
    - Flickr
    - GraphQL
    - APIs
    - Vue
    - Web Development
    - Photography
cover: "https://ssshupe.com/wp-content/uploads/2020/05/GraphQLExplorer-1.jpg"
fullscreen: false
---

My adventures in front-end web development continue.

I'm a WebDev rookie, and am progressing in the absolute wrong way, starting at the top with [Gridsome](https://Gridsome.org) and [Vue](https://vuejs.org), before having a good grasp of any of the three sisters (HTML, CSS, JavaScript) they're built on. But I'm more motivated when I can directly see the results of what I'm learning, rather than just rolling through tutorials. In my case, my motivation comes from futzing around with this new blog site.

I wanted to add a page that would show the last "x" number of pictures that I put onto my [Flickr site](https://flickr.com/photos/ssshupe), and allow users to click on any picture to bring up the larger original image. I knew that Gridsome (which I use to build this blog) uses [GraphQL](https://graphql.org/), and that GraphQL could be used to suck in data from third-party APIs and use it in my page, but that was about the extent of my knowledge. Still, off I went.

A quick jargon explanation for my non-techie readers: "API" is an acronym for ["Application Programming Interface"](https://en.wikipedia.org/wiki/Application_programming_interface). APIs allow programmers developing an application or web page to hook directly into data contained in another application. Using the Flickr site as an example, if you go to [my "photostream" page](https://flickr.com/photos/ssshupe/) and click on any picture ([this one](https://flickr.com/photos/ssshupe/49750270696/in/datetaken/), for example), you'll see a lot of information about the photo: the title, when it was taken, how many views it had, the camera and lens model, shutter speed, ISO, and so on. Clicking on the "download" arrow, then clicking on "View all sizes" brings up [a page](https://www.flickr.com/photos/ssshupe/49750270696/sizes/l/) with links to different sizes you can download. An API allows you to directly access all this data, and have it "delivered" in a structured way, without having to go through the various Flickr pages to copy the data manually.

If the Flickr API is a data "giver," the GraphQL component in my Gridsome site is the data "receiver." But GraphQL is itself an API. It can dish out data, and also perform data queries, in the same way one would query a database. The GraphQL site describes it as "a query language for APIs and a runtime for fulfilling those queries with your existing data." Creating my photo page required importing Flickr data into my GraphQL data, then querying the GraphQL data to create the photo page.

This first step required two sub-steps:

-   Figure out where in the Flickr API I could find the data I needed
-   Figure out how to insert that data into the Gridsome GraphQL data

The first of these was simple enough: Flickr has a well-documented API, and it was easy to find the particular endpoint ([flickr.people.getPhotos](https://www.flickr.com/services/api/flickr.people.getPhotos.html)) that contained the data I needed. Flickr also has a helpful ["API Explorer"](https://www.flickr.com/services/api/explore/flickr.people.getPhotos) that allows you to create an API call manually. The Explorer then returns the data as well as a URL that can call the data.

For my photo page, I needed the following information about my Flickr photos: the title, the id number, the date taken, the URL of the "medium" size (to populate the images on the photo page), and the URL of the "original" size (to use when viewers wanted to see an enlarged version of a photo). Plugging those into the Flickr API explorer [returned this file](https://newblog.ssshupe.com/images/posts/resultsofapicall.xml).

(Technical aside: The link above returns an XML file, more easily viewable in a web browser. My actual call to the API returned a [JSON](https://www.json.org/json-en.html) file, more suitable for data exchange purposes.)

The data I got consisted of a list of my last 500 photos on Flickr, with each photo item looking like this:

```
<photo id="49749731273" owner="11155423@N00" secret="f0d3d9fe38" server="65535" farm="66" title="Suzie and Sparky" ispublic="1" isfriend="0" isfamily="0" datetaken="2020-04-07 15:32:22" datetakengranularity="0" datetakenunknown="0" url_z="https://live.staticflickr.com/65535/49749731273_f0d3d9fe38_z.jpg" height_z="427" width_z="640" url_o="https://live.staticflickr.com/65535/49749731273_f463b17277_o.jpg" height_o="4538" width_o="6804"/>
```

Looking closely, all the data I wanted are there. Sub-step one was done!

To accomplish sub-step two -- getting the Flickr API data into my site's GraphQL data -- the [Gridsome documentation](https://gridsome.org/docs/fetching-data/) was helpful. Sub-step two required creating up a new JavaScript file (gridsome.server.js). While I know nothing about JavaScript server files, I do know enough to see where to plug my specific data information into the template provided by Gridsome. My final gridsome.server.js file looked like this:

```js
const axios = require("axios");

module.exports = function(api) {
    api.loadSource(async actions => {
        const { data } = await axios.get(
            "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=xxx&user_id=11155423%40N00&extras=url_z%2C+url_o%2C+date_taken&per_page=500&format=json&nojsoncallback=1"
        );

        const collection = actions.addCollection("FlickrPhotos");

        for (const item of data.photos.photo) {
            collection.addNode({
                id: item.id,
                title: item.title,
                url_o: item.url_o,
                url_m: item.url_z,
                date: item.date_taken
            });
        }
    });
};
```

The first part uses the [Axios](https://www.npmjs.com/package/axios) package to make a request to the Flickr API for the photo data. The second part adds a new collection of data ("FlickrPhotos") to my GraphQL by going through each item (photo data element) and adding a node to my GraphQL containing the five desired pieces of data.

To check to see if this worked, I used Gridsome's [GraphQL Explorer](https://gridsome.org/docs/data-layer/#the-graphql-explorer). I'm not a database person (I've never toyed with any of the SQL-related database applications), so the query language seemed odd at first, but I quickly figured it out. I was able to construct and run a query in the Explorer, which showed that the Flickr data had been incorporated into my GraphQL data (click on image for larger version).

[![My GraphQL Explorer Query](https://ssshupe.com/wp-content/uploads/2020/05/GraphQLExplorer-1.jpg)](https://ssshupe.com/wp-content/uploads/2020/05/GraphQLExplorer-1.jpg)

So Step One was done. Step Two was harder and required a lot more trial-and-error, due to my lack of familiarity with JavaScript and [Vue](https://vuejs.org/) (which Gridsome uses to build its static web sites). Recall that I wanted to create a new "Photos" page on my site that would show my last "x" number of Flickr photos, and allow users to see a bigger, high-resolution version of any photo if they clicked on it. Since "x" was equal to 500, this was evidently not something I wanted to code "by hand." Rather, I wanted to code a way for the page to iterate over the data I had for all 500 pictures and put each one on the page automatically.

The syntax for JavaScript and Vue was unfamiliar, but the ability to iterate over each element in an object (i.e., a list or array or hash-table/dictionary) was familiar to me (and indeed is one of the most powerful abilities of all computer languages). I knew what iteration looked like in other language, which helped me here. But what, exactly, was the "object" I was supposed to iterate over?

Fortunately, the Gridsome documentation [provided an answer](https://gridsome.org/docs/querying-data/) and a template for doing exactly what I wanted to do. Gridsome comes with a "<page-query>" tag that allows you to query the GraphQL data for purposes of creating variables representing GraphQL data that can be used on the page. For me, that meant constructing this query:

```json
{ photos: allFlickrPhotos(sortBy: "date", order: ASC)
 { edges
   { node
    { id title url_o url_m} } } }
```

By this time, the syntax of GraphQL hit me: It was based upon (ta-da!) the elements of what computer scientists and mathematicians call [a graph](https://mathigon.org/course/graph-theory/introduction) -- "a series of vertices [or nodes] connected by edges." My query said, "Go into the allFlickrPhotos data, go along the edges to each node, and for each node give me the ID, Title, and the URLs for the original and medium sizes of the image, sorted in ascending order by date."

That's cool, but what Gridsome and Vue can do with the queried data is cooler. Recall the point was to be able to iterate over all the photo information. The example in the [Gridsome documentation](https://gridsome.org/docs/querying-data/) shows how to do it. It takes advantage of [Vue's "v-for" directive](https://vuejs.org/v2/guide/list.html):

```html
<template>
    <div>
        <div v-for="edge in $page.posts.edges" :key="edge.node.id">
            <h2>{{ edge.node.title }}</h2>
        </div>
    </div>
</template>
```

In the code above, Gridsome provides the special `$page.post.edges` variable to represent and allow the v-for directive to access the edges of the data. It then says, for each edge, give me the title (the `edge.node.title` variable) and (using the hilariously named ["mustache syntax"](https://mustache.github.io/mustache.1.html)) make it into a printed heading.

This is where I ran into trouble. Most of the data I used on my photo page wasn't printed out; rather it was inserted as attributes into `<img>` and `<a href="">` html tags. When I used the "moustache" syntax to do that insertion, the pictures came back as ... blank areas. Something wasn't working. It took a while for me to [find the problem](https://vuejs.org/v2/guide/syntax.html#Attributes): Moustaches can't be used for attributes inside html tags; you have to use something called the v-bind directive. I followed that requirement and ... voila! ... my page had pictures on it.

The last task was styling the page to make it look OK. I frankly wasn't too concerned with styling -- a page of pictures with titles beneath them was fine. Still, it needed to be centered, etc., so I threw in a little bit of styling to accomplish the minimum.

The final code for the new photo page:

```html
<template>
    <Layout>
        <main>
            <header
                class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto text-center px-6 pt-24"
            >
                <h2
                    class="text-3xl sm:text-3xl md:text-4xl font-serif font-bold mb-1"
                >
                    My Last 500 Photos on Flickr
                </h2>
                <p class="text-grey-dark text-lg sm:text-2xl">
                    Click on any Photo to Enlarge
                </p>
            </header>
            <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
                <g-link
                    to="/"
                    class="border-blue-800 text-normal border opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity duration-300 font-sans text-blue-600"
                    >&larr; Home</g-link
                >
            </nav>

            <div
                v-for="edge in $page.photos.edges"
                :key="edge.node.id"
                class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto p-2 justify-center"
            >
                <center>
                    <figure class="p-4">
                        <a v-bind:href="edge.node.url_o">
                            <img v-bind:src="edge.node.url_m" loading="lazy" />
                        </a>
                        <figcaption>
                            <em>
                                <center>{{ edge.node.title }}</center>
                            </em>
                        </figcaption>
                    </figure>
                </center>
            </div>
        </main>
    </Layout>
</template>

<page-query>
    query { photos: allFlickrPhotos(sortBy: "date", order: ASC) { edges { node {
    id title url_o url_m} } } }
</page-query>
```

I suspect most of you don't care about that, just show me the @#\$#@ photo page for God's sake. You can see it by clicking [here](/photos), or by clicking the "Photos" link in the footer below. I plan on more tweaks, so as always stay tuned.

Now some of you may be saying, as do the French, "_Tout ça pour ça?!?_" A fair comment. But four weeks ago I knew nothing about Gridsome or Vue or GraphQL. Now I know something. Learning that "something" was an intellectual challenge, and seeing the photo page "live" gives me a feeling of satisfaction and accomplishment, a needed addition in this time of quarantine. My new photo page won't change the world, but it's mine!
