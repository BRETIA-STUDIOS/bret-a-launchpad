import { defineTool } from "@lovable.dev/mcp-js";
import { PROJECTS } from "../content";

export default defineTool({
  name: "list_portfolio_projects",
  title: "List portfolio projects",
  description:
    "List the concept projects shown in the BRETÌA portfolio, including their category and the page where each can be viewed.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(PROJECTS, null, 2) }],
    structuredContent: { projects: PROJECTS },
  }),
});
