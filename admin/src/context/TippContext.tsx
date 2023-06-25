import { createContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  isDemo: false,
  isOff: true,
};

export const TippContext = createContext(INITIAL_STATE);
