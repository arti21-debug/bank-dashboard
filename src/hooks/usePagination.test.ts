import { renderHook, act } from "@testing-library/react";
import usePagination from "./usePagination";

const mockItems = Array.from({ length: 25 }, (_, i) => ({ id: i }));

describe("usePagination", () => {
  it("возвращает первую страницу по умолчанию", () => {
    const { result } = renderHook(() => usePagination(mockItems));
    expect(result.current.currTransPageIndex).toBe(0);
  });

  it("переходит на следующую страницу", () => {
    const { result } = renderHook(() => usePagination(mockItems));
    act(() => result.current.goNext());
    expect(result.current.currTransPageIndex).toBe(1);
  });

  it("переходит в следующую группу страниц", () => {
    const { result } = renderHook(() => usePagination(mockItems));
    act(() => result.current.goNext());
    act(() => result.current.goNext());
    act(() => result.current.goNext());
    act(() => result.current.goNext());
    act(() => result.current.goNext());
    expect(result.current.pageGroupStart).toBe(5);
  })

  it("reset возвращает на первую страницу", () => {
    const { result } = renderHook(() => usePagination(mockItems));
    act(() => result.current.goNext());
    act(() => result.current.reset());
    expect(result.current.currTransPageIndex).toBe(0);
  });
});