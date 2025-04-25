import "./globals.css";
// FIXME: merge these 2. new is more correct, old has tiptap classes
// import "./globals_old.css";
import "jotai-devtools/styles.css";

import { AppListener } from "@/components/AppListener";
import { AppProvider } from "@/components/AppProvider";
import { MainCommandCenter } from "@/components/MainCommandCenter";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { cn } from "@repo/lib";
import { ToasterSonner } from "@repo/ui/primitive/sonner";
import { Toaster } from "@repo/ui/primitive/toaster";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Othi",
  description: "Othi's site",
};

interface RootProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.className)}>
        <AppProvider>
          <AppListener>
            <Navbar />

            <main className="flex flex-col">
              <div className="justify-center place-self-center p-4 md:w-2/3">
                {children}
              </div>
            </main>

            <ScrollToTop />
            <ToasterSonner />
            <Toaster />
            <MainCommandCenter />
          </AppListener>
        </AppProvider>
      </body>
    </html>
  );
}
