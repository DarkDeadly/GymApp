import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUserCreation = mutation({
  args: { clerkId: v.string(), email: v.string(), fullName: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) return existing

    const id = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      role: "user",
      fullName: args.fullName,
      firstTime: true
    })

    return await ctx.db.get(id)
  }
})

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first()

    return user
  },
})

export const editUserField = mutation({
  args: {
    height: v.optional(v.string()),
    weight: v.optional(v.string()),
    gender: v.optional(v.string()),
    age : v.optional(v.string()),
    firstTime : v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identifier = await ctx.auth.getUserIdentity()
    if (!identifier) return
    const user = await ctx.db.query("users").withIndex("by_clerkId",
      q => q.eq("clerkId", identifier.subject)
    ).unique()
    if (!user) throw new Error("user not found")
    const updates = Object.fromEntries(
      Object.entries(args).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(updates).length === 0) {
      return { success: false, message: "No fields provided for update" };
    }
    await ctx.db.patch(user._id, updates)
    return { success: true }
  }
})