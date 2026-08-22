import { useEffect, useRef } from "react";
import html from "./dakia-body.html?raw";
import { mountDakiaRuntime } from "./runtime";
import "@/styles/dakia.css";

export function DakiaSite() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return mountDakiaRuntime(ref.current);
  }, []);

  return <div className="dakia-root" ref={ref} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
