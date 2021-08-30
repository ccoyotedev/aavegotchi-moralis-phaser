import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal: React.FC<{}> = ({ children }) => {
  const [ container, setContainer ] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const rootContainer = document.createElement('div');
    const parentElem = document.querySelector('#my-portal');
    parentElem?.appendChild(rootContainer);
    setContainer(rootContainer);
  }, [])

  if (!container) return null;
  return createPortal(children, container);
};
