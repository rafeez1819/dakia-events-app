#!/usr/bin/env node

import { spawn } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const APP_ENV_REL_PATH = ".grok/app-env.json";

const VITE_PREFIX = "VITE_";

export function parseAppEnv(text) {
  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    return {};
  }

  if (
    parsed === null ||
    typeof parsed !== "object" ||
    Array.isArray(parsed)
  ) {
    return {};
  }

  const env = {};

  for (const [key, value] of Object.entries(parsed)) {
    if (!key.startsWith(VITE_PREFIX)) continue;
    if (typeof value !== "string") continue;

    env[key] = value;
  }

  return env;
}

export function readAppEnv(root) {
  try {
    return parseAppEnv(
      readFileSync(join(root, APP_ENV_REL_PATH), "utf8")
    );
  } catch {
    return {};
  }
}

export function mergeAppEnv(appEnv, processEnv) {
  return {
    ...appEnv,
    ...processEnv,
  };
}

export function projectRoot() {
  return dirname(dirname(fileURLToPath(import.meta.url)));
}

export function isMainModule(moduleUrl) {
  const entry = process.argv[1];

  if (!entry) return false;

  try {
    return realpathSync(entry) === fileURLToPath(moduleUrl);
  } catch {
    return false;
  }
}

function resolveCommand(command) {
  if (process.platform !== "win32") {
    return command;
  }

  if (
    command.endsWith(".cmd") ||
    command.endsWith(".exe") ||
    command.endsWith(".bat")
  ) {
    return command;
  }

  return `${command}.cmd`;
}

function quoteWindowsArg(value) {
  const stringValue = String(value);

  if (
    stringValue.length > 0 &&
    !/[ \t"&|<>^]/.test(stringValue)
  ) {
    return stringValue;
  }

  return `"${stringValue.replace(/(["\\])/g, "\\$1")}"`;
}

function main(argv) {
  const [command, ...args] = argv;

  if (!command) {
    console.error(
      "usage: node scripts/with-app-env.mjs <command> [args...]"
    );
    process.exit(2);
  }

  const root = projectRoot();

  const env = mergeAppEnv(
    readAppEnv(root),
    process.env
  );

  const executable = resolveCommand(command);

  console.log(
    `[with-app-env] launching: ${executable}${
      args.length ? ` ${args.join(" ")}` : ""
    }`
  );

  let spawnCommand = executable;
  let spawnArgs = args;

  if (process.platform === "win32") {
    const comspec = process.env.ComSpec || "cmd.exe";

    /*
     * Windows .cmd files need cmd.exe.
     *
     * IMPORTANT:
     * Do not wrap the executable in quotes here.
     * The previous implementation produced:
     *
     *     "vite.cmd" "build"
     *
     * which /s /c can reinterpret incorrectly as:
     *
     *     '"vite.cmd"'
     */

    const commandLine = [
      executable,
      ...args.map(quoteWindowsArg),
    ].join(" ");

    spawnCommand = comspec;
    spawnArgs = ["/d", "/c", commandLine];
  }

  const child = spawn(spawnCommand, spawnArgs, {
    cwd: root,
    stdio: "inherit",
    env,
    shell: false,
  });

  for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
    process.on(signal, () => {
      if (!child.killed) {
        child.kill(signal);
      }
    });
  }

  child.on("error", (err) => {
    console.error(
      `[with-app-env] failed to run ${command}:`,
      err?.message || err
    );

    process.exit(127);
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.exit(1);
    }

    process.exit(code ?? 1);
  });
}

if (isMainModule(import.meta.url)) {
  main(process.argv.slice(2));
}