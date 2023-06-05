import { useRef, useState, useEffect, useMemo } from "react";
import { compile, solve, tokenize } from "./lib/parser";
import { CopyBtn } from "./CopyBtn";

type Log = {
  id: number;
  type: "userInput" | "result" | "error";
  value: string;
};

export const Terminal = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  let historyCursor: number | undefined;

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
      const tokens = tokenize(value);
      if (!tokens.length)
        throw Error(`"${value}" ne correspond à aucune commande :/`);
      const compiled = compile(tokens);
      const output = solve(compiled);
      setLogs((l) => [...l, { type: "result", value: output, id: l.length }]);
      historyCursor = undefined;
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
      historyCursor =
        historyCursor !== undefined
          ? (historyCursor + 1) % userInputs.length
          : 1;
      inputRef.current.value = userInputs.at(-historyCursor)?.value ?? "";
    }
    if (e.code === "ArrowDown") {
      historyCursor =
        historyCursor !== undefined
          ? ((historyCursor - 1) % userInputs.length) % userInputs.length
          : 0;
      inputRef.current.value = userInputs.at(-historyCursor)?.value ?? "";
    }
  };
  useEffect(() => {
    inputRef.current?.scrollIntoView();
  }, [inputRef, logs]);
  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      {logs.map(({ id, value, type }) => (
        <div className="logs">
          <span className={type} key={id}>
            {value}
          </span>
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
