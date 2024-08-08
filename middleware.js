import { withAuth } from "next-auth/middleware";
//export { default } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/login", // Redirect to /login if not authenticated
  },
});
export const config = {
  matcher: ["/", "/class-dashboard/:path*", "/profile", "/assignment" ,"/admin"],
};
