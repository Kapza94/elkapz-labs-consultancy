import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";

import { dictionaries } from "@/i18n/dictionaries";
import { LocaleProvider, useLocale } from "@/i18n/locale-provider";

describe("internationalization", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "en-US",
    });
  });

  it("keeps English and Serbian dictionary structures aligned", () => {
    expect(Object.keys(dictionaries.en)).toEqual(
      Object.keys(dictionaries["sr-Latn"]),
    );
    expect(dictionaries["sr-Latn"].hero.title).toContain("Praktični");
    expect(dictionaries["sr-Latn"].services.items).toHaveLength(4);
    expect(dictionaries["sr-Latn"].pricing.items).toHaveLength(4);
    expect(dictionaries["sr-Latn"].faq.items).toHaveLength(5);
  });

  it("switches locale, persists it, and updates the document language", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <LocaleProvider>{children}</LocaleProvider>
    );
    const { result } = renderHook(() => useLocale(), { wrapper });

    act(() => result.current.setLocale("sr-Latn"));

    expect(result.current.locale).toBe("sr-Latn");
    expect(result.current.dictionary.nav.services).toBe("Usluge");
    expect(window.localStorage.getItem("elkapz-locale")).toBe("sr-Latn");
    expect(document.documentElement.lang).toBe("sr-Latn");
  });
});
