import * as routeTypes from '../types/routeTypes';

const initialState = {
    currentPath: {
        fullPath: "",
        specificPath: "",
        queries: {}
    },
    previousPath: {
        fullPath: "",
        specificPath: "",
        queries: {}
    },
    tempPath: {
        fullPath: "",
        queries: {},
        specificPath: "",
    },
    visitationTrack: [],
    navigating: false
};

const routeReducer = (state = initialState, action: { [key: string]: any }) => {

    switch (action.type) {

        case routeTypes.ROUTE_TRANSITION_START:
            return ({
                ...state,
                tempPath: {
                    fullPath: action.payload.fullPath,
                    queries: action.payload.queries,
                    specificPath: action.payload.specificPath
                },
                navigating: true
            });

        case routeTypes.ROUTE_TRANSITION_COMPLETE:
            return ({
                ...state,
                previousPath: state.currentPath,
                currentPath: {
                    fullPath: action.payload.fullPath,
                    queries: action.payload.queries,
                    specificPath: action.payload.specificPath
                },
                tempPath: {},
                visitationTrack: [...state.visitationTrack, action.payload.specificPath],
            });


        case routeTypes.ROUTE_TRANSITION_FAILURE:
            return ({
                ...state,
                currentPath: state.currentPath,
                previousPath: state.previousPath,
                tempPath: {},
                visitationTrack: state.visitationTrack,
            });


        default:
            return state;
    }
};

export default routeReducer;
