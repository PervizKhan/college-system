import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { decrypt } from "@/lib/auth"; 
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();
    
    // 1. Get the session cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Not logged in" }), { status: 401 });
    }

    // 2. Decrypt token to get the user ID
    const decoded = await decrypt(token);
    const userId = decoded.id.toString();
    
    // 3. Find user and include the assignedClass field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Profile API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}