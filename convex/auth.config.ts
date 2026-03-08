const clerkIssuerDomain =
  process.env.EXPO_PUBLIC_CLERK_JWT_ISSUER_DOMAIN ??
  process.env.EXPO_PUBLIC_CLERK_FRONTEND_API_URL

if (!clerkIssuerDomain) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_JWT_ISSUER_DOMAIN or EXPO_PUBLIC_CLERK_FRONTEND_API_URL in environment",
  )
}

export default {
  providers: [
    {
      domain: clerkIssuerDomain,
      applicationID: 'convex',
    },
  ],
}