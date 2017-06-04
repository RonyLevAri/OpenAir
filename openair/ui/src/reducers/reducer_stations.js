const stations = (state = [], action) => {
    switch(action.Type) {
        case 'STATION_ SELECTED':
            return state.map((station, index) => {
                if (index === action.index) {
                    return Object.assign({}, station, {
                        isChosen: true
                    });
                }
                return station;
            });
        default:
            return state;
    }
}

const stationsTest = () => {
    return (
        [
            {key: 1, name: 'מטולה', isActive: false, isChosen: false},
            {key: 2, name: 'עפולה', isActive: false, isChosen: false}
        ]
    );
}

export default stationsTest;

