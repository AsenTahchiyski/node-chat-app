const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Gosho',
      room: 'Express'
    },
    {
      id: '2',
      name: 'Minka',
      room: 'Express'
    },
    {
      id: '3',
      name: 'Evlampi',
      room: 'NodeJS'
    }];
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Pesho',
      room: 'Express'
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for express course', () => {
    const userList = users.getUserList('Express');

    expect(userList).toEqual(['Gosho', 'Minka']);
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('NodeJS');

    expect(userList).toEqual(['Evlampi']);
  });

  it('should remove a user', () => {
    const userId = '3';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove incorrect user', () => {
    const userId = '9';
    const user = users.removeUser(userId);

    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const userId = '2';
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    const userId = '9';
    const user = users.getUser(userId);

    expect(user).toBe(undefined);
  });
});