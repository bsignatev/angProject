import { Course } from '../../entities/course';
import { AppActions } from '../../app.actions';

export const courseReducer = (state: Course = new Course(), action) => {
    switch (action.type) {
        case AppActions.COURSE_LOADED:
            return action.payload;

        default: return state;
    }
}