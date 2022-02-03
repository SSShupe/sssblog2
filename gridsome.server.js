const axios = require("axios");

module.exports = function(api) {
    api.loadSource(async actions => {
        const { data } = await axios.get(
            "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=1a77359c736a2f7546c1797c832ff5cf&user_id=11155423%40N00&extras=url_z%2C+url_o%2C+date_taken&per_page=500&format=json&nojsoncallback=1"
        );

        const collection = actions.addCollection("FlickrPhotos");

        for (const item of data.photos.photo) {
            collection.addNode({
                id: item.id,
                title: item.title,
                url_o: item.url_o,
                url_m: item.url_z,
                date: item.datetaken
            });
        }
    });
};