module.exports = {
    siteName: "The New SSS Blog",
    siteDescription: "My new personal blog, built with Gridsome, the Vue.js static site generator, and Tailwind CSS.",
    siteUrl: "https://newblog.ssshupe.com",
    titleTemplate: `%s`,
    icon: "src/favicon2.png",
    port: 8000,

    transformers: {
        remark: {
            externalLinksTarget: "_blank",
            externalLinksRel: ["nofollow", "noopener", "noreferrer"],
            imageQuality: 85,
            lazyLoadImages: true,
            footnotes: true,
            plugins: [
                [
                    "gridsome-plugin-remark-shiki",
                    {
                        theme: "min-light"
                    }
                ]
            ]
        }
    },

    plugins: [{
            use: "@gridsome/source-filesystem",
            options: {
                path: "content/posts/**/*.md",
                typeName: "Post",
                refs: {
                    tags: {
                        typeName: "Tag",
                        create: true
                    },
                    author: {
                        typeName: "Author",
                        create: true
                    }
                }
            }
        },
        {
            use: "@gridsome/plugin-google-analytics",
            options: {
                id: "UA-163982552-1"
            }
        },

        {
            use: "@gridsome/plugin-sitemap",
            options: {
                cacheTime: 600000 // default
            }
        },
        {
            use: "gridsome-plugin-rss",
            options: {
                contentTypeName: "Post",
                feedOptions: {
                    title: "The New SSS Blog",
                    feed_url: "http://newblog.ssshupe.com/feed.xml",
                    site_url: "http://newblog.ssshupe.com"
                },
                feedItemOptions: node => ({
                    title: node.title,
                    description: node.description,
                    url: "https://newblog.ssshupe.com" + node.path,
                    author: node.author,
                    date: node.date
                }),
                output: {
                    dir: "./static",
                    name: "feed.xml"
                }
            }
        }
    ],

    templates: {
        Post: "/:title",
        Tag: "/tag/:id",
        Author: "/author/:id"
    },

    chainWebpack: config => {
        config.module
            .rule("css")
            .oneOf("normal")
            .use("postcss-loader")
            .tap(options => {
                options.plugins.unshift(
                    ...[
                        require("postcss-import"),
                        require("postcss-nested"),
                        require("tailwindcss")
                    ]
                );

                if (process.env.NODE_ENV === "production") {
                    options.plugins.push(
                        ...[
                            require("@fullhuman/postcss-purgecss")({
                                content: ["src/assets/**/*.css", "src/**/*.vue", "src/**/*.js"],
                                defaultExtractor: content =>
                                    content.match(/[\w-/:%]+(?<!:)/g) || [],
                                whitelistPatterns: [/shiki/]
                            })
                        ]
                    );
                }

                return options;
            });
    }
};