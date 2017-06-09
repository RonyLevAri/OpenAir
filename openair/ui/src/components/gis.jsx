import React from 'react';

class GIS extends React.Component {

    // props: {stations, initialZoom, initialCenter}

    constructor(props) {
        super(props);
    }

    render() {
        if(this.map)
            this.loadStations();
        return (
            <div className="gis w3-col m5">
                <div id="map" className={`white gis w3-card`} ref="mapCanvas">
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.map = this.createMap();
        this.createMarker();
        // this.infoWindow = this.createInfoWindow();
    }

    loadStations() {
        console.log(this.props.stations);
        this.marker = this.props.stations.map((station,index) => {
            console.log('fucking longi ', station.longitude);
            let latLng = new google.maps.LatLng(station.latitude, station.longitude);
            return new google.maps.Marker({
                position: latLng,
                map: this.map
            });
        });
    }

    createMap() {
        let mapOptions = {
            zoom: this.props.initialZoom,
            center: this.mapCenter()
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions);
    }

    mapCenter() {
        return new google.maps.LatLng(
            this.props.initialCenter.lng,
            this.props.initialCenter.lat
        )
    }

    createMarker() {
        return new google.maps.Marker({
            position: this.mapCenter(),
            map: this.map
        });
    }

    createInfoWindow() {
        let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
        return new google.maps.InfoWindow({
            map: this.map,
            anchor: this.marker,
            content: contentString
        })
    }
}

export default GIS;