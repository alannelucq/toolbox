import { addMonths, isWeekEnd, on } from './dates.helper';

describe('Dates Helper', () => {

  it("should be on date", () => {
    expect(on("01/06/2023")).toEqual(new Date(2023, 5, 1, 0, 0, 0, 0));
  });

  it("should be on date with time", () => {
    expect(on("01/06/2023 12:30")).toEqual(new Date(2023, 5, 1, 12, 30, 0, 0));
  });

  it('should be on week-end', () => {
    expect(isWeekEnd(on("06/10/2023"))).toBe(false);
    expect(isWeekEnd(on("07/10/2023"))).toBe(true);
    expect(isWeekEnd(on("08/10/2023"))).toBe(true);
    expect(isWeekEnd(on("09/10/2023"))).toBe(false);
  });

  it('should add month', () => {
    expect(addMonths(on("01/12/2022"), 1)).toEqual(on("01/01/2023"));
  });
});
