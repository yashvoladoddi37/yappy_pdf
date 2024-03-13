// import { Button } from "@/components/ui/button";
// import { UserButton, auth } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import {LogIn} from 'lucide-react';
// import FileUpload from "@/components/FileUpload";

// //set NODE_OPTIONS='--max-old-space-size=8192' && 

// export default async function Home() {
//   const {userId} = await auth()
//   const isAuth = !!userId
//   return (
//     <div className="w-screen min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//         <div className="flex flex-col items-center text-center">
//           <div className="flex items-center">
//             <h1 className="mr-3 text-5xl font-semibold text-gray-300">Chat with PDFs</h1>
//             <UserButton afterSignOutUrl="/"></UserButton> 
//           </div>

//           <div className="flex mt-2">
//             {isAuth && <Button>Go to Your Chats</Button>}
//           </div>

//         <p className="text-gray-300 max-w-xl mt-1 text-lg">
//           Upload any PDFs, ranging from your Aadhaar to university textbooks in order to interact with YappyPDF, and understand what's happening inside!
//         </p>

//         <div className="w-full mt-4">
//           {isAuth ? (
//             <FileUpload />
//           ) : (
//             <Link href="/sign-in">
//               <Button>Let's go
//                 <LogIn className="w-4 h-4 ml-2"/>
//               </Button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }
    
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
// import { checkSubscription } from "@/lib/subscription";
// import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  // const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  {/* <SubscriptionButton isPro={isPro} />  */}
                </div>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to instantly
            answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}