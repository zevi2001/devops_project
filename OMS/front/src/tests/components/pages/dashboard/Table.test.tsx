import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../../../../components/pages/dashboard/table/Table";
import { MemoryRouter } from "react-router-dom";

describe("Table", () => {
  test("opens and closes modal", () => {
    render(
      <MemoryRouter>
        <Table />
      </MemoryRouter>
    );
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    expect(screen.getByRole("presentation")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "See results" }));
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

});
