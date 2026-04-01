import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientInteractions from "@/components/ClientInteractions";
import "./globals.css";

export const metadata = {
  title: "Sports Community App",
  description: "A modern platform for local sports events, polls, and suggestions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientInteractions />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
