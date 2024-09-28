# PageSpy

## Related Links

- [GitHub](https://github.com/HuolalaTech/page-spy-web)
- [Docs](https://pagespy.org)
- [Bilibili](https://space.bilibili.com/3493272492181886/)

## Introduction

### Background

The Devtools is an essential efficiency tool in daily development, and project issues are usually first identified through it. However, sometimes it’s impossible to use the Devtools, which can lead to time-consuming and labor-intensive troubleshooting. This is the problem that PageSpy aims to solve.

Have you ever encountered the following situations?

- **Mobile device debugging**: In the past, some products provided a panel to view information on mobile device, but the small screen size of real devices made it inconvenient to operate and display, and the data was often truncated.

- **Remote work, cross-location collaboration**: Traditional communication methods such as email, phone calls, or video conferences are lengthy, inefficient, and the fault information is often incomplete, leading to misunderstandings or misjudgments.

- **User device white screen**: Besides needing to pre-obtain user information when issues arise, methods to pinpoint problems include reviewing data monitoring, log analysis, and even visiting the client on-site. These approaches rely on the troubleshooting staff understanding both the business scenario and the technical implementation.

- **Global "Feedback" Component**: Many user-centric websites provide a feedback form component to gather user reports after a product issue occurs, allowing for timely resolution. From the user's perspective, this improves user satisfaction, but the content submitted by users might not be very helpful for troubleshooting. The main reason is: users mostly submit a textual summary and screenshots, which may include user information, but what developers really want to see are:

  - The user’s action trail.
  - Runtime data generated during the operations, such as printed logs, network requests, and response data.

  Just like how we use the console during local development, right?

### Capabilities

PageSpy provides two modes based on usage scenarios: **Online Real-time Debugging** and **Offline Log Replay**. It offers panels for Console, Network, Page, Storage, and System information, and also allows you to send code to the project for execution. This helps developers improve troubleshooting efficiency and reduce communication time.

Currently, PageSpy has stable SDKs available for Web, Mini Programs, ReactNative, and OpenHarmony platforms.
