import configureStore from 'redux-mock-store';

export default class TestUtil {
  static createDraftInProgressMockStore(inProgress) {
    const mockStore = configureStore([]);
    return mockStore({
      draftInProgress: {
        value: inProgress,
      },
    });
  }
}
