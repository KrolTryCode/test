import { _emailSchema } from '.';

describe('Custom email validation', () => {
  it('should pass when email is valid', async () => {
    expect(await _emailSchema.isValid('test@test.com')).toBeTruthy();
    expect(await _emailSchema.isValid('test.testov@test.com')).toBeTruthy();
    expect(await _emailSchema.isValid('test_testov@test.com')).toBeTruthy();
    expect(await _emailSchema.isValid('test-testov@test.com')).toBeTruthy();
    expect(await _emailSchema.isValid('test123@test.com')).toBeTruthy();
    expect(await _emailSchema.isValid('123.test@test.com')).toBeTruthy();
  });

  it('should fail when email is invalid', async () => {
    expect(await _emailSchema.isValid('test.com')).toBeFalsy();
    expect(await _emailSchema.isValid('test@test')).toBeFalsy();
    expect(await _emailSchema.isValid('te@st@test.com')).toBeFalsy();
    expect(await _emailSchema.isValid('te!st@test.com')).toBeFalsy();
    expect(await _emailSchema.isValid('te&st@test.com')).toBeFalsy();
    expect(await _emailSchema.isValid('te)st@test.com')).toBeFalsy();
    expect(await _emailSchema.isValid('tеst@test.com')).toBeFalsy();
  });
});
