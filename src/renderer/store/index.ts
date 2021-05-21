import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
// @ts-expect-error no types available
import immutableTransform from "redux-persist-transform-immutable";

import reducers, { ApplicationState } from "./reducers";
import sagas from "./sagas";
import { isDevelopment } from "../utils/isDevelopment";

// add the middlewares
const middlewares = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const isTesting = process.env.JEST_WORKER_ID;

if (isDevelopment() && !isTesting) {
  const loggerMiddleware = createLogger({ collapsed: true });

  middlewares.push(loggerMiddleware);
}

// apply the middleware
const middleware = applyMiddleware(...middlewares);

const persistConfig: PersistConfig<ApplicationState> = {
  key: "root",
  transforms: [immutableTransform()],
  storage,
  blacklist: ["menuActionsModal", "menus"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
