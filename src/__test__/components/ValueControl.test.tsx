import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import { ValueControl } from "../../components/ValueControl";
import "../../test-setup";
afterEach(cleanup);

describe("ValueControl Component (Testing Original Code)", () => {
  const setup = (props = {}) => {
    const utils = render(<ValueControl {...props} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const incrementBtn = screen.getByLabelText("Increment value");
    const decrementBtn = screen.getByLabelText("Decrement value");
    const percentBtn = screen.getByRole("button", { name: "%" });
    const pixelBtn = screen.getByRole("button", { name: "px" });
    return {
      ...utils,
      input,
      incrementBtn,
      decrementBtn,
      percentBtn,
      pixelBtn,
    };
  };

  test("should render with default float value (1.0)", () => {
    const { input } = setup({
      initialValue: 1.0,
      initialUnit: "%",
    });
    expect(input.value).toBe("1");
  });

  test("should render with default integer value (4)", () => {
    const { input } = setup({ initialValue: 4 });
    expect(input.value).toBe("4");
  });

  test("should switch units when toggle is clicked", () => {
    const { percentBtn, pixelBtn } = setup();
    fireEvent.click(pixelBtn);
    expect(pixelBtn).toHaveAttribute("data-active", "true");
    expect(percentBtn).toHaveAttribute("data-active", "false");
  });

  test("should increment and decrement value on button click", () => {
    const { input, incrementBtn, decrementBtn } = setup({ initialValue: 10 });
    fireEvent.click(incrementBtn);
    expect(input.value).toBe("11");
    fireEvent.click(decrementBtn);
    expect(input.value).toBe("10");
  });

  describe("Button disabling logic", () => {
    test("should disable decrement button at 0", () => {
      const { decrementBtn } = setup({ initialValue: 0 });
      expect(decrementBtn).toBeDisabled();
    });

    test("should disable increment button when unit is % and value is 100", () => {
      const { incrementBtn } = setup({ initialValue: 100, initialUnit: "%" });
      expect(incrementBtn).toBeDisabled();
    });

    test("should NOT disable increment button when unit is px and value is 100", () => {
      const { incrementBtn } = setup({ initialValue: 100, initialUnit: "px" });
      expect(incrementBtn).not.toBeDisabled();
    });
  });

  describe("Input sanitization and clamping (onBlur)", () => {
    test.each([
      { in: "12,3", out: "12.3", desc: "replace comma" },
      { in: "12a3", out: "12", desc: "remove letters in middle" },
      { in: "12.4.5", out: "12.4", desc: "handle multiple dots" },
      { in: "-50", out: "0", desc: "clamp negative value to 0" },
      { in: "150", out: "150", desc: "allow > 100 for px" },
      { in: "123a", out: "123", desc: "remove trailing letters" },
    ])(
      "should $desc (unit: px) (in: $in -> out: $out)",
      ({ in: inputValue, out: expectedValue }) => {
        const { input } = setup({ initialValue: 10, initialUnit: "px" });
        fireEvent.change(input, { target: { value: inputValue } });
        fireEvent.blur(input);
        expect(input.value).toBe(expectedValue);
      }
    );

    test.each([
      { in: "150", out: "100", desc: "clamp value over 100" },
      { in: "123a", out: "100", desc: 'clamp value from "123a" to 100' },
    ])(
      "should $desc (unit: %) (in: $in -> out: $out)",
      ({ in: inputValue, out: expectedValue }) => {
        const { input } = setup({ initialValue: 10, initialUnit: "%" });
        fireEvent.change(input, { target: { value: inputValue } });
        fireEvent.blur(input);
        expect(input.value).toBe(expectedValue);
      }
    );

    test('should revert to last valid value if input is invalid (e.g., "abc")', () => {
      const { input } = setup({ initialValue: 10 });
      fireEvent.change(input, { target: { value: "abc" } });
      fireEvent.blur(input);
      expect(input.value).toBe("10");
    });
  });

  test("should clamp value to 100 when switching from (px > 100) to %", () => {
    const { input, percentBtn } = setup({
      initialValue: 500,
      initialUnit: "px",
    });
    expect(input.value).toBe("500");
    fireEvent.click(percentBtn);
    expect(input.value).toBe("100");
  });
});
