# 🇰🇼 Kuwait Life

**Government services, explained simply.**

Kuwait Life is a bilingual English/Arabic WebMCP-powered web application that helps residents understand Kuwait government services, required documents, fees, requirements, and official service channels.

🌐 **Live application:**  
https://kuwait-life-webmcp.vercel.app

---

## Quick Demo

Ask:

> "I need to renew my driving license."

Kuwait Life can:

1. Find the relevant Kuwait government service.
2. Highlight the service selected by an AI agent.
3. Generate a practical checklist.
4. Let the user interact with the checklist.
5. Direct the user to the official government source.

---

## The Problem

Government procedures can be difficult to navigate, especially when users do not know the official name of the service they need.

A person may simply know:

> "My residency was renewed and I need my Civil ID."

or:

> "I need to renew my driving license."

Instead of requiring the user to know which government authority or service page to search for, Kuwait Life lets users describe their situation naturally and helps identify the relevant government service.

---

## Why WebMCP?

Traditional AI browser agents may need to inspect a webpage, understand the interface, locate controls, and simulate clicks.

Kuwait Life exposes structured capabilities directly to compatible AI agents through **WebMCP**.

This means an agent can discover what the website can do and invoke those capabilities directly.

The application currently exposes two WebMCP tools:

### `find-kuwait-government-service`

Finds and ranks Kuwait government services based on a user's situation or question.

Example:

```text
I need to renew my driving license
```

The tool identifies:

```text
Driving License Renewal
Ministry of Interior - General Department of Traffic
```

The website also reacts visually:

```text
AI calls WebMCP tool
        ↓
Kuwait Life finds the service
        ↓
Search box updates
        ↓
Relevant service moves to the top
        ↓
"AI selected" appears
        ↓
Service card is highlighted
```

---

### `create-kuwait-service-checklist`

Creates a practical checklist for a selected Kuwait government service.

For example:

```text
Driving License Renewal

☐ Valid Civil ID
☐ Existing driving license
☐ Confirm renewal eligibility
☐ Check applicable fee
☐ Complete the procedure through an official channel
```

The checklist is also displayed directly in the webpage, where the human can continue interacting with it.

---

## Human + Agent Collaboration

Kuwait Life demonstrates a workflow where the human and AI agent interact with the same application.

```text
Human describes a situation
        ↓
AI agent discovers WebMCP tools
        ↓
Agent finds the relevant service
        ↓
Website highlights the result
        ↓
Agent generates a checklist
        ↓
Human works through the checklist
        ↓
Official government source
```

The AI is therefore not simply reading the website.

The website provides structured capabilities that the agent can discover and execute.

---

## Bilingual Interface

Kuwait Life supports:

- English
- Arabic
- RTL layout for Arabic

Government service titles and descriptions are available in both languages.

Users can switch between English and Arabic directly from the interface.

---

## Current Services

The MVP currently includes:

- Civil ID Renewal for Non-Kuwaitis
- Driving License Renewal
- Traffic Violation Inquiry and Payment
- Vehicle Registration Renewal

Each service links users back to an official Kuwait government source for verification and completion of the actual procedure.

---

## Technology

Kuwait Life is built with:

```text
Next.js
React
TypeScript
Tailwind CSS
WebMCP
Vercel
GitHub
```

The application does not require a private government API, authentication system, or database for the current MVP.

---

## WebMCP Implementation

The WebMCP tools are registered from the client application using:

```ts
document.modelContext.registerTool(...)
```

The main WebMCP implementation is located in:

```text
src/components/WebMCPTools.tsx
```

Supporting search and government-service logic is located in:

```text
src/lib/service-search.ts
src/data/services.ts
src/types/service.ts
```

The user interface that responds to WebMCP actions is located in:

```text
src/components/ServiceSearch.tsx
```

---

## WebMCP Flow

### Service Discovery

```text
User / AI request
        ↓
find-kuwait-government-service
        ↓
searchServices()
        ↓
Rank matching services
        ↓
Return structured service data
        ↓
Update the webpage
```

### Checklist Generation

```text
Selected service
        ↓
create-kuwait-service-checklist
        ↓
getServiceById()
        ↓
Documents + requirements + fees + channels
        ↓
Return structured checklist
        ↓
Display checklist in the webpage
```

---

## Testing WebMCP

WebMCP requires a compatible browser or environment with WebMCP support enabled.

After opening the application in a WebMCP-compatible browser, the available tools can be inspected with:

```js
await document.modelContext.getTools()
```

The application should expose:

```text
find-kuwait-government-service
create-kuwait-service-checklist
```

Example service search test:

```js
const tools = await document.modelContext.getTools()

const tool = tools.find(
  (t) => t.name === "find-kuwait-government-service"
)

await document.modelContext.executeTool(
  tool,
  JSON.stringify({
    query: "I need to renew my driving license"
  })
)
```

Example checklist test:

```js
const tools = await document.modelContext.getTools()

const checklistTool = tools.find(
  (t) => t.name === "create-kuwait-service-checklist"
)

await document.modelContext.executeTool(
  checklistTool,
  JSON.stringify({
    serviceId: "driving-license-renewal"
  })
)
```

---

## Run Locally

Clone the repository:

```bash
git clone git@github.com:2div/kuwait-life-webmcp.git
```

Enter the project:

```bash
cd kuwait-life-webmcp
```

Install dependencies:

```bash
npm install
```

Start development mode:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

Create the production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Project Structure

```text
kuwait-life-webmcp/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ServiceSearch.tsx
│   │   └── WebMCPTools.tsx
│   │
│   ├── data/
│   │   └── services.ts
│   │
│   ├── lib/
│   │   └── service-search.ts
│   │
│   └── types/
│       ├── service.ts
│       └── webmcp.d.ts
│
├── public/
├── LICENSE
├── README.md
└── package.json
```

---

## Government Information

The project uses publicly available government-service information.

Kuwait Life does not attempt to replace official government websites.

The application helps users understand which service may be relevant, what they may need, and where they should continue the official process.

Official sources currently include services from organizations such as:

```text
PACI
Ministry of Interior
General Department of Traffic
Kuwait Government services
```

---

## Data & Privacy

Kuwait Life does **not**:

- collect Civil ID numbers
- collect passport information
- collect residency records
- log into government accounts
- submit government applications
- process government payments
- access private government databases
- store sensitive government information

The application provides informational guidance and directs users to official government sources.

---

## Security Approach

The current MVP intentionally avoids handling sensitive personal information.

The architecture is:

```text
Public government information
        ↓
Structured Kuwait Life service data
        ↓
Search and WebMCP tools
        ↓
Guidance and checklist
        ↓
Official government website
```

Actual government transactions remain on official government platforms.

---

## Disclaimer

**Kuwait Life is an independent informational project and is not affiliated with, endorsed by, or operated by the Government of Kuwait.**

Government requirements, fees, procedures, and availability may change.

Users should always verify information through the linked official government source before taking action.

---

## Open Source

Kuwait Life is open source.

Contributions, improvements, and ideas are welcome.

---

## License

This project is licensed under the **MIT License**.

See:

[LICENSE](./LICENSE)

---

## Live Application

🇰🇼 **Kuwait Life**

https://kuwait-life-webmcp.vercel.app

**Government services, explained simply.**