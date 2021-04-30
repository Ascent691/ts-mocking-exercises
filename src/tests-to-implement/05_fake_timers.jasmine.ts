import { generateDayMessage } from "../tests-to-implement/05_fake_timers";

describe("generateDayMessage", () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("returns a message containing the current time", () => {
    // Arrange
    const currentDate = new Date(2021, 3, 30, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("2:29:00 PM");
  });

  it("returns a message containing the current time after some time has elapsed", () => {
    // Arrange
    const currentDate = new Date(2021, 3, 30, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    jasmine.clock().tick(1000);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("2:29:01 PM");
  });

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 26, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Monday");
  });

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 27, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Tuesday");
  });

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 28, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Wednesday");
  });

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 29, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Thursday");
  });

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 30, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Friday");
  });

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 24, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Saturday");
  });

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    const currentDate = new Date(2021, 3, 25, 14, 29, 0, 0);
    jasmine.clock().mockDate(currentDate);
    // Act
    const message = generateDayMessage();
    // Assert
    expect(message).toContain("Sunday");
  });
});
