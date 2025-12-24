import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MOTBookingRequest {
  customerEmail: string;
  customerName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("MOT Booking request received");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerEmail, customerName }: MOTBookingRequest = await req.json();

    console.log("Processing booking for:", customerEmail);

    // Validate email
    if (!customerEmail || !customerEmail.includes("@")) {
      console.error("Invalid email provided:", customerEmail);
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const name = customerName || "Customer";

    // Save booking to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: booking, error: dbError } = await supabase
      .from("mot_bookings")
      .insert({
        customer_email: customerEmail,
        customer_name: name,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save booking");
    }

    console.log("Booking saved:", booking.id);

    // Send notification to the business email
    const businessEmailResponse = await resend.emails.send({
      from: "Ebi Motors <onboarding@resend.dev>",
      to: ["info.ebimotors@gmail.com"],
      subject: "New MOT Booking Request",
      html: `
        <h1>New MOT Booking Request</h1>
        <p>A customer has requested to book an MOT slot.</p>
        <h2>Customer Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
        </ul>
        <p>Log into your admin panel to confirm their booking slot.</p>
        <hr>
        <p><em>This is an automated message from the Ebi Motors website.</em></p>
      `,
    });

    console.log("Business notification sent:", businessEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Booking request sent successfully",
        bookingId: booking.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-mot-booking function:", error);
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
