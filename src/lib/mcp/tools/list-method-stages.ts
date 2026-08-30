import { defineTool } from "@lovable.dev/mcp-js";
import { METHOD } from "../content";

export default defineTool({
  name: "list_method_stages",
  title: "List method stages",
  description:
    "List the four stages of BRETÌA's working method (Analizziamo, Progettiamo, Sviluppiamo, Lanciamo) with their descriptions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(METHOD, null, 2) }],
    structuredContent: { stages: METHOD },
  }),
});
