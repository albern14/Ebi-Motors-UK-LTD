import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { InstallPromptModal } from "@/components/InstallPromptModal";
import { AdminLoginButton } from "@/components/AdminLoginButton";

const Index = () => {
  const [userEmail, setUserEmail] = useState<string | undefined>();

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <Contact onEmailSubmit={setUserEmail} />
      <Footer />
      <InstallPromptModal userEmail={userEmail} />
      <AdminLoginButton />
    </main>
  );
};

export default Index;
