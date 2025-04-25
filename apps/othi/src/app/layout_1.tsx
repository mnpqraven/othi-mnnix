import "@othi/css/globals.css";
import "jotai-devtools/styles.css";

import { AppListener } from "@othi/components/AppListener";
import { AppProvider } from "@othi/components/AppProvider";
import { MainCommandCenter } from "@othi/components/MainCommandCenter";
import { Navbar } from "@othi/components/Navbar";
import { ScrollToTop } from "@othi/components/ScrollToTop";
import { GeistSans } from "geist/font/sans";
import { cn } from "lib";
import { Toaster } from "ui/primitive";
import { ToasterSonner } from "ui/primitive/sonner";

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
