# 导出配置项

## 功能概述

在设置表单中提供导出/导入按钮，支持以 JSON 格式备份和恢复扩展配置。

## 导出内容

导出的配置项包括：

- 扩展版本号
- 样式及设置中的其余配置
- 快速链接
- 暂存的标签页
- 待办事项
- 未来可能添加的其他内容

## 版本兼容性

### 兼容性原则

1. **最大兼容**：导入时尽可能兼容旧版本扩展配置
2. **版本记录**：在文档中存储所有版本的配置项格式
3. **格式变更说明**：格式变化时在文档中注明前后对应关系
4. **逐级升级**：当配置差别过大时，允许用户逐级升级

### 版本要求

每个版本至少必须支持导入上一个版本的配置格式。考虑到部分相邻版本的区别不大，一个配置格式可能对应多个版本。

- 最后一个无法导出配置项的版本：`1.0.3`
- 第一个支持导出配置项的版本：`1.0.4`

## JSON 格式示例

### 1.0.4

```json
{
  "extensionVersion": "1.0.4",
  "configVersion": 1,
  "exportedAt": "2026-05-03T12:00:00.000Z",
  "theme": {
    "themeId": "light"
  },
  "settings": {
    "doShowRgbCircle": true
  },
  "quickLinks": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "GitHub",
      "url": "https://github.com"
    },
    {
      "id": "b1c2d3e4-f5a6-7890-abcd-ef1234567890",
      "title": "YouTube",
      "url": "https://youtube.com"
    }
  ],
  "deferred": [
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "url": "https://example.com/article",
      "title": "示例文章标题",
      "savedAt": "2026-05-01T14:22:00.000Z",
      "completed": false,
      "dismissed": false
    }
  ],
  "todos": [
    {
      "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
      "title": "完成项目文档",
      "description": "编写导出配置功能的文档说明",
      "createdAt": "2026-05-02T09:15:00.000Z",
      "completed": true,
      "dismissed": false
    }
  ]
}
```

### 字段说明

| 字段                 | 类型     | 必填 | 说明                   |
|--------------------|--------|----|----------------------|
| `extensionVersion` | string | 是  | 扩展版本号，用于兼容性判断        |
| `configVersion`    | string | 是  | 配置格式版本号，用于兼容性判断      |
| `exportedAt`       | string | 是  | 导出时间的 ISO 8601 格式时间戳 |
| `theme`            | object | 是  | 主题偏好设置               |
| `settings`         | object | 是  | 用户设置选项               |
| `shortcuts`        | array  | 是  | 快速链接列表               |
| `deferred`         | array  | 是  | 暂存的标签页列表，按顺序导出       |
| `todos`            | array  | 是  | 待办事项列表，按顺序导出         |
