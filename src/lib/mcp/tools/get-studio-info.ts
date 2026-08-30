import { defineTool } from "@lovable.dev/mcp-js";
import { STUDIO } from "../content";

export default defineTool({
  name: "get_studio_info",
  title: "Get studio info",
  description:
    "Get public information about BRETÌA Web Studio: mission, positioning, location, contact email and the list of site pages.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(STUDIO, null, 2) }],
    structuredContent: { studio: STUDIO },
  }),
});
