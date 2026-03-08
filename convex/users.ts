import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUserCreation = mutation({
    args : {clerkId : v.string() , email : v.string() , fullName : v.string()}, 
    handler : async(ctx , args) => {
       const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

      if (existing) return existing 

      const id = await ctx.db.insert("users", {
        clerkId : args.clerkId , 
        email : args.email,
        role : "user",
        fullName : args.fullName
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