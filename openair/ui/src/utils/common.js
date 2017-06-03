export function buildStationObj(data) {
    let station = {};
    station.key = data["pk"];
    station.isActive = data["fields"]["is_active"];
    station.latitude = data["fields"]["latitude"];
    station.longitude = data["fields"]["longitude"];
    station.name = data["fields"]["name"];
    station.isChosen = false;
    return station;

}