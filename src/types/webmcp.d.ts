interface WebMCPTool {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  execute: (
    input: Record<string, unknown>,
  ) => unknown | Promise<unknown>;
}

interface WebMCPRegisterOptions {
  signal?: AbortSignal;
}

interface ModelContext {
  registerTool(
    tool: WebMCPTool,
    options?: WebMCPRegisterOptions,
  ): Promise<void>;
}

interface Document {
  modelContext?: ModelContext;
}