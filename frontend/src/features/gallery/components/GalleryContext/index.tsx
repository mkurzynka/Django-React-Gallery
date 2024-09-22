import { createContext, Dispatch, ReactNode, useState } from "react";

interface SettingContextI {
  delay: number | undefined;
  setDelay: Dispatch<React.SetStateAction<number | undefined>>;
}
export const SettingsContext = createContext<SettingContextI>({
  delay: undefined,
  setDelay: () => {},
});

export default function GalleryContext({ children }: { children: ReactNode }) {
  const [delay, setDelay] = useState<number | undefined>(undefined);

  return (
    <SettingsContext.Provider value={{ delay, setDelay }}>
      {children}
    </SettingsContext.Provider>
  );
}
