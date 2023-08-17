import { ALERT_ACTION, ALERT_INITIAL_STATE } from "./AlertModels";

export interface Outlet {
  alertDispatch: React.Dispatch<ALERT_ACTION>;
  alert: ALERT_INITIAL_STATE;
}
