import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import appCss from "../styles.css?url";

const APP_NAME = "Dakia Events";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#080808" },
      {
        name: "description",
        content:
          "Dakia Events delivers LED video walls, AV rental, sound, lighting, staging and technical event production across Ajman, Dubai, Abu Dhabi and the UAE.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const dakia = path === "/" || path === "/privacy" || path === "/terms";
  return (
    <html lang="en-AE" className={dakia ? "dakia-mode antialiased" : "intel-mode antialiased"} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}
