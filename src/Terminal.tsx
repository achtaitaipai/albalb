import { useEffect, useMemo, useRef, useState } from "react";
import { CopyBtn } from "./CopyBtn";
import { parse } from "./lib/parser";
import { useSelectionRange } from "./lib/hooks/useSelectionRange";

type Log = {
  id: number;
  type: "userInput" | "result" | "error";
  value: string;
};

let historyCursor = 0;

export const Terminal = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const setSelectionRange = useSelectionRange(inputRef);

  const userInputs = useMemo(
    () => logs.filter((l) => l.type === "userInput"),
    [logs]
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputRef.current) return;
    const value = inputRef.current.value ?? "";
    setLogs((l) => [...l, { type: "userInput", value, id: l.length }]);
    inputRef.current.value = "";
    try {
      const output = parse(value);
      setLogs((l) => [...l, { type: "result", value: output, id: l.length }]);
      historyCursor = 0;
    } catch (err) {
      if (err instanceof Error) {
        const value = err.message;
        setLogs((l) => [...l, { type: "error", value, id: l.length }]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!inputRef.current) return;
    if (e.code.includes("Enter")) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.code === "ArrowUp") {
      e.preventDefault();
      historyCursor = (historyCursor + 1) % userInputs.length;
      const val = userInputs.at(-historyCursor)?.value;
      if (val) setInputValue(val);
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      historyCursor =
        (historyCursor + (userInputs.length - 1)) % userInputs.length;
      const val = userInputs.at(-historyCursor)?.value;
      if (val) setInputValue(val);
    }
  };
  useEffect(() => {
    inputRef.current?.scrollIntoView();
  }, [inputRef, logs]);

  const setInputValue = (value: string) => {
    if (!inputRef.current) return;
    inputRef.current.value = value;
    setSelectionRange(value.length);
  };

  return (
    <div className="terminal">
      {logs.map(({ id, value, type }) => (
        <div className="logs" key={id}>
          <span className={type}>{value}</span>
          <CopyBtn toCopy={value} />
        </div>
      ))}
      <form
        className="userInput"
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <textarea tabIndex={0} ref={inputRef} autoFocus spellCheck="false" />
      </form>
    </div>
  );
};
