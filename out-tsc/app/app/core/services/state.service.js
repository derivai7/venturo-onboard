import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
export class StateService {
    get state() {
        return this.state$.getValue();
    }
    constructor(initialState) {
        this.state$ = new BehaviorSubject(initialState);
    }
    select(mapFn) {
        return this.state$.asObservable().pipe(map((state) => mapFn(state)), distinctUntilChanged());
    }
    setState(newState) {
        this.state$.next({
            ...this.state,
            ...newState,
        });
    }
}
//# sourceMappingURL=state.service.js.map