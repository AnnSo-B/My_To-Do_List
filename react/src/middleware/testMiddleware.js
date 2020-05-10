// middleware de test
export default (store) => (next) => (action) => {
  console.log('je suis le testMiddleware et voici le store', store.getState());
  next(action);
};
