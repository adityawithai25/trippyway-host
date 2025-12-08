import Link from "next/link";

export function AuthToggle({ isSignUp }: { isSignUp: boolean }) {
  return (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      {isSignUp ? (
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
          >
            Sign in
          </Link>
        </>
      ) : (
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
          >
            Sign up
          </Link>
        </>
      )}
    </p>
  );
}
