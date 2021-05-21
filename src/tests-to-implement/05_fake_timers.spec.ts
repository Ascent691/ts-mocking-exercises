import { describe, expect, it } from '@jest/globals'
import { generateDayMessage } from '../tests-to-implement/05_fake_timers'

describe('generateDayMessage', () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns a message containing the current time', () => {
     // Arrange
    const currentDate = new Date(2021, 3, 30, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("2:29:00 PM");
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 30, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    jest.advanceTimersByTime(1000);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("2:29:01 PM");
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 26, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Monday");
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 27, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Tuesday");
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 28, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Wednesday");
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 29, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Thursday");
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 30, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Friday");
  })

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 31, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Saturday");
  })

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    const currentDate = new Date(2021, 2, 21, 14, 29, 0, 0);
    jest.setSystemTime(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Sunday");
  })
})
