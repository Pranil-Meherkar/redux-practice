const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combinedReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const DEFEAT_ENEMY = "DEFEAT_ENEMY";
const LOST_TEAMMATE = "LOST_TEAMMATE";

function defeatEnemy() {
  return {
    type: DEFEAT_ENEMY,
    info: "reduce enemy count by 1",
  };
}

function lostTeammate() {
  return {
    type: LOST_TEAMMATE,
    info: "reduce teammate count by 1",
  };
}
const initialEnemyState = {
  numOfEnemies: 100,
};
const initialTeammateState = {
  numOfTeammates: 4,
};

const enemyReducer = (state = initialEnemyState, action) => {
  switch (action.type) {
    case DEFEAT_ENEMY:
      return {
        ...state,
        numOfEnemies: state.numOfEnemies - 1,
      };

    default:
      return state;
  }
};
const teammateReducer = (state = initialTeammateState, action) => {
  switch (action.type) {
    case LOST_TEAMMATE:
      return {
        ...state,
        numOfTeammates: state.numOfTeammates - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combinedReducers({
  enemy: enemyReducer,
  teammate: teammateReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(defeatEnemy());
store.dispatch(defeatEnemy());
store.dispatch(defeatEnemy());
store.dispatch(lostTeammate());
store.dispatch(lostTeammate());

unsubscribe();
