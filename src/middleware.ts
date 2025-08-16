import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// createRouteMatcher yek funcitoni hast ke dakhele khodesh ye requestio migire
const isPrivateRoute = createRouteMatcher(['/dashboard(.*)']);

// dar dakhele clerkMiddleware yek tabe async vojod dare, in tabe 2ta chiz mide behem, yeki auth yeki request
// ba auth mitonim validation khodemono anjam bedim
export default clerkMiddleware(async (auth, request) => {
    // in bakhsh injorie ke miad nega mikone be on request ye route ke karbar vared karde, age login shode ke azin bakhsh rad mishe va mosheki nadare age na mibarash be safe login
    // inja ma goftim private page ma safe hai ast ke marbot be route dashboard va har routei ke marbot be page dashboard bashe azin filter rad khahad shod
    if (isPrivateRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
