import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users : defineTable({
        clerkId : v.string(),
        fullName : v.string() , 
        email : v.string() , 
        firstTime : v.boolean(),
        role : v.union(v.literal("admin") , v.literal("subscriber") , v.literal("user")),
        height : v.optional(v.string()),
        weight : v.optional(v.string()),
        gender : v.optional(v.string()),
        age : v.optional(v.string()) 

    }).index("by_clerkId" , ['clerkId']) 
})