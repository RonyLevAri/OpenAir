export function buildStationObj(data) {
    let station = {};
    try {
        station.key = data["pk"];
        station.id = data["pk"];
        station.isActive = data["fields"]["is_active"];
        station.latitude = data["fields"]["latitude"];
        station.longitude = data["fields"]["longitude"];
        station.name = data["fields"]["name"];
        station.isChosen = false;
        station.isSelectable = data["fields"]["is_active"];
    }
    catch(err) {
        station = {key: data, id: data, isActive: false, latitude: 0, longitude: 0, name: "", isChosen: false, isSelectable: false}
    }

    return station;
}

export function graphSelectionCompleted(graphSelections) {
    let {pollutant, station, start, end} = graphSelections;
    // return (pollutant && station && start && end);
    return (pollutant && station);
}