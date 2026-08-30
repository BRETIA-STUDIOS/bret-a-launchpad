import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { SERVICES } from "../content";

export default defineTool({
  name: "list_services",
  title: "List services",
  description:
    "List the services BRETÌA Web Studio offers (website creation, restyling, maintenance, rebranding), with descriptions in Italian.",
  inputSchema: {
    id: z
      .string()
      .optional()
      .describe("Optional service id to return only one service, e.g. 'manutenzione'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const services = id ? SERVICES.filter((s) => s.id === id) : SERVICES;
    if (services.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No service with id "${id}". Available: ${SERVICES.map((s) => s.id).join(", ")}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text" as const, text: JSON.stringify(services, null, 2) }],
      structuredContent: { services },
    };
  },
});
