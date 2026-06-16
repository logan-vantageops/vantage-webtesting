import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Form submission router - proxies to n8n webhook
  forms: router({
    submitLead: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          companyName: z.string().min(1, "Company name is required"),
          email: z.string().email("Invalid email"),
          phoneNumber: z.string().min(1, "Phone number is required"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          console.log("[submitLead] Sending to n8n:", {
            name: input.name,
            companyName: input.companyName,
            email: input.email,
            phoneNumber: input.phoneNumber,
          });

          // Forward the submission to n8n webhook
          const response = await fetch(
            "https://logan-vantageoperations.app.n8n.cloud/webhook/landing-page-lead",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: input.name,
                companyName: input.companyName,
                email: input.email,
                phoneNumber: input.phoneNumber,
                submittedAt: new Date().toISOString(),
              }),
            }
          );

          console.log("[submitLead] n8n response status:", response.status);
          const responseText = await response.text();
          console.log("[submitLead] n8n response body:", responseText);

          if (!response.ok) {
            throw new Error(`n8n webhook returned ${response.status}: ${responseText}`);
          }

          return {
            success: true,
            message: "Lead submitted successfully",
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error("[n8n Webhook Error]", errorMessage);
          throw new Error(`Failed to submit lead: ${errorMessage}`);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
