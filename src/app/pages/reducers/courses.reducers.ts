import { AppActions } from '../../app.actions';
import { Course } from '../../entities';

export const coursesReducer = (state: Course[] = [], action) => {
    switch (action.type) {
        case AppActions.COURSES_LOADED:
            return action.payload;

        case AppActions.ADD_COURSE:
            let n = state.findIndex(x => x.id == action.payload.id);
            if (n >= 0) {
                return state;
            }
            return [...state, action.payload];

        case AppActions.DELETE_COURSE:
            return state.filter(i => i.id !== action.payload.id);

        case AppActions.UPDATE_COURSE:
            return state.map(x => {
                if (x.id == action.payload.id) {
                    return Object.assign({}, x, action.payload);
                }
                return x;
            });

        default: return state;
    }
}