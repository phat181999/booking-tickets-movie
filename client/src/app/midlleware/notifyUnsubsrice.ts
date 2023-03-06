import { Subject } from 'rxjs';

export const notifyUnsubsrice = (unsubscribe$: Subject<any>) => {
  unsubscribe$.next(void 0);
  unsubscribe$.complete();
};
