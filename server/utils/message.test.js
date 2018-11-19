const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', done => {
    const from = 'Pesho';
    const text = 'This is a test message';
    const message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
    done();
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const lat = 123;
    const long = 321;
    const from = 'Gosho';
    const message = generateLocationMessage(from, lat, long);

    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
    expect(typeof message.createdAt).toBe('number');
  });
});