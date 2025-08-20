// 3 no sathe dastrasi darim darinja => 1-guess 2-user 3-admin

import { currentUser } from '@clerk/nextjs/server';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import AdminMenu from './AdminMenu';
import { Button } from '../ui';

async function Auth() {
    const user = await currentUser(); //in tabe miad curretn usere mano mide
    // console.log(user);
    const isAdmin = user?.privateMetadata?.isAdmin;

    return (
        <div className="flex items-center">
            {/* dar inja 2ta mode darim, mode SignedIn va mode SignedOut. age user signed in bashe miad UserButton neshon mide va age signed out bashe SignInButton ra neshon mide */}
            <SignedIn>{isAdmin ? <AdminMenu /> : <UserButton />}</SignedIn>
            <SignedOut>
                <div className="text-white">
                    {/* halate default button signin az Clerc */}
                    {/* <SignInButton /> */}

                    {/* inja omadam shakhsi sazi kardm on buttono */}
                    <SignInButton mode="modal">
                        <Button variant="secondary">
                            Sing in
                        </Button>
                    </SignInButton>
                </div>
            </SignedOut>
        </div>
    );
}

export default Auth;
