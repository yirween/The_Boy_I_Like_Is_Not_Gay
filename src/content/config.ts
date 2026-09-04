// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 动态卡片集合（对应 src/content/dynamics/ 下的所有 .md 文件）
const dynamics = defineCollection({
  type: 'content',               // 内容类型：Markdown 文件
  schema: z.object({
    title: z.string(),            // 页面标题，如 '动态-2026-08-31-21-30'
    author: z.string(),           // 作者，如 'yirween'
    description: z.string(),      // 动态内容的纯文本摘要
    pubDate: z.coerce.date(),     // 发布日期（自动将字符串转为 Date 对象）
    tags: z.array(z.string()),    // 标签数组，如 ["日常"]
  }),
});

// 导出所有集合（后续可添加其他集合，如 blog、projects 等）
export const collections = { dynamics };