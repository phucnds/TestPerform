self.addEventListener('fetch', function (event) {
    // Check if the request is for the Mapbox API
    if (event.request.url.startsWith('https://api.mapbox.com/styles/v1/')) {
        console.log('as;lkhjasglkashjg')
        event.respondWith(
            caches.match(event.request).then(function (response) {
                // Return the cached response if available, otherwise fetch from network
                return response || fetch(event.request).then(function (response) {
                    // Cache the newly fetched response
                    return caches.open('mapbox-images').then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            }).catch(function (error) {
                console.error('Fetch failed; returning offline page instead.', error);
                // Handle the error, perhaps by showing a fallback offline image
            })
        );
    } else {
        // Handle other fetches normally
        console.log('asgkjashkjashg', event.request);
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});
