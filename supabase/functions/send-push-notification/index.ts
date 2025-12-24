import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PushNotificationRequest {
  email: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Push notification request received");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, title, body, data }: PushNotificationRequest = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all push subscriptions for this email
    const { data: subscriptions, error: subError } = await supabase
      .from("push_subscriptions")
      .select("*")
      .eq("email", email);

    if (subError) {
      console.error("Error fetching subscriptions:", subError);
      throw new Error("Failed to fetch subscriptions");
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log("No push subscriptions found for:", email);
      return new Response(
        JSON.stringify({ success: false, message: "No subscriptions found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found ${subscriptions.length} subscriptions for ${email}`);

    const payload = JSON.stringify({
      title,
      body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      data: data || {},
    });

    // Send push notifications using web-push
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };

        // Import web-push dynamically
        const webPush = await import("npm:web-push@3.6.7");
        
        webPush.setVapidDetails(
          "mailto:info.ebimotors@gmail.com",
          vapidPublicKey,
          vapidPrivateKey
        );

        return webPush.sendNotification(pushSubscription, payload);
      })
    );

    const successCount = results.filter((r) => r.status === "fulfilled").length;
    console.log(`Sent ${successCount}/${subscriptions.length} notifications`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        total: subscriptions.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-push-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
