function initMap() {
    var myLatLng = {
        lat: 51.337620,
        lng: 3.828286
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: myLatLng
    });

    var contentString = '<div id="marker-content">' +
        '<h1>Contact met ons opnemen? Dat kan!</h1>' +
        '<div id="bodyContent"' +
        '<ul>' +
        '<div><li>Adres: [adres]</li></div>' +
        '<div><li>Postcode: [postcode]</li></div>' +
        '<div><li>Telefoonnummer: [Telefoonnummer]</li></div>' +
        '<div><li>Land: Nederland</li></div>' +
        '<div><li>KVK: [KVK-nummer]</li></div>' +
        '<div><li>BTW: [BTW-nummer]</li></div>' +
        '</ul>' +
        '</div>' +
        '</div>';

    var icon = {
        url: "../wp-content/themes/cafetiere-dici%20/img/icons/google_maps_marker.svg",
        scaledSize: new google.maps.Size(150, 150)
    }

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icon
    });

    marker.addListener('click', toggleBounce);

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}