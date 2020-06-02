import { NewUserDashBoardModule } from './new-user-dash-board.module';

describe('NewUserDashBoardModule', () => {
  let newUserDashBoardModule: NewUserDashBoardModule;

  beforeEach(() => {
    newUserDashBoardModule = new NewUserDashBoardModule();
  });

  it('should create an instance', () => {
    expect(newUserDashBoardModule).toBeTruthy();
  });
});
