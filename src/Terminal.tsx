import { useRef, useState, useEffect } from "react";
import { compile, solve, tokenize } from "./lib/parser";

type Log = {
  id: number;
  type: "userInput" | "result" | "error";
  value: string;
};

export const Terminal = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== "Enter" || !inputRef.current) return;
    e.preventDefault();
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
    } catch (err) {
      if (err instanceof Error) {
        const value = err.message;
        setLogs((l) => [...l, { type: "error", value, id: l.length }]);
      }
    }
  };
  useEffect(() => {
    inputRef.current?.scrollIntoView();
  }, [inputRef, logs]);
  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      {logs.map(({ id, value, type }) => (
        <span className={`logs ${type}`} key={id}>
          {value}
        </span>
      ))}
      <form className="userInput" onKeyDown={handleKeyDown}>
        <textarea tabIndex={0} ref={inputRef} autoFocus spellCheck="false" />
      </form>
    </div>
  );
};
