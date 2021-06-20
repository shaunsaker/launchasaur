import { createStore, applyMiddleware, Middleware } from "redux";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { ApplicationState, createRootReducer } from "./reducers";
import sagas from "./sagas";
import { isDevelopment } from "../../utils/isDevelopment";
import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { parse, stringify } from "flatted";

const middlewares: Middleware[] = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// add the router middleware
export const history = createHashHistory();
middlewares.push(routerMiddleware(history));

const isTesting = process.env.JEST_WORKER_ID;

// add the logger middleware
if (isDevelopment() && !isTesting) {
  const loggerMiddleware = createLogger({ collapsed: true });

  middlewares.push(loggerMiddleware);
}

// apply the middleware
const middleware = applyMiddleware(...middlewares);

const transformCircular = createTransform(
  (inboundState) => stringify(inboundState),
  (outboundState) => parse(outboundState),
);

const persistConfig: PersistConfig<ApplicationState> = {
  key: "root",
  storage,
  blacklist: [
    "router",
    "launcherActionsModal",
    "editLinkModal",
    "selectLaunchStationModal",
    "editLauncherColourModal",
    "editLauncherIconModal",
    "confirmationModal",
  ],
  transforms: [transformCircular],
};

const reducers = createRootReducer(history);

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
