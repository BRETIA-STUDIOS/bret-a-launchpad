import { defineMcp, type AnyToolDefinition } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import listMethodStages from "./tools/list-method-stages";
import listPortfolioProjects from "./tools/list-portfolio-projects";
import getStudioInfo from "./tools/get-studio-info";

export default defineMcp({
  name: "bretia-launchpad",
  title: "BRETÌA Launchpad",
  version: "0.1.0",
  instructions:
    "Public tools for the BRETÌA Web Studio website. Use `get_studio_info` for the studio's mission, positioning and contact details, `list_services` for what BRETÌA offers, `list_method_stages` for how projects are run, and `list_portfolio_projects` for the concept projects in the portfolio. All content is in Italian and mirrors the public website.",
  tools: [getStudioInfo, listServices, listMethodStages, listPortfolioProjects],
});
