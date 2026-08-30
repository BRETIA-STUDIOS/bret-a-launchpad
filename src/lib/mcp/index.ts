import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import listMethodStages from "./tools/list-method-stages";
import listPortfolioProjects from "./tools/list-portfolio-projects";
import getStudioInfo from "./tools/get-studio-info";

// The OAuth issuer must be the direct auth host: the runtime SUPABASE_URL is
// rewritten to a proxy on publish and would fail the RFC 8414 issuer match.
// VITE_SUPABASE_PROJECT_ID is inlined as a literal at build time.
const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "bretia-launchpad",
  title: "BRETÌA Launchpad",
  version: "0.1.0",
  instructions:
    "Tools for the BRETÌA Web Studio website, available to signed-in users. Use `get_studio_info` for the studio's mission, positioning and contact details, `list_services` for what BRETÌA offers, `list_method_stages` for how projects are run, and `list_portfolio_projects` for the concept projects in the portfolio. All content is in Italian and mirrors the public website.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  // exactOptionalPropertyTypes makes the SDK's optional `outputSchema` field
  // structurally incompatible with the declared tool list type.
  tools: [
    getStudioInfo,
    listServices,
    listMethodStages,
    listPortfolioProjects,
  ] as unknown as Parameters<typeof defineMcp>[0]["tools"],
});
