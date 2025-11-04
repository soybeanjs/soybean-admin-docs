# Alova

## 相关链接

- [文档](https://alova.js.org/zh-CN)
- [GitHub](https://github.com/alovajs/alova)

## 介绍

alova 是一个流程简化的下一代请求工具，它可以将你的 API 集成工作流从 7 个步骤极致地简化为 1 个步骤，你只需要选择 API 即可使用。

有别于@tanstack/react-request、swrjs、ahooks的useRequest等库，alova是一个完整的请求方案，alova 让你的请求集成变得非常简单，并且保持更高效的 Client-Server 数据交互。此外，你可以在客户端和服务端环境中（包括 SSR）使用alova。

此外，alova 还具有以下特性：

- 与 axios 相似的 api 设计，学习成本更低；
- 高性能的客户端和服务端请求策略，让应用更流畅；
- 灵活性高，alova 可以在任何 js 环境下，与任何 UI 框架协作使用，并且提供了统一的使用体验和完美的代码迁移；
- 多级缓存模式和请求共享机制，提升请求性能并降低服务端压力；
- api 代码的高聚合组织，每个 api 的请求参数、缓存行为、响应数据转换等都将聚集在相同的代码块中，这对于管理大量的 api 有很大的优势；
