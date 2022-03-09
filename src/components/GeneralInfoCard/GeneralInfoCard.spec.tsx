import { screen, render } from "@testing-library/react";
import { GeneralInfoCard } from "./GeneralInfoCard";

describe("GeneralInfoCard Component", () => {
  it("render correctly", () => {
    render(<GeneralInfoCard value="24" title="test-title" bgColor="#fff" />);

    expect(screen.getByText("test-title")).toBeInTheDocument();
  });
});
