import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "daily-todo",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-daily-todo",
  "获取日常待办事项",
  async () => {
    const tasks = [
      {
        title: "完成项目需求文档",
        description: "编写项目需求文档，包括功能需求、非功能需求和用户故事。", 
        dueDate: "2024-10-05",
        priority: "高",
        status: "进行中",
      },
      {
        title: "代码审查",
        description: "对团队成员提交的代码进行审查，确保代码质量和规范性。",
        dueDate: "2024-10-06",
        priority: "中",
        status: "待办",
      },
      {
        title: "数据库优化",
        description: "优化数据库查询性能，减少响应时间。",
        dueDate: "2024-10-07",
        priority: "低",
        status: "待办",
      },
      {
        title: "客户反馈处理",
        description: "处理客户反馈，解决用户遇到的问题。",
        dueDate: "2024-10-08",
        priority: "高",
        status: "待办",
      },
      {
        title: "项目进度报告",
        description: "编写项目进度报告，汇报项目进展情况。",
        dueDate: "2024-10-09",
        priority: "中",
        status: "待办",
      },
    ];

    const formattedTasks = tasks.map((task) =>
      [
        `**${task.title}**`,
        `描述: ${task.description}`,
        `截止日期: ${task.dueDate}`,
        `优先级: ${task.priority}`,
        `状态: ${task.status}`,
        "---",
      ].join("\n"),
    );
    
    const todoListText = `待办事项列表:\n\n${formattedTasks.join("\n")}`;

    return {
      content: [
        {
          type: "text",
          text: todoListText,
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Daily todo list MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});