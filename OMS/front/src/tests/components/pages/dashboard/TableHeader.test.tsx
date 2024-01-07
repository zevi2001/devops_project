import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import TableHeader from "../../../../components/pages/dashboard/TableHeader";

describe("Table", () => {
  test("FILTERS", () => {
    render(<TableHeader />);
    
    const status = screen.getByText(/Status/i);
    
    expect(status).toBeInTheDocument();
  });
});

