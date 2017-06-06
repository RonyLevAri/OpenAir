export function buildStationObj(data) {
    let station = {};
    station.key = data["pk"];
    station.id = data["pk"];
    station.isActive = data["fields"]["is_active"];
    station.latitude = data["fields"]["latitude"];
    station.longitude = data["fields"]["longitude"];
    station.name = data["fields"]["name"];
    station.isChosen = false;
    station.isSelectable = data["fields"]["is_active"];
    return station;
}

export function graphSelectionCompleted(graphSelections) {
    let {pollutant, station, start, end} = graphSelections;
    // return (pollutant && station && start && end);
    return (pollutant && station);
}