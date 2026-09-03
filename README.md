# 🇰🇼 Kuwait Life

**Government services, explained simply.**

Kuwait Life is a bilingual English/Arabic WebMCP-powered web application that helps residents understand Kuwait government services, required documents, fees, requirements, and official service channels.

🌐 Live application:  
https://kuwait-life-webmcp.vercel.app

---

## The Problem

Government procedures can be difficult to navigate, especially when users do not know the official name of the service they need.

A person may simply know:

> "My residency was renewed and I need my Civil ID."

or:

> "I need to renew my driving license."

Kuwait Life lets users describe their situation naturally and helps identify the relevant government service.

---

## Why WebMCP?

Traditional AI browser agents may need to inspect a webpage, understand the interface, find controls, and simulate clicks.

Kuwait Life exposes structured capabilities directly to compatible AI agents through WebMCP.

The application currently exposes two WebMCP tools:

### `find-kuwait-government-service`

Finds and ranks Kuwait government services based on a user's situation.

Example:

```text
"I need to renew my driving license"